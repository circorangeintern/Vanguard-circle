import { AnimatePresence, motion } from "framer-motion";
import { HiChevronUp } from "react-icons/hi";

interface FAQCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQCard = ({ question, answer, isOpen, onToggle }: FAQCardProps) => {
  return (
    <motion.div
      layout
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      overflow-hidden
      rounded-3xl
      border
      border-[var(--color-border)]
      bg-[#EEF4FF]
      shadow-sm
      transition-all
      duration-300
      hover:border-[var(--color-primary)]
      hover:shadow-xl
      "
    >
      <button
        onClick={onToggle}
        className="
        flex
        w-full
        items-start
        gap-5
        p-6
        text-left
        "
      >
        {/* Icon */}

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white
          text-[var(--color-primary)]
          shadow-sm
          "
        >
          <HiChevronUp size={20} />
        </motion.div>

        {/* Text */}

        <div className="flex-1">
          <h3 className="font-heading text-xl font-semibold text-[var(--color-text-primary)]">
            {question}
          </h3>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="overflow-hidden"
              >
                <p className="pt-5 leading-7 text-[var(--color-text-secondary)]">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  );
};

export default FAQCard;
