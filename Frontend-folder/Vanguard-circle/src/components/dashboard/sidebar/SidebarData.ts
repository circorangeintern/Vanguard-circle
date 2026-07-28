import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineBell,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import { PiUserCircleMinusLight } from "react-icons/pi";

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
    path: "/my-circles",
    icon: HiOutlineUserGroup,
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: HiOutlineCalendarDays,
  },
  {
    label: "Assignments",
    path: "/assignments",
    icon: HiOutlineDocumentText,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: HiOutlineBell,
  },
];

export const secondaryNavigation: SidebarItem[] = [
  {
    label: "Profile",
    path: "/profile",
    icon: PiUserCircleMinusLight,
  },
  {
    label: "Help",
    path: "/help",
    icon: HiOutlineQuestionMarkCircle,
  },
  {
    label: "Logout",
    path: "/logout",
    icon: HiOutlineArrowRightOnRectangle,
  },
];
