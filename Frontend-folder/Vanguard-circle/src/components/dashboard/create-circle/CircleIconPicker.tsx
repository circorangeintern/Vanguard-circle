import {
  HiOutlineUserGroup,
  HiOutlineMegaphone,
  HiOutlineCodeBracket,
  HiOutlineBookOpen,
  HiOutlineBeaker,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";

interface CircleIconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const icons = [
  {
    id: "group",
    icon: HiOutlineUserGroup,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    id: "marketing",
    icon: HiOutlineMegaphone,
    color: "text-purple-600",
    background: "bg-purple-50",
  },
  {
    id: "programming",
    icon: HiOutlineCodeBracket,
    color: "text-green-600",
    background: "bg-green-50",
  },
  {
    id: "study",
    icon: HiOutlineBookOpen,
    color: "text-amber-500",
    background: "bg-amber-50",
  },
  {
    id: "science",
    icon: HiOutlineBeaker,
    color: "text-red-500",
    background: "bg-red-50",
  },
  {
    id: "more",
    icon: HiOutlineEllipsisHorizontal,
    color: "text-slate-500",
    background: "bg-slate-100",
  },
];

const CircleIconPicker = ({ value, onChange }: CircleIconPickerProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        Circle Icon
      </label>

      <div className="flex flex-wrap gap-4">
        {icons.map((item) => {
          const Icon = item.icon;

          const active = value === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border-2
                transition-all
                duration-300

                ${
                  active
                    ? "border-[var(--color-primary)] bg-blue-50 shadow-md"
                    : "border-slate-200 hover:border-blue-200 hover:-translate-y-0.5"
                }
              `}
            >
              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  ${item.background}
                `}
              >
                <Icon className={`text-2xl ${item.color}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CircleIconPicker;
