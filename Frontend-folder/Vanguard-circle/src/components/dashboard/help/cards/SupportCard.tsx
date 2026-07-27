import { motion } from "framer-motion";
import { FiHeadphones, FiMessageCircle } from "react-icons/fi";

const SupportCard = () => {
  const handleContactSupport = () => {
    // TODO: Open support chat / help center
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.1,
      }}
      className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        p-5
        shadow-sm
        sm:p-6
        lg:p-8
      "
    >
      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Icon */}
          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.05,
            }}
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-50
              to-indigo-50
              sm:h-20
              sm:w-20
            "
          >
            <FiHeadphones className="text-3xl text-[var(--color-primary)] sm:text-4xl" />
          </motion.div>

          {/* Content */}
          <div className="min-w-0">
            <h2
              className="
                text-xl
                font-bold
                text-[var(--color-text-primary)]
                sm:text-2xl
              "
            >
              Can't find what you need?
            </h2>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-7
                text-[var(--color-text-secondary)]
                sm:text-base
              "
            >
              Our support team is here to help.
            </p>
          </div>
        </div>

        {/* Right */}
        <motion.button
          type="button"
          onClick={handleContactSupport}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            inline-flex
            h-12
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-[var(--color-primary)]
            bg-white
            px-6
            text-sm
            font-semibold
            text-[var(--color-primary)]
            transition-all
            duration-200
            hover:bg-blue-50
            sm:h-14
            lg:w-auto
            lg:min-w-[220px]
          "
        >
          <FiMessageCircle className="text-lg" />

          <span>Contact Support</span>
        </motion.button>
      </div>
    </motion.section>
  );
};

export default SupportCard;
