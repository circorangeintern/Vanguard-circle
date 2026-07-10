const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

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

  res.success({ circles });
});

module.exports = router;
