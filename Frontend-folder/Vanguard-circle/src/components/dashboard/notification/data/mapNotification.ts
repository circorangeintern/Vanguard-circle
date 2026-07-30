import { FiBell, FiUserPlus, FiVideo, FiClock } from "react-icons/fi";

import type { Notification } from "../types";

export interface RawNotification {
  id: string;
  payload: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

// Maps the backend's generic { payload, read, createdAt } shape onto the
// richer display shape (icon/colors/title/description) the notification UI
// was originally built against with mock data. Only "member_joined" exists as
// a real event today — anything else (future event types) falls back to a
// generic entry rather than crashing on an unrecognized payload shape.
export function mapNotification(raw: RawNotification): Notification {
  const payload = raw.payload as {
    type?: string;
    memberName?: string;
    groupName?: string;
    sessionTitle?: string;
    taskTitle?: string;
  };

  if (payload?.type === "member_joined") {
    return {
      id: raw.id,
      title: "New member joined",
      description: `${payload.memberName} joined ${payload.groupName}`,
      icon: FiUserPlus,
      iconBackground: "bg-blue-50",
      iconColor: "text-blue-600",
      time: formatTime(raw.createdAt),
      read: raw.read,
    };
  }

  if (payload?.type === "session_reminder") {
    return {
      id: raw.id,
      title: "Study session starting soon",
      description: `"${payload.sessionTitle}" in ${payload.groupName} is starting soon`,
      icon: FiVideo,
      iconBackground: "bg-green-50",
      iconColor: "text-green-600",
      time: formatTime(raw.createdAt),
      read: raw.read,
    };
  }

  if (payload?.type === "task_due_soon") {
    return {
      id: raw.id,
      title: "Assignment due soon",
      description: `"${payload.taskTitle}" in ${payload.groupName} is due soon`,
      icon: FiClock,
      iconBackground: "bg-amber-50",
      iconColor: "text-amber-600",
      time: formatTime(raw.createdAt),
      read: raw.read,
    };
  }

  return {
    id: raw.id,
    title: "New activity",
    description: "Something happened in one of your circles.",
    icon: FiBell,
    iconBackground: "bg-slate-50",
    iconColor: "text-slate-500",
    time: formatTime(raw.createdAt),
    read: raw.read,
  };
}
