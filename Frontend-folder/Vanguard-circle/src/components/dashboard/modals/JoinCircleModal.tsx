import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineLink } from "react-icons/hi";

interface JoinCircleModalProps {
  open: boolean;
  onClose: () => void;
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
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 24,
    transition: {
      duration: 0.2,
    },
  },
};

const JoinCircleModal = ({ open, onClose }: JoinCircleModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
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
          "
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-xl
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="relative border-b border-[var(--color-border)] px-8 py-8">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="
                  absolute
                  right-6
                  top-6
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-500
                  transition-all
                  duration-200
                  hover:bg-slate-100
                  hover:text-[var(--color-primary)]
                "
              >
                <FiX className="text-2xl" />
              </button>

              {/* Icon */}
              <div className="flex justify-center">
                <div
                  className="
                    flex
                    md:h-20
                    md:w-20
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-indigo-100
                    via-blue-50
                    to-purple-100
                  "
                >
                  <HiOutlineUserGroup className="text-4xl text-[var(--color-primary)]" />
                </div>
              </div>

              {/* Heading */}
              <div className="mt-8 text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                  Join Circle
                </h2>

                <p className="mt-3 text-sm md:text-base leading-7 text-[var(--color-text-secondary)]">
                  Join an existing study circle using an invitation link shared
                  with you.
                </p>
              </div>
            </div>

            {/* Body Starts Here */}
            <div className="px-8 py-8">
              {/* Invite Link */}
              <div>
                <label
                  htmlFor="invite-link"
                  className="mb-3 block text-[14px] font-semibold text-[var(--color-text-primary)]"
                >
                  Invitation Link
                </label>

                <div className="relative">
                  <HiOutlineLink
                    className="
    absolute
    left-5
    top-1/2
    h-4
    w-4
    -translate-y-1/2
    text-[var(--color-text-secondary)]
  "
                  />

                  <input
                    id="invite-link"
                    type="url"
                    placeholder="https://studycircle.app/invite/..."
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-[var(--color-border)]
                      bg-white
                      pl-14
                      pr-5
                      text-sm
                      md:text-[15px]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-[var(--color-text-secondary)]
                      focus:border-[var(--color-primary)]
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                </div>

                <p className="mt-3 text-[12px] md:text-sm leading-6 text-[var(--color-text-secondary)]">
                  Paste the invitation link you received
                </p>
              </div>
              {/* Error Message */}
              {/* 
                Show this only when an error exists.

                Example:
                {error && (
                  ...
                )}
              */}
              {/* <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  px-5
                  py-4
                "
              >
                <p className="text-sm font-medium text-red-600">
                  Invalid invitation link. Please check the link and try again.
                </p>
              </div> */}
              {/* Footer */}
              <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    flex
                    h-12
                    md:h-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[var(--color-border)]
                    bg-white
                    px-8
                    font-medium
                    text-[var(--color-text-primary)]
                    transition-all
                    duration-200
                    hover:bg-slate-50
                  "
                >
                  Cancel
                </button>

                {/* Join */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  className="
                    flex
                    h-12
                    md:h-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-[var(--color-primary)]
                    to-blue-600
                    px-8
                    font-medium
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition-all
                    duration-200
                    hover:shadow-xl
                    hover:shadow-blue-500/10
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {/*
                    Replace this with your loading state later.

                    Example:

                    {loading ? (
                      <>
                        <svg ... />
                        Joining...
                      </>
                    ) : (
                      "Join Circle"
                    )}
                  */}
                  Join Circle
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinCircleModal;
