import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

const NotificationHeader = ({
  unreadCount,
  onMarkAllAsRead,
}: NotificationHeaderProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        flex
        flex-col
        gap-6
        lg:flex-row
        lg:items-end
        lg:justify-between
      "
    >
      {/* Left */}
      <div>
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-[var(--color-text-primary)]
            sm:text-4xl
          "
        >
          Notifications
        </h1>

        <p
          className="
            mt-2
            max-w-xl
            text-sm
            leading-7
            text-[var(--color-text-secondary)]
            sm:text-base
          "
        >
          Stay updated on what matters.
        </p>
      </div>

      {/* Right */}
      <motion.button
        type="button"
        onClick={onMarkAllAsRead}
        disabled={unreadCount === 0}
        whileHover={
          unreadCount > 0
            ? {
                scale: 1.02,
              }
            : {}
        }
        whileTap={
          unreadCount > 0
            ? {
                scale: 0.98,
              }
            : {}
        }
        className="
          inline-flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-white
          px-5
          text-sm
          font-semibold
          text-[var(--color-primary)]
          shadow-sm
          transition-all
          duration-200
          hover:border-[var(--color-primary)]
          hover:bg-blue-50
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:w-auto
        "
      >
        <FiCheckCircle className="text-lg" />

        <span>Mark all as read</span>

        {unreadCount > 0 && (
          <span
            className="
              rounded-full
              bg-[var(--color-primary)]
              px-2
              py-0.5
              text-xs
              font-bold
              text-white
            "
          >
            {unreadCount}
          </span>
        )}
      </motion.button>
    </motion.section>
  );
};

export default NotificationHeader;
