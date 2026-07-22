import StreakCard from "../cards/StreakCard";
import { useState } from "react";
import { api } from "../../../lib/api";

interface KeepStreakProps {
  streak: number;
  checkedInToday?: boolean;
  groupId?: string;
  onCheckInSuccess?: () => void;
}

const KeepStreak = ({
  streak,
  checkedInToday = false,
  groupId,
  onCheckInSuccess,
}: KeepStreakProps) => {
  const [currentStreak, setCurrentStreak] = useState(streak);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(checkedInToday);

  const handleCheckIn = async () => {
    if (hasCheckedInToday || !groupId) return;

    try {
      await api.post(`/groups/${groupId}/checkins`, { status: "DONE" });
      setCurrentStreak((prev) => prev + 1);
      setHasCheckedInToday(true);
      onCheckInSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };
  const subtitle = hasCheckedInToday
    ? "Great job! Come back tomorrow to keep your streak alive."
    : currentStreak > 0
      ? `You've studied for ${currentStreak} day${
          currentStreak === 1 ? "" : "s"
        } in a row. Amazing consistency!`
      : "Check in today to start a new streak.";
  return (
    <section>
      <StreakCard
        streak={currentStreak}
        subtitle={subtitle}
        checkedInToday={hasCheckedInToday}
        onCheckIn={handleCheckIn}
      />
    </section>
  );
};

export default KeepStreak;
