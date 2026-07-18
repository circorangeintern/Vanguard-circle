import { motion } from "framer-motion";

import { Container } from "../../ui";
import { universityLogos } from "./UniversityLogos";

const TrustedSection = () => {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 flex justify-center items-center gap-3">
            <span className=" font-heading text-[12px] md:text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Trusted by
            </span>
          </div>
          <div className="relative mt-12 overflow-hidden">
            {/* Left Fade */}

            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-white via-white/90 to-transparent" />

            {/* Right Fade */}

            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-40 bg-gradient-to-l from-white via-white/90 to-transparent" />

            <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 32,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex w-max items-center gap-2 xl:gap-8"
              >
                {[...universityLogos, ...universityLogos].map((logo, index) => (
                  <div
                    key={index}
                    className=" flex h-20 w-24 md:w-36 shrink-0 items-center justify-center xl:w-44"
                  >
                    <img
                      src={logo}
                      alt="University Logo"
                      className="
                      max-h-16
              lg:max-h-20
              w-auto
              object-contain
              grayscale
              opacity-40
              transition-all
              duration-300
              hover:scale-105
              hover:opacity-100
              hover:grayscale-0
              cursor-pointer
            "
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TrustedSection;
