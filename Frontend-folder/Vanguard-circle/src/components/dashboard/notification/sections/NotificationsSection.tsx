import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import NotificationCard from "../cards/NotificationCard";
import NotificationHeader from "./NotificationHeader";

import { INITIAL_NOTIFICATIONS } from "../data/notifications";
import type { Notification } from "../types";

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    ...INITIAL_NOTIFICATIONS,
  ]);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item,
      ),
    );

    // TODO: Persist read state
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) return;

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      })),
    );

    // TODO: Persist read state
  };

  const groupedNotifications = useMemo(() => {
    const unread = notifications.filter((item) => !item.read);
    const read = notifications.filter((item) => item.read);

    return {
      unread,
      read,
    };
  }, [notifications]);

  return (
    <div className="space-y-8">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
      />

      {/* Unread */}
      {groupedNotifications.unread.length > 0 && (
        <motion.section
          layout
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[var(--color-border)]
            bg-white
            shadow-sm
          "
        >
          <AnimatePresence mode="popLayout">
            {groupedNotifications.unread.map((notification, index) => (
              <motion.div
                key={notification.id}
                layout
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  border-b
                  border-[var(--color-border)]
                  last:border-none
                "
              >
                <NotificationCard
                  notification={notification}
                  onRead={markAsRead}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
      )}

      {/* Read */}
      {groupedNotifications.read.length > 0 && (
        <motion.section
          layout
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[var(--color-border)]
            bg-white
            shadow-sm
          "
        >
          <AnimatePresence mode="popLayout">
            {groupedNotifications.read.map((notification, index) => (
              <motion.div
                key={notification.id}
                layout
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  border-b
                  border-[var(--color-border)]
                  last:border-none
                "
              >
                <NotificationCard
                  notification={notification}
                  onRead={markAsRead}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
      )}
    </div>
  );
};

export default NotificationsSection;
