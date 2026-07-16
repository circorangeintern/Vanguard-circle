import { useEffect, useRef } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

const OTPInput = ({ value, onChange, length = 6 }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const values = Array.from({ length }, (_, index) => value[index] || "");

  const handleChange = (index: number, input: string) => {
    if (!/^\d?$/.test(input)) return;

    const otp = [...values];
    otp[index] = input;

    onChange(otp.join(""));

    if (input && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (values[index]) {
        const otp = [...values];
        otp[index] = "";
        onChange(otp.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(pasted);

    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-between gap-3">
      {values.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="
            h-14
            w-14
            rounded-xl
            border
            border-[var(--color-border)]
            bg-white
            text-center
            text-xl
            font-semibold
            text-[var(--color-text-primary)]
            transition-all
            duration-200
            focus:border-[var(--color-primary)]
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
          "
        />
      ))}
    </div>
  );
};

export default OTPInput;
