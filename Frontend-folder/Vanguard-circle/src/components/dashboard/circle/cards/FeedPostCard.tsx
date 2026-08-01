import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageSquare,
  FiPaperclip,
  FiVolume2,
  FiTrash2,
  FiSend,
} from "react-icons/fi";

export interface FeedComment {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
}

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
  canDelete?: boolean;
  commentsOpen?: boolean;
  commentList?: FeedComment[];
  commentsLoading?: boolean;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSubmitComment?: (id: string, content: string) => void;
}

const FeedPostCard = ({
  post,
  canDelete,
  commentsOpen,
  commentList,
  commentsLoading,
  onLike,
  onComment,
  onDelete,
  onSubmitComment,
}: FeedPostCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const handleSubmitComment = () => {
    if (!draft.trim()) return;
    onSubmitComment?.(post.id, draft.trim());
    setDraft("");
  };

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

        {canDelete && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-lg p-2 transition hover:bg-gray-100"
            >
              <FiMoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(post.id);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <FiTrash2 size={14} />
                  Delete post
                </button>
              </div>
            )}
          </div>
        )}
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
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex max-w-sm items-center gap-3 rounded-xl border border-[var(--color-border)] p-4 transition hover:border-[var(--color-primary)]"
          >
            <FiPaperclip className="text-[var(--color-primary)]" size={20} />

            <div>
              <p className="font-medium">{post.attachment.name}</p>
              {post.attachment.size && (
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {post.attachment.size}
                </p>
              )}
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
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
            commentsOpen
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
              : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
          }`}
        >
          <FiMessageSquare />

          {post.comments}
        </button>
      </div>

      {/* Comments */}

      {commentsOpen && (
        <div className="mt-5 space-y-4 border-t border-[var(--color-border)] pt-5">
          {commentsLoading && (
            <p className="text-sm text-[var(--color-text-secondary)]">Loading comments...</p>
          )}

          {!commentsLoading && commentList?.length === 0 && (
            <p className="text-sm text-[var(--color-text-secondary)]">
              No comments yet. Be the first to reply.
            </p>
          )}

          {!commentsLoading &&
            commentList?.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-semibold text-[var(--color-primary)]">
                  {comment.author.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 rounded-xl bg-gray-50 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}

          <div className="flex items-center gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmitComment();
              }}
              placeholder="Write a comment..."
              className="flex-1 rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
            />
            <button
              onClick={handleSubmitComment}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white transition hover:bg-[var(--color-primary-dark)]"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default FeedPostCard;
