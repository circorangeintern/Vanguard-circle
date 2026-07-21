import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "../../../lib/firebase";
import AuthButton from "../common/AuthButton";
import PasswordInput from "../inputs/PasswordInput";
import SuccessModal from "../modal/SuccessModal";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Firebase's reset email links to /reset-password?oobCode=...&mode=resetPassword
  const oobCode = searchParams.get("oobCode");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!oobCode) {
      toast.error("This reset link is invalid or has expired.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setShowSuccess(true);
    } catch (err) {
      toast.error("This reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-7 flex w-full flex-col">
        <PasswordInput
          label="New Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <div className="mt-4">
          <PasswordInput
            label="Confirm Password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div className="mt-7">
          <AuthButton type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </AuthButton>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccess}
        title="Password Updated"
        message="Your password has been updated successfully."
        buttonText="Go to Login"
        onClose={() => navigate("/login")}
      />
    </>
  );
};

export default ResetPasswordForm;
