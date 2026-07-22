import { useEffect, useState } from "react";
import { api } from "../../lib/api";

import DashboardHero from "../../components/dashboard/sections/DashboardHero";
import KeepStreak from "../../components/dashboard/sections/KeepStreak";
import MyCircles from "../../components/dashboard/sections/MyCircles";
import StatsGrid from "../../components/dashboard/sections/StatsGrid";
import TodayAgenda from "../../components/dashboard/sections/TodayAgenda";
import UpcomingAssignments from "../../components/dashboard/sections/UpcomingAssignments";
import CreateCircleModal from "../../components/dashboard/modals/CreateCircleModal";

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
}

const DashboardPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
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
      setError("Couldn't load your dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading your dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-20 text-center text-red-500">
        {error || "Something went wrong."}
      </div>
    );
  }

  const circles = data.circles;
  const allUpcomingTasks = circles.flatMap((c) =>
    c.upcomingTasks.map((t) => ({ ...t, circleName: c.name })),
  );
  const highestStreak = circles.reduce((max, c) => Math.max(max, c.streak), 0);
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
        {/* TodayAgenda shows scheduled study sessions — a feature not yet in the
            backend schema (only Tasks with due dates exist, no session scheduling).
            Left as-is with placeholder data; flag to PM as a scope question. */}
        <TodayAgenda />
      </section>

      <MyCircles
        circles={circles}
        onCreateCircle={() => setOpenCreateModal(true)}
      />

      <KeepStreak streak={highestStreak} />
      <CreateCircleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={loadDashboard}
      />
    </div>
  );
};

export default DashboardPage;
