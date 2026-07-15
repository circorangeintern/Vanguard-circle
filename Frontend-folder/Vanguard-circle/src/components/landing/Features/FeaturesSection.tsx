import { motion } from "framer-motion";

import { Container } from "../../ui";

import FeatureCard from "./FeatureCard";
import { features } from "./FeatureData";

const FeaturesSection = () => {
  return (
    <section className="bg-[var(--color-background)] py-24 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}

          <div className="mb-16 max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--color-primary)]" />

              <span className="font-heading text-[12px] md:text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                Features
              </span>
            </div>

            <h2
              className="
              font-heading
              text-4xl
              font-bold
              leading-tight
              text-[var(--color-text-primary)]
              md:text-5xl
            "
            >
              Everything your study group needs in one place.
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
              StudyCircle brings assignments, planning, reminders, and
              collaboration together in one modern workspace built for students.
            </p>
          </div>

          {/* Cards */}

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid items-stretch gap-7 md:grid-cols-2 xl:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                  },
                }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
