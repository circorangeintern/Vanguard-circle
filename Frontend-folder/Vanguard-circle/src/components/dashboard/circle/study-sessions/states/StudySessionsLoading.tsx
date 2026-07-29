import { motion } from "framer-motion";

const SessionSkeleton = () => (
  <div
    className="
      rounded-2xl
      border
      border-[var(--color-border)]
      bg-white
      p-5
    "
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-1 gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-5 w-56 rounded bg-gray-200" />

          <div className="h-4 w-24 rounded bg-gray-100" />

          <div className="flex gap-4">
            <div className="h-4 w-24 rounded bg-gray-100" />
            <div className="h-4 w-20 rounded bg-gray-100" />
          </div>
        </div>
      </div>

      <div className="h-10 w-36 rounded-xl bg-gray-200" />
    </div>
  </div>
);

const StudySessionsLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Tabs */}

      <div className="flex gap-3">
        <div className="h-11 w-32 rounded-xl bg-gray-200" />
        <div className="h-11 w-28 rounded-xl bg-gray-100" />
        <div className="ml-auto h-11 w-44 rounded-xl bg-gray-200" />
      </div>

      {/* Cards */}

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SessionSkeleton key={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default StudySessionsLoading;
