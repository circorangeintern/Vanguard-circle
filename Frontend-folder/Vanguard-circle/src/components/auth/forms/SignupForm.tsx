import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { toast } from "sonner";

import { auth } from "../../../lib/firebase";
import AuthButton from "../common/AuthButton";
import AuthInput from "../inputs/AuthInput";
import PasswordInput from "../inputs/PasswordInput";
import SocialLogin from "../social/SocialLogin";

const SignupForm = () => {
  const navigate = useNavigate();

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
      const credential = await createUserWithEmailAndPassword(auth!, email, password);
      await updateProfile(credential.user, { displayName: fullName });

      // First authenticated request auto-creates the matching backend User row
      // (handled by the backend's auth middleware) — no extra call needed here.
      navigate("/dashboard");
    } catch (err) {
      toast.error("Could not create account. That email may already be in use.");
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
            to="/terms"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
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
        <SocialLogin />
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
