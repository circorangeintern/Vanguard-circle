import { useEffect, useState } from "react";
import { api } from "../../lib/api";

import DashboardHero from "../../components/dashboard/sections/DashboardHero";
import KeepStreak from "../../components/dashboard/sections/KeepStreak";
import MyCircles from "../../components/dashboard/sections/MyCircles";
import StatsGrid from "../../components/dashboard/sections/StatsGrid";
import TodayAgenda, { type AgendaItem } from "../../components/dashboard/sections/TodayAgenda";
import UpcomingAssignments from "../../components/dashboard/sections/UpcomingAssignments";
import CreateCircleModal from "../../components/dashboard/modals/CreateCircleModal";
import CreateSessionModal from "../../components/dashboard/modals/CreateSessionModal";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: string;
}

interface Circle {
  groupId: string;
  name: string;
  courseName?: string;
  streak: number;
  checkedInToday: boolean;
  upcomingTasks: Task[];
}

interface DashboardData {
  circles: Circle[];
  todayAgenda: AgendaItem[];
}

const DashboardPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openSessionModal, setOpenSessionModal] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const result = await api.get<DashboardData>("/users/me/dashboard");
      setData(result);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't load your dashboard. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Only the first load shows the full skeleton — a check-in/circle-creation
  // refresh already has real data on screen, so re-fetching shouldn't blank
  // the whole page back out while it loads.
  if (loading && !data) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-red-500">{error || "Something went wrong."}</p>
        <button
          type="button"
          onClick={loadDashboard}
          className="rounded-xl bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Try again
        </button>
      </div>
    );
  }

  const circles = data.circles;
  const allUpcomingTasks = circles.flatMap((c) =>
    c.upcomingTasks.map((t) => ({ ...t, circleName: c.name })),
  );
  const streakCircle = circles.length
    ? circles.reduce((best, current) =>
        current.streak > best.streak ? current : best,
      circles[0])
    : null;
  const highestStreak = streakCircle?.streak ?? 0;
  const streakCircleId = streakCircle?.groupId;
  const checkedInToday = streakCircle?.checkedInToday ?? false;
  const circlesActiveToday = circles.filter((c) => c.checkedInToday).length;

  return (
    <div className="space-y-8 lg:space-y-10">
      <DashboardHero onCreateCircle={() => setOpenCreateModal(true)} />

      <StatsGrid
        totalCircles={circles.length}
        totalUpcomingTasks={allUpcomingTasks.length}
        circlesActiveToday={circlesActiveToday}
        highestStreak={highestStreak}
      />

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <UpcomingAssignments tasks={allUpcomingTasks} />
        <TodayAgenda
          sessions={data.todayAgenda}
          onSchedule={() => setOpenSessionModal(true)}
        />
      </section>

      <MyCircles
        circles={circles}
        onCreateCircle={() => setOpenCreateModal(true)}
      />

      <KeepStreak
        streak={highestStreak}
        checkedInToday={checkedInToday}
        groupId={streakCircleId}
        onCheckInSuccess={loadDashboard}
      />
      <CreateCircleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={loadDashboard}
      />
      <CreateSessionModal
        open={openSessionModal}
        circles={circles}
        onClose={() => setOpenSessionModal(false)}
        onSuccess={loadDashboard}
      />
    </div>
  );
};

export default DashboardPage;
