import { useState } from "react";

import { motion } from "framer-motion";
import { FiClipboard } from "react-icons/fi";
import AddTaskModal from "../modals/AddTaskModal";

interface TaskBoardEmptyProps {
  onCreateTask?: () => void;
}

const TaskBoardEmpty = ({}: TaskBoardEmptyProps) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

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
        rounded-3xl
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
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-[var(--color-primary)]/10
        "
      >
        <FiClipboard className="text-[var(--color-primary)]" size={36} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-[var(--color-text-primary)]">
        No Tasks Yet
      </h2>

      <p className="mt-3 max-w-md text-[var(--color-text-secondary)]">
        Your circle doesn't have any tasks yet. Create your first task to help
        members stay organized and track progress.
      </p>

      <button
        onClick={() => setIsAddTaskOpen(true)}
        className="
          mt-8
          inline-flex
          items-center
          justify-center
          rounded-xl
          bg-[var(--color-primary)]
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[var(--color-primary-dark)]
        "
      >
        Create First Task
      </button>
      <AddTaskModal
        open={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
      />
    </motion.section>
  );
};

export default TaskBoardEmpty;
