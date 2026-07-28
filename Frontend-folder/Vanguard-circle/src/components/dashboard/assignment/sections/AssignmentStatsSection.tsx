import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";

interface AssignmentStatsSectionProps {
  total: number;
  dueThisWeek: number;
  completed: number;
}

const stats = (total: number, dueThisWeek: number, completed: number) => [
  {
    title: "Total Assignments",
    value: total,
    icon: FiCalendar,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    title: "Due This Week",
    value: dueThisWeek,
    icon: FiClock,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Completed",
    value: completed,
    icon: FiCheckCircle,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
];

const AssignmentStatsSection = ({
  total,
  dueThisWeek,
  completed,
}: AssignmentStatsSectionProps) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: 0.15,
      }}
      className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        shadow-sm
      "
    >
      <div
        className="
          grid
          grid-cols-1
          divide-y
          divide-[var(--color-border)]
          sm:grid-cols-2
          sm:divide-x
          sm:divide-y-0
          lg:grid-cols-3
        "
      >
        {stats(total, dueThisWeek, completed).map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{
                y: -2,
              }}
              className="
                flex
                items-center
                gap-4
                p-6
                lg:p-8
              "
            >
              <div
                className={`
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  ${item.iconBg}
                `}
              >
                <Icon
                  className={`
                    text-2xl
                    ${item.iconColor}
                  `}
                />
              </div>

              <div>
                <h3
                  className="
                    text-3xl
                    font-bold
                    text-[var(--color-text-primary)]
                  "
                >
                  {item.value}
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-[var(--color-text-secondary)]
                  "
                >
                  {item.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default AssignmentStatsSection;
