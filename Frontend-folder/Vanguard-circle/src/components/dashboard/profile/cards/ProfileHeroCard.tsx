import { motion } from "framer-motion";
import { FiCalendar, FiEdit2, FiUsers } from "react-icons/fi";

interface ProfileHeroCardProps {
  fullName: string;
  email: string;
  joinedDate: string;
  circlesCount: number;
  avatar: string;
  onEditProfile?: () => void;
}

const ProfileHeroCard = ({
  fullName,
  email,
  joinedDate,
  circlesCount,
  avatar,
  onEditProfile,
}: ProfileHeroCardProps) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: 0.1,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        shadow-sm
      "
    >
      {/* Decorative Background */}
      <div
        className="
          absolute
          right-0
          top-0
          h-full
          w-1/2
          bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,.08),transparent_60%)]
          pointer-events-none
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-10
          p-6
          md:p-8
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        {/* Left */}
        <div
          className="
            flex
            flex-col
            items-center
            gap-6
            sm:flex-row
            sm:items-start
          "
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={avatar}
              alt={fullName}
              className="
                h-32
                w-32
                rounded-full
                object-cover
                ring-4
                ring-white
                shadow-lg
              "
            />
          </div>

          {/* Details */}
          <div
            className="
              text-center
              sm:text-left
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-[var(--color-text-primary)]
              "
            >
              {fullName}
            </h2>

            <p
              className="
                mt-4
                text-base
                text-[var(--color-text-secondary)]
              "
            >
              {email}
            </p>

            <div
              className="
                mt-8
                flex
                flex-wrap
                justify-center
                gap-6
                text-sm
                text-[var(--color-text-secondary)]
                sm:justify-start
              "
            >
              <div className="flex items-center gap-2">
                <FiCalendar className="text-lg" />
                <span>Joined {joinedDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiUsers className="text-lg" />
                <span>{circlesCount} Circles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <motion.button
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={onEditProfile}
          className="
            flex
            h-14
            items-center
            justify-center
            gap-3
            rounded-2xl
            border-2
            border-[var(--color-primary)]
            bg-white
            px-8
            font-semibold
            text-[var(--color-primary)]
            transition-all
            duration-200
            hover:bg-blue-50
            xl:self-center
          "
        >
          <FiEdit2 className="text-lg" />
          Edit Profile
        </motion.button>
      </div>
    </motion.section>
  );
};

export default ProfileHeroCard;
