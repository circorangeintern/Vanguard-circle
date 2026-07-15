import { motion } from "framer-motion";

import { Container } from "../ui";

import StudyStepCard from "./StudyStepCard";
import { studySteps } from "./StudyWorksData";

import studyImage from "../../images/studyworks.webp";

const StudyWorksSection = () => {
  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        {/* Heading */}

        <div className="mb-16 flex items-center gap-3">
          <span className="h-px w-10 bg-[var(--color-primary)]" />

          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            How StudyCircle Works
          </span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.25fr] xl:gap-16">
          {/* Timeline */}

          <div className="relative">
            {/* Vertical line */}

            <div className="absolute left-[9px] top-5 h-[calc(100%-48px)] w-[2px] rounded-full bg-slate-300" />

            <div className="space-y-4">
              {studySteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                  }}
                  className="relative flex gap-5"
                >
                  {/* Animated Dot */}

                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(37,99,235,.45)",
                        "0 0 0 12px rgba(37,99,235,0)",
                        "0 0 0 0 rgba(37,99,235,0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="
                      relative
                      z-10
                      mt-5
                      h-5
                      w-5
                      shrink-0
                      rounded-full
                      border-[3px]
                      border-[var(--color-primary)]
                      bg-white
                    "
                  />

                  <div className="flex-1">
                    <StudyStepCard {...item} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
    overflow-hidden
    rounded-3xl
    shadow-xl
    lg:h-[620px]
    xl:h-[650px]
  "
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={studyImage}
              alt="StudyCircle"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default StudyWorksSection;
