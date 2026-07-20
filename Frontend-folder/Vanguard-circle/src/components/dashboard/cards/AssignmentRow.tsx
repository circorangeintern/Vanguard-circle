import { HiOutlineDocumentText } from "react-icons/hi2";

interface AssignmentRowProps {
  title: string;
  course: string;
  due: string;
  date: string;
  priority: "High" | "Medium" | "Low";
}

const badgeStyles = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-orange-50 text-orange-500",
  Low: "bg-green-50 text-green-500",
};

const iconStyles = {
  High: "bg-red-50 text-red-500",
  Medium: "bg-orange-50 text-orange-500",
  Low: "bg-green-50 text-green-500",
};

const AssignmentRow = ({
  title,
  course,
  due,
  date,
  priority,
}: AssignmentRowProps) => {
  return (
    <>
      {/* Desktop */}

      <div className="hidden items-center justify-between gap-6 py-5 md:flex">
        <div className="flex flex-1 items-center gap-4">
          <div
            className={`
              flex h-12 w-12 items-center justify-center rounded-2xl
              ${iconStyles[priority]}
            `}
          >
            <HiOutlineDocumentText className="text-xl" />
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">{course}</p>
          </div>
        </div>

        <div className="min-w-[120px]">
          <p className="font-medium text-slate-900">{due}</p>

          <p className="mt-1 text-sm text-slate-500">{date}</p>
        </div>

        <span
          className={`
            rounded-full px-4 py-2 text-sm font-medium
            ${badgeStyles[priority]}
          `}
        >
          {priority}
        </span>
      </div>

      {/* Mobile */}

      {/* Mobile */}

      <div className="flex items-start gap-3 py-4 md:hidden">
        {/* Icon */}

        <div
          className={`
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-xl
      ${iconStyles[priority]}
    `}
        >
          <HiOutlineDocumentText className="text-lg" />
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {title}
            </h3>

            <span
              className={`
          shrink-0
          rounded-full
          px-2.5
          py-1
          text-[11px]
          font-medium
          ${badgeStyles[priority]}
        `}
            >
              {priority}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">{due}</p>
        </div>
      </div>
    </>
  );
};

export default AssignmentRow;
