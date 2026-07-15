import { motion } from "framer-motion";

import { Container } from "../../ui";

import WhyStudyCard from "./WhyStudyCard";
import { whyStudyItems } from "./WhyStudyData";

import whyStudyCircle from "../../../images/whyStudyCircle.webp";

const WhyStudyCircle = () => {
  return (
    <section className="bg-[var(--color-background)] py-24 lg:py-32">
      <Container>
        <div className="mb-14 flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--color-primary)]" />

          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Why Choose StudyCircle
          </span>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Mobile first: checklist */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Everything you need to study together.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
              StudyCircle keeps assignments, reminders and collaboration in one
              place so your study group stays productive.
            </p>

            <div className="mt-10 space-y-5">
              {whyStudyItems.map((item) => (
                <WhyStudyCard key={item.text} {...item} />
              ))}
            </div>
          </motion.div>

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 overflow-hidden rounded-3xl lg:order-1"
          >
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
              src={whyStudyCircle}
              alt="Students"
              className="
                h-[320px]
                w-full
                object-cover
                sm:h-[420px]
                lg:h-[520px]
              "
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WhyStudyCircle;
