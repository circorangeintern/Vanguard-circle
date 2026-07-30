export type SessionStatus = "scheduled" | "missed";

export interface Session {
  id: string;
  title: string;
  description: string;
  category: string;
  startTime: string; // ISO — the countdown/status is derived from this, not a static field
  durationMinutes: number;
  meetingLink: string | null;
}
