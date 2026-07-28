import type { IconType } from "react-icons";

export interface Circle {
  id: string;

  name: string;

  category: string;

  description: string;

  members: number;

  memberAvatars: string[];

  tasksDue: number;

  studySessions: number;

  dayStreak: number;

  lastActive: string;

  icon: IconType;

  gradient: string;
}

export type ViewMode = "grid" | "list";

export type CircleCategory =
  | "All Circles"
  | "Design"
  | "Computer Science"
  | "Marketing"
  | "Engineering";
