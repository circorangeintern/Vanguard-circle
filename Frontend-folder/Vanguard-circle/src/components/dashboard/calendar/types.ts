import type { IconType } from "react-icons";

export interface SyncSetting {
  id: string;
  title: string;
  description: string;
  icon: IconType;

  enabled: boolean;

  disabled?: boolean;
}
