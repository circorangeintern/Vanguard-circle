import StreakCard from "../cards/StreakCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../../lib/api";

import { trackDailyCheckin } from "../../../services/analytics";

interface KeepStreakProps {
  streak: number;
  checkedInToday?: boolean;
  groupId?: string;
  onCheckInSuccess?: () => void;
}

interface CheckInResponse {
  streak: { currentStreak: number };
}

const KeepStreak = ({
  streak,
  checkedInToday = false,
  groupId,
  onCheckInSuccess,
}: KeepStreakProps) => {
  const [currentStreak, setCurrentStreak] = useState(streak);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(checkedInToday);
  const [checkingIn, setCheckingIn] = useState(false);

  // `useState(streak)` only seeds from props on the very first render — once
  // the dashboard refetches after a check-in (or you switch to a different
  // circle's streak being "best"), these props change but this component
  // never picked them up, so the card looked frozen/stale until a hard reload.
  useEffect(() => {
    setCurrentStreak(streak);
    setHasCheckedInToday(checkedInToday);
  }, [streak, checkedInToday]);

  const handleCheckIn = async () => {
    if (hasCheckedInToday || !groupId || checkingIn) return;

    setCheckingIn(true);
    try {
      // Use the server's computed streak, not a client-side "+1" guess — the
      // backend resets the streak to 1 if yesterday wasn't checked in, which
      // a naive increment would get wrong and silently show the wrong number.
      const result = await api.post<CheckInResponse>(
        `/groups/${groupId}/checkins`,
        { status: "DONE" },
      );
      const newStreak = result.streak.currentStreak;

      trackDailyCheckin({ streak: newStreak });

      setCurrentStreak(newStreak);
      setHasCheckedInToday(true);

      onCheckInSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Couldn't check in. Please try again.",
      );
    } finally {
      setCheckingIn(false);
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
        loading={checkingIn}
      />
    </section>
  );
};

export default KeepStreak;
