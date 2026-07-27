import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiTrash2 } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const CalendarConnectionCard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
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
        md:p-7
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
        <div className="flex items-start gap-5">
          {/* Logo */}
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-slate-50
              ring-1
              ring-slate-100
            "
          >
            <FcGoogle className="text-4xl" />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <h2
                className="
                  text-xl
                  font-semibold
                  text-[var(--color-text-primary)]
                "
              >
                Google Calendar
              </h2>

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-green-700
                "
              >
                <FiCheckCircle className="text-sm" />
                Connected
              </span>
            </div>

            <p
              className="
                break-all
                text-sm
                text-[var(--color-text-secondary)]
              "
            >
              opeyemi********@gmail.com
            </p>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                text-sm
                text-[var(--color-text-secondary)]
              "
            >
              <span>•</span>

              <span className="flex items-center gap-2">
                <FiClock className="text-[15px]" />
                Last synced 2 minutes ago
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            inline-flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-red-200
            bg-white
            px-6
            font-medium
            text-red-500
            transition-colors
            duration-200
            hover:bg-red-50
          "
        >
          <FiTrash2 className="text-lg" />
          Disconnect
        </motion.button>
      </div>
    </motion.section>
  );
};

export default CalendarConnectionCard;
