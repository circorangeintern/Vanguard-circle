import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";

import AuthButton from "../common/AuthButton";
import AuthInput from "../inputs/AuthInput";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
    });

    // Backend integration comes later
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
      {/* Email */}

      <AuthInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<HiOutlineMail className="h-5 w-5" />}
      />

      {/* Button */}

      <div className="mt-6">
        <AuthButton type="submit">Send Code</AuthButton>
      </div>

      {/* Back to Login */}

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
