const express = require("express");
const crypto = require("crypto");
const { google } = require("googleapis");

const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");
const { createOAuthClient, SCOPES } = require("../config/googleCalendar");

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL || "https://studycircle-vyo1.onrender.com";

// The callback is a browser redirect from Google, so it can't carry an
// Authorization header — `state` is how we know which StudyCircle user is
// completing the flow. Signed + short-lived so it can't be forged or replayed
// long after the fact; the authorization `code` itself is single-use anyway.
function signState(userId) {
  const payload = Buffer.from(JSON.stringify({ userId, exp: Date.now() + 10 * 60 * 1000 })).toString(
    "base64url",
  );
  const signature = crypto
    .createHmac("sha256", process.env.GOOGLE_CLIENT_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

function verifyState(state) {
  if (typeof state !== "string" || !state.includes(".")) return null;
  const [payload, signature] = state.split(".");

  const expected = crypto
    .createHmac("sha256", process.env.GOOGLE_CLIENT_SECRET)
    .update(payload)
    .digest("base64url");

  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  } catch {
    return null; // length mismatch — not a valid signature
  }

  const { userId, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
  if (!userId || Date.now() > exp) return null;
  return userId;
}

// Wraps an existing connection's tokens in an OAuth2 client and captures any
// refreshed access token so the caller can persist it back to the DB —
// googleapis auto-refreshes using the refresh_token when the access token
// has expired, but only hands the new one back via this event.
function clientForConnection(connection) {
  const oauth2Client = createOAuthClient();
  oauth2Client.setCredentials({
    access_token: connection.accessToken,
    refresh_token: connection.refreshToken,
    expiry_date: new Date(connection.tokenExpiresAt).getTime(),
  });

  let refreshed = null;
  oauth2Client.on("tokens", (tokens) => {
    refreshed = tokens;
  });

  return { oauth2Client, getRefreshedTokens: () => refreshed };
}

function eventReminders(syncReminders) {
  return syncReminders
    ? { useDefault: false, overrides: [{ method: "popup", minutes: 30 }] }
    : { useDefault: true };
}

// GET /calendar/status — connection state for the current user
router.get("/status", requireAuth, async (req, res) => {
  const connection = await prisma.calendarConnection.findUnique({ where: { userId: req.user.id } });

  if (!connection) return res.success({ connected: false });

  res.success({
    connected: true,
    email: connection.googleEmail,
    connectedAt: connection.connectedAt,
    lastSyncedAt: connection.lastSyncedAt,
    settings: {
      syncSessions: connection.syncSessions,
      syncAssignments: connection.syncAssignments,
      syncReminders: connection.syncReminders,
    },
  });
});

// GET /calendar/auth-url — the Google consent screen URL to redirect the browser to
router.get("/auth-url", requireAuth, async (req, res) => {
  const oauth2Client = createOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // required to get a refresh_token back
    prompt: "consent", // forces a fresh refresh_token every time, not just on first-ever connect
    scope: SCOPES,
    state: signState(req.user.id),
  });

  res.success({ url });
});

// GET /calendar/callback — Google redirects here after the user grants/denies access.
// No requireAuth: this is a plain browser navigation, identity comes from `state`.
router.get("/callback", async (req, res) => {
  const { code, state, error } = req.query;

  if (error || !code) {
    return res.redirect(`${FRONTEND_URL}/calendar?connected=error`);
  }

  const userId = verifyState(state);
  if (!userId) {
    return res.redirect(`${FRONTEND_URL}/calendar?connected=error`);
  }

  try {
    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: userinfo } = await oauth2.userinfo.get();

    const existing = await prisma.calendarConnection.findUnique({ where: { userId } });

    // Google only sends a refresh_token on first consent (or when prompt=consent
    // forces re-consent, which we always request) — fall back to the existing
    // one if this response somehow didn't include it, rather than losing sync ability.
    const refreshToken = tokens.refresh_token || existing?.refreshToken;
    if (!refreshToken) {
      return res.redirect(`${FRONTEND_URL}/calendar?connected=error`);
    }

    await prisma.calendarConnection.upsert({
      where: { userId },
      update: {
        googleEmail: userinfo.email,
        accessToken: tokens.access_token,
        refreshToken,
        tokenExpiresAt: new Date(tokens.expiry_date),
      },
      create: {
        userId,
        googleEmail: userinfo.email,
        accessToken: tokens.access_token,
        refreshToken,
        tokenExpiresAt: new Date(tokens.expiry_date),
      },
    });

    res.redirect(`${FRONTEND_URL}/calendar?connected=success`);
  } catch (err) {
    console.error("Google Calendar callback failed:", err);
    res.redirect(`${FRONTEND_URL}/calendar?connected=error`);
  }
});

