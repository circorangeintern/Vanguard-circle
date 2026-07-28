import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import NotificationCard from "../cards/NotificationCard";
import NotificationHeader from "./NotificationHeader";
import NotificationLoading from "../states/NotificationLoading";
import NotificationEmpty from "../states/NotificationEmpty";

import { api } from "../../../../lib/api";
import { mapNotification, type RawNotification } from "../data/mapNotification";
import type { Notification } from "../types";

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ notifications: RawNotification[] }>("/users/me/notifications")
      .then((data) => {
        setNotifications(data.notifications.map(mapNotification));
      })
      .catch(() => {
        toast.error("Couldn't load notifications. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
    api.patch(`/users/me/notifications/${id}/read`).catch(() => {
      // Non-fatal — worst case it shows unread again after a refresh.
    });
  };

  const markAllAsRead = () => {
    if (unreadCount === 0) return;

    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    api.patch("/users/me/notifications/read-all").catch(() => {
      // Non-fatal — same as above.
    });
  };

  const groupedNotifications = useMemo(() => {
    const unread = notifications.filter((item) => !item.read);
    const read = notifications.filter((item) => item.read);
    return { unread, read };
  }, [notifications]);

  if (loading) return <NotificationLoading />;

  return (
    <div className="space-y-8">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
      />

      {notifications.length === 0 && <NotificationEmpty />}

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
