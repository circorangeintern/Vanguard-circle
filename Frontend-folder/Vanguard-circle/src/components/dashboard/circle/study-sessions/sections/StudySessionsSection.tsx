import { useCallback, useEffect, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

import SessionCard from "../cards/SessionCard";
import ScheduleSessionModal from "../modals/ScheduleSessionModal";
import StudySessionsLoading from "../states/StudySessionsLoading";
import StudySessionsEmpty from "../states/StudySessionsEmpty";
import { api } from "../../../../../lib/api";
import type { Session } from "../types";

interface RawSession {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  durationMinutes: number;
  meetingLink: string | null;
}

interface StudySessionsSectionProps {
  groupId: string;
}

const filters = ["all", "scheduled", "missed"] as const;

const labels: Record<(typeof filters)[number], string> = {
  all: "All",
  scheduled: "Session Scheduled",
  missed: "Session Missed",
};

const StudySessionsSection = ({ groupId }: StudySessionsSectionProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const loadSessions = useCallback(() => {
    setLoading(true);
    api
      .get<{ sessions: RawSession[] }>(`/groups/${groupId}/sessions`)
      .then((data) => {
        setSessions(
          data.sessions.map((s) => ({
            id: s.id,
            title: s.title,
            description: s.description || "",
            category: "Study Session",
            startTime: s.startTime,
            durationMinutes: s.durationMinutes,
            meetingLink: s.meetingLink,
          })),
        );
      })
      .catch(() => {
        toast.error("Couldn't load study sessions. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [groupId]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // Status is derived live from time, not stored — a session doesn't need a
  // background job to flip a "missed" flag, it just falls out of "scheduled"
  // the moment its end time passes.
  const now = new Date();
  const isMissed = (s: Session) =>
    now >= new Date(new Date(s.startTime).getTime() + s.durationMinutes * 60_000);

  const filteredSessions = useMemo(() => {
    if (activeFilter === "all") return sessions;
    if (activeFilter === "missed") return sessions.filter(isMissed);
    return sessions.filter((s) => !isMissed(s));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, activeFilter]);

  const upcomingSessions = filteredSessions.filter((s) => !isMissed(s));
  const missedSessions = filteredSessions.filter(isMissed);

  if (loading) return <StudySessionsLoading />;

  if (sessions.length === 0) {
    return <StudySessionsEmpty groupId={groupId} onSuccess={loadSessions} />;
  }

  return (
    <section className="space-y-8">
      {/* Top Controls */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
              {upcomingSessions.length}
            </span>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} groupId={groupId} />
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

            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
              {missedSessions.length}
            </span>
          </div>

          <div className="space-y-4">
            {missedSessions.map((session) => (
              <SessionCard key={session.id} session={session} groupId={groupId} />
            ))}
          </div>
        </div>
      )}

      <ScheduleSessionModal
        open={isScheduleModalOpen}
        groupId={groupId}
        onClose={() => setIsScheduleModalOpen(false)}
        onSuccess={loadSessions}
      />
    </section>
  );
};

export default StudySessionsSection;
