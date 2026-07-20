import AssignmentRow from "../cards/AssignmentRow";

const UpcomingAssignments = () => {
  return (
    <section
      className="
    w-full
    min-w-0
    overflow-hidden
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
            Upcoming Assignments
          </h2>

          <p className="mt-1 hidden text-sm text-slate-500 md:block">
            Stay ahead of your deadlines.
          </p>
        </div>

        <button className="text-sm font-semibold text-[var(--color-primary)]">
          View all
        </button>
      </div>

      {/* Rows */}

      <div className="mt-6 divide-y divide-slate-200">
        <AssignmentRow
          title="UI/UX Case Study Presentation"
          course="Design Systems"
          due="Due in 1 day"
          date="May 24, 2026"
          priority="High"
        />

        <AssignmentRow
          title="Database Normalization"
          course="Database Systems"
          due="Due in 2 days"
          date="May 25, 2026"
          priority="Medium"
        />

        <AssignmentRow
          title="Marketing Strategy Report"
          course="Marketing 300"
          due="Due in 4 days"
          date="May 27, 2026"
          priority="Low"
        />
      </div>
    </section>
  );
};

export default UpcomingAssignments;
