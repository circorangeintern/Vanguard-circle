import { FiBook, FiClipboard, FiFileText } from "react-icons/fi";

import type { Assignment, AssignmentStatus } from "../types";

export interface RawTask {
  id: string;
  title: string;
  dueDate: string;
  status: "TODO" | "DOING" | "DONE";
  groupId: string;
  groupName: string;
}

const STATUS_MAP: Record<RawTask["status"], AssignmentStatus> = {
  TODO: "todo",
  DOING: "progress",
  DONE: "completed",
};

const ICONS = [FiClipboard, FiBook, FiFileText];

function pickIcon(id: string) {
  // Deterministic per-task pick (not random) so a card doesn't change icon
  // on every re-render — just a bit of visual variety, no meaning attached.
  const index = id.charCodeAt(0) % ICONS.length;
  return ICONS[index];
}

function deadlineInfo(dueDate: Date, status: AssignmentStatus) {
  if (status === "completed") {
    return { label: "Completed", color: "text-emerald-600" };
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDue = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const dayDiff = Math.round((startOfDue.getTime() - startOfToday.getTime()) / 86400000);

  if (dayDiff < 0) return { label: "Overdue", color: "text-red-600" };
  if (dayDiff === 0) return { label: "Due Today", color: "text-orange-600" };
  if (dayDiff === 1) return { label: "Due Tomorrow", color: "text-amber-600" };
  if (dayDiff <= 7) return { label: `Due in ${dayDiff} days`, color: "text-slate-600" };
  return { label: "Upcoming", color: "text-slate-500" };
}

export function mapAssignment(raw: RawTask): Assignment {
  const status = STATUS_MAP[raw.status];
  const dueDate = new Date(raw.dueDate);
  const { label, color } = deadlineInfo(dueDate, status);
  const Icon = pickIcon(raw.id);

  return {
    id: raw.id,
    title: raw.title,
    circle: raw.groupName,
    groupId: raw.groupId,
    icon: Icon,
    iconBackground: "bg-violet-50",
    iconColor: "text-violet-600",
    status,
    deadlineLabel: label,
    deadlineColor: color,
    date: dueDate.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
  };
}
