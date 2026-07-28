const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /users/me/notifications — most recent notifications + unread count
router.get("/me/notifications", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);

  res.success({ notifications, unreadCount });
});

// PATCH /users/me/notifications/read-all — mark every notification as read
router.patch("/me/notifications/read-all", requireAuth, async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, read: false },
    data: { read: true },
  });

  res.success({ ok: true });
});

// PATCH /users/me/notifications/:id/read — mark a single notification as read
router.patch("/me/notifications/:id/read", requireAuth, async (req, res) => {
  const notification = await prisma.notification.findUnique({ where: { id: req.params.id } });
  if (!notification || notification.userId !== req.user.id) {
    return res.error("Notification not found", 404);
  }

  const updated = await prisma.notification.update({
    where: { id: req.params.id },
    data: { read: true },
  });

  res.success(updated);
});

module.exports = router;
