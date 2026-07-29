import { motion } from "framer-motion";

const shimmer = {
  initial: {
    backgroundPosition: "-200px 0",
  },
  animate: {
    backgroundPosition: "calc(200px + 100%) 0",
  },
};

const Skeleton = ({ className }: { className: string }) => (
  <motion.div
    variants={shimmer}
    initial="initial"
    animate="animate"
    transition={{
      repeat: Infinity,
      duration: 1.4,
      ease: "linear",
    }}
    className={`rounded-xl ${className}`}
    style={{
      backgroundImage:
        "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 37%,#f1f5f9 63%)",
      backgroundSize: "400px 100%",
    }}
  />
);

const TaskBoardLoading = () => {
  return (
    <section className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-12 w-full sm:w-80" />

        <Skeleton className="h-11 w-full sm:w-36" />
      </div>

      {/* Cards */}

      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[var(--color-border)] bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-4">
                <Skeleton className="h-5 w-64" />

                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Skeleton className="h-4 w-36" />

              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskBoardLoading;
