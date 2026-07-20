import StreakCard from "../cards/StreakCard";

const KeepStreak = () => {
  return (
    <section>
      <StreakCard
        streak={12}
        subtitle="You've studied for 12 days in a row. Amazing consistency!"
      />
    </section>
  );
};

export default KeepStreak;
