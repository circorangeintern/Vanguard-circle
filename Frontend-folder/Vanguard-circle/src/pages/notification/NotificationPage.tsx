import { motion } from "framer-motion";

import NotificationsSection from "../../components/dashboard/notification/sections/NotificationsSection";

const NotificationPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <NotificationsSection />
    </motion.main>
  );
};

export default NotificationPage;
