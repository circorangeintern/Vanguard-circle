require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { responseWrapper } = require("./middleware/response");
const groupRoutes = require("./routes/groups");
const taskRoutes = require("./routes/tasks");
const checkInRoutes = require("./routes/checkins");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());
app.use(responseWrapper);

app.get("/health", (req, res) => res.success({ status: "ok" }));

app.use("/groups", groupRoutes);
app.use("/groups", taskRoutes);   // /groups/:groupId/tasks
app.use("/groups", checkInRoutes); // /groups/:groupId/checkins
app.use("/users", dashboardRoutes); // /users/me/dashboard

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
});
