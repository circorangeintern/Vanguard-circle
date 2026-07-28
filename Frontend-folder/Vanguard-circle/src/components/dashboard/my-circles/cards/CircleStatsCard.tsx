import type { ReactNode } from "react";

interface CircleStatsCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  description: string;
  iconBg: string;
}

const CircleStatsCard = ({
  icon,
  title,
  value,
  description,
  iconBg,
}: CircleStatsCardProps) => {
  return (
    <div
      className="
        flex
        items-center
        gap-5
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Icon */}
      <div
        className={`
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-2xl
          ${iconBg}
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="text-4xl font-semibold leading-none text-[var(--color-text-primary)]">
          {value}
        </h3>

        <p className="mt-2 text-[15px] font-medium text-[var(--color-text-primary)]">
          {title}
        </p>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CircleStatsCard;
