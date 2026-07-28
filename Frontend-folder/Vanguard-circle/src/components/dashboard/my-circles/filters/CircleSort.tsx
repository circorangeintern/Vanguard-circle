import { FiChevronDown } from "react-icons/fi";

interface CircleSortProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  "Recently Active",
  "Newest",
  "Oldest",
  "A - Z",
  "Most Members",
  "Highest Streak",
];

const CircleSort = ({ value, onChange }: CircleSortProps) => {
  return (
    <div className="w-full md:w-[190px]">
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-12
            w-full
            appearance-none
            rounded-xl
            border
            border-[var(--color-border)]
            bg-white
            px-4
            pr-10
            text-[15px]
            font-medium
            text-[var(--color-text-primary)]
            outline-none
            transition-all
            duration-200
            focus:border-[var(--color-primary)]
            focus:ring-4
            focus:ring-blue-100
          "
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <FiChevronDown
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-lg
            text-[var(--color-text-secondary)]
          "
        />
      </div>
    </div>
  );
};

export default CircleSort;
