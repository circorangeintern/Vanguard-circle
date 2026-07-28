import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

import type { FAQ } from "../types";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const FAQItem = ({ faq, isOpen, onToggle }: FAQItemProps) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.25,
      }}
      className="
        overflow-hidden
        border-b
        border-[var(--color-border)]
        last:border-none
      "
    >
      <motion.button
        type="button"
        layout
        onClick={() => onToggle(faq.id)}
        whileTap={{ scale: 0.995 }}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          p-5
          text-left
          transition-colors
          duration-200
          hover:bg-slate-50
          sm:px-6
          sm:py-7
        "
      >
        <h3
          className="
            flex-1
            text-base
            font-medium
            leading-7
            text-[var(--color-text-primary)]
            sm:text-lg
          "
        >
          {faq.question}
        </h3>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            shrink-0
            text-xl
            text-[var(--color-text-secondary)]
          "
        >
          <FiChevronDown />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
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
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              className="
                px-5
                pb-6
                sm:px-6
                sm:pb-7
              "
            >
              <p
                className="
                  max-w-4xl
                  text-sm
                  leading-7
                  text-[var(--color-text-secondary)]
                  sm:text-base
                "
              >
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
