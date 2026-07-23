import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

import SearchBar from "../components/dashboard/common/SearchBar";
import NotificationButton from "../components/dashboard/common/NotificationButton";
import { auth } from "../lib/firebase";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = auth?.currentUser;
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut(auth!);
      navigate("/login");
    } catch {
      toast.error("Couldn't log out. Please try again.");
    }
  };

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
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[var(--color-primary)]
                font-heading
                text-sm
                font-semibold
                text-white
                transition-transform
                duration-300
                hover:scale-105
              "
            >
              {initials}
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
