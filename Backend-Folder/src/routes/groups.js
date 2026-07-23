const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

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

// GET /groups/invite/:inviteCode — public preview of a circle before joining.
// No auth required so a logged-out visitor (e.g. from a shared link/QR) can see
// what they're being invited to before we push them through signup/login.
router.get("/invite/:inviteCode", async (req, res) => {
  const group = await prisma.group.findUnique({
    where: { inviteCode: req.params.inviteCode },
    include: { memberships: true },
  });
  if (!group) return res.error("This invite link is invalid or has expired.", 404);

  res.success({
    id: group.id,
    name: group.name,
    courseName: group.courseName,
    description: group.description,
    icon: group.icon,
    visibility: group.visibility,
    memberCount: group.memberships.length,
    maxMembers: group.maxMembers,
  });
});

// POST /groups/:inviteCode/join — join a circle via invite link
router.post("/:inviteCode/join", requireAuth, async (req, res) => {
  const group = await prisma.group.findUnique({ where: { inviteCode: req.params.inviteCode } });
  if (!group) return res.error("This invite link is invalid or has expired.", 404);

  const existing = await prisma.membership.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: group.id } },
  });
  if (existing) {
    // Idempotent — someone re-clicking their own invite link should land
    // back in the circle, not see an error.
    return res.success({ group, membership: existing, alreadyMember: true });
  }

  if (group.maxMembers) {
    const memberCount = await prisma.membership.count({ where: { groupId: group.id } });
    if (memberCount >= group.maxMembers) return res.error("This circle is full.", 400);
  }

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

// PATCH /groups/:id — update circle settings (organizer only).
// Used by the "Settings" step of circle creation/edit, which runs after the
// circle already exists (created up-front so the invite link/QR are real).
router.patch("/:id", requireAuth, async (req, res) => {
  const group = await prisma.group.findUnique({ where: { id: req.params.id } });
  if (!group) return res.error("Circle not found", 404);

  const membership = await prisma.membership.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: group.id } },
  });
  if (!membership || membership.role !== "ORGANIZER") {
    return res.error("Only the circle organizer can update these settings.", 403);
  }

  const {
    name,
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
  } = req.body;

  const updated = await prisma.group.update({
    where: { id: group.id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(icon !== undefined ? { icon } : {}),
      ...(visibility !== undefined ? { visibility } : {}),
      ...(approval !== undefined ? { approval } : {}),
      ...(maxMembers !== undefined ? { maxMembers } : {}),
      ...(allowMemberInvites !== undefined ? { allowMemberInvites } : {}),
      ...(requireAdminApproval !== undefined ? { requireAdminApproval } : {}),
      ...(studyReminders !== undefined ? { studyReminders } : {}),
      ...(reminderFrequency !== undefined ? { reminderFrequency } : {}),
      ...(reminderTime !== undefined ? { reminderTime } : {}),
    },
  });

  res.success(updated);
});

// POST /groups/:id/invitations — invite more members to an existing circle.
router.post("/:id/invitations", requireAuth, async (req, res) => {
  const group = await prisma.group.findUnique({ where: { id: req.params.id } });
  if (!group) return res.error("Circle not found", 404);

  const membership = await prisma.membership.findUnique({
    where: { userId_groupId: { userId: req.user.id, groupId: group.id } },
  });
  if (!membership) return res.error("You're not a member of this circle.", 403);
  if (membership.role !== "ORGANIZER" && !group.allowMemberInvites) {
    return res.error("Only the organizer can invite members to this circle.", 403);
  }

  const emails = Array.isArray(req.body.emails)
    ? req.body.emails.filter((email) => typeof email === "string" && email.includes("@"))
    : [];
  if (!emails.length) return res.error("Provide at least one valid email address.");

  const invitations = await prisma.$transaction(
    emails.map((email) =>
      prisma.invitation.create({
        data: { groupId: group.id, invitedBy: req.user.id, email },
      }),
    ),
  );

  res.success({ invitations }, 201);
});

module.exports = router;
