import { motion } from "framer-motion";
import {
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageSquare,
  FiPaperclip,
  FiVolume2,
} from "react-icons/fi";

export interface FeedPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role?: string;
  };
  type: "announcement" | "resource";
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  attachment?: {
    name: string;
    size: string;
    url: string;
  };
}

interface FeedPostCardProps {
  post: FeedPost;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onMenu?: (id: string) => void;
}

const FeedPostCard = ({
  post,
  onLike,
  onComment,
  onMenu,
}: FeedPostCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                {post.author.name}
              </h3>

              {post.author.role && (
                <span className="rounded-full bg-[var(--color-primary)]/10 px-2 py-1 text-xs font-medium text-[var(--color-primary)]">
                  {post.author.role}
                </span>
              )}

              <span className="text-sm text-[var(--color-text-secondary)]">
                •
              </span>

              <span className="text-sm text-[var(--color-text-secondary)]">
                {post.createdAt}
              </span>
            </div>

            <span
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                post.type === "announcement"
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {post.type === "announcement" ? (
                <FiVolume2 size={12} />
              ) : (
                <FiPaperclip size={12} />
              )}

              {post.type === "announcement" ? "Announcement" : "Resource"}
            </span>
          </div>
        </div>

        <button
          onClick={() => onMenu?.(post.id)}
          className="rounded-lg p-2 transition hover:bg-gray-100"
        >
          <FiMoreHorizontal size={18} />
        </button>
      </div>

      {/* Body */}

      <div className="mt-5">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {post.title}
        </h2>

        <p className="mt-3 whitespace-pre-line leading-7 text-[var(--color-text-secondary)]">
          {post.content}
        </p>

        {post.attachment && (
          <a
            href={post.attachment.url}
            className="mt-5 flex max-w-sm items-center gap-3 rounded-xl border border-[var(--color-border)] p-4 transition hover:border-[var(--color-primary)]"
          >
            <FiPaperclip className="text-[var(--color-primary)]" size={20} />

            <div>
              <p className="font-medium">{post.attachment.name}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {post.attachment.size}
              </p>
            </div>
          </a>
        )}
      </div>

      {/* Footer */}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => onLike?.(post.id)}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
            post.isLiked
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
              : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
          }`}
        >
          <FiThumbsUp />

          {post.likes}
        </button>

        <button
          onClick={() => onComment?.(post.id)}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition hover:border-[var(--color-primary)]"
        >
          <FiMessageSquare />

          {post.comments}
        </button>
      </div>
    </motion.article>
  );
};

export default FeedPostCard;
