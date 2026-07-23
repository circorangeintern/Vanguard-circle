import AgendaRow from "../cards/AgendaRow";
import { HiOutlineCalendarDays } from "react-icons/hi2";

export interface AgendaItem {
  id: string;
  title: string;
  startTime: string;
  groupName: string;
}

interface TodayAgendaProps {
  sessions: AgendaItem[];
  onSchedule: () => void;
}

const COLORS = ["blue", "purple", "green"] as const;

const TodayAgenda = ({ sessions, onSchedule }: TodayAgendaProps) => {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        sm:p-6
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-slate-900 md:text-2xl">
            Today's Agenda
          </h2>

          <p className="mt-1 hidden text-sm text-slate-500 md:block">
            Your upcoming study sessions for today.
          </p>
        </div>

        <button
          onClick={onSchedule}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] sm:text-sm"
        >
          <HiOutlineCalendarDays className="text-base" />
          Schedule
        </button>
      </div>

      {/* Timeline */}

      {sessions.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-slate-500">
            Nothing scheduled for today.
          </p>
          <button
            onClick={onSchedule}
            className="mt-3 text-sm font-semibold text-[var(--color-primary)]"
          >
            Schedule a session
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {sessions.map((s, i) => (
            <AgendaRow
              key={s.id}
              color={COLORS[i % COLORS.length]}
              time={new Date(s.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              title={s.title}
              subtitle={s.groupName}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TodayAgenda;
