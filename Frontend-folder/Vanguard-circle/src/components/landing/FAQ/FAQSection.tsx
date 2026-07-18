import { useState } from "react";
import { motion } from "framer-motion";

import { Container } from "../../ui";

import FAQCard from "./FAQCard";
import { faqs } from "./FAQData";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="bg-[var(--color-background)] py-20 lg:py-24">
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
          <div className="mb-5 flex items-center gap-3">
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
              max-w-[620px]

              font-heading

              text-[2.3rem]
              font-bold

              leading-[1.1]

              tracking-[-0.02em]

              text-slate-900

              md:text-5xl
              lg:text-[3.1rem]
              "
          >
            Everything you need to know about StudyCircle
          </h2>

          <p
            className="
              mt-5

              max-w-[520px]

              text-base
              leading-8

              text-slate-500

              md:text-lg
              "
          >
            Here are answers to the questions students ask most before joining
            StudyCircle.
          </p>
        </motion.div>

        {/* FAQ Grid */}

        <div
          className="
            mt-14

            grid

            gap-5

            lg:grid-cols-2
            lg:gap-6
          "
        >
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
