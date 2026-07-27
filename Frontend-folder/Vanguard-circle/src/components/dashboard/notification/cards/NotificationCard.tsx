import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

import type { Notification } from "../types";

interface NotificationCardProps {
  notification: Notification;
  onRead: (id: string) => void;
}

const NotificationCard = ({ notification, onRead }: NotificationCardProps) => {
  const Icon = notification.icon;

  const handleClick = () => {
    if (!notification.read) {
      onRead(notification.id);
    }
  };

  return (
    <motion.button
      layout
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.995,
      }}
      onClick={handleClick}
      className="
        w-full
        text-left
        transition-colors
        duration-200
        hover:bg-slate-50/70
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          p-5
          sm:flex-row
          sm:items-start
          sm:justify-between
          sm:p-7
        "
      >
        {/* Left */}
        <div className="flex gap-4">
          {/* Icon */}
          <div
            className={`
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              ${notification.iconBackground}
            `}
          >
            <Icon
              className={`
                text-2xl
                ${notification.iconColor}
              `}
            />
          </div>

          {/* Content */}
          <div className="min-w-0">
            <h3
              className="
                text-lg
                font-semibold
                text-[var(--color-text-primary)]
              "
            >
              {notification.title}
            </h3>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-[var(--color-text-secondary)]
              "
            >
              {notification.description}
            </p>

            {notification.schedule && (
              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-[var(--color-text-secondary)]
                "
              >
                <FiCalendar className="text-base" />

                <span>{notification.schedule}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div
          className="
            flex
            items-center
            justify-between
            pl-[72px]
            sm:min-w-[110px]
            sm:flex-col
            sm:items-end
            sm:justify-start
            sm:gap-3
            sm:pl-0
          "
        >
          <span
            className="
              text-sm
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            {notification.time}
          </span>

          <motion.span
            layout
            className={`
              h-3
              w-3
              rounded-full
              ${
                notification.read ? "bg-slate-300" : "bg-[var(--color-primary)]"
              }
            `}
          />
        </div>
      </div>
    </motion.button>
  );
};

export default NotificationCard;
