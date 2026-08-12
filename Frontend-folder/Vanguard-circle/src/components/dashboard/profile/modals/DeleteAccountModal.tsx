import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { api } from "../../../../lib/api";
import { auth } from "../../../../lib/firebase";

interface DeleteAccountModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
}

const DeleteAccountModal = ({ open, email, onClose }: DeleteAccountModalProps) => {
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!open) setConfirmText("");
  }, [open]);

  const canDelete = confirmText.trim().toLowerCase() === email.trim().toLowerCase();

  const handleDelete = async () => {
    if (!canDelete) return;
    setDeleting(true);
    try {
      await api.delete("/users/me");
      if (auth) await signOut(auth);
      toast.success("Your account has been deleted.");
      navigate("/signup");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't delete your account. Please try again.");
      setDeleting(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !deleting && onClose()}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          >
            <div className="flex items-start justify-between border-b border-[var(--color-border)] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <FiAlertTriangle className="text-xl" />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                  Delete Account
                </h2>
              </div>

              <button
                onClick={() => !deleting && onClose()}
                disabled={deleting}
                className="rounded-xl p-2 transition hover:bg-gray-100 disabled:opacity-50"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                This permanently deletes your account and everything tied to
                it — your profile, every circle you organize (and all of
                that circle's tasks, sessions, and posts for every member in
                it), your membership in every other circle, check-ins,
                streaks, and notifications. <strong>This cannot be undone.</strong>
              </p>

              <label className="mt-6 block text-sm font-medium text-[var(--color-text-primary)]">
                Type <span className="font-semibold">{email}</span> to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={email}
                autoComplete="off"
                className="
                  mt-2 w-full rounded-xl border border-[var(--color-border)]
                  px-4 py-3 text-sm outline-none transition
                  focus:border-red-500 focus:ring-2 focus:ring-red-100
                "
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] px-6 py-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={deleting}
                className="
                  rounded-xl border border-[var(--color-border)] px-6 py-3
                  font-medium transition hover:bg-gray-50
                  disabled:cursor-not-allowed disabled:opacity-60
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={!canDelete || deleting}
                className="
                  rounded-xl bg-red-600 px-6 py-3 font-medium text-white
                  transition hover:bg-red-700
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                {deleting ? "Deleting..." : "Permanently Delete Account"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default DeleteAccountModal;
