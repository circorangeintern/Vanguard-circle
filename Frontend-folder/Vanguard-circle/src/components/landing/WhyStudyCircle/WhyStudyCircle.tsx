import { motion } from "framer-motion";

import { Container } from "../../ui";

import WhyStudyCard from "./WhyStudyCard";
import { whyStudyItems } from "./WhyStudyData";

import whyStudyCircle from "../../../images/whyStudyCircle.webp";

const WhyStudyCircle = () => {
  return (
    <section
      id="why-us"
      className="bg-[var(--color-background)] py-20 lg:py-24"
    >
      <Container>
        <div className="mb-12 flex items-center gap-3">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Why Choose StudyCircle
          </span>
        </div>

        <div
          className="
          grid
          items-center
          gap-12

          lg:grid-cols-[1.05fr_0.95fr]

          xl:gap-20
          "
        >
          {/* Mobile first: checklist */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <h2
              className="
                font-heading
                text-[2.3rem]
                leading-[1.1]
                font-bold
                 tracking-[-0.02em]
                text-[var(--color-text-primary)]

                md:text-5xl
                lg:text-[3.1rem]
                "
            >
              Everything you need to study together.
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
              StudyCircle keeps assignments, reminders and collaboration in one
              place so your study group stays productive.
            </p>

            <div className="mt-10 space-y-4">
              {whyStudyItems.map((item) => (
                <WhyStudyCard key={item.text} {...item} />
              ))}
            </div>
          </motion.div>

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              order-2

              overflow-hidden

              rounded-[28px]

              border
              border-slate-200

              shadow-[0_25px_70px_rgba(15,23,42,0.08)]

              lg:order-1
              "
          >
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5 }}
              src={whyStudyCircle}
              alt="Students"
              className="
                h-[360px]
                w-full
                object-cover

                transition-transform
                duration-700

                group-hover:scale-105

                sm:h-[440px]

                lg:h-[560px]

                xl:h-[600px]
                "
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
export default WhyStudyCircle;
