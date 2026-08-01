import { motion } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi";

const FeedEmpty = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] bg-white px-6 text-center"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
        <FiMessageCircle size={30} className="text-[var(--color-primary)]" />
      </div>

      <h2 className="text-xl font-bold text-[var(--color-text-primary)]">No Posts Yet</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
        Share the first announcement or resource with your circle above.
      </p>
    </motion.div>
  );
};

export default FeedEmpty;
