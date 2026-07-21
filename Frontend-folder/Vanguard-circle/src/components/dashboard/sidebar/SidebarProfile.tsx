import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronUp, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "../../../lib/firebase";

interface SidebarProfileProps {
  expanded: boolean;
}

const SidebarProfile = ({ expanded }: SidebarProfileProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = auth.currentUser;
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      toast.error("Couldn't log out. Please try again.");
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setMenuOpen((prev) => !prev)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`
          flex
          items-center
          overflow-hidden
          transition-all
          duration-300

          ${
            expanded
              ? "w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
              : "h-14 w-14 justify-center rounded-2xl"
          }
        `}
      >
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-primary)]

            font-heading
            text-sm
            font-semibold
            text-white
          "
        >
          {initials}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="ml-3 flex flex-1 items-center justify-between"
            >
              <div className="min-w-0 text-left">
                <h4 className="truncate font-heading text-sm font-semibold text-slate-900">
                  {displayName}
                </h4>
                <p className="truncate text-xs text-slate-500">{user?.email}</p>
              </div>

              <HiChevronUp className="text-lg text-slate-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
          >
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <HiOutlineArrowRightOnRectangle className="text-lg" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarProfile;