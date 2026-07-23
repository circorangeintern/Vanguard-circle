import { HiOutlineClipboardDocument, HiOutlineLink } from "react-icons/hi2";
import { toast } from "sonner";

interface InviteLinkCardProps {
  inviteLink?: string;
}

const InviteLinkCard = ({ inviteLink }: InviteLinkCardProps) => {
  const handleCopy = async () => {
    if (!inviteLink) return;

    try {
      await navigator.clipboard.writeText(inviteLink);

      toast.success("Invite link copied!");
    } catch {
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
      {/* Header */}

      <div>
        <h3 className="font-heading text-base font-semibold text-slate-900">
          Invite with Link
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Anyone with this link can join the circle.
        </p>
      </div>

      {/* Link */}

      <div
        className="
    mt-5

    flex
    flex-col
    gap-4

    rounded-xl
    border
    border-slate-200
    bg-slate-50
    p-4

    md:flex-row
    md:items-center
"
      >
        <div
          className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-xl
      bg-blue-50
    "
        >
          <HiOutlineLink className="text-xl text-[var(--color-primary)]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-slate-600">
            {inviteLink || "Generating your invite link..."}
          </p>
        </div>

        <button
          type="button"
          disabled={!inviteLink}
          onClick={handleCopy}
          className="
      disabled:cursor-not-allowed
      disabled:opacity-60
      flex
      w-full
      items-center
      justify-center
      gap-2

      rounded-xl
      bg-[var(--color-primary)]

      px-5
      py-3

      text-sm
      font-medium
      text-white

      transition-all
      duration-300

      hover:-translate-y-0.5
      hover:shadow-lg

      md:w-auto
    "
        >
          <HiOutlineClipboardDocument className="text-lg" />
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default InviteLinkCard;
