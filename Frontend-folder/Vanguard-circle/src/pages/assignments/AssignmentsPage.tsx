import { useMemo, useState } from "react";

import AssignmentHeader from "../../components/dashboard/assignment/sections/AssignmentHeader";
import AssignmentTabs, {
  type AssignmentFilter,
} from "../../components/dashboard/assignment/sections/AssignmentTabs";
import AssignmentList from "../../components/dashboard/assignment/sections/AssignmentList";
import AssignmentStatsSection from "../../components/dashboard/assignment/sections/AssignmentStatsSection";

import { INITIAL_ASSIGNMENTS } from "../../components/dashboard/assignment/data/assignments";

const AssignmentPage = () => {
  const [activeTab, setActiveTab] = useState<AssignmentFilter>("all");

  const counts = useMemo(
    () => ({
      all: INITIAL_ASSIGNMENTS.length,
      todo: INITIAL_ASSIGNMENTS.filter((a) => a.status === "todo").length,
      progress: INITIAL_ASSIGNMENTS.filter((a) => a.status === "progress")
        .length,
      completed: INITIAL_ASSIGNMENTS.filter((a) => a.status === "completed")
        .length,
    }),
    [],
  );

  return (
    <main className="space-y-8">
      <AssignmentHeader />

      <AssignmentTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        counts={{
          all: 7,
          todo: 3,
          progress: 2,
          completed: 2,
        }}
      />

      <AssignmentList assignments={INITIAL_ASSIGNMENTS} activeTab={activeTab} />
      <AssignmentStatsSection
        total={counts.all}
        dueThisWeek={3}
        completed={counts.completed}
      />
    </main>
  );
};

export default AssignmentPage;
