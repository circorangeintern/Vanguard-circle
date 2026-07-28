import type { IconType } from "react-icons";

export type AssignmentStatus = "todo" | "progress" | "completed";

export interface Assignment {
  id: string;

  title: string;
  circle: string;

  icon: IconType;

  iconBackground: string;
  iconColor: string;

  status: AssignmentStatus;

  deadlineLabel: string;
  deadlineColor: string;

  date: string;

  disabled?: boolean;
}
