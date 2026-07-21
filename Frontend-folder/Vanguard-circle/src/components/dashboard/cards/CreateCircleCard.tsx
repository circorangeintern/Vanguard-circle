import { motion } from "framer-motion";
import { HiOutlinePlus } from "react-icons/hi2";

interface CreateCircleCardProps {
  onClick: () => void;
  loading?: boolean;
}

const CreateCircleCard = ({ onClick, loading }: CreateCircleCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="
        flex h-full min-h-[240px] w-full flex-col items-center justify-center
        rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6
        text-center transition-all duration-300
        hover:border-[var(--color-primary)] hover:bg-blue-50/40
      "
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-[var(--color-primary)] shadow-sm">
        <HiOutlinePlus className="text-3xl" />
      </div>

      <h3 className="mt-6 font-heading text-lg font-semibold text-[var(--color-primary)]">
        {loading ? "Creating..." : "Create New Circle"}
      </h3>

      <p className="mt-2 max-w-[180px] text-sm leading-6 text-slate-500">
        Bring your study group together
      </p>
    </motion.button>
  );
};

export default CreateCircleCard;
