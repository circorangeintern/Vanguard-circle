import { motion } from "framer-motion";
import {
  HiOutlineMegaphone,
  HiOutlinePencil,
  HiOutlineCodeBracket,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

interface CircleCardProps {
  title: string;
  subtitle?: string;
  tasks: number;
  checkedInToday: boolean;
  color: "blue" | "purple" | "green";
}

const styles: Record<
  CircleCardProps["color"],
  { iconBg: string; iconColor: string; taskColor: string; Icon: IconType }
> = {
  blue: { iconBg: "bg-blue-600", iconColor: "text-white", taskColor: "text-orange-600", Icon: HiOutlinePencil },
  purple: { iconBg: "bg-purple-600", iconColor: "text-white", taskColor: "text-amber-600", Icon: HiOutlineMegaphone },
  green: { iconBg: "bg-green-100", iconColor: "text-green-600", taskColor: "text-emerald-600", Icon: HiOutlineCodeBracket },
};

const CircleCard = ({ title, subtitle, tasks, checkedInToday, color }: CircleCardProps) => {
  const style = styles[color];
  const Icon = style.Icon;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconBg}`}>
          <Icon className={`text-2xl ${style.iconColor}`} />
        </div>

        <div>
          <h3 className="font-heading text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <HiOutlineCheckCircle
          className={`text-lg ${checkedInToday ? "text-emerald-500" : "text-slate-300"}`}
        />
        <span className="text-sm text-slate-500">
          {checkedInToday ? "Checked in today" : "Not checked in yet"}
        </span>
      </div>

      <p className={`mt-4 text-sm font-medium ${style.taskColor}`}>
        {tasks} {tasks === 1 ? "task" : "tasks"} due
      </p>
    </motion.div>
  );
};

export default CircleCard;
