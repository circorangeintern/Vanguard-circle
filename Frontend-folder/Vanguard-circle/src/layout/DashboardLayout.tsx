import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import MobileBottomNav from "./MobileBottomNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Sidebar />

      <main
        className="
          transition-all
          duration-300

          lg:ml-[88px]
        "
      >
        <DashboardHeader />

        <div className="px-4 pt-6 pb-28 lg:px-8 lg:pb-10 xl:px-10">
          <Outlet />
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default DashboardLayout;
