import { motion } from "framer-motion";

const Skeleton = ({ className }: { className: string }) => (
  <motion.div
    animate={{
      opacity: [0.45, 1, 0.45],
    }}
    transition={{
      duration: 1.3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`rounded-xl bg-slate-200 ${className}`}
  />
);

const NotificationLoading = () => {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-5 w-72 max-w-full" />
        </div>

        <Skeleton className="h-12 w-full sm:w-48" />
      </div>

      {/* Notification Card */}
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
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              flex-col
              gap-5
              border-b
              border-[var(--color-border)]
              p-6
              last:border-none
              sm:flex-row
              sm:justify-between
            "
          >
            <div className="flex flex-1 gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl" />

              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-56 max-w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>

            <div className="flex items-center justify-between sm:w-28 sm:flex-col sm:items-end">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-3 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotificationLoading;
