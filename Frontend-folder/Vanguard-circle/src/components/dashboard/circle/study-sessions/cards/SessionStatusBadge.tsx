import type { SessionStatus } from "../types";

interface SessionStatusBadgeProps {
  status: SessionStatus;
}

const styles: Record<
  SessionStatus,
  {
    label: string;
    className: string;
  }
> = {
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-50 text-blue-600 border border-blue-100",
  },

  missed: {
    label: "Missed",
    className: "bg-red-50 text-red-500 border border-red-100",
  },
};

const SessionStatusBadge = ({ status }: SessionStatusBadgeProps) => {
  const badge = styles[status];

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
        font-semibold
        whitespace-nowrap
        ${badge.className}
      `}
    >
      {badge.label}
    </span>
  );
};

export default SessionStatusBadge;
