import { Link } from "react-router-dom";
import { useState } from "react";

import AuthButton from "../common/AuthButton";
import AuthInput from "../inputs/AuthInput";
import PasswordInput from "../inputs/PasswordInput";
import SocialLogin from "../social/SocialLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex w-full flex-col">
      <AuthInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="mt-4">
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="
              h-4
              w-4
              rounded
              border-[var(--color-border)]
              text-[var(--color-primary)]
              focus:ring-[var(--color-primary)]
            "
          />

          <span className="text-sm text-[var(--color-text-primary)]">
            Remember Me
          </span>
        </label>

        <Link
          to="/forgot-password"
          className="
            text-sm
            font-medium
            text-[var(--color-primary)]
            hover:text-[var(--color-primary-dark)]
          "
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mt-6">
        <AuthButton type="submit">Log In</AuthButton>
      </div>

      <div className="mt-4">
        <SocialLogin />
      </div>

      <div className="mt-7 text-center">
        <span className="text-sm text-[var(--color-text-secondary)]">
          Don't have an account?
        </span>

        <Link
          to="/signup"
          className="
            ml-2
            text-sm
            font-semibold
            text-[var(--color-primary)]
            hover:text-[var(--color-primary-dark)]
          "
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
