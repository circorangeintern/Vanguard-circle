import { useOutletContext } from "react-router-dom";

import CircleSettingsSection from "../../../components/dashboard/circle/settings/sections/CircleSettingsSection";
import type { CircleOutletContext } from "./CircleLayout";

const SettingsPage = () => {
  const { group, refetchGroup, isOrganizer } = useOutletContext<CircleOutletContext>();

  return (
    <div>
      <CircleSettingsSection group={group} onChange={refetchGroup} isOrganizer={isOrganizer} />
    </div>
  );
};

export default SettingsPage;
