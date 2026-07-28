import { motion } from "framer-motion";

import CircleCard from "../cards/CircleCard";
import { mockCircles } from "../data/mockCircles";
import type { ViewMode } from "../types";

interface CirclesGridProps {
  view: ViewMode;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const CirclesGrid = ({ view }: CirclesGridProps) => {
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
      {mockCircles.map((circle) => (
        <CircleCard key={circle.id} circle={circle} />
      ))}
    </motion.section>
  );
};

export default CirclesGrid;
