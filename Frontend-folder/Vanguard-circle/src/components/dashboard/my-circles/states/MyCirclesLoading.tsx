import { motion } from "framer-motion";

const pulse = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 0.8,
    },
  },
};

const Skeleton = ({ className }: { className?: string }) => (
  <motion.div
    variants={pulse}
    initial="initial"
    animate="animate"
    className={`rounded-xl bg-slate-200 ${className}`}
  />
);

const MyCirclesLoading = () => {
  return (
    <section className="mt-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <Skeleton className="h-16 w-16 rounded-2xl" />

          <div>
            <Skeleton className="h-10 w-60" />
            <Skeleton className="mt-3 h-5 w-96 max-w-full" />
          </div>
        </div>

        <Skeleton className="h-12 w-44 rounded-xl" />
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        p-6
        shadow-sm
      "
          >
            <div className="flex items-start gap-5">
              <Skeleton className="h-16 w-16 rounded-2xl" />

              <div className="flex-1">
                <Skeleton className="h-9 w-16" />

                <Skeleton className="mt-4 h-5 w-28" />

                <Skeleton className="mt-3 h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-12 w-full lg:flex-1" />

        <div className="flex gap-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-44" />
          <Skeleton className="h-12 w-24" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--color-border)]
              bg-white
              shadow-sm
            "
          >
            {/* Header */}
            <Skeleton className="h-16 w-full rounded-none" />

            <div className="p-6">
              {/* Floating icon */}
              <Skeleton className="-mt-12 mb-6 h-16 w-16 rounded-2xl" />

              {/* Title */}
              <Skeleton className="h-8 w-44" />

              {/* Subtitle */}
              <Skeleton className="mt-3 h-5 w-40" />

              {/* Avatars */}
              <div className="mt-6 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-9 w-9 rounded-full" />
                ))}
              </div>

              {/* Description */}
              <Skeleton className="mt-6 h-4 w-full" />
              <Skeleton className="mt-3 h-4 w-5/6" />

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-[var(--color-border)] p-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Skeleton className="h-6 w-10" />
                    <Skeleton className="mt-3 h-4 w-16" />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-5">
                <Skeleton className="h-4 w-32" />

                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyCirclesLoading;
