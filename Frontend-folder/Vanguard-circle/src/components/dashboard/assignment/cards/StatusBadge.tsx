interface StatusBadgeProps {
  status: "todo" | "progress" | "completed";
}

const statusStyles = {
  todo: {
    label: "To Do",
    className: "bg-violet-100 text-violet-700",
  },
  progress: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const badge = statusStyles[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-4
        py-2
        text-xs
        font-semibold
        sm:text-sm
        ${badge.className}
      `}
    >
      {badge.label}
    </span>
  );
};

export default StatusBadge;
