import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
}

const AuthInput = ({
  label,
  error,
  leftIcon,
  className,
  ...props
}: AuthInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-[var(--color-text-primary)]
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span
            className="
              absolute
              left-4
              top-1/2
              flex
              h-5
              w-5
              -translate-y-1/2
              items-center
              justify-center
              text-slate-400
            "
          >
            {leftIcon}
          </span>
        )}

        <input
          {...props}
          className={clsx(
            `
            h-[52px]
            w-full
            rounded-xl
            border
            border-[var(--color-border)]
            bg-white

            px-4
            text-[15px]

            transition-all
            duration-200

            placeholder:text-slate-400

            focus:border-[var(--color-primary)]
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100
          `,
            leftIcon && "pl-11",
            error && "border-red-500 focus:border-red-500 focus:ring-red-100",
            className,
          )}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default AuthInput;
