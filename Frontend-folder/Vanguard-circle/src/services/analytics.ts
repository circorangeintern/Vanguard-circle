import mixpanel from "../lib/mixpanel";

export interface SignupPayload {
  method: "email" | "google";
  userId?: string;
  email?: string;
  institutionType?: string;
  level?: string;
}

// Ties subsequent autocapture/custom events to a real person instead of an
// anonymous device id, and fires "sign_up_completed" per the analytics event
// tracking plan (event name + institution_type/level properties are exact).
export const trackSignup = (payload: SignupPayload) => {
  if (payload.userId) {
    mixpanel.identify(payload.userId);
    if (payload.email) mixpanel.people.set({ $email: payload.email });
  }
  mixpanel.track("sign_up_completed", {
    method: payload.method,
    institution_type: payload.institutionType,
    level: payload.level,
  });
};

export interface LoginPayload {
  method: "email" | "google";
  userId?: string;
}

// "sign_in_completed" — matches the sign_up_completed naming convention
// (was "Login", inconsistent with every other event in the plan).
export const trackLogin = (payload: LoginPayload) => {
  if (payload.userId) mixpanel.identify(payload.userId);
  mixpanel.track("sign_in_completed", { method: payload.method });
};

// "circle_joined" — fires when a student joins an existing circle. Was
// "study_group_joined" — renamed to match the naming convention actually
// agreed on with the team (circle_*, not study_group_*).
export const trackCircleJoined = (payload: { circleId: string; circleName: string }) => {
  mixpanel.track("circle_joined", {
    circle_id: payload.circleId,
    circle_name: payload.circleName,
  });
};

export interface CircleCreatedPayload {
  circleName: string;
  category: string;
  visibility: "public" | "private";
  circleSize: number;
}

// "circle_created" — fires when a student starts a new circle. Was
// "study_group_created" — renamed to match the naming convention actually
// agreed on with the team (circle_*, not study_group_*).
export const trackCircleCreated = (payload: CircleCreatedPayload) => {
  mixpanel.track("circle_created", {
    circle_name: payload.circleName,
    course: payload.category,
    visibility: payload.visibility,
    circle_size: payload.circleSize,
  });
};

// "reminder_channel_selected" — fires when a student picks how they want
// study reminders delivered (In-App, Email, WhatsApp, or SMS). Only In-App
// and Email are actually delivered today — WhatsApp/SMS are selectable and
// tracked, but there's no Twilio (or similar) integration wired up yet to
// actually send those.
export const trackReminderChannelSelected = (payload: { channel: string }) => {
  mixpanel.track("reminder_channel_selected", {
    // The stored value is the backend enum (IN_APP/EMAIL/WHATSAPP/SMS,
    // uppercase to match Prisma's ReminderChannel) — lowercased here so it
    // matches every other event's snake_case property convention.
    channel: payload.channel.toLowerCase(),
  });
};

// "deadline_reminder_set" — fires when a student sets a reminder for an
// assignment's due date (the "remind me N days before due" picker on Add Task).
export const trackDeadlineReminderSet = (payload: { daysBeforeDue: number }) => {
  mixpanel.track("deadline_reminder_set", {
    days_before_due: payload.daysBeforeDue,
  });
};

export interface DailyCheckinPayload {
  streakCount: number;
}

// "daily_checkin_completed" — fires when a student marks their daily check-in done.
export const trackDailyCheckin = (payload: DailyCheckinPayload) => {
  mixpanel.track("daily_checkin_completed", {
    streak_count: payload.streakCount,
  });
};

// "session_scheduled" — fires when a circle schedules a study session.
export const trackSessionScheduled = (payload: {
  circleId: string;
  title: string;
  methodUsed: "virtual" | "in_person";
}) => {
  mixpanel.track("session_scheduled", {
    circle_id: payload.circleId,
    title: payload.title,
    method_used: payload.methodUsed,
  });
};

// "session_missed" is NOT fired from here — it fires from the backend's
// reminder scanner (Backend-Folder/src/services/reminders.js /
// mixpanelServer.js) instead. Firing it from a session card only counted a
// miss if a browser happened to have that card open at the moment it
// crossed into "missed," which undercounted almost every real one; the
// backend's 60s poll catches every session regardless of who's online.

// "task_board_item_added" — fires when a student adds an item to the shared
// task board. due_date wasn't in the original plan's property list but was
// missing entirely from the event, which made it useless for anyone looking
// at deadline patterns on the task board.
export const trackTaskAdded = (payload: { circleId: string; dueDate: string }) => {
  mixpanel.track("task_board_item_added", {
    circle_id: payload.circleId,
    due_date: payload.dueDate,
  });
};

export const trackNotificationOpened = (payload: { unreadCount: number }) => {
  mixpanel.track("Notification Opened", {
    unread_count: payload.unreadCount,
  });
};

export const trackSearch = (payload: { query: string; resultCount: number }) => {
  mixpanel.track("Search", {
    query: payload.query,
    result_count: payload.resultCount,
  });
};

export const trackMemberInvited = (payload: {
  circleId: string;
  inviteCount: number;
}) => {
  mixpanel.track("Member Invited", {
    circle_id: payload.circleId,
    invite_count: payload.inviteCount,
  });
};
