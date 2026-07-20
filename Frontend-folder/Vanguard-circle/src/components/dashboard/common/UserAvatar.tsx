import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

interface UserAvatarProps {
  name?: string;
  image?: string;
}

const UserAvatar = ({ name = "Simon Otaru", image }: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-3
        py-2

        transition-all
        duration-300

        hover:border-blue-100
        hover:shadow-md
      "
    >
      {/* Avatar */}

      {image ? (
        <img
          src={image}
          alt={name}
          className="
            h-11
            w-11
            rounded-xl
            object-cover
          "
        />
      ) : (
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-primary)]

            font-heading
            text-sm
            font-semibold
            text-white
          "
        >
          {initials}
        </div>
      )}

      {/* Name */}

      <div
        className="
          hidden
          text-left

          lg:block
        "
      >
        <h4
          className="
            font-heading
            text-sm
            font-semibold
            text-slate-900
          "
        >
          {name}
        </h4>

        <p
          className="
            text-xs
            text-slate-500
          "
        >
          Student
        </p>
      </div>

      {/* Arrow */}

      <HiChevronDown
        className="
          hidden
          text-lg
          text-slate-400

          lg:block
        "
      />
    </motion.button>
  );
};

export default UserAvatar;
