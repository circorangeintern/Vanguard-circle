import { HiOutlineClock } from "react-icons/hi2";
import SettingsToggle from "./SettingsToggle";

interface StudyRemindersCardProps {
  studyReminders: boolean;
  reminderFrequency: "Every day" | "Weekdays" | "Weekends";
  reminderTime: string;

  onChange: <K extends "studyReminders" | "reminderFrequency" | "reminderTime">(
    key: K,
    value: boolean | "Every day" | "Weekdays" | "Weekends" | string,
  ) => void;
}

const StudyRemindersCard = ({
  studyReminders,
  reminderFrequency,
  reminderTime,
  onChange,
}: StudyRemindersCardProps) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      {/* Header */}

      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-pink-50
          "
        >
          <HiOutlineClock className="text-2xl text-pink-600" />
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-slate-900">
            Study Reminders
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Get reminded to stay consistent.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {/* Toggle */}

        <div className="flex items-center justify-between">
          <p className="font-medium text-slate-900">Enable study reminders</p>

          <SettingsToggle
            checked={studyReminders}
            onChange={(value) => onChange("studyReminders", value)}
          />
        </div>

        {/* Frequency */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Frequency
          </label>

          <select
            value={reminderFrequency}
            onChange={(e) =>
              onChange(
                "reminderFrequency",
                e.target.value as "Every day" | "Weekdays" | "Weekends",
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              outline-none

              focus:border-[var(--color-primary)]
            "
          >
            <option>Every day</option>
            <option>Weekdays</option>
            <option>Weekends</option>
          </select>
        </div>

        {/* Time */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Reminder Time
          </label>

          <select
            value={reminderTime}
            onChange={(e) => onChange("reminderTime", e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              outline-none

              focus:border-[var(--color-primary)]
            "
          >
            <option>06:00 AM</option>
            <option>07:00 AM</option>
            <option>08:00 AM</option>
            <option>09:00 AM</option>
            <option>10:00 AM</option>
            <option>06:00 PM</option>
            <option>07:00 PM</option>
            <option>08:00 PM</option>
            <option>09:00 PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StudyRemindersCard;
