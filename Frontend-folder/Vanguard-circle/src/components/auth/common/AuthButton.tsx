import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const AuthButton = ({
  children,
  className,
  loading = false,
  disabled,
  ...props
}: AuthButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={clsx(
        `
        h-[52px]
        w-full
        rounded-lg

        bg-[var(--color-primary)]

        text-[15px]
        font-semibold
        text-white

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:bg-[var(--color-primary-dark)]
        hover:shadow-lg

        disabled:cursor-not-allowed
        disabled:opacity-70
        `,
        className,
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default AuthButton;
