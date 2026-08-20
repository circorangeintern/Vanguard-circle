const { auth } = require("../config/firebase");
const prisma = require("../config/prisma");

// Verifies the Firebase ID token sent from the frontend (Authorization: Bearer <token>),
// then attaches the matching Postgres User row to req.user.
// Creates the Postgres row on first login if it doesn't exist yet.
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, data: null, error: "No auth token provided" });
  }

  try {
    const decoded = await auth.verifyIdToken(token);

    let user = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: decoded.uid,
          email: decoded.email,
          name: decoded.name || decoded.email.split("@")[0],
        },
      });
    }

    req.user = user;
    next();
  } catch (err) {
    // Logged because the client-facing message is deliberately generic
    // ("Invalid or expired token" covers wrong-project, expired, revoked,
    // and cert-fetch-network-failure alike) — without this, a genuine
    // config problem is indistinguishable from a stale token from the logs.
    console.error("Token verification failed:", err.code || err.name, "-", err.message);
    return res.status(401).json({ success: false, data: null, error: "Invalid or expired token" });
  }
}

module.exports = { requireAuth };
