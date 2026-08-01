import { FiBell, FiCalendar, FiClipboard } from "react-icons/fi";

import type { CalendarSyncSettings } from "../types";

export interface SyncSettingMeta {
  id: string;
  key: keyof CalendarSyncSettings;
  title: string;
  description: string;
  icon: typeof FiCalendar;
}

export const SYNC_SETTINGS_META: ReadonlyArray<SyncSettingMeta> = [
  {
    id: "sessions",
    key: "syncSessions",
    title: "Study Sessions",
    description: "Sync all your study sessions and scheduled meetings.",
    icon: FiCalendar,
  },
  {
    id: "assignments",
    key: "syncAssignments",
    title: "Assignments & Deadlines",
    description: "Sync assignment due dates and deadlines.",
    icon: FiClipboard,
  },
  {
    id: "reminders",
    key: "syncReminders",
    title: "Reminders",
    description: "Add a 30-minute popup reminder to synced events (otherwise uses your Google Calendar default).",
    icon: FiBell,
  },
] as const;
