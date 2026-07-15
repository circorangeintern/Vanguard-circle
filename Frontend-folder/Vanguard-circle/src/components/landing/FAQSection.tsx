import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "../ui";

import FAQCard from "./FAQCard";
import { faqs } from "./FAQData";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-[var(--color-background)] py-24 lg:py-32">
      <Container>
        {/* Section Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-primary)]" />

            <span
              className="
              font-heading
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-[var(--color-primary)]
            "
            >
              Frequently Asked Questions
            </span>
          </div>

          <h2
            className="
            max-w-3xl
            font-heading
            text-4xl
            font-extrabold
            leading-tight
            text-[var(--color-text-primary)]
            md:text-5xl
          "
          >
            Everything you need to know about StudyCircle
          </h2>

          <p
            className="
            mt-6
            max-w-2xl
            text-lg
            leading-8
            text-[var(--color-text-secondary)]
          "
          >
            Here are answers to the questions students ask most before joining
            StudyCircle.
          </p>
        </motion.div>

        {/* FAQ Grid */}

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <FAQCard
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
