import {
  HiOutlineUserGroup,
  HiOutlineMegaphone,
  HiOutlineCodeBracket,
  HiOutlineBookOpen,
  HiOutlineBeaker,
  HiOutlineEllipsisHorizontal,
} from "react-icons/hi2";

import { CIRCLE_ICON_EMOJI } from "../../../lib/circleIcon";

interface CircleIconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

// The button grid shows a crisp react-icon for pickability, but the value
// stored (and sent to the backend) is the matching emoji from
// CIRCLE_ICON_EMOJI — that's what every circle card/header actually renders,
// so picker and display always agree on what a circle's icon looks like.
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
          const emoji = CIRCLE_ICON_EMOJI[item.id];

          const active = value === emoji;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(emoji)}
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
