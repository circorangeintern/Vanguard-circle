const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");
const { auth: firebaseAuth } = require("../config/firebase");

const router = express.Router();

// GET /users/me — current authenticated profile
router.get("/me", requireAuth, async (req, res) => {
  const circlesCount = await prisma.membership.count({ where: { userId: req.user.id } });
  res.success({ ...req.user, circlesCount });
});

// PATCH /users/me — update editable profile fields
router.patch("/me", requireAuth, async (req, res) => {
  const { name, avatarUrl } = req.body;
  if (name !== undefined && !name.trim()) return res.error("Name can't be empty");

  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      ...(name !== undefined ? { name: name.trim() } : {}),
      ...(avatarUrl !== undefined ? { avatarUrl } : {}),
    },
  });

  const circlesCount = await prisma.membership.count({ where: { userId: req.user.id } });
  res.success({ ...updated, circlesCount });
});

// DELETE /users/me — permanently deletes the account and everything tied to
// it. Circles this user organizes are fully cascade-deleted (there's no
// "transfer ownership" feature, and a circle with no organizer would be
// broken for everyone left in it) — circles they're just a member of are
// left intact for everyone else, with only this user's own data in them
// removed. FKs are RESTRICT (not CASCADE), so every dependent row has to be
// cleaned up explicitly, in dependency order, inside one transaction.
router.delete("/me", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const memberships = await prisma.membership.findMany({ where: { userId } });
  const organizerGroupIds = memberships.filter((m) => m.role === "ORGANIZER").map((m) => m.groupId);
  const memberGroupIds = memberships.filter((m) => m.role !== "ORGANIZER").map((m) => m.groupId);

  await prisma.$transaction(async (tx) => {
    // Unassign this user from any task anywhere first — cheap and avoids
    // having to special-case it per group below.
    await tx.task.updateMany({ where: { assignedTo: userId }, data: { assignedTo: null } });

    if (organizerGroupIds.length) {
      const orgPosts = await tx.post.findMany({
        where: { groupId: { in: organizerGroupIds } },
        select: { id: true },
      });
      const orgPostIds = orgPosts.map((p) => p.id);

      await tx.postLike.deleteMany({ where: { postId: { in: orgPostIds } } });
      await tx.postComment.deleteMany({ where: { postId: { in: orgPostIds } } });
      await tx.post.deleteMany({ where: { groupId: { in: organizerGroupIds } } });
      await tx.checkIn.deleteMany({ where: { groupId: { in: organizerGroupIds } } });
      await tx.streak.deleteMany({ where: { groupId: { in: organizerGroupIds } } });
      await tx.task.deleteMany({ where: { groupId: { in: organizerGroupIds } } });
      await tx.studySession.deleteMany({ where: { groupId: { in: organizerGroupIds } } });
      await tx.invitation.deleteMany({ where: { groupId: { in: organizerGroupIds } } });
      await tx.membership.deleteMany({ where: { groupId: { in: organizerGroupIds } } });
      await tx.group.deleteMany({ where: { id: { in: organizerGroupIds } } });
    }

    if (memberGroupIds.length) {
      await tx.checkIn.deleteMany({ where: { userId, groupId: { in: memberGroupIds } } });
      await tx.streak.deleteMany({ where: { userId, groupId: { in: memberGroupIds } } });

      const ownPosts = await tx.post.findMany({
        where: { authorId: userId, groupId: { in: memberGroupIds } },
        select: { id: true },
      });
      const ownPostIds = ownPosts.map((p) => p.id);
      await tx.postLike.deleteMany({ where: { postId: { in: ownPostIds } } });
      await tx.postComment.deleteMany({ where: { postId: { in: ownPostIds } } });
      await tx.post.deleteMany({ where: { id: { in: ownPostIds } } });

      await tx.membership.deleteMany({ where: { userId, groupId: { in: memberGroupIds } } });
    }

    // Anything left referencing this user directly — likes/comments on
    // OTHER people's posts in circles they're leaving, notifications,
    // calendar sync state. Must run last so nothing still references the
    // User row when it's deleted below.
    await tx.postLike.deleteMany({ where: { userId } });
    await tx.postComment.deleteMany({ where: { userId } });
    await tx.notification.deleteMany({ where: { userId } });
    await tx.calendarSyncedEvent.deleteMany({ where: { userId } });
    await tx.calendarConnection.deleteMany({ where: { userId } });

    await tx.user.delete({ where: { id: userId } });
  }, { timeout: 20_000 }); // default 5s isn't enough for this many sequential
  // deletes plus Neon's network latency, especially with several organized
  // circles — verified locally: this exact transaction blew the default
  // timeout on a single organized circle with only a handful of rows in it.

  // Delete the Firebase Auth account too — otherwise they could just log
  // back into the same account and it'd silently get recreated (the auth
  // middleware auto-creates a User row on first authenticated request).
  try {
    await firebaseAuth.deleteUser(req.user.firebaseUid);
  } catch (err) {
    // The app-side data is already gone, which is the part that actually
    // matters for "delete my account" — don't fail the request over this.
    console.error("Failed to delete Firebase auth user:", err.message);
  }

  res.success({ deleted: true });
});

