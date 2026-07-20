import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import type { SidebarItem as SidebarItemType } from "./SidebarData";

interface SidebarItemProps {
  item: SidebarItemType;
  expanded: boolean;
}

const SidebarItem = ({ item, expanded }: SidebarItemProps) => {
  const Icon = item.icon;

  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <motion.div
          whileHover={{
            x: 4,
            transition: {
              duration: 0.2,
            },
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "group flex h-12 items-center rounded-2xl px-4 transition-all duration-300",
            isActive
              ? "bg-[var(--color-primary)] text-white shadow-md shadow-blue-200/40"
              : "text-slate-800 hover:bg-slate-50 hover:text-[var(--color-primary)]",
          )}
        >
          {/* Icon */}

          <div
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300",
              isActive ? "bg-white/15" : "group-hover:bg-white",
            )}
          >
            <Icon className="text-[20px]" />
          </div>

          {/* Text */}

          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -12,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  ml-4
                  whitespace-nowrap

                  font-body
                  text-[14px]
                  font-medium
                "
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </NavLink>
  );
};

export default SidebarItem;
