import { motion } from "framer-motion";

interface WhyStudyCardProps {
  icon: any;
  text: string;
}

const WhyStudyCard = ({ icon: Icon, text }: WhyStudyCardProps) => {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group

        flex
        items-center
        gap-5

        py-5

        border-b
        border-slate-200

        last:border-none
        cursor-pointer
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-[var(--color-primary)]

          text-white

          shadow-[0_10px_20px_rgba(37,99,235,.18)]
        "
      >
        <Icon className="text-sm" />
      </div>

      {/* Text */}

      <p
        className="
          font-heading

          text-[1.15rem]
          font-medium

          leading-7

          text-slate-900

          transition-colors
          duration-300

          group-hover:text-[var(--color-primary)]
        "
      >
        {text}
      </p>
    </motion.div>
  );
};

export default WhyStudyCard;
