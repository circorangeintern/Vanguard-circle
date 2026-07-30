const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

async function requireMembership(userId, groupId) {
  return prisma.membership.findUnique({
    where: { userId_groupId: { userId, groupId } },
  });
}

// POST /groups/:groupId/sessions — schedule a study session / group check-in
router.post("/:groupId/sessions", requireAuth, async (req, res) => {
  const { groupId } = req.params;
  const { title, startTime, description, durationMinutes, meetingLink } = req.body;

  if (!title || !startTime) return res.error("title and startTime are required");

  const membership = await requireMembership(req.user.id, groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const parsedStart = new Date(startTime);
  if (Number.isNaN(parsedStart.getTime())) return res.error("startTime is not a valid date");

  if (meetingLink) {
    try {
      new URL(meetingLink);
    } catch {
      return res.error("meetingLink must be a valid URL");
    }
  }

  const session = await prisma.studySession.create({
    data: {
      groupId,
      title,
      description: description || null,
      startTime: parsedStart,
      durationMinutes: Number.isFinite(durationMinutes) ? durationMinutes : 60,
      meetingLink: meetingLink || null,
      createdBy: req.user.id,
    },
  });

  res.success(session, 201);
});

// GET /groups/:groupId/sessions — sessions for one circle, recent past
// (for the "missed" tab) through all upcoming ones.
router.get("/:groupId/sessions", requireAuth, async (req, res) => {
  const { groupId } = req.params;

  const membership = await requireMembership(req.user.id, groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const sessions = await prisma.studySession.findMany({
    where: { groupId, startTime: { gte: oneDayAgo } },
    orderBy: { startTime: "asc" },
    take: 50,
  });

  res.success({ sessions });
});

module.exports = router;
