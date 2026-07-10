const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

// POST /groups/:groupId/checkins — daily check-in, scoped to this circle only
router.post("/:groupId/checkins", requireAuth, async (req, res) => {
  const { status } = req.body; // DONE | IN_PROGRESS | SKIPPED
  const { groupId } = req.params;
  const userId = req.user.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkIn = await prisma.checkIn.upsert({
    where: { userId_groupId_date: { userId, groupId, date: today } },
    update: { status },
    create: { userId, groupId, date: today, status },
  });

  // Update this circle's streak only — never touches streaks in other circles
  let streak = await prisma.streak.findUnique({ where: { userId_groupId: { userId, groupId } } });

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isConsecutive = streak?.lastCheckInDate &&
    new Date(streak.lastCheckInDate).toDateString() === yesterday.toDateString();

  const newStreakCount = status === "DONE" ? (isConsecutive ? (streak?.currentStreak || 0) + 1 : 1) : 0;

  streak = await prisma.streak.upsert({
    where: { userId_groupId: { userId, groupId } },
    update: { currentStreak: newStreakCount, lastCheckInDate: today },
    create: { userId, groupId, currentStreak: newStreakCount, lastCheckInDate: today },
  });

  res.success({ checkIn, streak });
});

module.exports = router;
