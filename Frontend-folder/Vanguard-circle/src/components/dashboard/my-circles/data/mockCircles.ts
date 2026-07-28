import { FiCode, FiEdit3, FiSend } from "react-icons/fi";

import type { Circle } from "../types";

export const mockCircles: Circle[] = [
  {
    id: "1",

    name: "Design Circle",

    category: "Design",

    description:
      "A space for learning and discussing UI/UX design principles and best practices.",

    members: 8,

    memberAvatars: [
      "https://i.pravatar.cc/100?img=11",
      "https://i.pravatar.cc/100?img=12",
      "https://i.pravatar.cc/100?img=13",
      "https://i.pravatar.cc/100?img=14",
      "https://i.pravatar.cc/100?img=15",
    ],

    tasksDue: 4,

    studySessions: 2,

    dayStreak: 12,

    lastActive: "2h ago",

    icon: FiEdit3,

    gradient: "from-violet-600 via-purple-600 to-indigo-600",
  },

  {
    id: "2",

    name: "Marketing Circle",

    category: "Marketing",

    description:
      "Collaborate on marketing strategies, campaigns and case studies.",

    members: 6,

    memberAvatars: [
      "https://i.pravatar.cc/100?img=16",
      "https://i.pravatar.cc/100?img=17",
      "https://i.pravatar.cc/100?img=18",
      "https://i.pravatar.cc/100?img=19",
      "https://i.pravatar.cc/100?img=20",
    ],

    tasksDue: 2,

    studySessions: 1,

    dayStreak: 8,

    lastActive: "5h ago",

    icon: FiSend,

    gradient: "from-blue-600 via-blue-500 to-indigo-600",
  },

  {
    id: "3",

    name: "CS 302 Circle",

    category: "Computer Science",

    description:
      "Study programming concepts, algorithms and data structures together.",

    members: 10,

    memberAvatars: [
      "https://i.pravatar.cc/100?img=21",
      "https://i.pravatar.cc/100?img=22",
      "https://i.pravatar.cc/100?img=23",
      "https://i.pravatar.cc/100?img=24",
      "https://i.pravatar.cc/100?img=25",
    ],

    tasksDue: 3,

    studySessions: 3,

    dayStreak: 7,

    lastActive: "1d ago",

    icon: FiCode,

    gradient: "from-emerald-600 via-green-500 to-teal-500",
  },
];
