require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { responseWrapper } = require("./middleware/response");
const groupRoutes = require("./routes/groups");
const taskRoutes = require("./routes/tasks");
const checkInRoutes = require("./routes/checkins");
const dashboardRoutes = require("./routes/dashboard");
const sessionRoutes = require("./routes/sessions");
const notificationRoutes = require("./routes/notifications");
const postRoutes = require("./routes/posts");
const calendarRoutes = require("./routes/calendar");
const uploadRoutes = require("./routes/uploads");
const { UPLOAD_DIR } = require("./middleware/upload");
const { startReminderScheduler } = require("./services/reminders");

const app = express();

// Needed so req.protocol reflects the real scheme (https) from the
// X-Forwarded-Proto header set by whatever reverse proxy sits in front of
// this process in production — otherwise uploaded file URLs would be built
// as http:// and get blocked as mixed content on the https frontend.
app.set("trust proxy", 1);

// Locked to known frontend origins instead of `cors()`'s "allow any site"
// default — that was fine while this was a single throwaway Render deploy,
// but wide-open CORS on a real API means any website in the world could
// make authenticated-looking requests from a logged-in user's browser.
// FRONTEND_URL (set per-environment) always gets an entry; the Render and
// local dev URLs stay allowed too during the studycircle.name.ng migration.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://studycircle.name.ng",
  "https://studycircle-vyo1.onrender.com",
  "http://localhost:5173",
  "http://localhost:4000",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // No Origin header at all (curl, Postman, server-to-server) — allow,
      // since there's no browser-cookie/session context to protect there.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());
app.use(responseWrapper);

app.get("/health", (req, res) => res.success({ status: "ok" }));

app.use("/groups", groupRoutes);
app.use("/groups", taskRoutes);   // /groups/:groupId/tasks
app.use("/groups", checkInRoutes); // /groups/:groupId/checkins
app.use("/groups", sessionRoutes); // /groups/:groupId/sessions
app.use("/groups", postRoutes); // /groups/:groupId/posts
app.use("/posts", postRoutes); // /posts/:id/like, /posts/:id/comments
app.use("/calendar", calendarRoutes); // /calendar/auth-url, /calendar/callback, /calendar/sync
app.use("/users", dashboardRoutes); // /users/me/dashboard
app.use("/users", notificationRoutes); // /users/me/notifications
app.use("/uploads", uploadRoutes); // POST /uploads — Resource post attachments
app.use("/uploads", express.static(UPLOAD_DIR)); // GET /uploads/<filename> — serves them back

// Unmatched routes — without this Express falls through to its default
// "Cannot GET /x" plain-text page, which the frontend's JSON parser then
// fails on and surfaces as a confusing "unexpected token" error.
app.use((req, res) => {
  res.error(`No route for ${req.method} ${req.originalUrl}`, 404);
});

// Catches anything thrown/rejected in a route handler (Express 5 forwards
// async rejections here automatically) so a DB hiccup or bug returns the
// same { success, data, error } JSON shape instead of Express's default
// HTML "Internal Server Error" page — which the frontend can't parse and
// which hides the real cause from Render's logs otherwise going unread.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.error("Something went wrong on our end. Please try again.", 500);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`StudyCircle backend running on port ${PORT}`);
  startReminderScheduler();
});
