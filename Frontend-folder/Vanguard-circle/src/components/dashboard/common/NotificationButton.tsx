import { motion } from "framer-motion";
import { HiBell } from "react-icons/hi2";

interface NotificationButtonProps {
  count?: number;
}

const NotificationButton = ({ count = 3 }: NotificationButtonProps) => {
  return (
    <motion.button
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-slate-200
        bg-white

        text-slate-600

        transition-all
        duration-300

        hover:border-blue-100
        hover:text-[var(--color-primary)]
        hover:shadow-md
      "
    >
      <HiBell className="text-xl" />

      {count > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1

            flex
            h-5
            min-w-[20px]
            items-center
            justify-center

            rounded-full
            bg-[var(--color-primary)]

            px-1

            text-[10px]
            font-semibold
            text-white
          "
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </motion.button>
  );
};

export default NotificationButton;
