const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /users/me — current authenticated profile
router.get("/me", requireAuth, async (req, res) => {
  const circlesCount = await prisma.membership.count({ where: { userId: req.user.id } });
  res.success({ ...req.user, circlesCount });
});

// PATCH /users/me — update editable profile fields
router.patch("/me", requireAuth, async (req, res) => {
  const { name } = req.body;
  if (name !== undefined && !name.trim()) return res.error("Name can't be empty");

  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      ...(name !== undefined ? { name: name.trim() } : {}),
    },
  });

  const circlesCount = await prisma.membership.count({ where: { userId: req.user.id } });
  res.success({ ...updated, circlesCount });
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
