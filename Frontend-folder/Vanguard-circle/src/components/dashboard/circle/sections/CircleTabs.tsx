import { NavLink } from "react-router-dom";
import {
  FiSettings,
  FiUsers,
  FiBookOpen,
  FiGrid,
  FiVolume2,
} from "react-icons/fi";

const tabs = [
  {
    label: "Feed",
    icon: FiVolume2,
    to: "feed",
  },
  {
    label: "Task Board",
    icon: FiGrid,
    to: "task-board",
  },
  {
    label: "Study Sessions",
    icon: FiBookOpen,
    to: "study-sessions",
  },
  {
    label: "Members",
    icon: FiUsers,
    to: "members",
  },
  {
    label: "Circle Settings",
    icon: FiSettings,
    to: "settings",
  },
];

const CircleTabs = () => {
  return (
    <div className="mt-2 border-b border-[var(--color-border)]">
      <nav className="sidebar-scroll overflow-x-auto scroll-smooth">
        <div className="flex w-max items-center gap-5 md:gap-10 lg:gap-14">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavLink
                key={tab.label}
                to={tab.to}
                end
                className={({ isActive }) =>
                  `
                  shrink-0
                  inline-flex
                  items-center
                  gap-2
                  border-b-2
                  px-1
                  py-4
                  text-sm
                  font-medium
                  whitespace-nowrap
                  transition-colors
                  duration-200
                  ${
                    isActive
                      ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                      : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  }
                  `
                }
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CircleTabs;
