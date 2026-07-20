import DashboardHero from "../../components/dashboard/sections/DashboardHero";
import KeepStreak from "../../components/dashboard/sections/KeepStreak";
import MyCircles from "../../components/dashboard/sections/MyCircles";
import StatsGrid from "../../components/dashboard/sections/StatsGrid";
import TodayAgenda from "../../components/dashboard/sections/TodayAgenda";
import UpcomingAssignments from "../../components/dashboard/sections/UpcomingAssignments";

const DashboardPage = () => {
  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Hero */}

      <DashboardHero />

      {/* Stats */}

      <StatsGrid />

      {/* Assignments & Agenda */}

      <section
        className="
          grid
          gap-8

          xl:grid-cols-[1.2fr_0.8fr]
        "
      >
        <UpcomingAssignments />

        <TodayAgenda />
      </section>

      {/* Study Circles */}

      <MyCircles />

      {/* Study Streak */}

      <KeepStreak />
    </div>
  );
};

export default DashboardPage;
