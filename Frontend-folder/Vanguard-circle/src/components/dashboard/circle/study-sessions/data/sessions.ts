import type { Session } from "../types";

export const sessions: Session[] = [
  {
    id: "1",
    title: "Figma Auto Layout Deep Dive",
    description:
      "Learn how to build scalable layouts using Figma Auto Layout and best practices.",

    category: "UI Design",

    icon: "/icons/clock.svg",

    date: "May 25, 2026",

    time: "7:00 PM",

    meetingLink: "https://meet.google.com/session-1",

    status: "scheduled",
  },

  {
    id: "2",
    title: "Design System & Components",
    description:
      "Building reusable UI components and maintaining a scalable design system.",

    category: "UI Design",

    icon: "/icons/clock.svg",

    date: "May 27, 2026",

    time: "5:00 PM",

    meetingLink: "https://meet.google.com/session-2",

    status: "scheduled",
  },

  {
    id: "3",
    title: "UX Research Best Practices",
    description:
      "Understanding user interviews, personas, usability testing and research workflows.",

    category: "Research",

    icon: "/icons/code.svg",

    date: "May 30, 2026",

    time: "6:00 PM",

    meetingLink: "https://meet.google.com/session-3",

    status: "scheduled",
  },

  {
    id: "4",
    title: "Typography Principles",
    description:
      "Review typography hierarchy, spacing, readability and accessibility guidelines.",

    category: "UI Design",

    icon: "/icons/calendar.svg",

    date: "May 20, 2026",

    time: "7:00 PM",

    meetingLink: "",

    status: "missed",
  },

  {
    id: "5",
    title: "Color Theory & Accessibility",
    description:
      "Learn how to build accessible color systems and improve visual contrast.",

    category: "UI Design",

    icon: "/icons/calendar.svg",

    date: "May 18, 2026",

    time: "6:00 PM",

    meetingLink: "",

    status: "missed",
  },
];
