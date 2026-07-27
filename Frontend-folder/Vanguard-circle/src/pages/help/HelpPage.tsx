import { motion } from "framer-motion";

import HelpHeader from "../../components/dashboard/help/sections/HelpHeader";
import SupportCard from "../../components/dashboard/help/cards/SupportCard";
import FAQSection from "../../components/dashboard/help/sections/FAQSection";

const HelpPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <HelpHeader />

      <SupportCard />

      <FAQSection />
    </motion.main>
  );
};

export default HelpPage;
