import { motion } from "framer-motion";

import RoleBadge from "./RoleBadge";
import type { Member } from "../types";

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        border-b
        border-[var(--color-border)]
        last:border-b-0
      "
    >
      {/* Desktop */}

      <div
        className="
          hidden
          md:grid
          grid-cols-[2fr_2fr_1fr]
          items-center
          gap-8
          px-6
          py-5
        "
      >
        {/* Name */}

        <div className="flex items-center gap-4 min-w-0">
          <img
            src={member.avatar}
            alt={member.name}
            className="
              h-12
              w-12
              rounded-full
              object-cover
              shrink-0
            "
          />

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-[var(--color-text-primary)]">
              {member.name}
            </h3>
          </div>
        </div>

        {/* Email */}

        <p className="truncate text-sm text-[var(--color-text-secondary)]">
          {member.email}
        </p>

        {/* Role */}

        <div>
          <RoleBadge role={member.role} />
        </div>
      </div>

      {/* Mobile */}

      <div className="block md:hidden px-5 py-4">
        <div className="flex items-center gap-4">
          <img
            src={member.avatar}
            alt={member.name}
            className="
              h-12
              w-12
              rounded-full
              object-cover
              shrink-0
            "
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-[var(--color-text-primary)]">
              {member.name}
            </h3>

            <p className="mt-1 truncate text-sm text-[var(--color-text-secondary)]">
              {member.email}
            </p>
          </div>

          <RoleBadge role={member.role} />
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;
