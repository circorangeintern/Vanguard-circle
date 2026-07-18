import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

import { Button, Container } from "../../ui";

const CTASection = () => {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            relative
            overflow-hidden

            rounded-[32px]

            bg-gradient-to-r
            from-[#172C82]
            via-[#2750E8]
            to-[#0F47D8]

            px-7
            py-12

            shadow-[0_35px_90px_rgba(37,99,235,.20)]

            md:px-10
            md:py-14

            lg:px-16
            lg:py-16

            xl:px-20
          "
        >
          {/* Background Glow */}

          <div
            className="
              absolute
              -left-28
              -top-24
              h-72
              w-72
              rounded-full
              bg-cyan-400/20
              blur-[110px]
            "
          />

          <div
            className="
              absolute
              -right-20
              bottom-0
              h-72
              w-72
              rounded-full
              bg-indigo-300/20
              blur-[120px]
            "
          />

          {/* Dot Pattern */}

          <div
            className="
              absolute
              right-0
              top-1/2

              h-72
              w-72

              -translate-y-1/2

              opacity-30

              [background-image:radial-gradient(white_1px,transparent_1px)]
              [background-size:8px_8px]
            "
          />

          <div
            className="
              relative
              z-10

              flex
              flex-col
              gap-12

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* LEFT */}

            <div className="max-w-xl">
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="
                  font-heading

                  text-[2rem]
                  font-semibold

                  leading-[1.08]

                  tracking-[-0.02em]

                  text-white

                  md:text-4xl
                "
              >
                Ready to make studying
                <br />
                more organized?
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.25,
                }}
                className="
                  mt-6

                  max-w-lg

                  text-base
                  leading-8

                  text-white/80

                  md:text-lg
                "
              >
                Join thousands of students using StudyCircle to organize
                assignments, collaborate with classmates and never miss an
                important deadline.
              </motion.p>
            </div>

            {/* RIGHT */}

            <div
              className="
                flex
                flex-col
                items-start

                lg:items-end
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.35,
                }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="
                    h-16

                    rounded-2xl

                    border-0

                    bg-white

                    px-10

                    font-semibold

                    text-[var(--color-primary)]
                    

                    shadow-xl

                    hover:-translate-y-1
                    hover:bg-white
                  "
                >
                  <span className="mr-3">Create Free Account</span>

                  <HiArrowRight className="text-xl" />
                </Button>
              </motion.div>

              {/* Arrow + Supporting Text */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.5,
                }}
                className="
                  mt-8

                  flex
                  items-start
                  gap-4

                  lg:mt-6
                "
              >
                {/* Curved Arrow */}

                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  className="shrink-0 text-white/70"
                >
                  <path
                    d="M6 35C6 18 17 8 33 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M27 4L34 8L30 16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p
                  className="
                    max-w-[260px]

                    text-base
                    leading-8

                    text-white/80
                  "
                >
                  Free to get started. No credit card required.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
