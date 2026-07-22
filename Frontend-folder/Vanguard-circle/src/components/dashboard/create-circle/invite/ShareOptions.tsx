import { HiOutlineEnvelope, HiOutlineLink } from "react-icons/hi2";

import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

interface ShareOptionsProps {
  inviteLink?: string;
}

const ShareOptions = ({
  inviteLink = "https://studycircle.app/invite/8s7Ai2b",
}: ShareOptionsProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch (error) {
      console.error(error);
    }
  };

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
      <h3 className="font-heading text-base font-semibold text-slate-900">
        Share via
      </h3>

      <div className="mt-5 flex items-center justify-between">
        {/* WhatsApp */}

        <button
          type="button"
          className="group flex flex-col items-center gap-2"
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full

              bg-green-100

              transition-transform
              duration-300

              group-hover:scale-105
            "
          >
            <FaWhatsapp className="text-2xl text-green-600" />
          </div>

          <span className="text-xs text-slate-600">WhatsApp</span>
        </button>

        {/* Telegram */}

        <button
          type="button"
          className="group flex flex-col items-center gap-2"
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full

              bg-sky-100

              transition-transform
              duration-300

              group-hover:scale-105
            "
          >
            <FaTelegramPlane className="text-xl text-sky-600" />
          </div>

          <span className="text-xs text-slate-600">Telegram</span>
        </button>

        {/* Email */}

        <button
          type="button"
          className="group flex flex-col items-center gap-2"
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full

              bg-purple-100

              transition-transform
              duration-300

              group-hover:scale-105
            "
          >
            <HiOutlineEnvelope className="text-xl text-purple-600" />
          </div>

          <span className="text-xs text-slate-600">Email</span>
        </button>

        {/* Copy */}

        <button
          type="button"
          onClick={handleCopy}
          className="group flex flex-col items-center gap-2"
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full

              bg-slate-100

              transition-transform
              duration-300

              group-hover:scale-105
            "
          >
            <HiOutlineLink className="text-xl text-slate-600" />
          </div>

          <span className="text-xs text-slate-600">Copy</span>
        </button>

        {/* More */}
      </div>
    </div>
  );
};

export default ShareOptions;
