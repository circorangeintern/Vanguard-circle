import { motion } from "framer-motion";

const Skeleton = ({ className }: { className: string }) => (
  <motion.div
    animate={{
      opacity: [0.45, 1, 0.45],
    }}
    transition={{
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`rounded-xl bg-slate-200 ${className}`}
  />
);

const AssignmentLoading = () => {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-28 rounded-2xl shrink-0" />
        ))}
      </div>

      {/* Assignment List */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-[var(--color-border)]
          bg-white
          shadow-sm
        "
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              flex-col
              gap-6
              border-b
              border-[var(--color-border)]
              p-6
              last:border-none
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            <div className="flex flex-1 gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl" />

              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-64 max-w-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            <div className="space-y-3 lg:w-40">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-4
              rounded-3xl
              border
              border-[var(--color-border)]
              bg-white
              p-6
            "
          >
            <Skeleton className="h-14 w-14 rounded-2xl" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AssignmentLoading;
