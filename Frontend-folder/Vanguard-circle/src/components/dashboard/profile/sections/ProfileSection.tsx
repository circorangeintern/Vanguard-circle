import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import ProfileHeroCard from "../cards/ProfileHeroCard";
import AccountInfoCard from "../cards/AccountInfoCard";
import EditProfileModal from "../modals/EditProfileModal";
import ProfileLoading from "../states/ProfileLoading";

import { api } from "../../../../lib/api";
import { mapProfile, type RawUser } from "../data/mapProfile";
import type { Profile } from "../types";

const ProfileSection = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(() => {
    setLoading(true);
    api
      .get<RawUser>("/users/me")
      .then((data) => setProfile(mapProfile(data)))
      .catch(() => toast.error("Couldn't load your profile. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading || !profile) return <ProfileLoading />;

  return (
    <section className="space-y-8">
      <ProfileHeroCard
        fullName={profile.fullName}
        email={profile.email}
        joinedDate={profile.joinedDate}
        circlesCount={profile.circlesCount}
        onEditProfile={() => setIsEditModalOpen(true)}
      />

      <AccountInfoCard
        fullName={profile.fullName}
        email={profile.email}
        memberSince={profile.memberSince}
      />
      <EditProfileModal
        open={isEditModalOpen}
        fullName={profile.fullName}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={loadProfile}
      />
    </section>
  );
};

export default ProfileSection;
