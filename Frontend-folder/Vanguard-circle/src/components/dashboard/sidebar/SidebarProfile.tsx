import { AnimatePresence, motion } from "framer-motion";
import { HiChevronUp } from "react-icons/hi2";

interface SidebarProfileProps {
  expanded: boolean;
}

const SidebarProfile = ({ expanded }: SidebarProfileProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex
        items-center
        overflow-hidden
        transition-all
        duration-300

        ${
          expanded
            ? "w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
            : "h-14 w-14 justify-center rounded-2xl"
        }
      `}
    >
      {/* Avatar */}

      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[var(--color-primary)]

          font-heading
          text-sm
          font-semibold
          text-white
        "
      >
        SO
      </div>

      {/* Expanded Content */}

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="ml-3 flex flex-1 items-center justify-between"
          >
            <div className="min-w-0 text-left">
              <h4 className="truncate font-heading text-sm font-semibold text-slate-900">
                Simon Otaru
              </h4>

              <p className="truncate text-xs text-slate-500">
                Computer Science
              </p>
            </div>

            <HiChevronUp className="text-lg text-slate-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SidebarProfile;
