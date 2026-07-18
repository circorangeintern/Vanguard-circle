// import { motion } from "framer-motion";

import { Container } from "../../ui";

import StudyStepCard from "./StudyStepCard";
import { studySteps } from "./StudyWorksData";

import studyImage from "../../../images/studyworks.webp";

const StudyWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-24">
      <Container>
        {/* Heading */}

        <div className="mb-12 flex items-center gap-3">
          <span className="font-heading text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            How StudyCircle Works
          </span>
        </div>

        <div
          className="
            grid
            items-center
            gap-14

            lg:grid-cols-[0.9fr_1.1fr]

            xl:gap-20
            "
        >
          {/* Timeline */}

          <div className="relative">
            {/* Vertical line */}

            <div
              className="
                absolute
                left-[10px]
                top-6
                h-[calc(100%-56px)]
                w-px
                bg-gradient-to-b
                from-blue-200
                via-slate-200
                to-slate-200
              "
            />

            <div className="space-y-4">
              {studySteps.map((item) => (
                <div key={item.step} className="relative flex gap-5">
                  {/* Animated Dot */}

                  <div
                    className="
                      relative
                      z-10
                      mt-5

                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center

                      rounded-full
                      bg-white
                      ring-2
                      ring-blue-500
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  </div>

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
              relative
              overflow-hidden

              rounded-[28px]

              border
              border-slate-200

              shadow-[0_30px_80px_rgba(15,23,42,0.08)]

              aspect-[4/5]

              lg:h-[560px]
              lg:aspect-auto

              xl:h-[620px]
            "
          >
            <img
              src={studyImage}
              alt="StudyCircle"
              className="h-full w-full object-cover"
            />
            <div
              className="
                  absolute
                  bottom-6
                  right-6

                  flex
                  items-center
                  gap-4

                  rounded-2xl

                  bg-white

                  px-5
                  py-4

                  shadow-xl
                "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  bg-blue-50

                  text-blue-600
                "
              >
                👥
              </div>

              <p className="font-medium leading-6 text-slate-900">
                Better together.
                <br />
                smarter together.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StudyWorksSection;
