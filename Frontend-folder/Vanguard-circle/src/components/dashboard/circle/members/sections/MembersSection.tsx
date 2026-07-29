import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import MemberCard from "../cards/MemberCard";
import { members } from "../data/members";

const MembersSection = () => {
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    if (!search.trim()) return members;

    return members.filter((member) => {
      const value = search.toLowerCase();

      return (
        member.name.toLowerCase().includes(value) ||
        member.email.toLowerCase().includes(value)
      );
    });
  }, [search]);

  return (
    <section
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-white
        overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-[var(--color-border)]
          p-6
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Members
          </h2>

          <span
            className="
              inline-flex
              h-7
              min-w-[28px]
              items-center
              justify-center
              rounded-full
              bg-[var(--color-primary)]/10
              px-2
              text-xs
              font-semibold
              text-[var(--color-primary)]
            "
          >
            {filteredMembers.length}
          </span>
        </div>

        {/* Search */}

        <div className="relative w-full md:max-w-sm">
          <FiSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[var(--color-text-secondary)]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="
              w-full
              rounded-xl
              border
              border-[var(--color-border)]
              bg-white
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-[var(--color-primary)]
              focus:ring-2
              focus:ring-[var(--color-primary)]/10
            "
          />
        </div>
      </div>

      {/* Desktop Header */}

      <div
        className="
          hidden
          md:grid
          grid-cols-[2fr_2fr_1fr]
          gap-8
          border-b
          border-[var(--color-border)]
          bg-gray-50
          px-6
          py-4
          text-sm
          font-semibold
          text-[var(--color-text-secondary)]
        "
      >
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
      </div>

      {/* Members */}

      <div>
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};

export default MembersSection;
