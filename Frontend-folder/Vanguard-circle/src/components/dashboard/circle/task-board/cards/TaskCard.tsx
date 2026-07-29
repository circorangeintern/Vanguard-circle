import { motion } from "framer-motion";
import { FiCalendar, FiMoreHorizontal } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import type { Task } from "../types";
// import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onMenu: (taskId: string) => void;
}

const TaskCard = ({ task, onMenu }: TaskCardProps) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-white
        transition-all
        hover:shadow-md
      "
    >
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[1.8fr_180px_140px_50px] items-center px-6 py-6">
        {/* Task */}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-[var(--color-text-primary)]">
            {task.title}
          </h3>

          <span
            className="
              mt-3
              inline-flex
              rounded-full
              bg-[var(--color-primary)]/10
              px-3
              py-1
              text-xs
              font-medium
              text-[var(--color-primary)]
            "
          >
            {task.category}
          </span>
        </div>

        {/* Due Date */}

        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <FiCalendar className="h-4 w-4" />
          {task.dueDate}
        </div>

        {/* Status */}

        <div>
          <StatusBadge status={task.status} />
        </div>

        {/* Menu */}

        <button
          onClick={() => onMenu(task.id)}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            transition
            hover:bg-gray-100
          "
        >
          <FiMoreHorizontal size={18} />
        </button>
      </div>

      {/* Mobile */}

      <div className="block md:hidden p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold leading-6 text-[var(--color-text-primary)]">
              {task.title}
            </h3>

            <span
              className="
                mt-3
                inline-flex
                rounded-full
                bg-[var(--color-primary)]/10
                px-3
                py-1
                text-xs
                font-medium
                text-[var(--color-primary)]
              "
            >
              {task.category}
            </span>
          </div>

          <button
            onClick={() => onMenu(task.id)}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-gray-100
            "
          >
            <FiMoreHorizontal size={18} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <FiCalendar className="h-4 w-4" />
            {task.dueDate}
          </div>

          <StatusBadge status={task.status} />
        </div>
      </div>
    </motion.article>
  );
};

export default TaskCard;
