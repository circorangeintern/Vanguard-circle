import { motion } from "framer-motion";

const MemberSkeleton = () => (
  <div
    className="
      border-b
      border-[var(--color-border)]
      last:border-b-0
    "
  >
    {/* Desktop */}

    <div className="hidden md:grid grid-cols-[2fr_2fr_1fr] items-center gap-8 px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />

        <div className="space-y-2">
          <div className="h-4 w-36 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>

      <div className="h-4 w-52 rounded bg-gray-200 animate-pulse" />

      <div className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
    </div>

    {/* Mobile */}

    <div className="block md:hidden px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-36 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-44 rounded bg-gray-100 animate-pulse" />
        </div>

        <div className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  </div>
);

const MembersLoading = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-white
      "
    >
      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-[var(--color-border)] p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-36 rounded bg-gray-200 animate-pulse" />
          <div className="h-7 w-8 rounded-full bg-gray-200 animate-pulse" />
        </div>

        <div className="h-11 w-full rounded-xl bg-gray-200 animate-pulse md:w-80" />
      </div>

      {/* Desktop Header */}

      <div className="hidden md:grid grid-cols-[2fr_2fr_1fr] gap-8 border-b border-[var(--color-border)] bg-gray-50 px-6 py-4">
        <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
      </div>

      {/* Members */}

      <div>
        {Array.from({ length: 8 }).map((_, index) => (
          <MemberSkeleton key={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default MembersLoading;
