import {
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineFire,
} from "react-icons/hi2";

import StatCard from "../cards/StatCard";

const StatsGrid = () => {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Study Circles"
        value={8}
        subtitle="2 active today"
        icon={HiOutlineUserGroup}
        color="#2563EB"
      />

      <StatCard
        title="Assignments"
        value={12}
        subtitle="3 due this week"
        icon={HiOutlineDocumentText}
        color="#2563EB"
      />

      <StatCard
        title="Study Sessions"
        value={5}
        subtitle="Next at 4:00 PM"
        icon={HiOutlineCalendarDays}
        color="#10B981"
      />

      <StatCard
        title="Study Streak"
        value={18}
        subtitle="Keep it going!"
        icon={HiOutlineFire}
        color="#F59E0B"
      />
    </section>
  );
};

export default StatsGrid;
