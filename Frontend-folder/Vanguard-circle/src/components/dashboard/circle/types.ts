export type PostType = "announcement" | "resource";

export interface PostAuthor {
  id: string;
  name: string;
  avatar: string;
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
