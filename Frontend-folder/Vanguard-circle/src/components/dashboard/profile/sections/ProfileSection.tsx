import { useState } from "react";

import ProfileHeroCard from "../cards/ProfileHeroCard";
import AccountInfoCard from "../cards/AccountInfoCard";
import EditProfileModal from "../modals/EditProfileModal";

import { profile } from "../data/profile";

const ProfileSection = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <section className="space-y-8">
      <ProfileHeroCard
        fullName={profile.fullName}
        email={profile.email}
        joinedDate={profile.joinedDate}
        circlesCount={profile.circlesCount}
        avatar={profile.avatar}
        onEditProfile={() => setIsEditModalOpen(true)}
        onEditAvatar={() => setIsEditModalOpen(true)}
      />

      <AccountInfoCard
        fullName={profile.fullName}
        email={profile.email}
        role={profile.role}
        memberSince={profile.memberSince}
      />
      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </section>
  );
};

export default ProfileSection;
