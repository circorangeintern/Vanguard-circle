import type { FeedPost } from "../types";

export const posts: FeedPost[] = [
  {
    id: "1",

    author: {
      id: "1",
      name: "Opeyemi",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "Admin",
    },

    type: "announcement",

    title: "Welcome to Design Circle! 👋",

    content:
      "Let's work together, share ideas, and help each other grow.\n\nPlease check the resources section for helpful materials.",

    createdAt: "2h ago",

    likes: 12,

    comments: 4,

    isLiked: false,
  },

  {
    id: "2",

    author: {
      id: "2",
      name: "Chiamaka",
      avatar: "https://i.pravatar.cc/150?img=32",
    },

    type: "resource",

    title: "Figma Auto Layout Best Practices",

    content: "A great guide to help you build responsive layouts faster.",

    createdAt: "5h ago",

    likes: 8,

    comments: 3,

    isLiked: true,

    attachment: {
      id: "1",
      name: "Figma_Auto_Layout_Guide.pdf",
      size: "2.4 MB",
      url: "#",
    },
  },
];
