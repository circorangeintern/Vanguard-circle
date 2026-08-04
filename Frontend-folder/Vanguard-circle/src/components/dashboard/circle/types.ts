export type PostType = "announcement" | "resource";

export interface PostAuthor {
  id: string;
  name: string;
  avatarUrl: string | null;
  role?: string;
}

export interface PostAttachment {
  id: string;
  name: string;
  size: string;
  url: string;
}

export interface FeedPost {
  id: string;
  author: PostAuthor;
  type: PostType;
  title: string;
  content: string;
  createdAt: string;

  likes: number;
  comments: number;

  isLiked: boolean;

  attachment?: PostAttachment;
}

export interface PostComment {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
}
