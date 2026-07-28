import { useState } from "react";
import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";

import SettingRow from "../cards/SettingRow";
import { INITIAL_SYNC_SETTINGS } from "../data/syncSettings";

import type { SyncSetting } from "../types";

const SyncSettingsSection = () => {
  const [settings, setSettings] = useState<SyncSetting[]>([
    ...INITIAL_SYNC_SETTINGS,
  ]);

  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id
          ? {
              ...setting,
              enabled: !setting.enabled,
            }
          : setting,
      ),
    );

    // TODO: Persist setting to backend
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.15,
      }}
      className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        p-5
        shadow-sm
        sm:p-6
        lg:p-8
      "
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
          Sync Settings
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          Choose what you want to sync with Google Calendar.
        </p>
      </div>

      {/* Settings */}
      <div className="mt-8 divide-y divide-[var(--color-border)]">
        {settings.map((setting) => (
          <SettingRow
            key={setting.id}
            setting={setting}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Info */}
      <div
        className="
          mt-8
          flex
          items-start
          gap-3
          rounded-2xl
          bg-indigo-50
          p-4
          sm:items-center
          sm:p-5
        "
      >
        <FiInfo
          className="
            mt-0.5
            shrink-0
            text-lg
            text-[var(--color-primary)]
            sm:mt-0
            sm:text-xl
          "
        />

        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
          Events will be created in your default Google Calendar.
        </p>
      </div>
    </motion.section>
  );
};

export default SyncSettingsSection;
