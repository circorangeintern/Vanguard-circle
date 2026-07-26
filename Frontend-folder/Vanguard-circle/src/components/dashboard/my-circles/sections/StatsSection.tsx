import { FiCalendar, FiCheckCircle, FiUsers } from "react-icons/fi";
import { PiFireFill } from "react-icons/pi";

import CircleStatsCard from "../cards/CircleStatsCard";

const stats = [
  {
    title: "Active Circles",
    value: 3,
    description: "You're a member",
    icon: <FiUsers className="text-3xl text-purple-600" />,
    iconBg: "bg-gradient-to-br from-purple-100 to-violet-50",
  },
  {
    title: "Tasks Due",
    value: 9,
    description: "Across all circles",
    icon: <FiCheckCircle className="text-3xl text-emerald-500" />,
    iconBg: "bg-gradient-to-br from-emerald-100 to-green-50",
  },
  {
    title: "Study Sessions",
    value: 4,
    description: "This week",
    icon: <FiCalendar className="text-3xl text-blue-600" />,
    iconBg: "bg-gradient-to-br from-blue-100 to-indigo-50",
  },
  {
    title: "Day Streak",
    value: 12,
    description: "Keep it up! ",
    icon: <PiFireFill className="text-3xl text-orange-500" />,
    iconBg: "bg-gradient-to-br from-orange-100 to-red-50",
  },
];

const StatsSection = () => {
  return (
    <section className="mt-16">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <CircleStatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconBg={stat.iconBg}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
