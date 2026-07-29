import { useState } from "react";
import CreatePostCard from "../cards/CreatePostCard";
import FeedPostCard from "../cards/FeedPostCard";
import { posts } from "../data/posts";

const FeedSection = () => {
  const [post, setPost] = useState("");
  const [type, setType] = useState<"announcement" | "resource">("announcement");

  const handleCreatePost = () => {
    if (!post.trim()) return;

    console.log({
      type,
      content: post,
    });

    setPost("");
    setType("announcement");
  };

  const handleLike = (id: string) => {
    console.log("Like:", id);
  };

  const handleComment = (id: string) => {
    console.log("Comment:", id);
  };

  const handleMenu = (id: string) => {
    console.log("Menu:", id);
  };

  return (
    <section className="space-y-6">
      <CreatePostCard
        avatar="https://i.pravatar.cc/150?img=12"
        value={post}
        selectedType={type}
        onChange={setPost}
        onTypeChange={setType}
        onPost={handleCreatePost}
      />

      {posts.map((post) => (
        <FeedPostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onMenu={handleMenu}
        />
      ))}
    </section>
  );
};

export default FeedSection;
