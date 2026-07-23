import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  type Auth,
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendEmailVerification,
  applyActionCode,
  checkActionCode,
} from "firebase/auth";

// These values are safe to expose client-side — Firebase's Web API key
// is designed to be public; real security comes from Firebase's own rules.
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const googleProvider = new GoogleAuthProvider();

let app: FirebaseApp | null = null;
export let auth: Auth | null = null;
if (!apiKey) {
  // Avoid throwing during module import so the app can render a helpful error
  // instead of a white screen. The real fix is to set the VITE_FIREBASE_API_KEY
  // in your deployment environment.
  // eslint-disable-next-line no-console
  console.warn("VITE_FIREBASE_API_KEY is not set. Skipping Firebase initialization.");
} else {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (e) {
    // Catch initialization errors (for example, invalid API key) so they
    // don't crash the entire app during module import.
    // eslint-disable-next-line no-console
    console.error("Firebase initialization failed:", e);
  }
}

export async function setAuthPersistence(remember: boolean) {
  if (!auth) throw new Error("Firebase auth is not initialized");
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
}

export async function signInWithGoogle(remember = true) {
  if (!auth) throw new Error("Firebase auth is not initialized");
  await setAuthPersistence(remember);
  return signInWithPopup(auth, googleProvider);
}

// Sends Firebase's built-in verification link (not a 6-digit code — Firebase has no
// numeric-OTP email verification without extra backend infra). The link carries an
// oobCode back to /verify-email, which calls confirmEmailVerification below.
export async function sendVerificationEmail(user: User) {
  await sendEmailVerification(user, {
    url: `${window.location.origin}/verify-email`,
  });
}

// Validates + consumes a verification link's oobCode. Throws with a Firebase
// error code (auth/invalid-action-code, auth/expired-action-code, ...) on failure —
// callers should map that through getAuthErrorMessage for user-facing copy.
export async function confirmEmailVerification(oobCode: string) {
  if (!auth) throw new Error("Firebase auth is not initialized");
  await checkActionCode(auth, oobCode);
  await applyActionCode(auth, oobCode);
}

// `auth` is exported above; it may be `null` if initialization was skipped or failed.
