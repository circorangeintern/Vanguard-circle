import { FiSearch } from "react-icons/fi";

interface CircleSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CircleSearch = ({
  value,
  onChange,
  placeholder = "Search your circles...",
}: CircleSearchProps) => {
  return (
    <div className="relative w-full">
      <FiSearch
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-lg
          text-[var(--color-text-secondary)]
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-[var(--color-border)]
          bg-white
          pl-11
          pr-4
          text-[15px]
          text-[var(--color-text-primary)]
          outline-none
          transition-all
          duration-200
          placeholder:text-[var(--color-text-secondary)]
          focus:border-[var(--color-primary)]
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
};

export default CircleSearch;
