import { motion } from "framer-motion";
import { HiPlus } from "react-icons/hi2";

import { auth } from "../../../lib/firebase";

interface DashboardHeroProps {
  onCreateCircle: () => void;
}

const DashboardHero = ({ onCreateCircle }: DashboardHeroProps) => {
  const user = auth!.currentUser;
  const userName = user?.displayName || user?.email?.split("@")[0] || "there";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
    flex
    flex-col
    gap-5

    md:flex-row
    md:items-start
    md:justify-between
  "
    >
      <div>
        <h1 className="font-heading text-4xl font-bold text-slate-900">
          Hello, {userName}
        </h1>

        <p className="mt-2 font-body text-lg text-slate-500">
          Let's make today productive!
        </p>
      </div>
      <button
        onClick={onCreateCircle}
        className="
            flex
            w-full
            items-center
            justify-center
            gap-2

            rounded-xl
            bg-[var(--color-primary)]

            px-6
            py-3

            text-sm
            font-medium
            text-white

            shadow-md
            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:shadow-lg

            md:w-auto
          "
      >
        <HiPlus className="text-lg" />
        Create Circle
      </button>
    </motion.section>
  );
};

export default DashboardHero;
