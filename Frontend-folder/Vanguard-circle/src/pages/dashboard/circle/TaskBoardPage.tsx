import { useOutletContext } from "react-router-dom";

import TaskBoardSection from "../../../components/dashboard/circle/task-board/sections/TaskBoardSection";
import type { CircleOutletContext } from "./CircleLayout";

const TaskBoardPage = () => {
  const { group, refetchGroup } = useOutletContext<CircleOutletContext>();

  return (
    <div>
      <TaskBoardSection group={group} onChange={refetchGroup} />
    </div>
  );
};

export default TaskBoardPage;
