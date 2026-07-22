import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiCheckCircle } from "react-icons/hi2";
import { Button, Container } from "../../ui";

import hero from "../../../images/hero.webp";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const counterRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(counterRef, {
    once: true,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, 500, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [isInView]);
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-16 md:pt-20 lg:pt-36 xl:pt-24 lg:pb-16"
    >
      {/* Background Blur */}

      <div className="absolute right-[-220px] top-[-120px] h-[520px] w-[520px] rounded-full bg-blue-100 blur-[140px]" />

      <div className="absolute bottom-[-200px] left-[-180px] h-[420px] w-[420px] rounded-full bg-sky-100 blur-[120px]" />

      <Container>
        <div
          className="
            grid
            items-center
            gap-16

            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-12

            xl:min-h-[calc(100vh-80px)]
          "
        >
          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              order-2

              pb-16

              

              lg:order-1
              lg:pb-0
            
              z-10
            "
          >
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-blue-50
                px-4
                py-2
              "
            >
              <HiCheckCircle className="text-lg text-[var(--color-primary)]" />

              <span className="text-sm font-medium text-slate-700">
                Organize • Collaborate • Succeed
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              className="
                mt-7

                font-heading
                font-semibold
                tracking-tight
                text-slate-900

                text-[2.5rem]
                leading-[1.08]

                sm:text-6xl

                xl:text-7xl
              "
            >
              The smarter way
              <br />
              to study
              <span className="text-[var(--color-primary)]"> together.</span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="
                
                mt-8
                max-w-xl
                lg:max-w-md
                xl:max-w-xl
                

                text-lg
                leading-8
                text-slate-600

                
              "
            >
              StudyCircle helps university students collaborate on assignments,
              organize study sessions, share resources and stay productive from
              one modern workspace.
            </motion.p>

            {/* CTA */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
              }}
              className="
                mt-10
                flex
                flex-col
                gap-4

                sm:flex-row

                lg:justify-start
              "
            >
              <Button size="lg" onClick={() => navigate("signup")}>
                Get Started Free
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Explore Features
              </Button>
            </motion.div>

            {/* Counter */}

            <motion.div
              ref={counterRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="lg:pb-12 xl:pb-0 mt-12 flex items-center justify-start gap-4 "
            >
              <div className="text-4xl font-bold text-[var(--color-primary)]">
                {count}+
              </div>

              <div className="text-left">
                <p className="font-medium text-slate-900">Students</p>

                <p className="text-sm text-slate-500">already collaborating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
            className="
              relative
              order-1
              mx-auto
              w-full
              max-w-[620px]

              lg:order-2
            "
          >
            {/* Decorative Shape */}

            <div
              className="
                absolute
                -right-10
                top-8
                h-[88%]
                w-[92%]
                rounded-[3rem]
                bg-gradient-to-br
                from-blue-100
                via-sky-100
                to-indigo-100
                rotate-6
              "
            />

            {/* Hero Image */}

            <motion.div
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                relative
                overflow-hidden
                rounded-[2.5rem]
                bg-white
                shadow-[0_30px_80px_rgba(37,99,235,0.18)]
              "
            >
              <img
                src={hero}
                alt="Students studying together"
                className="
                  h-full
                  w-full
                  object-cover
                  rounded-[2.5rem] 
                  hidden
                  lg:block
                  cursor-pointer
                "
              />
            </motion.div>

            {/* Floating Card */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              className="
                absolute
                -bottom-6
                left-1/2
                w-[88%]
                -translate-x-1/2

                rounded-3xl
                border
                border-white/60
                bg-white/90
                p-5
                shadow-2xl
                backdrop-blur-xl

                sm:w-[360px]

                lg:-left-14
                lg:bottom-10
                lg:translate-x-0
                hidden
                lg:block
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-green-100
                  "
                >
                  <HiCheckCircle className="text-2xl text-green-600" />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-slate-900">
                    Study Session Scheduled
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Your Software Engineering group meets today at
                    <span className="font-semibold text-slate-800">
                      {" "}
                      4:00 PM
                    </span>
                  </p>

                  <div className="mt-5 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />

                    <span className="text-xs font-medium text-green-600">
                      Everyone is ready
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
