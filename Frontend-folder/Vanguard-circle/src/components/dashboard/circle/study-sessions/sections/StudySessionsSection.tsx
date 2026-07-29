import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import SessionCard from "../cards/SessionCard";
import ScheduleSessionModal from "../modals/ScheduleSessionModal";
import { sessions } from "../data/sessions";
import type { SessionStatus } from "../types";

const filters: ("all" | SessionStatus)[] = ["all", "scheduled", "missed"];

const labels: Record<"all" | SessionStatus, string> = {
  all: "All",
  scheduled: "Session Scheduled",
  missed: "Session Missed",
};

const StudySessionsSection = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | SessionStatus>(
    "all",
  );

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const filteredSessions = useMemo(() => {
    if (activeFilter === "all") return sessions;

    return sessions.filter((session) => session.status === activeFilter);
  }, [activeFilter]);

  const upcomingSessions = filteredSessions.filter(
    (session) => session.status === "scheduled",
  );

  const missedSessions = filteredSessions.filter(
    (session) => session.status === "missed",
  );

  return (
    <section className="space-y-8">
      {/* Top Controls */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}

        <div className="flex overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-5 py-3 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-gray-50"
              }`}
            >
              {labels[filter]}
            </button>
          ))}
        </div>

        {/* Schedule Button */}

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[var(--color-primary)]
            px-5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[var(--color-primary-dark)]
          "
        >
          <FiPlus size={18} />
          Schedule Session
        </button>
      </div>

      {/* Upcoming */}

      {upcomingSessions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Upcoming Sessions
            </h2>

            <span
              className="
                rounded-full
                bg-gray-100
                px-2.5
                py-1
                text-xs
                font-semibold
                text-[var(--color-text-secondary)]
              "
            >
              {upcomingSessions.length}
            </span>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}

      {/* Missed */}

      {missedSessions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Missed Sessions
            </h2>

            <span
              className="
                rounded-full
                bg-gray-100
                px-2.5
                py-1
                text-xs
                font-semibold
                text-[var(--color-text-secondary)]
              "
            >
              {missedSessions.length}
            </span>
          </div>

          <div className="space-y-4">
            {missedSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}

      <ScheduleSessionModal
        open={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </section>
  );
};

export default StudySessionsSection;
