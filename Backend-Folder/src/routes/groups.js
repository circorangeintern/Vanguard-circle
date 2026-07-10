const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const prisma = new PrismaClient();

// POST /groups — create a new circle
router.post("/", requireAuth, async (req, res) => {
  const { name, courseName } = req.body;
  if (!name || !courseName) return res.error("name and courseName are required");

  const inviteCode = Math.random().toString(36).slice(2, 9);

  const group = await prisma.group.create({
    data: { name, courseName, inviteCode, createdBy: req.user.id },
  });

  await prisma.membership.create({
    data: { userId: req.user.id, groupId: group.id, role: "ORGANIZER" },
  });

  res.success(group, 201);
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
