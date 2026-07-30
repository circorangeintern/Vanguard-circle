const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

async function requireMembership(userId, groupId) {
  return prisma.membership.findUnique({
    where: { userId_groupId: { userId, groupId } },
  });
}

// POST /groups/:groupId/tasks — add a task, optionally assigned to a member
router.post("/:groupId/tasks", requireAuth, async (req, res) => {
  const { groupId } = req.params;
  const { title, dueDate, assignedTo } = req.body;
  if (!title || !dueDate) return res.error("title and dueDate are required");

  const membership = await requireMembership(req.user.id, groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const task = await prisma.task.create({
    data: { groupId, title, dueDate: new Date(dueDate), assignedTo: assignedTo || null },
  });

  res.success(task, 201);
});

// PATCH /groups/:groupId/tasks/:id — update status or reassign
// (Was PATCH /:id, which mounted as PATCH /groups/:id — identical to the
// circle-settings PATCH in groups.js and registered after it, so Express
// never reached this handler at all; every request fell into the wrong route.)
router.patch("/:groupId/tasks/:id", requireAuth, async (req, res) => {
  const { groupId, id } = req.params;
  const { status, assignedTo } = req.body;

  const membership = await requireMembership(req.user.id, groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(assignedTo !== undefined && { assignedTo }),
    },
  });

  res.success(task);
});

// DELETE /groups/:groupId/tasks/:id
router.delete("/:groupId/tasks/:id", requireAuth, async (req, res) => {
  const { groupId, id } = req.params;

  const membership = await requireMembership(req.user.id, groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  await prisma.task.delete({ where: { id } }).catch(() => {
    // Already gone — deleting a task twice should still read as success.
  });
  res.success({ deleted: true });
});

module.exports = router;
