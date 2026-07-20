import {
  HiOutlineCodeBracket,
  HiOutlineMegaphone,
  HiOutlinePencil,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

interface CircleListItemProps {
  title: string;
  members: number;
  tasks: number;
  progress: number;
  color: "blue" | "purple" | "green";
}

const styles: Record<
  CircleListItemProps["color"],
  {
    iconBg: string;
    iconColor: string;
    progress: string;
    taskColor: string;
    Icon: IconType;
  }
> = {
  blue: {
    iconBg: "bg-blue-600",
    iconColor: "text-white",
    progress: "bg-orange-500",
    taskColor: "text-orange-600",
    Icon: HiOutlinePencil,
  },

  purple: {
    iconBg: "bg-purple-600",
    iconColor: "text-white",
    progress: "bg-amber-500",
    taskColor: "text-amber-600",
    Icon: HiOutlineMegaphone,
  },

  green: {
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    progress: "bg-emerald-500",
    taskColor: "text-emerald-600",
    Icon: HiOutlineCodeBracket,
  },
};

const CircleListItem = ({
  title,
  members,
  tasks,
  progress,
  color,
}: CircleListItemProps) => {
  const style = styles[color];
  const Icon = style.Icon;

  return (
    <div className="flex items-start gap-4 py-4">
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
          ${style.iconBg}
        `}
      >
        <Icon className={`text-xl ${style.iconColor}`} />
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-heading text-base font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">{members} members</p>
          </div>

          <span className={`text-sm font-medium ${style.taskColor}`}>
            {tasks} tasks
          </span>
        </div>

        {/* Progress */}

        <div className="mt-4 h-1.5 rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full ${style.progress}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CircleListItem;
