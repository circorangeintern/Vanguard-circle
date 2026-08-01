import type { FeedPost } from "../types";

export interface RawPost {
  id: string;
  groupId: string;
  type: "ANNOUNCEMENT" | "RESOURCE";
  title: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
  attachment: { name: string; url: string } | null;
  likes: number;
  comments: number;
  isLiked: boolean;
}

// Same relative-time formula as the my-circles card (mapCircle.ts) — kept
// separate since posts also need "Just now" resolution down to minutes.
function formatCreatedAt(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function mapPost(raw: RawPost): FeedPost {
  return {
    id: raw.id,
    author: {
      id: raw.author.id,
      name: raw.author.name,
      avatar: `https://i.pravatar.cc/150?u=${raw.author.id}`,
    },
    type: raw.type === "RESOURCE" ? "resource" : "announcement",
    title: raw.title,
    content: raw.content,
    createdAt: formatCreatedAt(raw.createdAt),
    likes: raw.likes,
    comments: raw.comments,
    isLiked: raw.isLiked,
    attachment: raw.attachment
      ? { id: raw.id, name: raw.attachment.name, size: "", url: raw.attachment.url }
      : undefined,
  };
}
