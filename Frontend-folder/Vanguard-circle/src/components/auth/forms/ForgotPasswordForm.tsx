import { Link } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "sonner";

import { auth } from "../../../lib/firebase";
import AuthButton from "../common/AuthButton";
import AuthInput from "../inputs/AuthInput";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth!, email);
      toast.success("Password reset link sent — check your email.");
    } catch (err) {
      // Firebase intentionally doesn't reveal whether an email exists,
      // to avoid leaking which addresses are registered.
      toast.success("If that email is registered, a reset link has been sent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
      <AuthInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<HiOutlineMail className="h-5 w-5" />}
      />

      <div className="mt-6">
        <AuthButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </AuthButton>
      </div>

      <div className="mt-7 text-center">
        <span className="text-sm text-[var(--color-text-secondary)]">
          Remember your password?
        </span>

        <Link
          to="/login"
          className="
            ml-2
            text-sm
            font-semibold
            text-[var(--color-primary)]
            transition-colors
            duration-300
            hover:text-[var(--color-primary-dark)]
          "
        >
          Log In
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
