import type { Circle } from "../types";
import { resolveCircleIcon } from "../../../../lib/circleIcon";

export interface RawDashboardCircle {
  groupId: string;
  role: "ORGANIZER" | "MEMBER";
  name: string;
  courseName?: string;
  description?: string | null;
  icon?: string | null;
  streak: number;
  checkedInToday: boolean;
  tasksDueCount: number;
  sessionCount: number;
  memberCount: number;
  memberNames: string[];
  lastActive: string;
  createdAt: string;
}

// Deterministic (not random) so a card's color doesn't change on re-render —
// picked from the circle's own id, same trick used for assignment icons.
const GRADIENTS = [
  "from-violet-600 via-purple-600 to-indigo-600",
  "from-blue-600 via-blue-500 to-indigo-600",
  "from-emerald-600 via-green-500 to-teal-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-pink-600 via-rose-500 to-red-500",
];

function pickGradient(id: string) {
  const index = id.charCodeAt(0) % GRADIENTS.length;
  return GRADIENTS[index];
}

function formatLastActive(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / 3_600_000);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function mapCircle(raw: RawDashboardCircle): Circle {
  return {
    id: raw.groupId,
    role: raw.role,
    name: raw.name,
    category: raw.courseName || "General",
    description: raw.description || "No description yet.",
    members: raw.memberCount,
    memberNames: raw.memberNames,
    tasksDue: raw.tasksDueCount,
    studySessions: raw.sessionCount,
    dayStreak: raw.streak,
    lastActive: formatLastActive(raw.lastActive),
    lastActiveAt: raw.lastActive,
    createdAt: raw.createdAt,
    icon: resolveCircleIcon(raw.icon),
    gradient: pickGradient(raw.groupId),
  };
}
