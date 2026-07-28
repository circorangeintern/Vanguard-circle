import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import type { IconType } from "react-icons";

interface ProfileInfoRowProps {
  icon: IconType;
  label: string;
  value: string;
  onClick?: () => void;
}

const ProfileInfoRow = ({
  icon: Icon,
  label,
  value,
  onClick,
}: ProfileInfoRowProps) => {
  return (
    <motion.button
      whileHover={{
        x: 3,
      }}
      whileTap={{
        scale: 0.99,
      }}
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-4
        border-b
        border-[var(--color-border)]
        py-5
        text-left
        transition-colors
        duration-200
        hover:bg-slate-50/70
        last:border-none
        first:pt-0
        last:pb-0
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-violet-50
        "
      >
        <Icon
          className="
            text-xl
            text-[var(--color-primary)]
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          gap-2
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <span
          className="
            font-semibold
            text-[var(--color-text-primary)]
          "
        >
          {label}
        </span>

        <span
          className="
            truncate
            text-sm
            text-[var(--color-text-secondary)]
            sm:text-base
          "
        >
          {value}
        </span>
      </div>

      {/* Arrow */}
      <FiChevronRight
        className="
          ml-2
          shrink-0
          text-xl
          text-[var(--color-text-secondary)]
        "
      />
    </motion.button>
  );
};

export default ProfileInfoRow;
