import { motion } from "framer-motion";
import clsx from "clsx";

interface FeatureCardProps {
  feature: {
    icon: any;
    title: string;
    description: string;
    color: string;
  };
}

const colors = {
  blue: {
    bg: "bg-blue-100",
    text: "text-[var(--color-primary)]",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-500",
  },
};

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;
  const style = colors[feature.color as keyof typeof colors];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="
        group
        flex
        h-full
        flex-col
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        p-7
        shadow-sm
        transition-all
        duration-300
        hover:border-[var(--color-primary)]
        hover:shadow-xl
    "
    >
      <div
        className={clsx(
          "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl",
          style.bg,
        )}
      >
        <Icon className={clsx("text-2xl", style.text)} />
      </div>

      <h3 className="min-h-[64px] font-heading text-xl font-bold leading-tight text-[var(--color-text-primary)]">
        {feature.title}
      </h3>

      <p className="mt-2 flex-1 leading-7 text-[var(--color-text-secondary)]">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
