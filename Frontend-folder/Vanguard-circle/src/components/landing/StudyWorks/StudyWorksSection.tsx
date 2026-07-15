// import { motion } from "framer-motion";

import { Container } from "../../ui";

import StudyStepCard from "./StudyStepCard";
import { studySteps } from "./StudyWorksData";

import studyImage from "../../../images/studyworks.webp";

const StudyWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-white py-24 lg:py-32">
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
              {studySteps.map((item) => (
                <div key={item.step} className="relative flex gap-5">
                  {/* Animated Dot */}

                  <div
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
                </div>
              ))}
            </div>
          </div>

          {/* Image */}

          <div
            className="
              overflow-hidden
              rounded-3xl
              shadow-xl
            aspect-[4/5]
          lg:aspect-auto
          lg:h-[620px]
          xl:h-[650px]
            "
          >
            <img
              src={studyImage}
              alt="StudyCircle"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StudyWorksSection;
