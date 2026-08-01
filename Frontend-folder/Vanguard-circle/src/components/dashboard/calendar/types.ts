import type { IconType } from "react-icons";

export interface SyncSetting {
  id: string;
  title: string;
  description: string;
  icon: IconType;

  enabled: boolean;

  disabled?: boolean;
}

export interface CalendarSyncSettings {
  syncSessions: boolean;
  syncAssignments: boolean;
  syncReminders: boolean;
}

export interface CalendarStatus {
  connected: boolean;
  email?: string;
  connectedAt?: string;
  lastSyncedAt?: string | null;
  settings?: CalendarSyncSettings;
}
