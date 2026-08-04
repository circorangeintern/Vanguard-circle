import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";

import SessionStatusBadge from "./SessionStatusBadge";
import type { Session, SessionStatus } from "../types";
import { trackSessionMissed } from "../../../../../services/analytics";

interface SessionCardProps {
  session: Session;
  groupId: string;
}

function formatCountdown(startTime: Date, endTime: Date, now: Date): string {
  if (now >= startTime && now < endTime) return "Live now";

  const diffMs = startTime.getTime() - now.getTime();
  if (diffMs <= 0) return "Ended";

  const minutes = Math.floor(diffMs / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${mins}m`;
  return `Starts in ${mins}m`;
}

const SessionCard = ({ session, groupId }: SessionCardProps) => {
  const [now, setNow] = useState(() => new Date());
  const hasTrackedMissed = useRef(false);

  useEffect(() => {
    // Every 30s is plenty for a countdown measured in minutes/hours — no
    // need for a per-second tick that would just churn re-renders.
    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  const startTime = new Date(session.startTime);
  const endTime = new Date(startTime.getTime() + session.durationMinutes * 60_000);
  const isLive = now >= startTime && now < endTime;
  const status: SessionStatus = now >= endTime ? "missed" : "scheduled";
  const countdown = formatCountdown(startTime, endTime, now);

  // Fires once per card instance the moment a session's end time passes —
  // guarded by a ref (not state) so it doesn't re-fire on every 30s tick
  // while status stays "missed".
  useEffect(() => {
    if (status === "missed" && !hasTrackedMissed.current) {
      hasTrackedMissed.current = true;
      trackSessionMissed({ circleId: groupId });
    }
  }, [status, groupId]);

  const dateLabel = startTime.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  const timeLabel = startTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  const JoinButton = ({ full = false }: { full?: boolean }) =>
    session.meetingLink ? (
      <a
        href={session.meetingLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          ${full ? "w-full" : ""}
          rounded-xl
          border
          px-6
          py-3
          text-center
          text-sm
          font-semibold
          transition
          ${
            isLive
              ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              : "border-[var(--color-border)] bg-white text-[var(--color-primary)] hover:bg-gray-50"
          }
        `}
      >
        {isLive ? "Join Now" : "Join Session"}
      </a>
    ) : (
      <span
        className={`${full ? "block w-full text-center" : ""} rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-slate-400`}
      >
        No link yet
      </span>
    );

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
              className={`
                mt-2
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${
                  isLive
                    ? "bg-green-100 text-green-700"
                    : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                }
              `}
            >
              {countdown}
            </span>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4" />
                {dateLabel}
              </div>

              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                {timeLabel} · {session.durationMinutes} min
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          {status === "scheduled" ? <JoinButton /> : <SessionStatusBadge status={status} />}
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
              className={`
                mt-2
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${
                  isLive
                    ? "bg-green-100 text-green-700"
                    : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                }
              `}
            >
              {countdown}
            </span>

            <div className="mt-4 flex flex-wrap gap-5 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4" />
                {dateLabel}
              </div>

              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                {timeLabel} · {session.durationMinutes} min
              </div>
            </div>

            <div className="mt-5">
              {status === "scheduled" ? (
                <JoinButton full />
              ) : (
                <div className="flex justify-end">
                  <SessionStatusBadge status={status} />
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
