const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /users/me — current authenticated profile
router.get("/me", requireAuth, async (req, res) => {
  res.success(req.user);
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
          tasks: { where: { status: { not: "DONE" } }, orderBy: { dueDate: "asc" }, take: 3 },
        },
      },
    },
  });

  const circles = memberships.map((m) => ({
    groupId: m.group.id,
    name: m.group.name,
    courseName: m.group.courseName,
    streak: m.group.streaks[0]?.currentStreak || 0,
    checkedInToday: m.group.checkIns[0]?.date
      ? new Date(m.group.checkIns[0].date).toDateString() === new Date().toDateString()
      : false,
    upcomingTasks: m.group.tasks,
  }));

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const groupIds = memberships.map((m) => m.group.id);
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

module.exports = router;