// PATCH /calendar/settings — toggle what gets synced
router.patch("/settings", requireAuth, async (req, res) => {
  const connection = await prisma.calendarConnection.findUnique({ where: { userId: req.user.id } });
  if (!connection) return res.error("Google Calendar isn't connected.", 400);

  const { syncSessions, syncAssignments, syncReminders } = req.body;

  const updated = await prisma.calendarConnection.update({
    where: { userId: req.user.id },
    data: {
      ...(syncSessions !== undefined ? { syncSessions } : {}),
      ...(syncAssignments !== undefined ? { syncAssignments } : {}),
      ...(syncReminders !== undefined ? { syncReminders } : {}),
    },
  });

  res.success({
    syncSessions: updated.syncSessions,
    syncAssignments: updated.syncAssignments,
    syncReminders: updated.syncReminders,
  });
});

// DELETE /calendar/disconnect
router.delete("/disconnect", requireAuth, async (req, res) => {
  const connection = await prisma.calendarConnection.findUnique({ where: { userId: req.user.id } });
  if (!connection) return res.error("Google Calendar isn't connected.", 400);

  const oauth2Client = createOAuthClient();
  await oauth2Client.revokeToken(connection.refreshToken).catch(() => {});

  await prisma.$transaction([
    prisma.calendarSyncedEvent.deleteMany({ where: { userId: req.user.id } }),
    prisma.calendarConnection.delete({ where: { userId: req.user.id } }),
  ]);

  res.success({ disconnected: true });
});

// POST /calendar/sync — one-way push: StudyCircle sessions/tasks -> Google Calendar
router.post("/sync", requireAuth, async (req, res) => {
  const connection = await prisma.calendarConnection.findUnique({ where: { userId: req.user.id } });
  if (!connection) return res.error("Google Calendar isn't connected.", 400);

  const { oauth2Client, getRefreshedTokens } = clientForConnection(connection);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const reminders = eventReminders(connection.syncReminders);

  const items = [];

  if (connection.syncSessions) {
    const memberships = await prisma.membership.findMany({ where: { userId: req.user.id } });
    const groupIds = memberships.map((m) => m.groupId);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const sessions = await prisma.studySession.findMany({
      where: { groupId: { in: groupIds }, startTime: { gte: oneDayAgo } },
    });

    for (const session of sessions) {
      const start = new Date(session.startTime);
      const end = new Date(start.getTime() + session.durationMinutes * 60_000);

      items.push({
        sourceType: "SESSION",
        sourceId: session.id,
        event: {
          summary: session.title,
          description: [session.description, session.meetingLink].filter(Boolean).join("\n\n"),
          location: session.meetingLink || undefined,
          start: { dateTime: start.toISOString() },
          end: { dateTime: end.toISOString() },
          reminders,
        },
      });
    }
  }

  if (connection.syncAssignments) {
    const tasks = await prisma.task.findMany({
      where: { assignedTo: req.user.id, status: { in: ["TODO", "DOING"] } },
    });

    for (const task of tasks) {
      const dueDate = new Date(task.dueDate).toISOString().slice(0, 10);
      const nextDay = new Date(new Date(dueDate).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      items.push({
        sourceType: "TASK",
        sourceId: task.id,
        event: {
          summary: `Due: ${task.title}`,
          start: { date: dueDate },
          end: { date: nextDay },
          reminders,
        },
      });
    }
  }

  let syncedCount = 0;
  for (const item of items) {
    const mapping = await prisma.calendarSyncedEvent.findUnique({
      where: {
        userId_sourceType_sourceId: {
          userId: req.user.id,
          sourceType: item.sourceType,
          sourceId: item.sourceId,
        },
      },
    });

    try {
      if (mapping) {
        await calendar.events.update({
          calendarId: "primary",
          eventId: mapping.googleEventId,
          requestBody: item.event,
        });
      } else {
        const { data } = await calendar.events.insert({
          calendarId: "primary",
          requestBody: item.event,
        });
        await prisma.calendarSyncedEvent.create({
          data: {
            userId: req.user.id,
            sourceType: item.sourceType,
            sourceId: item.sourceId,
            googleEventId: data.id,
          },
        });
      }
      syncedCount += 1;
    } catch (err) {
      // The event may have been deleted on the Google side since we last
      // synced it — re-create it instead of failing the whole sync run.
      if (mapping && err.code === 404) {
        const { data } = await calendar.events.insert({
          calendarId: "primary",
          requestBody: item.event,
        });
        await prisma.calendarSyncedEvent.update({
          where: { id: mapping.id },
          data: { googleEventId: data.id },
        });
        syncedCount += 1;
      } else {
        console.error("Calendar sync failed for", item.sourceType, item.sourceId, err.message);
      }
    }
  }

  const refreshedTokens = getRefreshedTokens();
  await prisma.calendarConnection.update({
    where: { userId: req.user.id },
    data: {
      lastSyncedAt: new Date(),
      ...(refreshedTokens
        ? {
            accessToken: refreshedTokens.access_token || connection.accessToken,
            tokenExpiresAt: refreshedTokens.expiry_date
              ? new Date(refreshedTokens.expiry_date)
              : connection.tokenExpiresAt,
          }
        : {}),
    },
  });

  res.success({ syncedCount, lastSyncedAt: new Date() });
});

module.exports = router;
