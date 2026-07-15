import { motion } from "framer-motion";

import { Button, Container } from "../../ui";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32">
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
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
          }}
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-gradient-to-r
          from-[var(--color-secondary)]
          via-[var(--color-primary)]
          to-[#1E4FCF]
          px-8
          py-20
          text-center
          shadow-2xl
          sm:px-12
          lg:px-24
          "
        >
          {/* Background Glow */}

          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
            absolute
            -left-24
            top-0
            h-72
            w-72
            rounded-full
            bg-cyan-400/20
            blur-[100px]
            "
          />

          <motion.div
            animate={{
              x: [20, -20, 20],
              y: [15, -15, 15],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
            absolute
            -right-20
            bottom-0
            h-72
            w-72
            rounded-full
            bg-white/10
            blur-[120px]
            "
          />

          {/* Content */}

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
              }}
              className="
              font-heading
              text-4xl
              font-bold
              leading-tight
              text-white
              md:text-5xl
              "
            >
              Ready to make studying more organized?
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
              }}
              className="
              mx-auto
              mt-10
              max-w-2xl
              text-lg
              leading-8
              text-white/85
              "
            >
              Join thousands of students using StudyCircle to organize
              assignments, collaborate with classmates and never miss an
              important deadline.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.45,
              }}
              className="mt-12 flex justify-center"
            >
              <Button
                variant="outline"
                size="lg"
                className="
                border-0
                bg-white
                px-10
                text-[var(--color-primary)]
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:shadow-2xl
                "
              >
                Create Your Free Account
              </Button>
            </motion.div>
            <div className="mt-6 text-sm text-white/70">
              ✓ Free to get started • No credit card required
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
