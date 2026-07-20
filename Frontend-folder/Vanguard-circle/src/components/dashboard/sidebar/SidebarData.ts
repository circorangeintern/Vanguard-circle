import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import type { IconType } from "react-icons";

export interface SidebarItem {
  label: string;
  path: string;
  icon: IconType;
}

export const mainNavigation: SidebarItem[] = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: HiOutlineHome,
  },
  {
    label: "My Circles",
    path: "/dashboard/circles",
    icon: HiOutlineUserGroup,
  },
  {
    label: "Calendar",
    path: "/dashboard/calendar",
    icon: HiOutlineCalendarDays,
  },
  {
    label: "Assignments",
    path: "/dashboard/assignments",
    icon: HiOutlineDocumentText,
  },
  {
    label: "Notifications",
    path: "/dashboard/notifications",
    icon: HiOutlineBell,
  },
];

export const secondaryNavigation: SidebarItem[] = [
  {
    label: "Settings",
    path: "/dashboard/settings",
    icon: HiOutlineCog6Tooth,
  },
  {
    label: "Help",
    path: "/dashboard/help",
    icon: HiOutlineQuestionMarkCircle,
  },
  {
    label: "Logout",
    path: "/logout",
    icon: HiOutlineArrowRightOnRectangle,
  },
];