// GET /users/me/dashboard — one overview across all circles the user belongs to
router.get("/me/dashboard", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: {
      group: {
        include: {
          streaks: { where: { userId } },
          checkIns: { where: { userId }, orderBy: { date: "desc" }, take: 1 },
          // Unfiltered by count so `tasksDueCount` below is exact, not just
          // the length of the capped `upcomingTasks` preview list.
          tasks: { where: { status: { not: "DONE" } }, orderBy: { dueDate: "asc" } },
          studySessions: { where: { startTime: { gte: new Date() } } },
          memberships: { include: { user: { select: { name: true } } } },
        },
      },
    },
  });

  const groupIds = memberships.map((m) => m.group.id);

  // Most recent check-in per circle, across ALL members — not just the
  // current user — to power a real "last active" label instead of a fake one.
  const recentCheckIns = groupIds.length
    ? await prisma.checkIn.findMany({
        where: { groupId: { in: groupIds } },
        orderBy: { date: "desc" },
        distinct: ["groupId"],
        select: { groupId: true, date: true },
      })
    : [];
  const lastActiveByGroup = Object.fromEntries(
    recentCheckIns.map((c) => [c.groupId, c.date]),
  );

  const circles = memberships.map((m) => ({
    groupId: m.group.id,
    role: m.role,
    name: m.group.name,
    courseName: m.group.courseName,
    description: m.group.description,
    icon: m.group.icon,
    streak: m.group.streaks[0]?.currentStreak || 0,
    checkedInToday: m.group.checkIns[0]?.date
      ? new Date(m.group.checkIns[0].date).toDateString() === new Date().toDateString()
      : false,
    upcomingTasks: m.group.tasks.slice(0, 3),
    tasksDueCount: m.group.tasks.length,
    sessionCount: m.group.studySessions.length,
    memberCount: m.group.memberships.length,
    memberNames: m.group.memberships.slice(0, 5).map((mem) => mem.user.name),
    lastActive: lastActiveByGroup[m.group.id] || m.group.createdAt,
    createdAt: m.group.createdAt,
  }));

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const todaySessions = groupIds.length
    ? await prisma.studySession.findMany({
        where: { groupId: { in: groupIds }, startTime: { gte: todayStart, lt: todayEnd } },
        include: { group: { select: { name: true } } },
        orderBy: { startTime: "asc" },
      })
    : [];

  res.success({
    circles,
    todayAgenda: todaySessions.map((s) => ({
      id: s.id,
      title: s.title,
      startTime: s.startTime,
      groupId: s.groupId,
      groupName: s.group.name,
    })),
  });
});

// GET /users/me/tasks — every task across every circle the user belongs to
// (the dashboard's `upcomingTasks` is intentionally capped to 3 non-DONE
// tasks per circle for the overview card; the Assignments page needs the
// complete, unfiltered list — including DONE — for its status tabs).
router.get("/me/tasks", requireAuth, async (req, res) => {
  const memberships = await prisma.membership.findMany({
    where: { userId: req.user.id },
    select: { groupId: true },
  });
  const groupIds = memberships.map((m) => m.groupId);

  const tasks = groupIds.length
    ? await prisma.task.findMany({
        where: { groupId: { in: groupIds } },
        include: { group: { select: { name: true } } },
        orderBy: { dueDate: "asc" },
      })
    : [];

  res.success({
    tasks: tasks.map((t) => ({
      id: t.id,
      title: t.title,
      dueDate: t.dueDate,
      status: t.status,
      groupId: t.groupId,
      groupName: t.group.name,
    })),
  });
});

module.exports = router;
