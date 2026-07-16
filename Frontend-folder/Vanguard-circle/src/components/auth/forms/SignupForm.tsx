import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";

import AuthButton from "../common/AuthButton";
import AuthInput from "../inputs/AuthInput";
import PasswordInput from "../inputs/PasswordInput";
import SocialLogin from "../social/SocialLogin";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      fullName,
      email,
      password,
      confirmPassword,
      agree,
    });

    // Supabase signup comes later
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
      {/* Full Name */}

      <AuthInput
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        leftIcon={<HiOutlineUser className="h-5 w-5" />}
      />

      {/* Email */}

      <div className="mt-4">
        <AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<HiOutlineMail className="h-5 w-5" />}
        />
      </div>

      {/* Password */}

      <div className="mt-4">
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}

      <div className="mt-4">
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Terms */}

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

      {/* Button */}

      <div className="mt-6">
        <AuthButton type="submit">Create Account</AuthButton>
      </div>

      {/* Social */}

      <div className="mt-5">
        <SocialLogin />
      </div>

      {/* Footer */}

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
