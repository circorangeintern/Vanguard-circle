import { FcGoogle } from "react-icons/fc";

interface SocialLoginProps {
  isLoading?: boolean;
  onGoogleClick?: () => void;
}

const SocialLogin = ({
  isLoading = false,
  onGoogleClick,
}: SocialLoginProps) => {
  return (
    <div className="mt-5">
      {/* Divider */}

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--color-border)]" />

        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
          Or continue with
        </span>

        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      {/* Icons */}

      <div className="mt-5 flex justify-center gap-5">
        <button
          type="button"
          disabled={isLoading}
          onClick={onGoogleClick}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[var(--color-border)]
            bg-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[var(--color-primary)]
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <FcGoogle className="text-[26px]" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
