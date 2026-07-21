import {
  HiOutlineCodeBracket,
  HiOutlineMegaphone,
  HiOutlinePencil,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

interface CircleListItemProps {
  title: string;
  subtitle?: string;
  tasks: number;
  checkedInToday: boolean;
  color: "blue" | "purple" | "green";
}

const styles: Record<
  CircleListItemProps["color"],
  { iconBg: string; iconColor: string; taskColor: string; Icon: IconType }
> = {
  blue: { iconBg: "bg-blue-600", iconColor: "text-white", taskColor: "text-orange-600", Icon: HiOutlinePencil },
  purple: { iconBg: "bg-purple-600", iconColor: "text-white", taskColor: "text-amber-600", Icon: HiOutlineMegaphone },
  green: { iconBg: "bg-green-100", iconColor: "text-green-600", taskColor: "text-emerald-600", Icon: HiOutlineCodeBracket },
};

const CircleListItem = ({ title, subtitle, tasks, checkedInToday, color }: CircleListItemProps) => {
  const style = styles[color];
  const Icon = style.Icon;

  return (
    <div className="flex items-start gap-4 py-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.iconBg}`}>
        <Icon className={`text-xl ${style.iconColor}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-heading text-base font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>

          <span className={`text-sm font-medium ${style.taskColor}`}>{tasks} tasks</span>
        </div>

        <p className={`mt-2 text-xs ${checkedInToday ? "text-emerald-600" : "text-slate-400"}`}>
          {checkedInToday ? "✓ Checked in today" : "Not checked in yet"}
        </p>
      </div>
    </div>
  );
};

export default CircleListItem;
