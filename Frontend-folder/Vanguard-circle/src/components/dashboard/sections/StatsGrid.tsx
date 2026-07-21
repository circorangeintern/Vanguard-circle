import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineFire,
} from "react-icons/hi2";

import StatCard from "../cards/StatCard";

interface StatsGridProps {
  totalCircles: number;
  totalUpcomingTasks: number;
  circlesActiveToday: number;
  highestStreak: number;
}

const StatsGrid = ({
  totalCircles,
  totalUpcomingTasks,
  circlesActiveToday,
  highestStreak,
}: StatsGridProps) => {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Study Circles"
        value={totalCircles}
        subtitle={`${circlesActiveToday} active today`}
        icon={HiOutlineUserGroup}
        color="#2563EB"
      />

      <StatCard
        title="Assignments"
        value={totalUpcomingTasks}
        subtitle="Across all circles"
        icon={HiOutlineDocumentText}
        color="#2563EB"
      />

      <StatCard
        title="Checked In Today"
        value={circlesActiveToday}
        subtitle={`out of ${totalCircles} circles`}
        icon={HiOutlineCheckCircle}
        color="#10B981"
      />

      <StatCard
        title="Best Streak"
        value={highestStreak}
        subtitle={highestStreak > 0 ? "Keep it going!" : "Start today"}
        icon={HiOutlineFire}
        color="#F59E0B"
      />
    </section>
  );
};

export default StatsGrid;
