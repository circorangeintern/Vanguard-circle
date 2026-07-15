import { motion } from "framer-motion";
import { Button, Container } from "../../ui";
import hero from "../../../images/hero.webp";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background */}
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        src={hero}
        alt="Students studying together"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <Container className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center pt-20 pb-8 ">
        <div className="mx-auto  flex max-w-7xl flex-col items-center text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              max-w-7xl
              text-balance
              font-heading
              text-4xl
              font-bold
              leading-[2.8rem]
              md:leading-[3.5rem]
              lg:leading-[4rem]
              xl:leading-[4.5rem]
              tracking-normal
              text-[36px]
              md:text-[44px]
              lg:text-[55px]
              xl:text-[65px]
            "
          >
            Stay on top of every assignment and important update
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="
              mt-8
              max-w-2xl
              text-base
              text-white/85
              sm:text-lg
              lg:text-xl
             "
          >
            StudyCircle helps university students organize study groups, manage
            assignments, schedule study sessions, and collaborate in one
            dedicated workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="
              mt-10
              flex
              w-full
              max-w-md
              flex-col
              gap-4
              sm:max-w-none
              sm:flex-row
              sm:justify-center
    "
          >
            <Button variant="outline" size="lg" fullWidth>
              Explore Features
            </Button>

            <Button variant="primary" size="lg" fullWidth>
              Get Started
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
