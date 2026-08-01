import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMoreVertical } from "react-icons/fi";

import StatusBadge from "./StatusBadge";
import type { Assignment } from "../types";

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  const Icon = assignment.icon;

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className="
        border-b
        border-[var(--color-border)]
        transition-colors
        duration-200
        hover:bg-slate-50/60
        last:border-none
      "
    >
      <Link
        to={`/circles/${assignment.groupId}/task-board`}
        className="block p-5 lg:p-7"
      >
      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 lg:hidden">
        {/* Assignment */}
        <div className="flex items-start gap-4">
          <div
            className={`
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              ${assignment.iconBackground}
            `}
          >
            <Icon
              className={`
                text-2xl
                ${assignment.iconColor}
              `}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {assignment.title}
            </h3>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {assignment.circle}
            </p>
          </div>
        </div>

        {/* Due */}
        <div>
          <p
            className={`
              text-sm
              font-semibold
              ${assignment.deadlineColor}
            `}
          >
            {assignment.deadlineLabel}
          </p>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {assignment.date}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <StatusBadge status={assignment.status} />

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={(e) => e.preventDefault()}
            className="
              rounded-xl
              p-2
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-slate-100
            "
          >
            <FiMoreVertical />
          </motion.button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div
        className="
          hidden
          lg:grid
          lg:grid-cols-[minmax(0,1fr)_220px_140px_40px]
          lg:items-center
          lg:gap-8
        "
      >
        {/* Assignment */}
        <div className="flex min-w-0 items-center gap-4">
          <div
            className={`
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              ${assignment.iconBackground}
            `}
          >
            <Icon
              className={`
                text-2xl
                ${assignment.iconColor}
              `}
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-[var(--color-text-primary)]">
              {assignment.title}
            </h3>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {assignment.circle}
            </p>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <p
            className={`
              text-sm
              font-semibold
              ${assignment.deadlineColor}
            `}
          >
            {assignment.deadlineLabel}
          </p>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {assignment.date}
          </p>
        </div>

        {/* Status */}
        <div className="flex justify-center">
          <StatusBadge status={assignment.status} />
        </div>

        {/* Menu */}
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={(e) => e.preventDefault()}
            className="
              rounded-xl
              p-2
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-slate-100
            "
          >
            <FiMoreVertical />
          </motion.button>
        </div>
      </div>
      </Link>
    </motion.div>
  );
};

export default AssignmentCard;
