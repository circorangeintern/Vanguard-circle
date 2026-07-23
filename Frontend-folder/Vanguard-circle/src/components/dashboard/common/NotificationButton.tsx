import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBell } from "react-icons/hi2";

import { api } from "../../../lib/api";
import { trackNotificationOpened } from "../../../services/analytics";

interface NotificationPayload {
  type?: string;
  groupName?: string;
  memberName?: string;
  [key: string]: unknown;
}

interface Notification {
  id: string;
  payload: NotificationPayload;
  read: boolean;
  createdAt: string;
}

function describe(n: Notification): string {
  if (n.payload?.type === "member_joined") {
    return `${n.payload.memberName} joined ${n.payload.groupName}`;
  }
  return "New activity in your circles";
}

const NotificationButton = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const load = () => {
    setLoading(true);
    api
      .get<{ notifications: Notification[]; unreadCount: number }>(
        "/users/me/notifications",
      )
      .then((data) => {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      })
      .catch(() => {
        // Silent — a failed notification fetch shouldn't block the rest of the header.
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      trackNotificationOpened({ unreadCount });
    }
    if (next && unreadCount > 0) {
      api
        .patch("/users/me/notifications/read-all")
        .then(() => {
          setUnreadCount(0);
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        })
        .catch(() => {
          /* non-fatal */
        });
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-200
          bg-white
          text-slate-600
          transition-all
          duration-300
          hover:border-blue-100
          hover:text-[var(--color-primary)]
          hover:shadow-md
        "
      >
        <HiBell className="text-xl" />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-[20px]
              items-center
              justify-center
              rounded-full
              bg-[var(--color-primary)]
              px-1
              text-[10px]
              font-semibold
              text-white
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
          >
            <p className="px-3 py-2 text-sm font-semibold text-slate-900">
              Notifications
            </p>

            {loading && (
              <p className="px-3 py-4 text-sm text-slate-500">Loading...</p>
            )}

            {!loading && notifications.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-slate-400">
                No notifications yet.
              </p>
            )}

            {!loading && notifications.length > 0 && (
              <div className="max-h-80 space-y-1 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {describe(n)}
                    <p className="mt-0.5 text-xs text-slate-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationButton;
