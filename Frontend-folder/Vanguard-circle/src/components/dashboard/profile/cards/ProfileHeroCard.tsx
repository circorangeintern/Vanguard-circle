import { motion } from "framer-motion";
import { useRef } from "react";
import { FiCalendar, FiCamera, FiEdit2, FiUsers } from "react-icons/fi";

import { Avatar } from "../../../ui";

interface ProfileHeroCardProps {
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  joinedDate: string;
  circlesCount: number;
  onEditProfile?: () => void;
  onAvatarUpload?: (file: File) => void;
  uploadingAvatar?: boolean;
}

const ProfileHeroCard = ({
  fullName,
  email,
  avatarUrl,
  joinedDate,
  circlesCount,
  onEditProfile,
  onAvatarUpload,
  uploadingAvatar,
}: ProfileHeroCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) onAvatarUpload?.(file);
              }}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="group relative block rounded-full disabled:cursor-wait"
              aria-label="Upload profile photo"
            >
              <Avatar
                name={fullName}
                src={avatarUrl}
                size={128}
                className="ring-4 ring-white shadow-lg"
              />

              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-[var(--color-primary)]
                  text-white
                  shadow-md
                  transition
                  group-hover:bg-[var(--color-primary-dark)]
                "
              >
                {uploadingAvatar ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <FiCamera className="text-base" />
                )}
              </span>
            </button>
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
