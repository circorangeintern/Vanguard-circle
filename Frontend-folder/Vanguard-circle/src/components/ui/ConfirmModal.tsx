import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = true,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
            p-4
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-sm
              rounded-3xl
              bg-white
              p-6
              shadow-2xl
            "
          >
            <div className="flex items-start gap-4">
              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  ${destructive ? "bg-red-50 text-red-600" : "bg-blue-50 text-[var(--color-primary)]"}
                `}
              >
                <FiAlertTriangle className="text-xl" />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-[var(--color-text-primary)]
                  transition
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`
                  rounded-xl
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    destructive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                  }
                `}
              >
                {loading ? "Working..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ConfirmModal;
