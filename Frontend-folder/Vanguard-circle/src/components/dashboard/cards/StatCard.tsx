import { motion } from "framer-motion";
import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: IconType;
  color?: string;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "var(--color-primary)",
}: StatCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-[24px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        {/* Content */}

        <div>
          <p
            className="
              font-body
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-3
              font-heading
              text-4xl
              font-semibold
              tracking-tight
              text-slate-900
            "
          >
            {value}
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {subtitle}
          </p>
        </div>

        {/* Icon */}

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
          "
          style={{
            backgroundColor: `${color}15`,
          }}
        >
          <Icon
            className="text-2xl"
            style={{
              color,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
