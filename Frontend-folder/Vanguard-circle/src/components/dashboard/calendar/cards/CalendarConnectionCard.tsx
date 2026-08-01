import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiTrash2 } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

interface CalendarConnectionCardProps {
  loading: boolean;
  connected: boolean;
  email?: string;
  lastSyncedAt?: string | null;
  connecting: boolean;
  disconnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

function formatLastSynced(iso?: string | null): string {
  if (!iso) return "Not synced yet";
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);
  if (diffMinutes < 1) return "Last synced just now";
  if (diffMinutes < 60) return `Last synced ${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Last synced ${diffHours}h ago`;
  return `Last synced ${Math.floor(diffHours / 24)}d ago`;
}

const CalendarConnectionCard = ({
  loading,
  connected,
  email,
  lastSyncedAt,
  connecting,
  disconnecting,
  onConnect,
  onDisconnect,
}: CalendarConnectionCardProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.1,
      }}
      className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        p-5
        shadow-sm
        md:p-7
      "
    >
      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}
        <div className="flex items-start gap-5">
          {/* Logo */}
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-slate-50
              ring-1
              ring-slate-100
            "
          >
            <FcGoogle className="text-4xl" />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <h2
                className="
                  text-xl
                  font-semibold
                  text-[var(--color-text-primary)]
                "
              >
                Google Calendar
              </h2>

              {!loading && (
                <span
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-medium
                    ${
                      connected
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-[var(--color-text-secondary)]"
                    }
                  `}
                >
                  {connected && <FiCheckCircle className="text-sm" />}
                  {connected ? "Connected" : "Not Connected"}
                </span>
              )}
            </div>

            {loading ? (
              <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
            ) : connected ? (
              <>
                <p className="break-all text-sm text-[var(--color-text-secondary)]">{email}</p>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    text-sm
                    text-[var(--color-text-secondary)]
                  "
                >
                  <span className="flex items-center gap-2">
                    <FiClock className="text-[15px]" />
                    {formatLastSynced(lastSyncedAt)}
                  </span>
                </div>
              </>
            ) : (
              <p className="max-w-md text-sm text-[var(--color-text-secondary)]">
                Connect your Google account to push study sessions and assignment deadlines to
                your calendar.
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        {!loading && (
          <motion.button
            onClick={connected ? onDisconnect : onConnect}
            disabled={connected ? disconnecting : connecting}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className={`
              inline-flex
              h-12
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              px-6
              font-medium
              transition-colors
              duration-200
              disabled:cursor-not-allowed
              disabled:opacity-60
              ${
                connected
                  ? "border-red-200 bg-white text-red-500 hover:bg-red-50"
                  : "border-transparent bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
              }
            `}
          >
            {connected ? (
              <>
                <FiTrash2 className="text-lg" />
                {disconnecting ? "Disconnecting..." : "Disconnect"}
              </>
            ) : (
              <>
                <FcGoogle className="text-lg" />
                {connecting ? "Redirecting..." : "Connect Google Calendar"}
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.section>
  );
};

export default CalendarConnectionCard;
