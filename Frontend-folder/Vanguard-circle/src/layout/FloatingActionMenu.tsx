import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { PiUserCircleMinusLight } from "react-icons/pi";

import { performLogout } from "../lib/logout";

interface FloatingActionMenuProps {
  open: boolean;
  onToggle: () => void;
}

const actions = [
  {
    label: "Notifications",
    path: "/notifications",
    icon: HiOutlineBell,
  },

  {
    label: "Profile",
    path: "/profile",
    icon: PiUserCircleMinusLight,
  },
  {
    label: "Help",
    path: "/help",
    icon: HiOutlineQuestionMarkCircle,
  },
  {
    label: "Logout",
    path: "/logout",
    icon: HiOutlineArrowRightOnRectangle,
  },
];

const FloatingActionMenu = ({ open, onToggle }: FloatingActionMenuProps) => {
  const navigate = useNavigate();

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* Menu */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="
                fixed
                bottom-28
                left-1/2
                -translate-x-1/2
                z-50

                flex
                flex-col
                items-center
                gap-4
            "
            >
              {actions.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.path}
                    initial={{
                      opacity: 0,
                      y: 30,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                    }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.25,
                    }}
                  >
                    {item.path === "/logout" ? (
                      <button
                        type="button"
                        onClick={() => {
                          onToggle();
                          performLogout(navigate);
                        }}
                        className="
          flex
          items-center
          gap-4

          rounded-full
          bg-white

          px-6
          py-3

          shadow-xl
          transition-all
          duration-300

          hover:-translate-y-1
          hover:shadow-2xl
        "
                      >
                        <Icon className="text-xl text-[var(--color-primary)]" />

                        <span className="font-body font-medium text-slate-700">
                          {item.label}
                        </span>
                      </button>
                    ) : (
                      <NavLink
                        to={item.path}
                        onClick={onToggle}
                        className="
          flex
          items-center
          gap-4

          rounded-full
          bg-white

          px-6
          py-3

          shadow-xl
          transition-all
          duration-300

          hover:-translate-y-1
          hover:shadow-2xl
        "
                      >
                        <Icon className="text-xl text-[var(--color-primary)]" />

                        <span className="font-body font-medium text-slate-700">
                          {item.label}
                        </span>
                      </NavLink>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionMenu;
