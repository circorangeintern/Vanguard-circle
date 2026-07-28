import { motion } from "framer-motion";

const shimmer = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 0.9,
    },
  },
};

const ProfileLoading = () => {
  return (
    <section className="space-y-8">
      {/* Hero Skeleton */}
      <motion.div
        variants={shimmer}
        initial="initial"
        animate="animate"
        className="
          rounded-3xl
          border
          border-[var(--color-border)]
          bg-white
          p-6
          shadow-sm
          md:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-8
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-6
              sm:flex-row
              sm:items-start
            "
          >
            <div
              className="
                h-32
                w-32
                rounded-full
                bg-slate-200
              "
            />

            <div className="space-y-4">
              <div className="h-8 w-56 rounded-lg bg-slate-200" />
              <div className="h-5 w-72 rounded-lg bg-slate-200" />

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="h-5 w-32 rounded-lg bg-slate-200" />
                <div className="h-5 w-28 rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>

          <div className="h-14 w-full rounded-2xl bg-slate-200 xl:w-48" />
        </div>
      </motion.div>

      {/* Account Card Skeleton */}
      <motion.div
        variants={shimmer}
        initial="initial"
        animate="animate"
        className="
          rounded-3xl
          border
          border-[var(--color-border)]
          bg-white
          p-6
          shadow-sm
          md:p-8
        "
      >
        <div className="mb-8 h-7 w-56 rounded-lg bg-slate-200" />

        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--color-border)]
                pb-5
                last:border-none
                last:pb-0
              "
            >
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-5 w-40 rounded bg-slate-200" />
                </div>
              </div>

              <div className="h-5 w-5 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProfileLoading;
