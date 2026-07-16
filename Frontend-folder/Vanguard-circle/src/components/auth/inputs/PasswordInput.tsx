import { useState } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
} from "react-icons/hi";

import AuthInput from "./AuthInput";

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  autoComplete?: string;
}

const PasswordInput = ({
  label,
  placeholder = "Enter your password",
  value,
  error,
  onChange,
  name,
  autoComplete,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <AuthInput
        label={label}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        name={name}
        autoComplete={autoComplete}
        leftIcon={<HiOutlineLockClosed className="h-5 w-5" />}
        className="pr-11"
      />

      <button
        type="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword((prev) => !prev)}
        className="
          absolute
          right-4
          bottom-[14px]
          flex
          h-5
          w-5
          items-center
          justify-center
          text-slate-400
          transition-colors
          duration-200
          hover:text-[var(--color-primary)]
        "
      >
        {showPassword ? (
          <HiOutlineEyeOff className="h-5 w-5" />
        ) : (
          <HiOutlineEye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
