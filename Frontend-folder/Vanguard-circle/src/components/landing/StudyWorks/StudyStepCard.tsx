import { motion } from "framer-motion";

interface StudyStepCardProps {
  step: string;
  title: string;
  description: string;
}

const StudyStepCard = ({ step, title, description }: StudyStepCardProps) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[#EEF4FF]
        p-6 lg:p-7
        shadow-sm
      "
    >
      <p className="font-heading text-2xl lg:text-[30px] font-bold text-[var(--color-primary)]">
        {step}
      </p>

      <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
        {description}
      </p>
    </div>
  );
};

export default StudyStepCard;
