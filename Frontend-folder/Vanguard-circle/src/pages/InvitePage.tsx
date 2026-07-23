import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "../lib/firebase";
import { api } from "../lib/api";
import { trackCircleJoined } from "../services/analytics";

interface CirclePreview {
  id: string;
  name: string;
  courseName: string;
  description: string | null;
  icon: string | null;
  memberCount: number;
  maxMembers: number | null;
}

// Landing page for both the "Copy Link" invite and the QR code — previously
// neither actually went anywhere because this route didn't exist. Works for
// logged-out visitors too: it shows what they're being invited to, then
// routes them through signup/login and back here to finish joining.
const InvitePage = () => {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const navigate = useNavigate();

  const [circle, setCircle] = useState<CirclePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!auth) {
      setAuthChecked(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthed(!!user);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!inviteCode) return;
    let cancelled = false;

    api
      .get<CirclePreview>(`/groups/invite/${inviteCode}`)
      .then((data) => {
        if (!cancelled) setCircle(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "This invite link is invalid or has expired.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [inviteCode]);

  const handleJoin = async () => {
    if (!inviteCode) return;

    if (!isAuthed) {
      navigate(`/signup?redirect=${encodeURIComponent(`/invite/${inviteCode}`)}`);
      return;
    }

    setJoining(true);
    try {
      const result = await api.post<{
        group: { id: string; name: string };
        alreadyMember?: boolean;
      }>(`/groups/${inviteCode}/join`);

      if (!result.alreadyMember) {
        trackCircleJoined({
          circleId: result.group.id,
          circleName: result.group.name,
        });
        toast.success(`You've joined ${result.group.name}!`);
      }
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't join this circle.",
      );
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_35px_100px_rgba(15,23,42,0.10)]">
        <Link to="/" className="mb-6 flex justify-center">
          <img src="/favicon.png" alt="StudyCircle" className="w-16" />
        </Link>

        {loading && (
          <p className="py-10 text-slate-500">Loading invite...</p>
        )}

        {!loading && error && (
          <>
            <h1 className="font-heading text-xl font-bold text-slate-900">
              Invite not found
            </h1>
            <p className="mt-2 text-sm text-slate-500">{error}</p>
            <Link
              to="/"
              className="mt-6 inline-block rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white"
            >
              Go home
            </Link>
          </>
        )}

        {!loading && !error && circle && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              {circle.icon || "📚"}
            </div>

            <h1 className="font-heading mt-4 text-xl font-bold text-slate-900">
              You're invited to join
            </h1>
            <p className="mt-1 font-heading text-2xl font-bold text-[var(--color-primary)]">
              {circle.name}
            </p>
            {circle.courseName && (
              <p className="mt-1 text-sm text-slate-500">{circle.courseName}</p>
            )}
            {circle.description && (
              <p className="mt-4 text-sm text-slate-600">{circle.description}</p>
            )}
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              {circle.memberCount}
              {circle.maxMembers ? ` / ${circle.maxMembers}` : ""} members
            </p>

            <button
              type="button"
              disabled={joining || !authChecked}
              onClick={handleJoin}
              className="mt-8 w-full rounded-xl bg-[var(--color-primary)] py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {joining
                ? "Joining..."
                : isAuthed
                  ? "Join Circle"
                  : "Sign up to join"}
            </button>

            {!isAuthed && (
              <p className="mt-4 text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to={`/login?redirect=${encodeURIComponent(`/invite/${inviteCode}`)}`}
                  className="font-semibold text-[var(--color-primary)]"
                >
                  Log in
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InvitePage;
