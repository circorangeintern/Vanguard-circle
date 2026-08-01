import { useState } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";

import { api } from "../../../../lib/api";

interface SyncNowCardProps {
  onSynced: (lastSyncedAt: string) => void;
}

const SyncNowCard = ({ onSynced }: SyncNowCardProps) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    try {
      const result = await api.post<{ syncedCount: number; lastSyncedAt: string }>("/calendar/sync");
      toast.success(
        result.syncedCount === 1
          ? "Synced 1 event to Google Calendar."
          : `Synced ${result.syncedCount} events to Google Calendar.`,
      );
      onSynced(result.lastSyncedAt);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't sync with Google Calendar.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.2,
      }}
      className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        p-5
        shadow-sm
        sm:p-6
        lg:p-8
      "
    >
      <div
        className="
          flex
          flex-col
          gap-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Content */}
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
            Sync Now
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-7 text-[var(--color-text-secondary)]">
            Manually sync your events with Google Calendar.
          </p>
        </div>

        {/* Action */}
        <motion.button
          type="button"
          onClick={handleSync}
          disabled={isSyncing}
          whileHover={{
            scale: isSyncing ? 1 : 1.02,
          }}
          whileTap={{
            scale: isSyncing ? 1 : 0.98,
          }}
          className="
            inline-flex
            h-12
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-[var(--color-primary)]
            to-[var(--color-primary-dark)]
            px-6
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-blue-500/5
            transition-all
            duration-200
            hover:shadow-xl
            hover:shadow-blue-500/10
            disabled:cursor-not-allowed
            disabled:opacity-70
            sm:h-14
            sm:w-auto
            sm:min-w-[180px]
          "
        >
          <motion.div
            animate={
              isSyncing
                ? {
                    rotate: 360,
                  }
                : {
                    rotate: 0,
                  }
            }
            transition={{
              duration: 0.8,
              repeat: isSyncing ? Infinity : 0,
              ease: "linear",
            }}
          >
            <FiRefreshCw className="text-lg" />
          </motion.div>

          {isSyncing ? "Syncing..." : "Sync Now"}
        </motion.button>
      </div>
    </motion.section>
  );
};

export default SyncNowCard;
