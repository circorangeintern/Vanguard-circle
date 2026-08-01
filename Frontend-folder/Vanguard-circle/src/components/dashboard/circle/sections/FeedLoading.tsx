import { motion } from "framer-motion";

const PostSkeleton = () => (
  <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
    <div className="flex items-start gap-3">
      <div className="h-12 w-12 rounded-full bg-gray-200" />
      <div className="flex-1 space-y-3">
        <div className="h-4 w-40 rounded bg-gray-200" />
        <div className="h-3 w-24 rounded bg-gray-100" />
      </div>
    </div>
    <div className="mt-5 space-y-3">
      <div className="h-6 w-2/3 rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-100" />
      <div className="h-4 w-5/6 rounded bg-gray-100" />
    </div>
  </div>
);

const FeedLoading = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="h-32 rounded-2xl border border-[var(--color-border)] bg-gray-100" />
      {Array.from({ length: 3 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </motion.div>
  );
};

export default FeedLoading;
