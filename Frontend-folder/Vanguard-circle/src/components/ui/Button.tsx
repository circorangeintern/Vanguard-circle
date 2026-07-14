import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl font-body font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500",

        {
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]":
            variant === "primary",

          "border-[var(--color-primary)] bg-[var(--color-white)] text-[var(--color-primary)] hover:bg-[var(--color-background)]":
            variant === "outline",

          "bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]":
            variant === "secondary",

          "px-4 py-2 text-sm": size === "sm",

          "px-6 py-3 text-base": size === "md",

          "px-8 py-4 text-lg": size === "lg",

          "w-full": fullWidth,
        },

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
