import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "../lib/firebase";

// Firebase's `updateProfile()` (used after an avatar upload or name change)
// mutates `auth.currentUser` in place — it does NOT fire `onAuthStateChanged`
// (that's for sign-in/out/token refresh only), so components that just
// read `auth.currentUser` directly never re-render when the photo or name
// changes anywhere other than the page that triggered the update. This
// event is how ProfileSection/EditProfileModal tell every other mounted
// component to re-read it.
export const PROFILE_UPDATED_EVENT = "studycircle:profile-updated";

export function useCurrentUser(): User | null {
  const [user, setUser] = useState<User | null>(auth?.currentUser ?? null);

  useEffect(() => {
    if (!auth) return;
    const authInstance = auth;
    const unsubscribe = onAuthStateChanged(authInstance, setUser);
    const handleProfileUpdated = () => setUser(authInstance.currentUser);
    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdated);
    return () => {
      unsubscribe();
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdated);
    };
  }, []);

  return user;
}
