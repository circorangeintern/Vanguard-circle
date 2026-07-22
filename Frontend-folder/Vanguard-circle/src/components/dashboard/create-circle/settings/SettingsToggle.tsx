interface SettingsToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const SettingsToggle = ({
  checked,
  onChange,
  disabled = false,
}: SettingsToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative
        h-6
        w-11
        rounded-full
        transition-all
        duration-300

        ${checked ? "bg-[var(--color-primary)]" : "bg-slate-300"}

        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          absolute
          top-0.5
          h-5
          w-5
          rounded-full
          bg-white
          shadow-sm
          transition-all
          duration-300

          ${checked ? "left-[22px]" : "left-0.5"}
        `}
      />
    </button>
  );
};

export default SettingsToggle;
