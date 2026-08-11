import { useCallback, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "sonner";

import ProfileHeroCard from "../cards/ProfileHeroCard";
import AccountInfoCard from "../cards/AccountInfoCard";
import EditProfileModal from "../modals/EditProfileModal";
import ProfileLoading from "../states/ProfileLoading";

import { api } from "../../../../lib/api";
import { auth } from "../../../../lib/firebase";
import { PROFILE_UPDATED_EVENT } from "../../../../hooks/useCurrentUser";
import { mapProfile, type RawUser } from "../data/mapProfile";
import type { Profile } from "../types";

const ProfileSection = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

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

  const handleAvatarUpload = async (file: File) => {
    setUploadingAvatar(true);
    try {
      const uploaded = await api.upload<{ url: string }>("/uploads", file);
      await api.patch("/users/me", { avatarUrl: uploaded.url });
      if (auth?.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: uploaded.url });
        // updateProfile() mutates auth.currentUser in place — it does NOT
        // fire onAuthStateChanged, so the sidebar/header avatars (which
        // read auth.currentUser directly) wouldn't otherwise re-render
        // until something unrelated caused them to. This tells them to.
        window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
      }
      toast.success("Profile photo updated.");
      loadProfile();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't upload that photo.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  if (loading || !profile) return <ProfileLoading />;

  return (
    <section className="space-y-8">
      <ProfileHeroCard
        fullName={profile.fullName}
        email={profile.email}
        avatarUrl={profile.avatarUrl}
        joinedDate={profile.joinedDate}
        circlesCount={profile.circlesCount}
        onEditProfile={() => setIsEditModalOpen(true)}
        onAvatarUpload={handleAvatarUpload}
        uploadingAvatar={uploadingAvatar}
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
