import { useOutletContext } from "react-router-dom";

import MembersSection from "../../../components/dashboard/circle/members/sections/MembersSection";
import type { CircleOutletContext } from "./CircleLayout";

const MembersPage = () => {
  const { group } = useOutletContext<CircleOutletContext>();

  return (
    <div>
      <MembersSection memberships={group.memberships} />
    </div>
  );
};

export default MembersPage;
