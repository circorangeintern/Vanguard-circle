import { HiOutlineUserGroup } from "react-icons/hi2";
import SettingsToggle from "./SettingsToggle";

interface MemberPermissionsCardProps {
  allowMemberInvites: boolean;
  requireAdminApproval: boolean;

  onChange: (
    key: "allowMemberInvites" | "requireAdminApproval",
    value: boolean,
  ) => void;
}

const MemberPermissionsCard = ({
  allowMemberInvites,
  requireAdminApproval,
  onChange,
}: MemberPermissionsCardProps) => {
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
            bg-green-50
          "
        >
          <HiOutlineUserGroup className="text-2xl text-green-600" />
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold text-slate-900">
            Member Permissions
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Choose what members can do inside this circle.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {/* Allow Invites */}

        <div className="flex items-center justify-between gap-4">
          <div>
            <h5 className="font-medium text-slate-900">
              Allow members to invite others
            </h5>

            <p className="text-sm text-slate-500">
              Members can invite people using the invite link.
            </p>
          </div>

          <SettingsToggle
            checked={allowMemberInvites}
            onChange={(value) => onChange("allowMemberInvites", value)}
          />
        </div>

        {/* Admin Approval */}

        <div className="flex items-center justify-between gap-4">
          <div>
            <h5 className="font-medium text-slate-900">
              Require admin approval to join
            </h5>

            <p className="text-sm text-slate-500">
              New members need approval before joining.
            </p>
          </div>

          <SettingsToggle
            checked={requireAdminApproval}
            onChange={(value) => onChange("requireAdminApproval", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberPermissionsCard;
