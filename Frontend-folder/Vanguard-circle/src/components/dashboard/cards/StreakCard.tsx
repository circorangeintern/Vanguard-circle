import { motion } from "framer-motion";
import { HiOutlineFire, HiOutlineArrowTrendingUp } from "react-icons/hi2";

interface StreakCardProps {
  streak: number;
  subtitle: string;
  checkedInToday: boolean;
  onCheckIn: () => void;
}

const StreakCard = ({
  streak,
  subtitle,
  checkedInToday,
  onCheckIn,
}: StreakCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-gradient-to-r
        from-slate-50
        via-white
        to-slate-50
        p-5
        md:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        {/* Left */}

        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
            "
          >
            <HiOutlineFire className="text-3xl text-blue-600" />
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-heading text-xl font-semibold text-slate-900">
              {streak}-Day Streak
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          </div>
        </div>

        {/* Desktop Button */}

        <button
          onClick={onCheckIn}
          disabled={checkedInToday}
          className={`
            hidden
            items-center
            gap-2
            rounded-xl
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            duration-300

            ${
              checkedInToday
                ? "cursor-not-allowed bg-emerald-600"
                : "bg-[var(--color-primary)] hover:opacity-90"
            }

            md:flex
          `}
        >
          {checkedInToday ? (
            <>
              <HiOutlineFire className="text-lg" />
              Checked In Today
            </>
          ) : (
            <>
              Check In
              <HiOutlineArrowTrendingUp className="text-lg" />
            </>
          )}
        </button>

        {/* Mobile Button */}

        <button
          onClick={onCheckIn}
          disabled={checkedInToday}
          className={`
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            duration-300

            ${
              checkedInToday
                ? "cursor-not-allowed bg-emerald-600"
                : "bg-[var(--color-primary)] hover:opacity-90"
            }

            md:hidden
          `}
        >
          {checkedInToday ? (
            <>
              <HiOutlineFire className="text-lg" />
              Checked In Today
            </>
          ) : (
            <>
              Check In
              <HiOutlineArrowTrendingUp className="text-lg" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default StreakCard;
