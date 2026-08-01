const express = require("express");
const prisma = require("../config/prisma");
const { requireAuth } = require("../middleware/auth");
const { notify } = require("../services/notify");

const router = express.Router();

async function requireMembership(userId, groupId) {
  return prisma.membership.findUnique({
    where: { userId_groupId: { userId, groupId } },
  });
}

function serializePost(post, currentUserId) {
  return {
    id: post.id,
    groupId: post.groupId,
    type: post.type,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    author: {
      id: post.author.id,
      name: post.author.name,
    },
    attachment:
      post.attachmentUrl || post.attachmentName
        ? { name: post.attachmentName || post.attachmentUrl, url: post.attachmentUrl }
        : null,
    likes: post.likes.length,
    comments: post.comments.length,
    isLiked: post.likes.some((like) => like.userId === currentUserId),
  };
}

const postInclude = {
  author: true,
  likes: true,
  comments: true,
};

// POST /groups/:groupId/posts — create an announcement or resource post
router.post("/:groupId/posts", requireAuth, async (req, res) => {
  const { groupId } = req.params;
  const { type, title, content, attachmentName, attachmentUrl } = req.body;

  if (!title || !content) return res.error("title and content are required");
  if (type && type !== "ANNOUNCEMENT" && type !== "RESOURCE") {
    return res.error("type must be ANNOUNCEMENT or RESOURCE");
  }

  const membership = await requireMembership(req.user.id, groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  if (attachmentUrl) {
    try {
      new URL(attachmentUrl);
    } catch {
      return res.error("attachmentUrl must be a valid URL");
    }
  }

  const post = await prisma.post.create({
    data: {
      groupId,
      authorId: req.user.id,
      type: type || "ANNOUNCEMENT",
      title,
      content,
      attachmentName: attachmentName || null,
      attachmentUrl: attachmentUrl || null,
    },
    include: postInclude,
  });

  // Notify the rest of the circle — same fire-and-forget pattern as
  // member-joined/task-reminder notifications, shouldn't block the response.
  const members = await prisma.membership.findMany({ where: { groupId } });
  Promise.all(
    members
      .filter((m) => m.userId !== req.user.id)
      .map((m) =>
        notify(m.userId, {
          type: "new_post",
          groupId,
          postId: post.id,
          authorName: req.user.name,
          title: post.title,
        }),
      ),
  ).catch(() => {});

  res.success(serializePost(post, req.user.id), 201);
});

// GET /groups/:groupId/posts — feed for one circle, newest first
router.get("/:groupId/posts", requireAuth, async (req, res) => {
  const { groupId } = req.params;

  const membership = await requireMembership(req.user.id, groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const posts = await prisma.post.findMany({
    where: { groupId },
    orderBy: { createdAt: "desc" },
    include: postInclude,
    take: 100,
  });

  res.success({ posts: posts.map((p) => serializePost(p, req.user.id)) });
});

// DELETE /posts/:id — remove a post (author or circle organizer only)
router.delete("/:id", requireAuth, async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: req.params.id } });
  if (!post) return res.error("Post not found", 404);

  const membership = await requireMembership(req.user.id, post.groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);
  if (post.authorId !== req.user.id && membership.role !== "ORGANIZER") {
    return res.error("Only the author or circle organizer can delete this post.", 403);
  }

  await prisma.$transaction([
    prisma.postLike.deleteMany({ where: { postId: post.id } }),
    prisma.postComment.deleteMany({ where: { postId: post.id } }),
    prisma.post.delete({ where: { id: post.id } }),
  ]);

  res.success({ deleted: true });
});

// POST /posts/:id/like — toggle like on behalf of the current user
router.post("/:id/like", requireAuth, async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: req.params.id } });
  if (!post) return res.error("Post not found", 404);

  const membership = await requireMembership(req.user.id, post.groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const existing = await prisma.postLike.findUnique({
    where: { postId_userId: { postId: post.id, userId: req.user.id } },
  });

  if (existing) {
    await prisma.postLike.delete({ where: { id: existing.id } });
  } else {
    await prisma.postLike.create({ data: { postId: post.id, userId: req.user.id } });
  }

  const likeCount = await prisma.postLike.count({ where: { postId: post.id } });
  res.success({ liked: !existing, likes: likeCount });
});

// GET /posts/:id/comments — comments on a post, oldest first
router.get("/:id/comments", requireAuth, async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: req.params.id } });
  if (!post) return res.error("Post not found", 404);

  const membership = await requireMembership(req.user.id, post.groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const comments = await prisma.postComment.findMany({
    where: { postId: post.id },
    orderBy: { createdAt: "asc" },
    include: { user: true },
  });

  res.success({
    comments: comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      author: { id: c.user.id, name: c.user.name },
    })),
  });
});

// POST /posts/:id/comments — add a comment to a post
router.post("/:id/comments", requireAuth, async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) return res.error("content is required");

  const post = await prisma.post.findUnique({ where: { id: req.params.id } });
  if (!post) return res.error("Post not found", 404);

  const membership = await requireMembership(req.user.id, post.groupId);
  if (!membership) return res.error("You're not a member of this circle.", 403);

  const comment = await prisma.postComment.create({
    data: { postId: post.id, userId: req.user.id, content: content.trim() },
    include: { user: true },
  });

  if (post.authorId !== req.user.id) {
    notify(post.authorId, {
      type: "post_comment",
      groupId: post.groupId,
      postId: post.id,
      commenterName: req.user.name,
      title: post.title,
    }).catch(() => {});
  }

  res.success(
    {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: { id: comment.user.id, name: comment.user.name },
    },
    201,
  );
});

module.exports = router;
