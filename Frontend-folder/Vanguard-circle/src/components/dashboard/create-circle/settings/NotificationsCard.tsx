import { HiOutlineBellAlert } from "react-icons/hi2";
import SettingsToggle from "./SettingsToggle";

interface NotificationSettings {
  newMemberJoins: boolean;
  newAssignments: boolean;
  mentions: boolean;
  dueDateReminders: boolean;
  weeklySummary: boolean;
  marketingEmails: boolean;
}

interface NotificationsCardProps {
  settings: NotificationSettings;

  setSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
}

const NotificationsCard = ({
  settings,
  setSettings,
}: NotificationsCardProps) => {
  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationItems = [
    {
      key: "newMemberJoins",
      label: "New member joins",
    },
    {
      key: "newAssignments",
      label: "New assignments",
    },
    {
      key: "mentions",
      label: "Mentions & comments",
    },
    {
      key: "dueDateReminders",
      label: "Due date reminders",
    },
    {
      key: "weeklySummary",
      label: "Weekly summary",
    },
    {
      key: "marketingEmails",
      label: "Marketing emails",
    },
  ] as const;
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
            bg-orange-50
          "
        >
          <HiOutlineBellAlert className="text-2xl text-orange-500" />
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-slate-900">
            Notifications
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Choose what updates you want to receive.
          </p>
        </div>
      </div>

      {/* Notification List */}

      <div className="mt-6 space-y-4">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <p className="text-sm font-medium text-slate-700">{item.label}</p>

            {/* Toggle */}

            <SettingsToggle
              checked={settings[item.key]}
              onChange={() => toggleSetting(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsCard;
