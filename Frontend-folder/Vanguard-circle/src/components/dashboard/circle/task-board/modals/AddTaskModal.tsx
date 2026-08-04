import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import { api } from "../../../../../lib/api";
import { trackDeadlineReminderSet, trackTaskAdded } from "../../../../../services/analytics";

interface AddTaskModalProps {
  open: boolean;
  groupId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

// "No reminder" means the task falls back to the app's default 24h-before
// window (see Backend-Folder/src/services/reminders.js) — it's not literally
// "never remind," just "don't ask the student to pick a custom number."
const REMINDER_OPTIONS = [
  { label: "Default (1 day before)", value: "" },
  { label: "1 day before", value: "1" },
  { label: "2 days before", value: "2" },
  { label: "3 days before", value: "3" },
  { label: "1 week before", value: "7" },
];

const AddTaskModal = ({ open, groupId, onClose, onSuccess }: AddTaskModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderDaysBefore, setReminderDaysBefore] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setTitle("");
    setDueDate("");
    setReminderDaysBefore("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Give this task a title.");
      return;
    }
    if (!dueDate) {
      toast.error("Pick a due date.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/groups/${groupId}/tasks`, {
        title,
        dueDate: new Date(dueDate).toISOString(),
        reminderDaysBefore: reminderDaysBefore ? Number(reminderDaysBefore) : undefined,
      });
      trackTaskAdded({ circleId: groupId, dueDate: new Date(dueDate).toISOString() });
      if (reminderDaysBefore) {
        trackDeadlineReminderSet({ daysBeforeDue: Number(reminderDaysBefore) });
      }
      toast.success("Task created!");
      onSuccess?.();
      handleClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't create this task.");
    } finally {
      setSubmitting(false);
    }
  };

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
                onClick={handleClose}
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Task Title */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                    Task Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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

                {/* Due Date */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                    Due Date
                  </label>

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
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

                {/* Reminder */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                    Remind Me Before Due
                  </label>

                  <select
                    value={reminderDaysBefore}
                    onChange={(e) => setReminderDaysBefore(e.target.value)}
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
                    {REMINDER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Footer */}

                <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
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
                    disabled={submitting}
                    className="
                    rounded-xl
                    bg-[var(--color-primary)]
                    px-6
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-[var(--color-primary-dark)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    "
                  >
                    {submitting ? "Creating..." : "Create Task"}
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
