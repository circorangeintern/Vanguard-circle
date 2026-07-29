import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

import StatusBadge from "../cards/StatusBadge";
import { FiCalendar, FiEdit2, FiTrash2 } from "react-icons/fi";
import { createPortal } from "react-dom";

import type { Task } from "../types";

interface TaskDetailsModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

const TaskDetailsModal = ({ task, open, onClose }: TaskDetailsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close with Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  // Close when clicking outside
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  if (!task) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
            p-4
          "
        >
          <motion.div
            ref={modalRef}
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              relative
              flex
              w-full
              max-w-xl
              flex-col
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-2xl
            "
          >
            {/* Header */}

            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-[var(--color-border)]
                px-6
                py-5
              "
            >
              <div>
                <h2 className=" text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">
                  Task Details
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  View task information.
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  rounded-xl
                  p-2
                  transition
                  hover:bg-gray-100
                "
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}

            <div className="modal-scrollbar max-h-[70vh] overflow-y-auto p-6">
              {task && (
                <div className="space-y-8">
                  {/* Title */}

                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                      {task.title}
                    </h1>

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

                  {/* Description */}

                  <div>
                    <p className="leading-7 text-[var(--color-text-secondary)]">
                      {task.description || "No description provided."}
                    </p>
                  </div>

                  {/* Details */}

                  <div className="space-y-5">
                    {/* Status */}

                    <div className="flex items-center justify-between gap-4">
                      <div className=" flex items-center gap-3">
                        <span className=" font-medium text-[var(--color-text-primary)]">
                          Status
                        </span>
                      </div>

                      <StatusBadge status={task.status} />
                    </div>

                    {/* Due Date */}

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[var(--color-primary)]/10
            "
                        >
                          <FiCalendar className="h-5 w-5 text-[var(--color-primary)]" />
                        </div>

                        <span className="font-medium text-[var(--color-text-primary)]">
                          Due Date
                        </span>
                      </div>

                      <span className="font-medium text-[var(--color-text-secondary)]">
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}

            <div
              className="
                sticky
                bottom-0
                flex
                flex-col-reverse
                gap-3
                border-t
                border-[var(--color-border)]
                bg-white
                px-6
                py-2
                sm:flex-row
                sm:justify-end
              "
            >
              <div
                className="
                sticky
                bg-white
                px-6
                py-5
            "
              >
                <div className="flex flex-col gap-3 md:flex-row">
                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() => console.log("Edit Task")}
                    className="
        inline-flex
        
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-[var(--color-border)]
        bg-white
        px-5
        py-3
        text-sm
        font-semibold
        text-[var(--color-text-primary)]
        transition-all
        duration-200
        hover:border-[var(--color-primary)]
        hover:bg-[var(--color-primary)]/5
      "
                  >
                    <FiEdit2 className="h-4 w-4" />
                    Edit Task
                  </button>

                  {/* Delete */}

                  <button
                    type="button"
                    onClick={() => console.log("Delete Task")}
                    className="
                        inline-flex
                        
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-200
                        bg-white
                        px-8
                        py-3
                        text-sm
                        font-semibold
                        text-red-600
                        transition-all
                        duration-200
                        hover:bg-red-50
                     "
                  >
                    <FiTrash2 className="h-4 w-4" />
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default TaskDetailsModal;
