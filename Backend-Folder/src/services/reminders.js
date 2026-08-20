const prisma = require("../config/prisma");
const { notify } = require("./notify");
const { trackServerEvent } = require("./mixpanelServer");

const SESSION_REMINDER_WINDOW_MINUTES = 30;
const TASK_REMINDER_WINDOW_HOURS = 24;
const SCAN_INTERVAL_MS = 5 * 60 * 1000;

// Notifies every member of a circle once a scheduled session is starting
// soon. `reminderSentAt` is set right after so a session already reminded
// about never fires twice, even though it stays inside the "starting soon"
// window on every subsequent scan until it actually starts.
async function scanSessionReminders() {
  const now = new Date();
  const windowEnd = new Date(now.getTime() + SESSION_REMINDER_WINDOW_MINUTES * 60 * 1000);

  const dueSessions = await prisma.studySession.findMany({
    where: { startTime: { gte: now, lte: windowEnd }, reminderSentAt: null },
    include: { group: { include: { memberships: true } } },
  });

  for (const session of dueSessions) {
    await Promise.all(
      session.group.memberships.map((m) =>
        notify(m.userId, {
          type: "session_reminder",
          groupId: session.groupId,
          groupName: session.group.name,
          sessionId: session.id,
          sessionTitle: session.title,
          startTime: session.startTime,
          meetingLink: session.meetingLink,
        }),
      ),
    );
    await prisma.studySession.update({
      where: { id: session.id },
      data: { reminderSentAt: now },
    });
  }
}

// Fires the "session_missed" analytics event once per session whose end
// time has passed with nothing marking it attended — server-side, so it
// fires reliably regardless of whether anyone has the app open. Replaces
// an earlier frontend-only version that only counted a miss if a browser
// happened to have that session's card rendered at the right moment.
async function scanMissedSessions() {
  const now = new Date();

  const missedSessions = await prisma.studySession.findMany({
    where: {
      missedTrackedAt: null,
      startTime: { lt: now }, // cheap pre-filter; durationMinutes narrows further below
    },
    select: { id: true, groupId: true, createdBy: true, startTime: true, durationMinutes: true },
  });

  for (const session of missedSessions) {
    const endTime = new Date(session.startTime.getTime() + session.durationMinutes * 60_000);
    if (now < endTime) continue;

    await trackServerEvent("session_missed", session.createdBy, {
      circle_id: session.groupId,
    });
    await prisma.studySession.update({
      where: { id: session.id },
      data: { missedTrackedAt: now },
    });
  }
}

// Same idea for tasks — notifies the assigned member (or every circle member
// if the task is unassigned) once a non-DONE task enters its reminder
// window. A task can set its own `reminderDaysBefore` (from the "remind me
// before due" picker on the Add Task modal) — the default 24h window only
// applies when a task didn't set one. Since the window size varies per task,
// this can't be a single DB-level date range, so the upper bound is
// deliberately generous (7 days — the longest option the picker offers) and
// the real per-task window check happens in JS below.
const MAX_REMINDER_WINDOW_DAYS = 7;

async function scanTaskReminders() {
  const now = new Date();
  const windowEnd = new Date(now.getTime() + MAX_REMINDER_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const candidateTasks = await prisma.task.findMany({
    where: {
      dueDate: { gte: now, lte: windowEnd },
      status: { not: "DONE" },
      reminderSentAt: null,
    },
    include: { group: { include: { memberships: true } } },
  });

  const dueTasks = candidateTasks.filter((task) => {
    const windowHours =
      task.reminderDaysBefore != null
        ? task.reminderDaysBefore * 24
        : TASK_REMINDER_WINDOW_HOURS;
    const windowStart = new Date(task.dueDate.getTime() - windowHours * 60 * 60 * 1000);
    return now >= windowStart;
  });

  for (const task of dueTasks) {
    const recipients = task.assignedTo
      ? [task.assignedTo]
      : task.group.memberships.map((m) => m.userId);

    await Promise.all(
      recipients.map((userId) =>
        notify(userId, {
          type: "task_due_soon",
          groupId: task.groupId,
          groupName: task.group.name,
          taskId: task.id,
          taskTitle: task.title,
          dueDate: task.dueDate,
        }),
      ),
    );
    await prisma.task.update({
      where: { id: task.id },
      data: { reminderSentAt: now },
    });
  }
}

async function scanOnce() {
  try {
    await scanSessionReminders();
    await scanTaskReminders();
    await scanMissedSessions();
  } catch (err) {
    console.error("Reminder scan failed:", err);
  }
}

// Started once from server.js. A 5-minute poll is still "near real-time"
// enough for this app's needs (session/deadline reminders, not sub-second
// alerts) — true push would need a job queue or websocket infra this app
// doesn't have. Was 60s, but that never let Neon's serverless compute idle
// for more than a minute at a time, which (combined with two live backend
// deployments both running this same poll independently) was the dominant
// driver of burning through the free-tier monthly compute-hour cap.
function startReminderScheduler() {
  scanOnce();
  setInterval(scanOnce, SCAN_INTERVAL_MS);
}

module.exports = {
  startReminderScheduler,
  scanSessionReminders,
  scanTaskReminders,
  scanMissedSessions,
};
