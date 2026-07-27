import { useState } from "react";
import { motion } from "framer-motion";

import FAQItem from "../cards/FAQItem";
import { INITIAL_FAQS } from "../data/faqs";

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(
    INITIAL_FAQS[0]?.id ?? null,
  );

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));

    // TODO: Track FAQ interactions (analytics/backend)
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.15,
      }}
      className="space-y-5"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
          Frequently Asked Questions
        </h2>
      </div>

      {/* Accordion */}
      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-[var(--color-border)]
          bg-white
          shadow-sm
        "
      >
        {INITIAL_FAQS.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default FAQSection;
