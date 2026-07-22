import InviteLinkCard from "./invite/InviteLinkCard";
import InviteMemberCard from "./invite/InviteMemberCard";
import PendingInvitesCard from "./invite/PendingInvitesCard";
import QRCodeCard from "./invite/QRCodeCard";
import ShareOptions from "./invite/ShareOptions";

interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string;
  color: string;
}

interface PendingInvite {
  id: number;
  email: string;
  sentAt: string;
}

interface CircleInviteStepProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  pendingInvites: PendingInvite[];
}

const CircleInviteStep = ({
  members,
  setMembers,
  pendingInvites,
}: CircleInviteStepProps) => {
  return (
    <section className="w-full">
      {/* Header */}

      <div className="mb-8">
        <h3 className="font-heading text-xl font-semibold text-slate-900">
          Invite Members
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Invite your classmates now, or skip this step and do it later.
        </p>
      </div>

      {/* Content */}

      <div
        className="
    flex
    flex-col
    gap-5

    lg:grid
    lg:grid-cols-[1.15fr_0.85fr]
    lg:gap-6
    lg:items-start
  "
      >
        {/* Left */}
        <div className="space-y-5 lg:space-y-6">
          <InviteMemberCard members={members} setMembers={setMembers} />

          <InviteLinkCard />
        </div>

        {/* Right */}
        <div className="space-y-5 lg:space-y-6">
          <QRCodeCard />

          <ShareOptions />

          <PendingInvitesCard pendingInvites={pendingInvites} />
        </div>
      </div>
    </section>
  );
};

export default CircleInviteStep;
