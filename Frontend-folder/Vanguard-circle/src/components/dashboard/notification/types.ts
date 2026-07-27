import type { IconType } from "react-icons";

export interface Notification {
  id: string;

  title: string;
  description: string;

  icon: IconType;

  iconBackground: string;
  iconColor: string;

  time: string;

  schedule?: string;

  read: boolean;

  disabled?: boolean;
}
