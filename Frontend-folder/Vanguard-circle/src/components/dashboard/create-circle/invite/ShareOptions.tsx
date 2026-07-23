import { HiOutlineEnvelope, HiOutlineLink } from "react-icons/hi2";
import { toast } from "sonner";

import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

interface ShareOptionsProps {
  inviteLink?: string;
}

const ShareOptions = ({ inviteLink }: ShareOptionsProps) => {
  const shareText = "Join my study circle on StudyCircle!";

  const openShare = (url: string) => {
    if (!inviteLink) {
      toast.info("The invite link will be ready once the circle is created.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = () =>
    openShare(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${inviteLink}`)}`,
    );

  const handleTelegram = () =>
    openShare(
      `https://t.me/share/url?url=${encodeURIComponent(inviteLink || "")}&text=${encodeURIComponent(shareText)}`,
    );

  const handleEmail = () =>
    openShare(
      `mailto:?subject=${encodeURIComponent("Join my StudyCircle")}&body=${encodeURIComponent(`${shareText} ${inviteLink}`)}`,
    );

  const handleCopy = async () => {
    if (!inviteLink) {
      toast.info("The invite link will be ready once the circle is created.");
      return;
    }
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied!");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't copy invite link.");
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
          onClick={handleWhatsApp}
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
          onClick={handleTelegram}
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
          onClick={handleEmail}
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
