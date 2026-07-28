import { useState } from "react";

import MyCirclesHeader from "../../components/dashboard/my-circles/sections/MyCirclesHeader";
import StatsSection from "../../components/dashboard/my-circles/sections/StatsSection";
import FiltersSection from "../../components/dashboard/my-circles/sections/FiltersSection";
import CirclesGrid from "../../components/dashboard/my-circles/sections/CirclesGrid";

import type { ViewMode } from "../../components/dashboard/my-circles/types";
import CreateCircleCard from "../../components/dashboard/my-circles/cards/CreateCircleCard";

const MyCirclesPage = () => {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <>
      <MyCirclesHeader />

      <StatsSection />

      <FiltersSection view={view} setView={setView} />

      <CirclesGrid view={view} />
      <CreateCircleCard />
    </>
  );
};

export default MyCirclesPage;
