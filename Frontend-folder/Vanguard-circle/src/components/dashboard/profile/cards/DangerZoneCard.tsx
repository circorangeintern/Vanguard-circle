import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

interface DangerZoneCardProps {
  onDeleteAccount: () => void;
}

const DangerZoneCard = ({ onDeleteAccount }: DangerZoneCardProps) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: 0.2 }}
    className="rounded-3xl border border-red-100 bg-red-50/40 p-6 shadow-sm md:p-8"
  >
    <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>

    <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="font-semibold text-[var(--color-text-primary)]">Delete Account</p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Permanently delete your account and all your data. This cannot be undone.
        </p>
      </div>

      <button
        onClick={onDeleteAccount}
        className="
          flex shrink-0 items-center gap-2 rounded-xl border border-red-200
          bg-white px-5 py-3 text-sm font-semibold text-red-600
          transition hover:bg-red-50
        "
      >
        <FiTrash2 className="text-base" />
        Delete Account
      </button>
    </div>
  </motion.section>
);

export default DangerZoneCard;
