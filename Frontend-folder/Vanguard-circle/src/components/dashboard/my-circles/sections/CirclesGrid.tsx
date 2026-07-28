import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

import CircleCard from "../cards/CircleCard";
import type { Circle, ViewMode } from "../types";

interface CirclesGridProps {
  view: ViewMode;
  circles: Circle[];
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const CirclesGrid = ({ view, circles }: CirclesGridProps) => {
  if (circles.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-[var(--color-border)] bg-white px-6 py-16 text-center">
        <FiSearch className="text-3xl text-slate-300" />
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          No circles match your search or filters.
        </p>
      </div>
    );
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={
        view === "grid"
          ? `
              mt-16
              grid
              gap-6
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
            `
          : `
              mt-16
              flex
              flex-col
              gap-6
            `
      }
    >
      {circles.map((circle) => (
        <CircleCard key={circle.id} circle={circle} />
      ))}
    </motion.section>
  );
};

export default CirclesGrid;
