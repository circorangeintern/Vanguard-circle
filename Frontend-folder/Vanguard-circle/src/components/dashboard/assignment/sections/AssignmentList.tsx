import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AssignmentCard from "../cards/AssignmentCard";

import type { Assignment } from "../types";
import type { AssignmentFilter } from "./AssignmentTabs";

interface AssignmentListProps {
  assignments: readonly Assignment[];
  activeTab: AssignmentFilter;
}

const AssignmentList = ({ assignments, activeTab }: AssignmentListProps) => {
  const filteredAssignments = useMemo(() => {
    if (activeTab === "all") {
      return assignments;
    }

    return assignments.filter((assignment) => assignment.status === activeTab);
  }, [assignments, activeTab]);

  return (
    <motion.section
      layout
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
      }}
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        shadow-sm
      "
    >
      <AnimatePresence mode="popLayout">
        {filteredAssignments.map((assignment) => (
          <motion.div
            key={assignment.id}
            layout
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <AssignmentCard assignment={assignment} />
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredAssignments.length === 0 && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
            flex
            min-h-[320px]
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <div>
            <h3
              className="
                text-xl
                font-semibold
                text-[var(--color-text-primary)]
              "
            >
              No assignments found
            </h3>

            <p
              className="
                mt-3
                max-w-md
                text-sm
                leading-7
                text-[var(--color-text-secondary)]
              "
            >
              There are no assignments in this category yet.
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default AssignmentList;
