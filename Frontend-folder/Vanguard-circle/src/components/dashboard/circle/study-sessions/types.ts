export type SessionStatus = "scheduled" | "missed";

export interface Session {
  id: string;

  title: string;

  description: string;

  category: string;

  icon: string;

  date: string;

  time: string;

  meetingLink: string;

  status: SessionStatus;
}
