import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../lib/firebase";

/**
 * Gate for any route that requires a signed-in user (currently /dashboard/*).
 *
 * Fixes two real bugs:
 *  - Pasting a dashboard link on a device with no session used to hit the API,
 *    get a 401, and render a generic "Something went wrong" — now it redirects
 *    to /login before the page ever tries to fetch anything.
 *  - After logging in, the user landed on a hardcoded /dashboard instead of
 *    back where they were headed — we stash the original path in ?redirect=
 *    and LoginForm/SignupForm send them there on success.
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const [status, setStatus] = useState<"checking" | "authed" | "guest">(
    "checking",
  );

  useEffect(() => {
    if (!auth) {
      setStatus("guest");
      return;
    }

    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    // onAuthStateChanged can fire its first callback with `user: null` before
    // the persisted session finishes rehydrating from storage — on a fresh
    // mount (e.g. navigating back from a 404 page) that premature `null`
    // looked like "logged out" and bounced a real, still-logged-in user to
    // /login. Waiting for authStateReady() first avoids reading that race.
    auth.authStateReady().then(() => {
      if (cancelled || !auth) return;
      setStatus(auth.currentUser ? "authed" : "guest");
      unsubscribe = onAuthStateChanged(auth, (user) => {
        setStatus(user ? "authed" : "guest");
      });
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (status === "guest") {
    const redirectTo = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(redirectTo)}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
