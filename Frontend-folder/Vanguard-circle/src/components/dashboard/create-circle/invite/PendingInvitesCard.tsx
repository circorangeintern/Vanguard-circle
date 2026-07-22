import { HiOutlineClock, HiOutlineEnvelope } from "react-icons/hi2";

interface PendingInvite {
  id: number;
  email: string;
  sentAt: string;
}

interface PendingInvitesCardProps {
  pendingInvites: PendingInvite[];
}

const PendingInvitesCard = ({ pendingInvites }: PendingInvitesCardProps) => {
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

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-base font-semibold text-slate-900">
            Pending Invites
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Waiting for members to join
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-blue-50
            px-3
            py-1
            text-xs
            font-semibold
            text-[var(--color-primary)]
          "
        >
          {pendingInvites.length}
        </span>
      </div>

      {/* Empty State */}

      {pendingInvites.length === 0 && (
        <div className="py-10 text-center">
          <HiOutlineEnvelope className="mx-auto text-5xl text-slate-300" />

          <p className="mt-4 text-sm text-slate-500">No pending invitations.</p>
        </div>
      )}

      {/* List */}

      {pendingInvites.length > 0 && (
        <div className="mt-6 space-y-4">
          {pendingInvites.map((invite) => (
            <div
              key={invite.id}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-slate-100
                p-4
                transition-all
                duration-300

                hover:border-blue-200
                hover:bg-blue-50/40
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                  "
                >
                  <HiOutlineEnvelope className="text-lg text-[var(--color-primary)]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {invite.email}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <HiOutlineClock className="text-sm" />
                    {invite.sentAt}
                  </div>
                </div>
              </div>

              <span
                className="
                  rounded-full
                  bg-amber-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-amber-700
                "
              >
                Pending
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingInvitesCard;
