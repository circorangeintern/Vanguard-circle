import { motion } from "framer-motion";
import { FiClipboard } from "react-icons/fi";

const AssignmentEmpty = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        px-6
        text-center
        shadow-sm
      "
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-violet-50
        "
      >
        <FiClipboard className="text-5xl text-[var(--color-primary)]" />
      </motion.div>

      <h2 className="mt-8 text-2xl font-bold text-[var(--color-text-primary)]">
        No assignments found
      </h2>

      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-7
          text-[var(--color-text-secondary)]
          sm:text-base
        "
      >
        You're all caught up. New assignments from your study circles will
        appear here.
      </p>
    </motion.section>
  );
};

export default AssignmentEmpty;
