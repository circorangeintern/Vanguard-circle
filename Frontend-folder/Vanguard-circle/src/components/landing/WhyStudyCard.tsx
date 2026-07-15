import { motion } from "framer-motion";

interface WhyStudyCardProps {
  icon: any;
  text: string;
}

const WhyStudyCard = ({ icon: Icon, text }: WhyStudyCardProps) => {
  return (
    <motion.div
      whileHover={{
        x: 8,
      }}
      transition={{ duration: 0.25 }}
      className="
      group
      flex
      items-center
      gap-4
      rounded-2xl
      border
      border-transparent
      bg-white
      p-4
      shadow-sm
      transition-all
      duration-300
      hover:border-[var(--color-primary)]
      hover:shadow-lg
    "
    >
      <div
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-[var(--color-primary)]
        text-white
      "
      >
        <Icon className="text-lg" />
      </div>

      <p className="font-medium text-[var(--color-text-primary)]">{text}</p>
    </motion.div>
  );
};

export default WhyStudyCard;
