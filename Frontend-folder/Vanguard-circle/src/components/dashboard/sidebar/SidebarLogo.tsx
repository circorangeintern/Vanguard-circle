import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../../../../public/favicon.png";

const SidebarLogo = () => {
  return (
    <Link
      to="/dashboard"
      className="
        flex
        h-12
        items-center
        justify-center
      "
    >
      <motion.img
        whileHover={{
          scale: 1.05,
          rotate: -5,
        }}
        transition={{
          duration: 0.2,
        }}
        src={logo}
        alt="StudyCircle"
        className="
          h-12
          w-12
          rounded-xl
          object-cover
        "
      />
    </Link>
  );
};

export default SidebarLogo;
