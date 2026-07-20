import {
  HiOutlineCalendarDays,
  HiOutlineBookOpen,
  HiOutlineUserGroup,
} from "react-icons/hi2";

interface AgendaRowProps {
  color: "blue" | "purple" | "green";
  time: string;
  title: string;
  subtitle: string;
}

const styles = {
  blue: {
    line: "bg-blue-600",
    iconBg: "bg-blue-50",
    icon: "text-blue-600",
    Icon: HiOutlineCalendarDays,
  },
  purple: {
    line: "bg-purple-600",
    iconBg: "bg-purple-50",
    icon: "text-purple-600",
    Icon: HiOutlineUserGroup,
  },
  green: {
    line: "bg-green-600",
    iconBg: "bg-green-50",
    icon: "text-green-600",
    Icon: HiOutlineBookOpen,
  },
};

const AgendaRow = ({ color, time, title, subtitle }: AgendaRowProps) => {
  const item = styles[color];
  const Icon = item.Icon;

  return (
    <div className="flex items-start gap-4">
      {/* Timeline */}

      <div className="flex items-start gap-4">
        <div className={`mt-1 h-12 w-1 rounded-full ${item.line}`} />

        <p className="min-w-[72px] pt-1 text-xs font-semibold text-slate-900 sm:min-w-[90px] sm:text-sm">
          {time}
        </p>
      </div>

      {/* Icon */}

      <div
        className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          ${item.iconBg}
        `}
      >
        <Icon className={`text-xl ${item.icon}`} />
      </div>

      {/* Content */}

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default AgendaRow;
