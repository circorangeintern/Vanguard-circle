import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { toast } from "sonner";

import { auth, sendVerificationEmail, signInWithGoogle } from "../../../lib/firebase";
import { getAuthErrorMessage } from "../../../lib/authErrors";
import { trackSignup } from "../../../services/analytics";
import AuthButton from "../common/AuthButton";
import AuthInput from "../inputs/AuthInput";
import PasswordInput from "../inputs/PasswordInput";
import SocialLogin from "../social/SocialLogin";

const SignupForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password too short. Please use at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!agree) {
      toast.error("Please agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth!,
        email,
        password,
      );
      await updateProfile(credential.user, { displayName: fullName });

      trackSignup({ method: "email", userId: credential.user.uid, email });

      // Fire-and-forget: don't block getting the user into the app on the
      // verification email actually sending.
      sendVerificationEmail(credential.user)
        .then(() => toast.success(`We sent a verification link to ${email}.`))
        .catch(() => {
          /* non-fatal — user can resend from /verify-email later */
        });

      // First authenticated request auto-creates the matching backend User row
      // (handled by the backend's auth middleware) — no extra call needed here.
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(
        getAuthErrorMessage(err, "Could not create account. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const credential = await signInWithGoogle();
      trackSignup({
        method: "google",
        userId: credential.user.uid,
        email: credential.user.email ?? undefined,
      });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(getAuthErrorMessage(err, "Could not sign in with Google."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
      <AuthInput
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        leftIcon={<HiOutlineUser className="h-5 w-5" />}
      />

      <div className="mt-4">
        <AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<HiOutlineMail className="h-5 w-5" />}
        />
      </div>

      <div className="mt-4">
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="mt-7 flex items-start gap-3">
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
          className="
            mt-1
            h-4
            w-4
            rounded
            border-[var(--color-border)]
            text-[var(--color-primary)]
            focus:ring-[var(--color-primary)]
          "
        />

        <p className="text-sm leading-6 text-[var(--color-text-primary)]">
          I agree to the{" "}
          <Link
            to="/terms-and-conditions"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
          >
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <AuthButton type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </AuthButton>
      </div>

      <div className="mt-5">
        <SocialLogin isLoading={loading} onGoogleClick={handleGoogleSignIn} />
      </div>

      <div className="mt-7 text-center">
        <span className="text-sm text-[var(--color-text-secondary)]">
          Already have an account?
        </span>

        <Link
          to="/login"
          className="
            ml-2
            text-sm
            font-semibold
            text-[var(--color-primary)]
            hover:text-[var(--color-primary-dark)]
          "
        >
          Log In
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
