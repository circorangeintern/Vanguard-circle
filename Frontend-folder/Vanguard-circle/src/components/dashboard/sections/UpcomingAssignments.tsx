import AssignmentRow from "../cards/AssignmentRow";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  circleName: string;
}

interface UpcomingAssignmentsProps {
  tasks: Task[];
}

function formatDueLabel(dueDate: string): { due: string; priority: "High" | "Medium" | "Low" } {
  const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (days <= 1) return { due: days <= 0 ? "Overdue" : "Due tomorrow", priority: "High" };
  if (days <= 3) return { due: `Due in ${days} days`, priority: "Medium" };
  return { due: `Due in ${days} days`, priority: "Low" };
}

const UpcomingAssignments = ({ tasks }: UpcomingAssignmentsProps) => {
  return (
    <section className="w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-slate-900 md:text-2xl">
            Upcoming Assignments
          </h2>
          <p className="mt-1 hidden text-sm text-slate-500 md:block">
            Stay ahead of your deadlines.
          </p>
        </div>
        <button className="text-sm font-semibold text-[var(--color-primary)]">View all</button>
      </div>

      <div className="mt-6 divide-y divide-slate-200">
        {tasks.length === 0 && (
          <p className="py-6 text-center text-sm text-slate-400">No upcoming assignments — you're all caught up.</p>
        )}
        {tasks.slice(0, 5).map((task) => {
          const { due, priority } = formatDueLabel(task.dueDate);
          return (
            <AssignmentRow
              key={task.id}
              title={task.title}
              course={task.circleName}
              due={due}
              date={new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              priority={priority}
            />
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingAssignments;
