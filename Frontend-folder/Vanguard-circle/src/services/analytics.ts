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

// "study_group_joined" — fires when a student joins an existing circle.
export const trackCircleJoined = (payload: { circleId: string; circleName: string }) => {
  mixpanel.track("study_group_joined", {
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

// "study_group_created" — fires when a student starts a new circle.
export const trackCircleCreated = (payload: CircleCreatedPayload) => {
  mixpanel.track("study_group_created", {
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
    channel: payload.channel,
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

// "session_missed" — fires once when a scheduled session's end time passes
// with nothing marking it as attended. `reason` is optional per the plan —
// there's no UI to collect one, so it's always omitted for now.
export const trackSessionMissed = (payload: { circleId: string; reason?: string }) => {
  mixpanel.track("session_missed", {
    circle_id: payload.circleId,
    ...(payload.reason ? { reason: payload.reason } : {}),
  });
};

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
