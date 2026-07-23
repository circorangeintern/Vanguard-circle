const prisma = require("../config/prisma");

// Creates an in-app notification. Reuses the WEB_PUSH channel as the
// generic "in-app" bucket — this app has no push/WhatsApp/email delivery
// wired up yet, so payload is just read back by the frontend's bell dropdown.
async function notify(userId, payload) {
  return prisma.notification.create({
    data: { userId, channel: "WEB_PUSH", payload },
  });
}

module.exports = { notify };
