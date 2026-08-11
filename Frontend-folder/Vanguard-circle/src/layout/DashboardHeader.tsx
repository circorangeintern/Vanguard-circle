import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/dashboard/common/SearchBar";
import NotificationButton from "../components/dashboard/common/NotificationButton";
import { performLogout } from "../lib/logout";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Avatar } from "../components/ui";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useCurrentUser();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const handleLogout = () => performLogout(navigate);

  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-white
        backdrop-blur-md
        border-b
        border-slate-100
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-[1440px]
          items-center
          justify-center
          px-6
          lg:px-8
        "
      >
        {/* Search */}
        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="ml-8 flex items-center gap-4">
          <NotificationButton />

          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="block transition-transform duration-300 hover:scale-105"
            >
              <Avatar name={displayName} src={user?.photoURL} size={48} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <p className="truncate px-3 py-1 text-xs text-slate-500">
                  {user?.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
