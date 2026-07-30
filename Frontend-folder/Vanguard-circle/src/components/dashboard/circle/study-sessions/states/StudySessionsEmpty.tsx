import { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

import ScheduleSessionModal from "../modals/ScheduleSessionModal";

interface StudySessionsEmptyProps {
  groupId: string;
  onSuccess: () => void;
}

const StudySessionsEmpty = ({ groupId, onSuccess }: StudySessionsEmptyProps) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-[var(--color-border)]
        bg-white
        px-6
        text-center
      "
    >
      <div
        className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-[var(--color-primary)]/10
        "
      >
        <FiCalendar size={36} className="text-[var(--color-primary)]" />
      </div>

      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
        No Study Sessions Yet
      </h2>

      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-7
          text-[var(--color-text-secondary)]
        "
      >
        Schedule your first study session to help members collaborate, learn
        together, and stay engaged.
      </p>

      <button
        onClick={() => setIsScheduleModalOpen(true)}
        className="
          mt-8
          inline-flex
          h-12
          items-center
          justify-center
          rounded-xl
          bg-[var(--color-primary)]
          px-6
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-[var(--color-primary-dark)]
        "
      >
        Schedule Session
      </button>
      <ScheduleSessionModal
        open={isScheduleModalOpen}
        groupId={groupId}
        onClose={() => setIsScheduleModalOpen(false)}
        onSuccess={onSuccess}
      />
    </motion.div>
  );
};

export default StudySessionsEmpty;
