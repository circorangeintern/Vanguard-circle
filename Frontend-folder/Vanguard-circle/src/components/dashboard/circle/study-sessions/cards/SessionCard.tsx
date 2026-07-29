import { motion } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";

import SessionStatusBadge from "./SessionStatusBadge";
import type { Session } from "../types";

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const isScheduled = session.status === "scheduled";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-white
        transition-all
        hover:shadow-md
      "
    >
      {/* Desktop */}

      <div className="hidden md:flex items-center justify-between gap-8 p-6">
        {/* Left */}

        <div className="flex flex-1 items-start gap-5 min-w-0">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-[var(--color-text-primary)]">
              {session.title}
            </h3>

            <span
              className="
                mt-2
                inline-flex
                rounded-full
                bg-[var(--color-primary)]/10
                px-3
                py-1
                text-xs
                font-medium
                text-[var(--color-primary)]
              "
            >
              {session.category}
            </span>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4" />
                {session.date}
              </div>

              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                {session.time}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          {isScheduled ? (
            <button
              className="
                rounded-xl
                border
                border-[var(--color-border)]
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-[var(--color-primary)]
                transition
                hover:bg-gray-50
              "
            >
              Join Session
            </button>
          ) : (
            <SessionStatusBadge status={session.status} />
          )}
        </div>
      </div>

      {/* Mobile */}

      <div className="block p-5 md:hidden">
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-6 text-[var(--color-text-primary)]">
              {session.title}
            </h3>

            <span
              className="
                mt-2
                inline-flex
                rounded-full
                bg-[var(--color-primary)]/10
                px-3
                py-1
                text-xs
                font-medium
                text-[var(--color-primary)]
              "
            >
              {session.category}
            </span>

            <div className="mt-4 flex flex-wrap gap-5 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4" />
                {session.date}
              </div>

              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                {session.time}
              </div>
            </div>

            <div className="mt-5">
              {isScheduled ? (
                <button
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[var(--color-border)]
                    bg-white
                    py-3
                    text-sm
                    font-semibold
                    text-[var(--color-primary)]
                    transition
                    hover:bg-gray-50
                  "
                >
                  Join Session
                </button>
              ) : (
                <div className="flex justify-end">
                  <SessionStatusBadge status={session.status} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default SessionCard;
