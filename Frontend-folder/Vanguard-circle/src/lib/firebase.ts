import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

let app = null;
let auth = null;
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

export { auth };
