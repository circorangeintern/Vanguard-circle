import { useOutletContext } from "react-router-dom";

import StudySessionsSection from "../../../components/dashboard/circle/study-sessions/sections/StudySessionsSection";
import type { CircleOutletContext } from "./CircleLayout";

const StudySessionsPage = () => {
  const { group } = useOutletContext<CircleOutletContext>();

  return (
    <div className="">
      <StudySessionsSection groupId={group.id} />
    </div>
  );
};

export default StudySessionsPage;
