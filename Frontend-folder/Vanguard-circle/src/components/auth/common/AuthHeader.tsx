import { motion } from "framer-motion";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h1
        className="
          font-heading
          text-[2.4rem]
          font-bold
          leading-tight
          tracking-tight
          text-[var(--color-text-primary)]
          lg:text-[1.5rem]
          xl:text-[2.2rem]
        "
      >
        {title}
      </h1>

      <p
        className="
          mx-auto
          mt-3
          max-w-sm
          text-base
          leading-7
          text-[var(--color-text-secondary)]

          lg:text-sm

        "
      >
        {subtitle}
      </p>
    </motion.div>
  );
};

export default AuthHeader;
