import {
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

interface PrivacyCardProps {
  visibility: "public" | "private";
  onChange: (value: "public" | "private") => void;
}

const PrivacyCard = ({ visibility, onChange }: PrivacyCardProps) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      {/* Header */}

      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-xl

            bg-blue-50
          "
        >
          <HiOutlineShieldCheck className="text-2xl text-[var(--color-primary)]" />
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-slate-900">
            Privacy
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Choose who can discover and join this circle.
          </p>
        </div>
      </div>

      {/* Options */}

      <div className="mt-6 space-y-3">
        {/* Private */}

        <button
          type="button"
          onClick={() => onChange("private")}
          className={`
            w-full
            rounded-2xl
            border
            p-4
            text-left
            transition-all
            duration-300

            ${
              visibility === "private"
                ? "border-[var(--color-primary)] bg-blue-50 shadow-sm"
                : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
            }
          `}
        >
          <div className="flex items-start gap-4">
            <div
              className={`
                mt-1
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full

                ${
                  visibility === "private"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-slate-100 text-slate-500"
                }
              `}
            >
              <HiOutlineLockClosed className="text-lg" />
            </div>

            <div className="flex-1">
              <h5 className="font-medium text-slate-900">Private</h5>

              <p className="mt-1 text-sm text-slate-500">
                Only invited people can join.
              </p>
            </div>
          </div>
        </button>

        {/* Public */}

        <button
          type="button"
          onClick={() => onChange("public")}
          className={`
            w-full
            rounded-2xl
            border
            p-4
            text-left
            transition-all
            duration-300

            ${
              visibility === "public"
                ? "border-[var(--color-primary)] bg-blue-50 shadow-sm"
                : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
            }
          `}
        >
          <div className="flex items-start gap-4">
            <div
              className={`
                mt-1
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full

                ${
                  visibility === "public"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-slate-100 text-slate-500"
                }
              `}
            >
              <HiOutlineGlobeAlt className="text-lg" />
            </div>

            <div className="flex-1">
              <h5 className="font-medium text-slate-900">Public</h5>

              <p className="mt-1 text-sm text-slate-500">
                Anyone can discover and request to join.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PrivacyCard;
