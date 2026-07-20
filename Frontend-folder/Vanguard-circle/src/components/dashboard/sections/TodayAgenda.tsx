import AgendaRow from "../cards/AgendaRow";

const TodayAgenda = () => {
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

        <button className="text-xs font-semibold text-[var(--color-primary)] sm:text-sm">
          View calendar
        </button>
      </div>

      {/* Timeline */}

      <div className="mt-6 space-y-6">
        <AgendaRow
          color="blue"
          time="10:00 AM"
          title="Study Session"
          subtitle="Design Circle"
        />

        <AgendaRow
          color="purple"
          time="02:00 PM"
          title="Group Check-in"
          subtitle="Marketing Circle"
        />

        <AgendaRow
          color="green"
          time="06:00 PM"
          title="Study Session"
          subtitle="CS 302 Circle"
        />
      </div>
    </section>
  );
};

export default TodayAgenda;
