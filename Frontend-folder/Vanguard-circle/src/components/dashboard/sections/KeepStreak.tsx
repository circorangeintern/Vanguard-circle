import StreakCard from "../cards/StreakCard";

interface KeepStreakProps {
  streak: number;
}

const KeepStreak = ({ streak }: KeepStreakProps) => {
  const subtitle =
    streak > 0
      ? `You've studied for ${streak} day${streak === 1 ? "" : "s"} in a row. Amazing consistency!`
      : "Check in today to start a new streak.";

  return (
    <section>
      <StreakCard streak={streak} subtitle={subtitle} />
    </section>
  );
};

export default KeepStreak;
