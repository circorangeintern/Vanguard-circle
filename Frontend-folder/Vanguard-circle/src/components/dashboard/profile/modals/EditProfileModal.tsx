import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { createPortal } from "react-dom";
import { updateProfile } from "firebase/auth";
import { toast } from "sonner";

import { api } from "../../../../lib/api";
import { auth } from "../../../../lib/firebase";
import { PROFILE_UPDATED_EVENT } from "../../../../hooks/useCurrentUser";

interface EditProfileModalProps {
  open: boolean;
  fullName: string;
  onClose: () => void;
  onSuccess: () => void;
}

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 30,
    transition: {
      duration: 0.2,
    },
  },
};

const EditProfileModal = ({ open, fullName, onClose, onSuccess }: EditProfileModalProps) => {
  const [name, setName] = useState(fullName);
  const [error, setError] = useState<string | undefined>();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(fullName);
    setError(undefined);
  }, [open, fullName]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Full name is required.");
      return;
    }

    setIsUpdating(true);
    try {
      await api.patch("/users/me", { name: name.trim() });
      if (auth?.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name.trim() });
        // See useCurrentUser.ts — updateProfile() doesn't trigger a
        // re-render on its own in components reading auth.currentUser directly.
        window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
      }
      toast.success("Profile updated.");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update your profile.");
    } finally {
      setIsUpdating(false);
    }
  };
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-md
            sm:p-6

          "
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              flex
              max-h-[90vh]
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
                items-center
                justify-between
                border-b
                border-[var(--color-border)]
                px-6
                py-5
                sm:px-8
                sm:py-6
              "
            >
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-[var(--color-text-primary)]
                  "
                >
                  Edit Profile
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[var(--color-text-secondary)]
                  "
                >
                  Update your display name.
                </p>
              </div>

              <motion.button
                whileHover={{
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={onClose}
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-500
                  transition-colors
                  duration-200
                  hover:bg-slate-100
                  hover:text-[var(--color-primary)]
                "
              >
                <FiX className="text-2xl" />
              </motion.button>
            </div>

            {/* Body Starts Here */}
            <div
              className="
                modal-scrollbar
                flex-1
                overflow-y-auto
                px-6
                py-6
                sm:px-8
                sm:py-8
              "
            >
              {/* Form */}
              <div className="space-y-7">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="full-name"
                    className="
                      mb-3
                      block
                      text-sm
                      font-semibold
                      text-[var(--color-text-primary)]
                    "
                  >
                    Full Name
                  </label>

                  <input
                    id="full-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(undefined);
                    }}
                    placeholder="Enter your full name"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-[var(--color-border)]
                      bg-white
                      px-5
                      text-[15px]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-[var(--color-text-secondary)]
                      focus:border-[var(--color-primary)]
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-[var(--color-border)]
                px-6
                py-5
                sm:flex-row
                sm:justify-end
                sm:px-8
                sm:py-6
              "
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                disabled={isUpdating}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-white
                  px-6
                  font-medium
                  text-[var(--color-text-primary)]
                  transition-colors
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSubmit}
                disabled={isUpdating}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--color-primary)]
                  px-8
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-[var(--color-primary-dark)]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  sm:w-auto
                "
              >
                {isUpdating ? (
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                    Updating...
                  </div>
                ) : (
                  "Update Profile"
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default EditProfileModal;
