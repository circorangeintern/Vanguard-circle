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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`StudyCircle backend running on port ${PORT}`);
});
