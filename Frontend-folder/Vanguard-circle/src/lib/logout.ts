import { signOut } from "firebase/auth";
import { toast } from "sonner";
import type { NavigateFunction } from "react-router-dom";

import { auth } from "./firebase";

export async function performLogout(navigate: NavigateFunction) {
  try {
    await signOut(auth!);
    navigate("/login");
  } catch {
    toast.error("Couldn't log out. Please try again.");
  }
}
