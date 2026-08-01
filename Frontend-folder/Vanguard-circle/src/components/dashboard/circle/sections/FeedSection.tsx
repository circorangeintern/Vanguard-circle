import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import CreatePostCard from "../cards/CreatePostCard";
import FeedPostCard, { type FeedComment } from "../cards/FeedPostCard";
import FeedEmpty from "./FeedEmpty";
import FeedLoading from "./FeedLoading";
import { mapPost, type RawPost } from "../data/mapPost";
import { api } from "../../../../lib/api";
import { auth } from "../../../../lib/firebase";
import type { FeedPost } from "../types";

interface FeedSectionProps {
  groupId: string;
  currentUserId?: string;
  isOrganizer?: boolean;
}

interface RawComment {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
}

function formatCommentTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

const FeedSection = ({ groupId, currentUserId, isOrganizer }: FeedSectionProps) => {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"announcement" | "resource">("announcement");
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");

  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);
  const [commentsByPost, setCommentsByPost] = useState<Record<string, FeedComment[]>>({});
  const [commentsLoading, setCommentsLoading] = useState<string | null>(null);

  const loadPosts = useCallback(() => {
    setLoading(true);
    api
      .get<{ posts: RawPost[] }>(`/groups/${groupId}/posts`)
      .then((data) => setPosts(data.posts.map(mapPost)))
      .catch(() => toast.error("Couldn't load the feed. Please try again."))
      .finally(() => setLoading(false));
  }, [groupId]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const resetComposer = () => {
    setTitle("");
    setContent("");
    setType("announcement");
    setAttachmentName("");
    setAttachmentUrl("");
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Add a title and some content before posting.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/groups/${groupId}/posts`, {
        type: type === "resource" ? "RESOURCE" : "ANNOUNCEMENT",
        title: title.trim(),
        content: content.trim(),
        attachmentName: attachmentName.trim() || undefined,
        attachmentUrl: attachmentUrl.trim() || undefined,
      });
      toast.success("Posted to the circle.");
      resetComposer();
      loadPosts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't create this post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    // Optimistic toggle — matches the instant feel of the rest of the app
    // (e.g. task status changes), reverted on failure.
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.likes + (p.isLiked ? -1 : 1) } : p,
      ),
    );
    try {
      await api.post<{ liked: boolean; likes: number }>(`/posts/${id}/like`);
    } catch {
      toast.error("Couldn't update your like. Please try again.");
      loadPosts();
    }
  };

  const loadComments = async (postId: string) => {
    setCommentsLoading(postId);
    try {
      const data = await api.get<{ comments: RawComment[] }>(`/posts/${postId}/comments`);
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: data.comments.map((c) => ({
          id: c.id,
          content: c.content,
          createdAt: formatCommentTime(c.createdAt),
          author: c.author,
        })),
      }));
    } catch {
      toast.error("Couldn't load comments.");
    } finally {
      setCommentsLoading(null);
    }
  };

  const handleToggleComments = (postId: string) => {
    const next = openCommentsFor === postId ? null : postId;
    setOpenCommentsFor(next);
    if (next && !commentsByPost[next]) {
      loadComments(next);
    }
  };

  const handleSubmitComment = async (postId: string, content: string) => {
    try {
      const comment = await api.post<RawComment>(`/posts/${postId}/comments`, { content });
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          {
            id: comment.id,
            content: comment.content,
            createdAt: formatCommentTime(comment.createdAt),
            author: comment.author,
          },
        ],
      }));
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p)));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't post your comment.");
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await api.delete(`/posts/${postId}`);
      toast.success("Post deleted.");
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't delete this post.");
    }
  };

  if (loading) return <FeedLoading />;

  return (
    <section className="space-y-6">
      <CreatePostCard
        avatar={`https://i.pravatar.cc/150?u=${currentUserId || auth?.currentUser?.uid || "me"}`}
        title={title}
        value={content}
        selectedType={type}
        attachmentName={attachmentName}
        attachmentUrl={attachmentUrl}
        submitting={submitting}
        onTitleChange={setTitle}
        onChange={setContent}
        onTypeChange={setType}
        onAttachmentNameChange={setAttachmentName}
        onAttachmentUrlChange={setAttachmentUrl}
        onPost={handleCreatePost}
      />

      {posts.length === 0 ? (
        <FeedEmpty />
      ) : (
        posts.map((post) => (
          <FeedPostCard
            key={post.id}
            post={post}
            canDelete={isOrganizer || post.author.id === currentUserId}
            commentsOpen={openCommentsFor === post.id}
            commentList={commentsByPost[post.id]}
            commentsLoading={commentsLoading === post.id}
            onLike={handleLike}
            onComment={handleToggleComments}
            onDelete={handleDelete}
            onSubmitComment={handleSubmitComment}
          />
        ))
      )}
    </section>
  );
};

export default FeedSection;
