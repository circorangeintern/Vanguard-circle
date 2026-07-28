import { motion } from "framer-motion";

import CalendarHeader from "../../components/dashboard/calendar/sections/CalendarHeader";
import CalendarConnectionCard from "../../components/dashboard/calendar/cards/CalendarConnectionCard";
import SyncSettingsSection from "../../components/dashboard/calendar/sections/SyncSettingsSection";
import SyncNowCard from "../../components/dashboard/calendar/cards/SyncNowCard";

const CalendarPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <CalendarHeader />

      <CalendarConnectionCard />

      <SyncSettingsSection />

      <SyncNowCard />
    </motion.main>
  );
};

export default CalendarPage;
