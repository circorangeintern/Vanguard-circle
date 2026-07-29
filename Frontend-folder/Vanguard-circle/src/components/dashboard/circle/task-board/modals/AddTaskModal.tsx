import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTaskModal = ({ open, onClose }: AddTaskModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Close when clicking outside
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

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
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              relative
              w-full
              max-w-2xl
              rounded-3xl
              bg-white
              shadow-2xl
              overflow-hidden
            "
          >
            {/* Header */}

            <div className="flex items-start justify-between border-b border-[var(--color-border)] px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  Add Task
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Create a new task for your circle.
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

            <div className="max-h-[70vh] overflow-y-auto p-6">
              <form className="space-y-6">
                {/* Task Title */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                    Task Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Create Homepage Wireframe"
                    className="
                        w-full
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-[var(--color-primary)]
                        focus:ring-2
                        focus:ring-[var(--color-primary)]/10
                    "
                  />
                </div>

                {/* Description */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                    Description{" "}
                    <span className="text-gray-300">(optional)</span>
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Describe this task..."
                    className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-[var(--color-primary)]
                        focus:ring-2
                        focus:ring-[var(--color-primary)]/10
                    "
                  />
                </div>

                {/* Status + Due Date */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Status */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                      Status
                    </label>

                    <select
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-[var(--color-primary)]
                        focus:ring-2
                        focus:ring-[var(--color-primary)]/10
                    "
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  {/* Due Date */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                      Due Date
                    </label>

                    <input
                      type="date"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        outline-none
                        transition
                        focus:border-[var(--color-primary)]
                        focus:ring-2
                        focus:ring-[var(--color-primary)]/10
                     "
                    />
                  </div>
                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="
                    rounded-xl
                    border
                    border-[var(--color-border)]
                    px-6
                    py-3
                    font-medium
                    transition
                    hover:bg-gray-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                    rounded-xl
                    bg-[var(--color-primary)]
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-[var(--color-primary-dark)]
                    "
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default AddTaskModal;
