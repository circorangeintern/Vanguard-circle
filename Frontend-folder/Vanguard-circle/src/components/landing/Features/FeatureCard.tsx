import { motion } from "framer-motion";
import clsx from "clsx";
import { HiArrowRight } from "react-icons/hi2";

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
    bg: "bg-blue-50",
    text: "text-[var(--color-primary)]",
  },
  indigo: {
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-500",
  },
};

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;
  const style = colors[feature.color as keyof typeof colors];

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="
        group
        flex
        h-full
        flex-col

        rounded-[24px]

        border
        border-slate-200

        bg-white

        p-8

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]
      "
    >
      {/* Icon */}

      <div
        className={clsx(
          "mb-8 flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-black/5",
          style.bg,
        )}
      >
        <Icon className={clsx("text-xl", style.text)} />
      </div>

      {/* Title */}

      <h3
        className="
          font-heading
          text-[1.45rem]
          font-semibold
          leading-tight
          tracking-[-0.02em]
          text-slate-900
        "
      >
        {feature.title}
      </h3>

      {/* Description */}

      <p
        className="
          mt-4
          flex-1

          text-[15px]
          leading-7
          text-slate-500
        "
      >
        {feature.description}
      </p>

      {/* Bottom Arrow */}

      <div className="mt-8">
        <span
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            bg-blue-50

            text-[var(--color-primary)]

            transition-all
            duration-300

            group-hover:translate-x-1
            group-hover:bg-[var(--color-primary)]
            group-hover:text-white
          "
        >
          <HiArrowRight className="text-lg" />
        </span>
      </div>
    </motion.article>
  );
};

export default FeatureCard;
