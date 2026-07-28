import { FiBell, FiCalendar, FiClipboard } from "react-icons/fi";

import type { SyncSetting } from "../types";

export const INITIAL_SYNC_SETTINGS: ReadonlyArray<SyncSetting> = [
  {
    id: "sessions",
    title: "Study Sessions",
    description: "Sync all your study sessions and scheduled meetings.",
    icon: FiCalendar,
    enabled: true,
  },
  {
    id: "assignments",
    title: "Assignments & Deadlines",
    description: "Sync assignment due dates and deadlines.",
    icon: FiClipboard,
    enabled: true,
  },
  {
    id: "reminders",
    title: "Reminders",
    description: "Sync reminders and notifications.",
    icon: FiBell,
    enabled: false,
  },
] as const;
