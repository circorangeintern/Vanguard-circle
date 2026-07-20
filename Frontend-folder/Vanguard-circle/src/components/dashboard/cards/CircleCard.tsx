import { motion } from "framer-motion";
import {
  HiOutlineMegaphone,
  HiOutlinePencil,
  HiOutlineCodeBracket,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

interface CircleCardProps {
  title: string;
  members: number;
  tasks: number;
  progress: number;
  color: "blue" | "purple" | "green";
}

const styles: Record<
  CircleCardProps["color"],
  {
    iconBg: string;
    iconColor: string;
    progress: string;
    Icon: IconType;
  }
> = {
  blue: {
    iconBg: "bg-blue-600",
    iconColor: "text-white",
    progress: "bg-orange-500",
    Icon: HiOutlinePencil,
  },

  purple: {
    iconBg: "bg-purple-600",
    iconColor: "text-white",
    progress: "bg-amber-500",
    Icon: HiOutlineMegaphone,
  },

  green: {
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    progress: "bg-emerald-500",
    Icon: HiOutlineCodeBracket,
  },
};

const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4",
];

const CircleCard = ({
  title,
  members,
  tasks,
  progress,
  color,
}: CircleCardProps) => {
  const style = styles[color];
  const Icon = style.Icon;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start gap-4">
        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${style.iconBg}
          `}
        >
          <Icon className={`text-2xl ${style.iconColor}`} />
        </div>

        <div>
          <h3 className="font-heading text-lg font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">{members} members</p>
        </div>
      </div>

      {/* Members */}

      <div className="mt-6 flex items-center">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt=""
            className="
              h-8
              w-8
              rounded-full
              border-2
              border-white
              object-cover

              -ml-2

              first:ml-0
            "
          />
        ))}

        <div
          className="
            ml-2
            flex
            h-8
            min-w-[34px]
            items-center
            justify-center
            rounded-full
            bg-slate-100

            px-2

            text-xs
            font-semibold
            text-slate-700
          "
        >
          +3
        </div>
      </div>

      {/* Tasks */}

      <p
        className={`
          mt-5
          text-sm
          font-medium

          ${
            color === "blue"
              ? "text-orange-600"
              : color === "purple"
                ? "text-amber-600"
                : "text-emerald-600"
          }
        `}
      >
        {tasks} tasks due
      </p>

      {/* Progress */}

      <div className="mt-3 h-1.5 rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${style.progress}`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default CircleCard;
