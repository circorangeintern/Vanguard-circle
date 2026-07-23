// Firebase Auth throws errors with a stable `code` field (e.g. "auth/user-not-found").
// Centralizing the mapping keeps every auth form (signup, login, reset, verify) showing
// the same, specific, user-friendly copy instead of one generic toast.
const MESSAGES: Record<string, string> = {
  "auth/email-already-in-use":
    "An account with this email already exists. Try logging in instead.",
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/weak-password":
    "That password is too weak. Use at least 6 characters, mixing letters and numbers.",
  "auth/user-not-found": "No account found with that email address.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-login-credentials": "Incorrect email or password.",
  "auth/user-disabled": "This account has been disabled. Contact support for help.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a few minutes and try again.",
  "auth/network-request-failed":
    "Network error — check your connection and try again.",
  "auth/popup-closed-by-user": "Sign-in was cancelled before it finished.",
  "auth/expired-action-code":
    "This link has expired. Please request a new one.",
  "auth/invalid-action-code":
    "This link is invalid or has already been used.",
  "auth/missing-email": "Please enter your email address.",
  "auth/requires-recent-login":
    "Please log in again to complete this action.",
};

export function getAuthErrorMessage(err: unknown, fallback: string): string {
  const code = (err as { code?: string } | null)?.code;
  if (code && MESSAGES[code]) return MESSAGES[code];
  return fallback;
}
