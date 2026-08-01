import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import CalendarHeader from "../../components/dashboard/calendar/sections/CalendarHeader";
import CalendarConnectionCard from "../../components/dashboard/calendar/cards/CalendarConnectionCard";
import SyncSettingsSection from "../../components/dashboard/calendar/sections/SyncSettingsSection";
import SyncNowCard from "../../components/dashboard/calendar/cards/SyncNowCard";
import { api } from "../../lib/api";
import type { CalendarStatus } from "../../components/dashboard/calendar/types";

const CalendarPage = () => {
  const [status, setStatus] = useState<CalendarStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const loadStatus = useCallback(() => {
    setLoading(true);
    api
      .get<CalendarStatus>("/calendar/status")
      .then(setStatus)
      .catch(() => toast.error("Couldn't load your calendar connection."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  // Google redirects back to /calendar?connected=success|error after the
  // consent screen — read it once on mount and strip it from the URL so a
  // page refresh doesn't re-show the toast.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connectedParam = params.get("connected");
    if (!connectedParam) return;

    if (connectedParam === "success") {
      toast.success("Google Calendar connected!");
      loadStatus();
    } else {
      toast.error("Couldn't connect Google Calendar. Please try again.");
    }
    window.history.replaceState({}, "", window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const { url } = await api.get<{ url: string }>("/calendar/auth-url");
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't start Google sign-in.");
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setDisconnecting(true);
    try {
      await api.delete("/calendar/disconnect");
      toast.success("Google Calendar disconnected.");
      loadStatus();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't disconnect.");
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <CalendarHeader />

      <CalendarConnectionCard
        loading={loading}
        connected={!!status?.connected}
        email={status?.email}
        lastSyncedAt={status?.lastSyncedAt}
        connecting={connecting}
        disconnecting={disconnecting}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      {status?.connected && status.settings && (
        <>
          <SyncSettingsSection
            settings={status.settings}
            onSettingsChange={(settings) => setStatus((prev) => (prev ? { ...prev, settings } : prev))}
          />

          <SyncNowCard
            onSynced={(lastSyncedAt) => setStatus((prev) => (prev ? { ...prev, lastSyncedAt } : prev))}
          />
        </>
      )}
    </motion.main>
  );
};

export default CalendarPage;
