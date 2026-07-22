import StreakCard from "../cards/StreakCard";
import { useState } from "react";

interface KeepStreakProps {
  streak: number;
  checkedInToday?: boolean;
}

const KeepStreak = ({ streak, checkedInToday = false }: KeepStreakProps) => {
  const [currentStreak, setCurrentStreak] = useState(streak);

  const [hasCheckedInToday, setHasCheckedInToday] = useState(checkedInToday);

  const handleCheckIn = () => {
    if (hasCheckedInToday) return;

    setCurrentStreak((prev) => prev + 1);
    setHasCheckedInToday(true);

    // Backend later:
    // await api.post("/streak/check-in");
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
