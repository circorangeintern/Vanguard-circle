import { motion } from "framer-motion";

export type AssignmentFilter = "all" | "todo" | "progress" | "completed";

interface AssignmentTabsProps {
  activeTab: AssignmentFilter;
  onChange: (tab: AssignmentFilter) => void;

  counts: {
    all: number;
    todo: number;
    progress: number;
    completed: number;
  };
}

const tabs: {
  id: AssignmentFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "todo",
    label: "To Do",
  },
  {
    id: "progress",
    label: "In Progress",
  },
  {
    id: "completed",
    label: "Completed",
  },
];

const AssignmentTabs = ({
  activeTab,
  onChange,
  counts,
}: AssignmentTabsProps) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: 0.05,
      }}
      className="relative"
    >
      <div
        className="
          assignment-scroll
          flex
          gap-3
          overflow-x-auto
          pb-2
          whitespace-nowrap
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              whileTap={{
                scale: 0.97,
              }}
              className={`
                relative
                flex
                shrink-0
                items-center
                gap-3
                rounded-2xl
                border
                px-5
                py-3
                text-sm
                font-semibold
                transition-all
                duration-200
                ${
                  active
                    ? "border-[var(--color-primary)] bg-white text-[var(--color-primary)]"
                    : "border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="assignment-active-tab"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                  className="
                    absolute
                    inset-0
                    rounded-2xl
                    border
                    border-[var(--color-primary)]
                  "
                />
              )}

              <span className="relative z-10">{tab.label}</span>

              <span
                className={`
                  relative
                  z-10
                  flex
                  h-6
                  min-w-[24px]
                  items-center
                  justify-center
                  rounded-full
                  px-2
                  text-xs
                  font-bold
                  ${
                    active
                      ? "bg-violet-100 text-[var(--color-primary)]"
                      : "bg-slate-100 text-[var(--color-text-secondary)]"
                  }
                `}
              >
                {counts[tab.id]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.section>
  );
};

export default AssignmentTabs;
