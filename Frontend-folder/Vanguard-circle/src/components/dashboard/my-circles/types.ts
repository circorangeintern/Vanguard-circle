export interface Circle {
  id: string;

  name: string;

  category: string;

  description: string;

  members: number;

  memberNames: string[];

  tasksDue: number;

  studySessions: number;

  dayStreak: number;

  lastActive: string;
  lastActiveAt: string;
  createdAt: string;

  icon: string;

  gradient: string;
}

export type ViewMode = "grid" | "list";

export type CircleCategory =
  | "All Circles"
  | "Design"
  | "Computer Science"
  | "Marketing"
  | "Engineering";
