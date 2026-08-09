import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal, FiTrash2, FiLogOut } from "react-icons/fi";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import { PiFireFill } from "react-icons/pi";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

import type { Circle } from "../types";
import { api } from "../../../../lib/api";
import { ConfirmModal } from "../../../ui";

interface CircleCardProps {
  circle: Circle;
  onChanged?: () => void;
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

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const CircleCard = ({ circle, onChanged }: CircleCardProps) => {
  const isOrganizer = circle.role === "ORGANIZER";
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [working, setWorking] = useState(false);

  const handleConfirm = async () => {
    setWorking(true);
    try {
      if (isOrganizer) {
        await api.delete(`/groups/${circle.id}`);
        toast.success(`${circle.name} deleted.`);
      } else {
        await api.post(`/groups/${circle.id}/leave`, {});
        toast.success(`You left ${circle.name}.`);
      }
      setConfirmOpen(false);
      onChanged?.();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : isOrganizer
            ? "Couldn't delete this circle."
            : "Couldn't leave this circle.",
      );
    } finally {
      setWorking(false);
    }
  };

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
      <Link to={`/circles/${circle.id}`} className="block">
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
          <span className="text-3xl">{circle.icon}</span>
        </motion.div>

        {/* Menu Button */}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
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
          {circle.memberNames.slice(0, 5).map((name, index) => (
            <motion.div
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
              title={name}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-[var(--color-primary)]
                text-[11px]
                font-semibold
                text-white
                shadow-sm
              "
              style={{
                marginLeft: index === 0 ? 0 : -10,
                zIndex: 10 - index,
              }}
            >
              {initialsOf(name)}
            </motion.div>
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

          <div className="relative">
            <motion.button
              whileHover={{
                rotate: 90,
              }}
              whileTap={{
                scale: 0.9,
              }}
              type="button"
              aria-label="More actions"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen((prev) => !prev);
              }}
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

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="
                    absolute
                    bottom-full
                    right-0
                    z-20
                    mb-2
                    w-44
                    overflow-hidden
                    rounded-xl
                    border
                    border-[var(--color-border)]
                    bg-white
                    shadow-lg
                  "
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      setConfirmOpen(true);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-2
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-medium
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                  >
                    {isOrganizer ? (
                      <>
                        <FiTrash2 className="text-base" />
                        Delete Circle
                      </>
                    ) : (
                      <>
                        <FiLogOut className="text-base" />
                        Leave Circle
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      </Link>

      <ConfirmModal
        open={confirmOpen}
        title={isOrganizer ? "Delete this circle?" : "Leave this circle?"}
        message={
          isOrganizer
            ? `Permanently delete "${circle.name}"? This removes all its tasks, sessions, and posts for every member — this cannot be undone.`
            : `You'll lose access to "${circle.name}" and your check-in streak here. You can rejoin later with an invite.`
        }
        confirmLabel={isOrganizer ? "Delete Circle" : "Leave Circle"}
        loading={working}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </motion.div>
  );
};

export default CircleCard;
