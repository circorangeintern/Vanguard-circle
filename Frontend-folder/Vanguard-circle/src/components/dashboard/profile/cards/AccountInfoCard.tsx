import { motion } from "framer-motion";
import { FiCalendar, FiMail, FiUser } from "react-icons/fi";

import ProfileInfoRow from "./ProfileInfoRow";

interface AccountInfoCardProps {
  fullName: string;
  email: string;
  role: string;
  memberSince: string;
}

const AccountInfoCard = ({
  fullName,
  email,
  memberSince,
}: AccountInfoCardProps) => {
  const rows = [
    {
      id: "name",
      icon: FiUser,
      label: "Full Name",
      value: fullName,
    },
    {
      id: "email",
      icon: FiMail,
      label: "Email Address",
      value: email,
    },

    {
      id: "memberSince",
      icon: FiCalendar,
      label: "Member Since",
      value: memberSince,
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: 0.15,
      }}
      className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-white
        p-6
        shadow-sm
        md:p-8
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        Account Information
      </h2>

      <div className="mt-8">
        {rows.map((row) => (
          <ProfileInfoRow
            key={row.id}
            icon={row.icon}
            label={row.label}
            value={row.value}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default AccountInfoCard;
