import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiPlus,
  HiXMark,
} from "react-icons/hi2";

import FloatingActionMenu from "./FloatingActionMenu";
import MobileNavItem from "./MobileNavItem";

const navigation = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: HiOutlineHome,
  },
  {
    label: "My Circles",
    path: "/dashboard/circles",
    icon: HiOutlineUserGroup,
  },
  {
    label: "Calendar",
    path: "/dashboard/calendar",
    icon: HiOutlineCalendarDays,
  },
  {
    label: "Assignments",
    path: "/dashboard/assignments",
    icon: HiOutlineDocumentText,
  },
];

const MobileBottomNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingActionMenu open={open} onToggle={() => setOpen(!open)} />

      <nav
        className="
    fixed
    bottom-0
    left-0
    right-0
    z-40
    border-t
    border-slate-200
    bg-white/95
    backdrop-blur-xl

  

    lg:hidden
  "
      >
        <div className="grid h-20 grid-cols-5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            animate={{
              rotate: open ? 90 : 0,
              scale: open ? 1.08 : 1,
            }}
            onClick={() => setOpen(!open)}
            className="
  absolute
  inset-x-0
  -top-8
  mx-auto

  z-50

  flex
  h-16
  w-16
  items-center
  justify-center

  rounded-full
  border-4
  border-white
  bg-[var(--color-primary)]
  text-white
  shadow-xl
"
          >
            {open ? (
              <HiXMark className="text-3xl" />
            ) : (
              <HiPlus className="text-3xl" />
            )}
          </motion.button>
          <MobileNavItem {...navigation[0]} />

          <MobileNavItem {...navigation[1]} />

          {/* FAB Space */}

          <div />

          <MobileNavItem {...navigation[2]} />

          <MobileNavItem {...navigation[3]} />
        </div>
      </nav>
    </>
  );
};

export default MobileBottomNav;
