import { HiChevronDown } from "react-icons/hi2";

interface CircleCategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  "Programming",
  "Design",
  "Marketing",
  "Science",
  "Engineering",
  "Business",
  "Mathematics",
  "Language",
  "Other",
];

const CircleCategorySelect = ({
  value,
  onChange,
}: CircleCategorySelectProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="circle-category"
        className="block text-sm font-medium text-slate-700"
      >
        Category
      </label>

      <div className="relative">
        <select
          id="circle-category"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            h-12
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            pr-12
            text-sm
            text-slate-700
            outline-none
            transition-all
            duration-200

            focus:border-[var(--color-primary)]
            focus:ring-4
            focus:ring-blue-100
          "
        >
          <option value="">Select a category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <HiChevronDown
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-lg
            text-slate-400
          "
        />
      </div>
    </div>
  );
};

export default CircleCategorySelect;
