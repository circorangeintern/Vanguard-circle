import type { TaskStatus } from "../types";

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusStyles: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  todo: {
    label: "To Do",
    className: "bg-purple-50 text-purple-600 border border-purple-100",
  },

  "in-progress": {
    label: "In Progress",
    className: "bg-blue-50 text-blue-600 border border-blue-100",
  },

  done: {
    label: "Done",
    className: "bg-green-50 text-green-600 border border-green-100",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const current = statusStyles[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        whitespace-nowrap
        ${current.className}
      `}
    >
      {current.label}
    </span>
  );
};

export default StatusBadge;
