import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

import type { SyncSetting } from "../types";

interface SettingRowProps {
  setting: SyncSetting;
  onToggle: (id: string) => void;
}

const SettingRow = ({ setting, onToggle }: SettingRowProps) => {
  const Icon = setting.icon;

  const handleToggle = () => {
    onToggle(setting.id);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className="
        flex
        items-center
        gap-3
        py-5
        first:pt-0
        last:pb-0
        sm:gap-4
        sm:py-6
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-indigo-50
          sm:h-14
          sm:w-14
        "
      >
        <Icon className="text-xl text-[var(--color-primary)] sm:text-2xl" />
      </div>

      {/* Checkbox */}
      <button
        type="button"
        aria-label={`Toggle ${setting.title}`}
        onClick={handleToggle}
        disabled={setting.disabled}
        className={`
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-md
          border
          transition-all
          duration-200
          ${
            setting.enabled
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
              : "border-[var(--color-border)] bg-white"
          }
        `}
      >
        {setting.enabled && <FiCheck className="text-sm text-white" />}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] sm:text-lg">
          {setting.title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
          {setting.description}
        </p>
      </div>

      {/* Toggle */}
      <motion.button
        type="button"
        aria-label={`Toggle ${setting.title}`}
        disabled={setting.disabled}
        onClick={handleToggle}
        whileTap={{ scale: 0.95 }}
        className={`
          relative
          h-7
          w-12
          shrink-0
          rounded-full
          transition-colors
          duration-300
          sm:h-8
          sm:w-14
          ${setting.enabled ? "bg-[var(--color-primary)]" : "bg-slate-300"}
        `}
      >
        <motion.span
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            shadow-md
            sm:h-6
            sm:w-6
            ${setting.enabled ? "left-6 sm:left-7" : "left-1"}
          `}
        />
      </motion.button>
    </motion.div>
  );
};

export default SettingRow;
