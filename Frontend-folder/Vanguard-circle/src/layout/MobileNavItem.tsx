import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";

interface Props {
  label: string;
  path: string;
  icon: IconType;
}

const MobileNavItem = ({ label, path, icon: Icon }: Props) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <motion.div
          whileTap={{
            scale: 0.95,
          }}
          className="
            flex
            h-full
            flex-col
            items-center
            justify-center
            gap-1
          "
        >
          <Icon
            className={`text-xl ${
              isActive ? "text-[var(--color-primary)]" : "text-slate-500"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              isActive ? "text-[var(--color-primary)]" : "text-slate-500"
            }`}
          >
            {label}
          </span>
        </motion.div>
      )}
    </NavLink>
  );
};

export default MobileNavItem;
