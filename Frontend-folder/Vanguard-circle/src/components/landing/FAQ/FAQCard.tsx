import { AnimatePresence, motion } from "framer-motion";
import { HiMinus, HiPlus } from "react-icons/hi2";

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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        overflow-hidden

        rounded-[24px]

        border
        border-slate-200

        bg-white

        shadow-[0_10px_35px_rgba(15,23,42,0.05)]

        transition-all
        duration-300

        hover:border-blue-200
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]
      "
    >
      <button
        onClick={onToggle}
        className="
          flex
          w-full
          items-start
          gap-5

          p-7

          text-left
        "
      >
        {/* Icon */}

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            backgroundColor: isOpen ? "#2563eb" : "#EFF6FF",
            color: isOpen ? "#ffffff" : "#2563eb",
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-full
          "
        >
          {isOpen ? (
            <HiMinus className="text-lg" />
          ) : (
            <HiPlus className="text-lg" />
          )}
        </motion.div>

        {/* Content */}

        <div className="flex-1">
          <h3
            className="
              font-heading

              text-[1.2rem]
              font-semibold

              leading-8

              text-slate-900
            "
          >
            {question}
          </h3>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="overflow-hidden"
              >
                <p
                  className="
                    pt-5

                    max-w-[95%]

                    text-[15px]
                    leading-7

                    text-slate-500
                  "
                >
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
