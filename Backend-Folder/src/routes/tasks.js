const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// POST /groups/:groupId/tasks — add a task, optionally assigned to a member
router.post("/:groupId/tasks", requireAuth, async (req, res) => {
  const { title, dueDate, assignedTo } = req.body;
  if (!title || !dueDate) return res.error("title and dueDate are required");

  const task = await prisma.task.create({
    data: { groupId: req.params.groupId, title, dueDate: new Date(dueDate), assignedTo: assignedTo || null },
  });

  res.success(task, 201);
});

// PATCH /groups/:groupId/tasks/:id — update status or reassign
// (Was PATCH /:id, which mounted as PATCH /groups/:id — identical to the
// circle-settings PATCH in groups.js and registered after it, so Express
// never reached this handler at all; every request fell into the wrong route.)
router.patch("/:groupId/tasks/:id", requireAuth, async (req, res) => {
  const { status, assignedTo } = req.body;

  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: {
      ...(status && { status }),
      ...(assignedTo !== undefined && { assignedTo }),
    },
  });

  res.success(task);
});

module.exports = router;
