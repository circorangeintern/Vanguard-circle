import { useState } from "react";
import { motion } from "framer-motion";

import SidebarLogo from "../components/dashboard/sidebar/SidebarLogo";
import SidebarItem from "../components/dashboard/sidebar/SidebarItem";
import SidebarProfile from "../components/dashboard/sidebar/SidebarProfile";
import {
  mainNavigation,
  secondaryNavigation,
} from "../components/dashboard/sidebar/SidebarData";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{
        width: expanded ? 210 : 88,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="
        fixed
        left-0
        top-0
        z-50
        hidden
        h-screen
        border-r
        border-slate-200
        bg-white
        lg:flex
        lg:flex-col
      "
    >
      {/* Logo */}

      <div className="border-b border-slate-100 px-2 py-4">
        <SidebarLogo />
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll px-3 py-6">
        <div className="space-y-space-y-4">
          {mainNavigation.map((item) => (
            <SidebarItem key={item.path} item={item} expanded={expanded} />
          ))}
        </div>

        <div className="my-8 border-t border-slate-200" />

        <div className="space-y-4">
          {secondaryNavigation.map((item) => (
            <SidebarItem key={item.path} item={item} expanded={expanded} />
          ))}
        </div>
      </div>

      {/* Profile */}

      <div className="border-t border-slate-100 p-4">
        <SidebarProfile expanded={expanded} />
      </div>
    </motion.aside>
  );
};

export default Sidebar;
