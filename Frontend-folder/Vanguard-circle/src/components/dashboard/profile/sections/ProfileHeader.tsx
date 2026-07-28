import { motion } from "framer-motion";

const ProfileHeader = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="flex flex-col gap-2"
    >
      <h1
        className="
          text-3xl
          font-bold
          tracking-tight
          text-[var(--color-text-primary)]
          sm:text-4xl
        "
      >
        Profile
      </h1>

      <p
        className="
          max-w-2xl
          text-sm
          leading-7
          text-[var(--color-text-secondary)]
          sm:text-base
        "
      >
        Manage your account information and preferences.
      </p>
    </motion.section>
  );
};

export default ProfileHeader;
