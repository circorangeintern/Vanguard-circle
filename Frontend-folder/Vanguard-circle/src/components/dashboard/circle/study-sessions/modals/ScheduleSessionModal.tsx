import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { FiCalendar, FiClock, FiLink, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

interface ScheduleSessionModalProps {
  open: boolean;
  onClose: () => void;
}

const ScheduleSessionModal = ({ open, onClose }: ScheduleSessionModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close with Escape key
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
              max-w-2xl
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
                <h2 className="text-xl  md:text-2xl font-bold text-[var(--color-text-primary)]">
                  Schedule Study Session
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Create a new study session for your circle.
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

            <div className="modal-scrollbar max-h-[45vh] md:max-h-[60vh] overflow-y-auto p-6">
              <form className="space-y-6">
                {/* Session Title */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                    Session Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Figma Auto Layout Deep Dive"
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
                    Description
                  </label>

                  <textarea
                    rows={5}
                    placeholder="What will be covered during this study session?"
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

                {/* Date & Time */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Date */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                      Date
                    </label>

                    <div className="relative">
                      <FiCalendar
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-[var(--color-text-secondary)]
                        "
                      />

                      <input
                        type="date"
                        className="
                        w-full
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        bg-white
                        py-3
                        pl-11
                        pr-4
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

                  {/* Time */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                      Time
                    </label>

                    <div className="relative">
                      <FiClock
                        className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[var(--color-text-secondary)]
                    "
                      />

                      <input
                        type="time"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-[var(--color-border)]
                            bg-white
                            py-3
                            pl-11
                            pr-4
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
                </div>

                {/* Meeting Link */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
                    Meeting Link
                  </label>

                  <div className="relative">
                    <FiLink
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[var(--color-text-secondary)]
                        "
                    />

                    <input
                      type="url"
                      placeholder="https://meet.google.com/..."
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        py-3
                        pl-11
                        pr-4
                        text-sm
                        outline-none
                        transition
                        focus:border-[var(--color-primary)]
                        focus:ring-2
                        focus:ring-[var(--color-primary)]/10
                        "
                    />
                  </div>

                  <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                    Supports Google Meet, Zoom, Microsoft Teams, or any meeting
                    URL.
                  </p>
                </div>
              </form>
            </div>

            {/* Footer */}

            <div
              className="
                sticky
                bottom-0
                border-t
                border-[var(--color-border)]
                bg-white
                px-6
                py-5
              "
            >
              <div
                className="
                sticky
                bottom-0
                z-10
            
                bg-white
                px-6
                py-2
            "
              >
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  {/* Cancel */}

                  <button
                    type="button"
                    onClick={onClose}
                    className="
                        inline-flex
                        h-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[var(--color-border)]
                        bg-white
                        px-6
                        text-sm
                        font-semibold
                        text-[var(--color-text-primary)]
                        transition-all
                        duration-200
                        hover:bg-gray-50
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--color-primary)]/20
                    "
                  >
                    Cancel
                  </button>

                  {/* Schedule */}

                  <button
                    type="submit"
                    className="
                        inline-flex
                        h-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-[var(--color-primary)]
                        px-8
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[var(--color-primary-dark)]
                        active:scale-[0.98]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--color-primary)]/30
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                  >
                    Schedule Session
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

export default ScheduleSessionModal;
