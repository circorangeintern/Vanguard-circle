import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

import AuthButton from "../common/AuthButton";
import OTPInput from "../inputs/OTPInput";

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      otp,
    });
  };

  const handleResend = () => {
    setTimer(60);

    console.log("Resend OTP");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
      {/* Back */}

      <Link
        to="/forgot-password"
        className="
          mb-6
          inline-flex
          w-fit
          items-center
          gap-2
          text-sm
          font-medium
          text-[var(--color-text-primary)]
          transition-colors
          hover:text-[var(--color-primary)]
        "
      >
        <HiOutlineArrowLeft className="h-5 w-5" />
        Back
      </Link>

      {/* OTP */}

      <OTPInput value={otp} onChange={setOtp} />

      {/* Timer */}

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          Didn't receive the code?
        </span>

        {timer > 0 ? (
          <span className="text-sm font-medium text-slate-500">
            00:{String(timer).padStart(2, "0")}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="
              text-sm
              font-medium
              text-[var(--color-primary)]
              transition-colors
              hover:text-[var(--color-primary-dark)]
            "
          >
            Resend Code
          </button>
        )}
      </div>

      {/* Verify */}

      <div className="mt-7">
        <AuthButton type="submit">Verify</AuthButton>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
