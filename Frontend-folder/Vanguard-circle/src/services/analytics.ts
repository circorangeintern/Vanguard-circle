import mixpanel from "../lib/mixpanel";

export interface CircleCreatedPayload {
  circleName: string;
  category: string;
  visibility: "public" | "private";
}

export const trackCircleCreated = (payload: CircleCreatedPayload) => {
  mixpanel.track("circle_created", {
    circle_name: payload.circleName,
    category: payload.category,
    visibility: payload.visibility,
  });
};

export interface DailyCheckinPayload {
  streak: number;
}

export const trackDailyCheckin = (payload: DailyCheckinPayload) => {
  mixpanel.track("daily_checkin_completed", {
    streak: payload.streak,
  });
};
