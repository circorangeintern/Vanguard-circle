import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import AssignmentHeader from "../../components/dashboard/assignment/sections/AssignmentHeader";
import AssignmentTabs, {
  type AssignmentFilter,
} from "../../components/dashboard/assignment/sections/AssignmentTabs";
import AssignmentList from "../../components/dashboard/assignment/sections/AssignmentList";
import AssignmentStatsSection from "../../components/dashboard/assignment/sections/AssignmentStatsSection";
import AssignmentLoading from "../../components/dashboard/assignment/states/AssignmentLoading";
import AssignmentEmpty from "../../components/dashboard/assignment/states/AssignmentEmpty";

import { api } from "../../lib/api";
import { mapAssignment, type RawTask } from "../../components/dashboard/assignment/data/mapAssignment";
import type { Assignment } from "../../components/dashboard/assignment/types";

const AssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState<AssignmentFilter>("all");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ tasks: RawTask[] }>("/users/me/tasks")
      .then((data) => setAssignments(data.tasks.map(mapAssignment)))
      .catch(() => {
        toast.error("Couldn't load your assignments. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(
    () => ({
      all: assignments.length,
      todo: assignments.filter((a) => a.status === "todo").length,
      progress: assignments.filter((a) => a.status === "progress").length,
      completed: assignments.filter((a) => a.status === "completed").length,
    }),
    [assignments],
  );

  const dueThisWeek = useMemo(() => {
    const now = new Date();
    const weekOut = new Date(now);
    weekOut.setDate(weekOut.getDate() + 7);
    return assignments.filter((a) => {
      if (a.status === "completed") return false;
      const due = new Date(a.date);
      return due >= now && due <= weekOut;
    }).length;
  }, [assignments]);

  if (loading) return <AssignmentLoading />;

  return (
    <main className="space-y-8">
      <AssignmentHeader />

      {assignments.length === 0 ? (
        <AssignmentEmpty />
      ) : (
        <>
          <AssignmentTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            counts={counts}
          />

          <AssignmentList assignments={assignments} activeTab={activeTab} />
          <AssignmentStatsSection
            total={counts.all}
            dueThisWeek={dueThisWeek}
            completed={counts.completed}
          />
        </>
      )}
    </main>
  );
};

export default AssignmentsPage;
