import { FiMoreHorizontal } from "react-icons/fi";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { PiFireFill } from "react-icons/pi";

import type { Circle } from "../types";
import { motion } from "framer-motion";

interface CircleCardProps {
  circle: Circle;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

const CircleCard = ({ circle }: CircleCardProps) => {
  const Icon = circle.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="
    overflow-hidden
    rounded-3xl
    border
    border-[var(--color-border)]
    bg-white
    shadow-sm
  "
    >
      {/* Gradient Header */}
      <div
        className={`
          relative
          h-16
          bg-gradient-to-r
          ${circle.gradient}
        `}
      >
        {/* Floating Icon */}
        <motion.div
          className="
            absolute
            bottom-0
            left-6
            flex
            h-16
            w-16
            translate-y-1/2
            items-center
            justify-center
            rounded-2xl
            border-2
            border-white/70
            bg-white/15
            backdrop-blur-md
            shadow-lg
          "
        >
          <Icon className="text-3xl text-white" />
        </motion.div>

        {/* Menu Button */}
        <button
          type="button"
          className="
            absolute
            right-4
            top-4
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white/20
            text-white
            backdrop-blur-md
            transition-all
            hover:bg-white/30
          "
        >
          <FiMoreHorizontal className="text-lg" />
        </button>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-6 pt-12">
        {/* Title */}
        <h3 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">
          {circle.name}
        </h3>

        {/* Category & Members */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <span>{circle.category}</span>

          <span>•</span>

          <span>{circle.members} members</span>
        </div>
        {/* Member Avatars */}
        <div className="mt-5 flex items-center">
          {circle.memberAvatars.slice(0, 5).map((avatar, index) => (
            <motion.img
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.05,
              }}
              key={index}
              src={avatar}
              alt={`Member ${index + 1}`}
              className="
                h-9
                w-9
                rounded-full
                border-2
                border-white
                object-cover
                shadow-sm
              "
              style={{
                marginLeft: index === 0 ? 0 : -10,
                zIndex: 10 - index,
              }}
            />
          ))}

          {circle.members > 5 && (
            <div
              className="
                ml-2
                flex
                h-9
                min-w-[38px]
                items-center
                justify-center
                rounded-full
                bg-slate-100
                px-2
                text-xs
                font-semibold
                text-[var(--color-text-primary)]
              "
            >
              +{circle.members - 5}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="mt-5 line-clamp-2 text-[15px] leading-7 text-[var(--color-text-secondary)]">
          {circle.description}
        </p>

        {/* Statistics */}
        <div
          className="
            mt-6
            grid
            grid-cols-3
            rounded-2xl
            border
            border-[var(--color-border)]
            bg-[var(--color-background)]
            p-4
          "
        >
          {/* Tasks Due */}
          <motion.div
            className="text-center"
            whileHover={{
              y: -2,
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <FiCheckCircle className="text-base text-emerald-500" />

              <span className="font-bold text-[var(--color-text-primary)]">
                {circle.tasksDue}
              </span>
            </div>

            <p className="mt-2 text-xs font-medium text-[var(--color-text-secondary)]">
              Tasks Due
            </p>
          </motion.div>

          {/* Sessions */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <FiCalendar className="text-base text-blue-600" />

              <span className="font-bold text-[var(--color-text-primary)]">
                {circle.studySessions}
              </span>
            </div>

            <p className="mt-2 text-xs font-medium text-[var(--color-text-secondary)]">
              Sessions
            </p>
          </div>

          {/* Day Streak */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <PiFireFill className="text-base text-orange-500" />

              <span className="font-bold text-[var(--color-text-primary)]">
                {circle.dayStreak}
              </span>
            </div>

            <p className="mt-2 text-xs font-medium text-[var(--color-text-secondary)]">
              Day Streak
            </p>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-5">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Last active: {circle.lastActive}
          </p>

          <motion.button
            whileHover={{
              rotate: 90,
            }}
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            aria-label="More actions"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--color-border)]
              bg-white
              text-[var(--color-text-secondary)]
              transition-all
              duration-200
              hover:border-[var(--color-primary)]
              hover:bg-blue-50
              hover:text-[var(--color-primary)]
            "
          >
            <FiMoreHorizontal className="text-lg" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CircleCard;
