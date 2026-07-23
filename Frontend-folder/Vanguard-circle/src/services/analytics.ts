import mixpanel from "../lib/mixpanel";

export interface SignupPayload {
  method: "email" | "google";
  userId?: string;
  email?: string;
}

// Ties subsequent autocapture/custom events to a real person instead of an
// anonymous device id, and fires the named "Signup" event the dashboard was
// missing (it only ever showed [Auto] Page View / [Auto] Element Click).
export const trackSignup = (payload: SignupPayload) => {
  if (payload.userId) {
    mixpanel.identify(payload.userId);
    if (payload.email) mixpanel.people.set({ $email: payload.email });
  }
  mixpanel.track("Signup", { method: payload.method });
};

export interface LoginPayload {
  method: "email" | "google";
  userId?: string;
}

export const trackLogin = (payload: LoginPayload) => {
  if (payload.userId) mixpanel.identify(payload.userId);
  mixpanel.track("Login", { method: payload.method });
};

export const trackCircleJoined = (payload: { circleId: string; circleName: string }) => {
  mixpanel.track("Circle Joined", {
    circle_id: payload.circleId,
    circle_name: payload.circleName,
  });
};

export interface CircleCreatedPayload {
  circleName: string;
  category: string;
  visibility: "public" | "private";
}

export const trackCircleCreated = (payload: CircleCreatedPayload) => {
  mixpanel.track("Circle Created", {
    circle_name: payload.circleName,
    category: payload.category,
    visibility: payload.visibility,
  });
};

export interface DailyCheckinPayload {
  streak: number;
}

export const trackDailyCheckin = (payload: DailyCheckinPayload) => {
  mixpanel.track("Daily Check-in", {
    streak: payload.streak,
  });
};
