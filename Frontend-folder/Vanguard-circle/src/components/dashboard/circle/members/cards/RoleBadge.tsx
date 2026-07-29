import type { MemberRole } from "../types";

interface RoleBadgeProps {
  role: MemberRole;
}

const badgeStyles: Record<
  MemberRole,
  {
    label: string;
    className: string;
  }
> = {
  creator: {
    label: "Creator",
    className: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  },

  member: {
    label: "Member",
    className: "bg-gray-100 text-[var(--color-text-secondary)]",
  },
};

const RoleBadge = ({ role }: RoleBadgeProps) => {
  const badge = badgeStyles[role];

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        whitespace-nowrap
        ${badge.className}
      `}
    >
      {badge.label}
    </span>
  );
};

export default RoleBadge;
