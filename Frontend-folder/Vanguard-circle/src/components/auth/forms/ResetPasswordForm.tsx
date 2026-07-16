import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthButton from "../common/AuthButton";
import PasswordInput from "../inputs/PasswordInput";
import SuccessModal from "../modal/SuccessModal";

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    setShowSuccess(true);

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
            <AuthButton type="submit">Reset Password</AuthButton>
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
};

export default ResetPasswordForm;
