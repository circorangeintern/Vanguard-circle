const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

// POST /groups — create a new circle
router.post("/", requireAuth, async (req, res) => {
  const {
    name,
    courseName,
    category,
    description,
    icon,
    visibility,
    approval,
    maxMembers,
    allowMemberInvites,
    requireAdminApproval,
    studyReminders,
    reminderFrequency,
    reminderTime,
    members,
  } = req.body;

  const resolvedCourseName = courseName || category;
  if (!name || !resolvedCourseName) return res.error("name and courseName are required");

  const inviteCode = Math.random().toString(36).slice(2, 9);

  const invitations = Array.isArray(members)
    ? members
        .filter((member) => member?.email)
        .map((member) => ({
          invitedBy: req.user.id,
          email: member.email,
        }))
    : [];

  const group = await prisma.group.create({
    data: {
      name,
      courseName: resolvedCourseName,
      description,
      icon,
      visibility,
      approval,
      maxMembers,
      allowMemberInvites,
      requireAdminApproval,
      studyReminders,
      reminderFrequency,
      reminderTime,
      inviteCode,
      createdBy: req.user.id,
      invitations: invitations.length > 0 ? { create: invitations } : undefined,
    },
    include: {
      invitations: true,
    },
  });

  await prisma.membership.create({
    data: { userId: req.user.id, groupId: group.id, role: "ORGANIZER" },
  });

  const inviteLink = `${process.env.FRONTEND_URL || "https://studycircle.app"}/invite/${inviteCode}`;

  res.success({ group, inviteLink }, 201);
});

// POST /groups/:inviteCode/join — join a circle via invite link
router.post("/:inviteCode/join", requireAuth, async (req, res) => {
  const group = await prisma.group.findUnique({ where: { inviteCode: req.params.inviteCode } });
  if (!group) return res.error("Invalid invite code", 404);

  const existing = await prisma.membership.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: group.id } },
  });
  if (existing) return res.error("Already a member of this circle");

  const membership = await prisma.membership.create({
    data: { userId: req.user.id, groupId: group.id, role: "MEMBER" },
  });

  res.success({ group, membership }, 201);
});

// GET /groups/:id — single circle workspace
router.get("/:id", requireAuth, async (req, res) => {
  const group = await prisma.group.findUnique({
    where: { id: req.params.id },
    include: { tasks: true, memberships: { include: { user: true } } },
  });
  if (!group) return res.error("Circle not found", 404);

  res.success(group);
});

module.exports = router;
