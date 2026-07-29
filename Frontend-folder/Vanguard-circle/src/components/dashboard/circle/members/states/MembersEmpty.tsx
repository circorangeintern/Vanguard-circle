import { motion } from "framer-motion";
import { FiUsers } from "react-icons/fi";

const MembersEmpty = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-[var(--color-border)]
        bg-white
        px-6
        text-center
      "
    >
      <div
        className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-[var(--color-primary)]/10
        "
      >
        <FiUsers size={38} className="text-[var(--color-primary)]" />
      </div>

      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
        No Members Found
      </h2>

      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-7
          text-[var(--color-text-secondary)]
        "
      >
        This circle doesn't have any members yet. Once people join, they'll
        appear here.
      </p>
    </motion.section>
  );
};

export default MembersEmpty;
