import { useOutletContext } from "react-router-dom";

import FeedSection from "../../../components/dashboard/circle/sections/FeedSection";
import { auth } from "../../../lib/firebase";
import type { CircleOutletContext } from "./CircleLayout";

const FeedPage = () => {
  const { group, isOrganizer } = useOutletContext<CircleOutletContext>();

  const myMembership = group.memberships.find(
    (m) => m.user.firebaseUid === auth?.currentUser?.uid,
  );

  return (
    <FeedSection
      groupId={group.id}
      currentUserId={myMembership?.user.id}
      isOrganizer={isOrganizer}
    />
  );
};

export default FeedPage;
