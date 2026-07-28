import {
  FiBook,
  FiCheckSquare,
  FiCode,
  FiDatabase,
  FiEdit3,
  FiFileText,
  FiStar,
} from "react-icons/fi";

import type { Assignment } from "../types";

export const INITIAL_ASSIGNMENTS: ReadonlyArray<Assignment> = [
  {
    id: "1",
    title: "UI/UX Case Study Presentation",
    circle: "Design Circle",

    icon: FiFileText,
    iconBackground: "bg-violet-50",
    iconColor: "text-violet-600",

    status: "todo",

    deadlineLabel: "Due Tomorrow",
    deadlineColor: "text-red-500",

    date: "May 24, 2026",
  },

  {
    id: "2",
    title: "Database Normalization",
    circle: "Database Systems",

    icon: FiDatabase,
    iconBackground: "bg-orange-50",
    iconColor: "text-orange-500",

    status: "progress",

    deadlineLabel: "Due in 2 days",
    deadlineColor: "text-orange-500",

    date: "May 25, 2026",
  },

  {
    id: "3",
    title: "Marketing Strategy Report",
    circle: "Marketing 300",

    icon: FiEdit3,
    iconBackground: "bg-emerald-50",
    iconColor: "text-emerald-500",

    status: "todo",

    deadlineLabel: "Due in 4 days",
    deadlineColor: "text-slate-700",

    date: "May 27, 2026",
  },

  {
    id: "4",
    title: "Algorithm Analysis",
    circle: "CS 302 Circle",

    icon: FiCode,
    iconBackground: "bg-red-50",
    iconColor: "text-red-500",

    status: "progress",

    deadlineLabel: "Due May 30",
    deadlineColor: "text-slate-700",

    date: "May 30, 2026",
  },

  {
    id: "5",
    title: "Research Paper Outline",
    circle: "Research Methods",

    icon: FiBook,
    iconBackground: "bg-emerald-50",
    iconColor: "text-emerald-500",

    status: "todo",

    deadlineLabel: "Due Jun 2",
    deadlineColor: "text-slate-700",

    date: "Jun 2, 2026",
  },

  {
    id: "6",
    title: "Group Project Proposal",
    circle: "Design Circle",

    icon: FiCheckSquare,
    iconBackground: "bg-violet-50",
    iconColor: "text-violet-600",

    status: "completed",

    deadlineLabel: "Completed",
    deadlineColor: "text-emerald-500",

    date: "May 20, 2026",
  },

  {
    id: "7",
    title: "Weekly Reflection",
    circle: "Personal",

    icon: FiStar,
    iconBackground: "bg-amber-50",
    iconColor: "text-amber-500",

    status: "completed",

    deadlineLabel: "Completed",
    deadlineColor: "text-emerald-500",

    date: "May 18, 2026",
  },
] as const;
