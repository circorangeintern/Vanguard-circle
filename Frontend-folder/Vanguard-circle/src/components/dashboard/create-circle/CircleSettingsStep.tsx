import MemberPermissionsCard from "./settings/MemberPermissionsCard";
import NotificationsCard from "./settings/NotificationsCard";
import PrivacyCard from "./settings/PrivacyCard";
import StudyRemindersCard from "./settings/StudyRemindersCard";
import type {
  CircleFormData,
  NotificationSettings,
} from "./types";

interface CircleSettingsStepProps {
  formData: CircleFormData;

  updateForm: <K extends keyof CircleFormData>(
    key: K,
    value: CircleFormData[K],
  ) => void;

  notificationSettings: NotificationSettings;

  setNotificationSettings: React.Dispatch<
    React.SetStateAction<NotificationSettings>
  >;
}

const CircleSettingsStep = ({
  formData,
  updateForm,
  notificationSettings,
  setNotificationSettings,
}: CircleSettingsStepProps) => {
  return (
    <section className="w-full">
      {/* Header */}

      <header className="mb-8">
        <h3 className="font-heading text-xl font-semibold text-slate-900">
          Circle Settings
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Customize your circle and manage preferences.
        </p>
      </header>

      {/* Settings Grid */}

      <div
        className="
          grid
          grid-cols-1
          gap-6

          lg:grid-cols-2
          lg:items-start
        "
      >
        {/* Left Column */}

        <div className="space-y-6">
          <PrivacyCard
            visibility={formData.visibility}
            onChange={(value) => updateForm("visibility", value)}
          />

          <MemberPermissionsCard
            allowMemberInvites={formData.allowMemberInvites}
            requireAdminApproval={formData.requireAdminApproval}
            onChange={updateForm}
          />
        </div>

        {/* Right Column */}

        <div className="space-y-6">
          <NotificationsCard
            settings={notificationSettings}
            setSettings={setNotificationSettings}
          />

          <StudyRemindersCard
            studyReminders={formData.studyReminders}
            reminderFrequency={formData.reminderFrequency}
            reminderTime={formData.reminderTime}
            onChange={updateForm}
          />
        </div>
      </div>
    </section>
  );
};

export default CircleSettingsStep;
