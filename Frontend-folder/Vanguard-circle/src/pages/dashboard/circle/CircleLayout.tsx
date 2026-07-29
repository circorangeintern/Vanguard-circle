import { Outlet } from "react-router-dom";
import CircleHeroCard from "../../../components/dashboard/circle/cards/CircleHeroCard";
import CircleTabs from "../../../components/dashboard/circle/sections/CircleTabs";
const CircleLayout = () => {
  return (
    <div className="space-y-6">
      <CircleHeroCard
        name="Design Circle"
        category="UI/UX Design"
        description="A space for learning and discussing UI/UX design principles and best practices."
        members={8}
        icon="https://placehold.co/80x80/4F46E5/FFFFFF?text=D"
        inviteCode="https://studycircle.app/invite/design-circle"
        onInvite={() => {}}
        onSettings={() => {}}
      />

      <CircleTabs />

      <Outlet />
    </div>
  );
};

export default CircleLayout;
