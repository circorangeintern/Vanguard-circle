import { motion } from "framer-motion";

import { Container } from "../ui";
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
          <div className="mb-10 flex items-center gap-3">
            <h2 className="font-heading text-[12px] font-semibold text-[var(--color-primary)] md:text-sm">
              Trusted by Student Communities
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex w-max"
            >
              {[...universityLogos, ...universityLogos].map((logo, index) => (
                <div
                  key={index}
                  className="
                    flex
                    h-14
                    w-32
                    shrink-0
                    items-center
                    justify-center
                    px-4
                    sm:h-16
                    sm:w-36
                    md:w-40
                    lg:h-20
                    lg:w-44
                    xl:w-48
                    "
                >
                  <img
                    src={logo}
                    alt="University Logo"
                    className="
max-h-[58px]
w-auto
object-contain
grayscale
opacity-60
transition-all
duration-300
hover:scale-105
hover:grayscale-0
hover:opacity-100
lg:max-h-[64px]
"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TrustedSection;
