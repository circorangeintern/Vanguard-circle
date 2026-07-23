import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "sonner";

import { auth, confirmEmailVerification } from "../../../lib/firebase";
import { getAuthErrorMessage } from "../../../lib/authErrors";
import AuthButton from "../common/AuthButton";

type Status = "checking" | "no-code" | "success" | "error";

// Firebase verifies email via a link in the inbox (?oobCode=...&mode=verifyEmail),
// not a typed 6-digit code — there's no OTP-generation backend in this project to
// send/verify a numeric code, so this screen confirms the link instead. It covers
// the three states that were previously silent: link works, link is invalid, link
// has expired — plus a resend action if the user lands here without a code yet.
const VerifyOtpForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [status, setStatus] = useState<Status>("checking");
  const [errorMessage, setErrorMessage] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!oobCode) {
      setStatus("no-code");
      return;
    }

    confirmEmailVerification(oobCode)
      .then(() => setStatus("success"))
      .catch((err) => {
        setErrorMessage(
          getAuthErrorMessage(err, "This verification link is invalid or has expired."),
        );
        setStatus("error");
      });
  }, [oobCode]);

  const handleResend = async () => {
    if (!auth) return;
    setResending(true);
    try {
      await auth.authStateReady();
      const user = auth.currentUser;

      if (!user) {
        toast.error("Please log in first, then request a new verification link.");
        navigate("/login?redirect=%2Fverify-email");
        return;
      }

      await sendEmailVerification(user, { url: `${window.location.origin}/verify-email` });
      toast.success(`We sent a new verification link to ${user.email}.`);
    } catch (err) {
      toast.error(getAuthErrorMessage(err, "Couldn't send a new link. Please try again."));
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="mt-7 flex flex-col">
      <Link
        to="/login"
        className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-primary)]"
      >
        <HiOutlineArrowLeft className="h-5 w-5" />
        Back to Login
      </Link>

      {status === "checking" && (
        <p className="text-sm text-slate-500">Verifying your email...</p>
      )}

      {status === "success" && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
          Your email has been verified. You're all set.
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {status === "no-code" && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          We've sent a verification link to your email. Click it to verify your
          account. Didn't get it?
        </div>
      )}

      {status !== "success" && (
        <div className="mt-6">
          <AuthButton type="button" disabled={resending} onClick={handleResend}>
            {resending ? "Sending..." : "Resend Verification Email"}
          </AuthButton>
        </div>
      )}

      {status === "success" && (
        <div className="mt-6">
          <AuthButton type="button" onClick={() => navigate("/dashboard")}>
            Continue to Dashboard
          </AuthButton>
        </div>
      )}
    </div>
  );
};

export default VerifyOtpForm;
