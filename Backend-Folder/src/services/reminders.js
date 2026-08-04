const prisma = require("../config/prisma");
const { notify } = require("./notify");

const SESSION_REMINDER_WINDOW_MINUTES = 30;
const TASK_REMINDER_WINDOW_HOURS = 24;
const SCAN_INTERVAL_MS = 60 * 1000;

// Notifies every member of a circle once a scheduled session is starting
// soon. `reminderSentAt` is set right after so a session already reminded
// about never fires twice, even though it stays inside the "starting soon"
// window on every subsequent scan until it actually starts.
async function scanSessionReminders() {
  const now = new Date();
  const windowEnd = new Date(now.getTime() + SESSION_REMINDER_WINDOW_MINUTES * 60 * 1000);

  const dueSessions = await prisma.studySession.findMany({
    where: { startTime: { gte: now, lte: windowEnd }, reminderSentAt: null },
    include: { group: { include: { memberships: true } } },
  });

  for (const session of dueSessions) {
    await Promise.all(
      session.group.memberships.map((m) =>
        notify(m.userId, {
          type: "session_reminder",
          groupId: session.groupId,
          groupName: session.group.name,
          sessionId: session.id,
          sessionTitle: session.title,
          startTime: session.startTime,
          meetingLink: session.meetingLink,
        }),
      ),
    );
    await prisma.studySession.update({
      where: { id: session.id },
      data: { reminderSentAt: now },
    });
  }
}

// Same idea for tasks — notifies the assigned member (or every circle member
// if the task is unassigned) once a non-DONE task enters its reminder
// window. A task can set its own `reminderDaysBefore` (from the "remind me
// before due" picker on the Add Task modal) — the default 24h window only
// applies when a task didn't set one. Since the window size varies per task,
// this can't be a single DB-level date range, so the upper bound is
// deliberately generous (7 days — the longest option the picker offers) and
// the real per-task window check happens in JS below.
const MAX_REMINDER_WINDOW_DAYS = 7;

async function scanTaskReminders() {
  const now = new Date();
  const windowEnd = new Date(now.getTime() + MAX_REMINDER_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  const candidateTasks = await prisma.task.findMany({
    where: {
      dueDate: { gte: now, lte: windowEnd },
      status: { not: "DONE" },
      reminderSentAt: null,
    },
    include: { group: { include: { memberships: true } } },
  });

  const dueTasks = candidateTasks.filter((task) => {
    const windowHours =
      task.reminderDaysBefore != null
        ? task.reminderDaysBefore * 24
        : TASK_REMINDER_WINDOW_HOURS;
    const windowStart = new Date(task.dueDate.getTime() - windowHours * 60 * 60 * 1000);
    return now >= windowStart;
  });

  for (const task of dueTasks) {
    const recipients = task.assignedTo
      ? [task.assignedTo]
      : task.group.memberships.map((m) => m.userId);

    await Promise.all(
      recipients.map((userId) =>
        notify(userId, {
          type: "task_due_soon",
          groupId: task.groupId,
          groupName: task.group.name,
          taskId: task.id,
          taskTitle: task.title,
          dueDate: task.dueDate,
        }),
      ),
    );
    await prisma.task.update({
      where: { id: task.id },
      data: { reminderSentAt: now },
    });
  }
}

async function scanOnce() {
  try {
    await scanSessionReminders();
    await scanTaskReminders();
  } catch (err) {
    console.error("Reminder scan failed:", err);
  }
}

// Started once from server.js. A 60s poll interval is "near real-time" for
// this app's needs (session/deadline reminders, not sub-second alerts) —
// true push would need a job queue or websocket infra this app doesn't have.
function startReminderScheduler() {
  scanOnce();
  setInterval(scanOnce, SCAN_INTERVAL_MS);
}

module.exports = { startReminderScheduler, scanSessionReminders, scanTaskReminders };
