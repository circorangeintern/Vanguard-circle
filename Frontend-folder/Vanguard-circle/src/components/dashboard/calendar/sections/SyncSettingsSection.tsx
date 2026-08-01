import { useState } from "react";
import { motion } from "framer-motion";
import { FiInfo } from "react-icons/fi";
import { toast } from "sonner";

import SettingRow from "../cards/SettingRow";
import { SYNC_SETTINGS_META } from "../data/syncSettings";
import { api } from "../../../../lib/api";

import type { CalendarSyncSettings, SyncSetting } from "../types";

interface SyncSettingsSectionProps {
  settings: CalendarSyncSettings;
  onSettingsChange: (settings: CalendarSyncSettings) => void;
}

const SyncSettingsSection = ({ settings, onSettingsChange }: SyncSettingsSectionProps) => {
  const [savingId, setSavingId] = useState<string | null>(null);

  const rows: SyncSetting[] = SYNC_SETTINGS_META.map((meta) => ({
    id: meta.id,
    title: meta.title,
    description: meta.description,
    icon: meta.icon,
    enabled: settings[meta.key],
    disabled: savingId !== null,
  }));

  const handleToggle = async (id: string) => {
    const meta = SYNC_SETTINGS_META.find((m) => m.id === id);
    if (!meta) return;

    const nextValue = !settings[meta.key];
    setSavingId(id);
    try {
      const updated = await api.patch<CalendarSyncSettings>("/calendar/settings", {
        [meta.key]: nextValue,
      });
      onSettingsChange(updated);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update this setting.");
    } finally {
      setSavingId(null);
    }
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
        {rows.map((setting) => (
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
