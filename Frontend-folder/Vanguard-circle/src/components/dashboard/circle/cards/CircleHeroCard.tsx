import { motion } from "framer-motion";
import { FiCopy, FiSettings } from "react-icons/fi";

interface CircleHeroCardProps {
  name: string;
  category: string;
  description: string;
  members: number;
  icon: string;
  inviteCode: string;
  onInvite: () => void;
  onSettings: () => void;
}

const CircleHeroCard = ({
  name,
  category,
  description,
  members,
  icon,
  inviteCode,
  onInvite,
  onSettings,
}: CircleHeroCardProps) => {
  const copyInviteCode = async () => {
    await navigator.clipboard.writeText(inviteCode);
    onInvite();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="py-6"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-5">
          <img
            src={icon}
            alt={name}
            className="h-14 md:h-20 w-14 md:w-20 rounded-2xl object-cover"
          />

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
              {name}
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] md:text-sm text-[var(--color-text-secondary)]">
              <span>{category}</span>

              <span>•</span>

              <span>{members} members</span>
            </div>

            <p className="mt-4 max-w-3xl text-[13px] md:text-[15px] leading-7 text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyInviteCode}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-5 text-sm font-medium transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <FiCopy size={18} />
            Invite
          </button>

          <button
            onClick={onSettings}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
          >
            <FiSettings size={18} />
            Circle Settings
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default CircleHeroCard;
