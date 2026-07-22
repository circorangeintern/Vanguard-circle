import { useState } from "react";
import { HiOutlineEnvelope, HiOutlineXMark } from "react-icons/hi2";

interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string;
  color: string;
}

interface InviteMemberCardProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const InviteMemberCard = ({ members, setMembers }: InviteMemberCardProps) => {
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (!email.trim()) return;

    const initials = email.substring(0, 2).toUpperCase();

    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: initials,
        avatar: initials,
        email,
        color: "bg-[var(--color-primary)]",
      },
    ]);

    setEmail("");
  };

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      {/* Input */}

      <div
        className="
    flex
    flex-col
    gap-3

    sm:flex-row
  "
      >
        <div className="relative flex-1">
          <HiOutlineEnvelope
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-lg
              text-slate-400
            "
          />

          <input
            type="email"
            placeholder="Enter email address or username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="
              h-12
              w-full
              rounded-xl
              border
              border-slate-200
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all

              focus:border-[var(--color-primary)]
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="
            h-12
            w-full

            rounded-xl

            bg-[var(--color-primary)]

            px-6

            text-sm
            font-medium
            text-white

            transition-all

            hover:-translate-y-0.5
            hover:shadow-lg

            sm:w-auto
          "
        >
          Add
        </button>
      </div>

      {/* Added */}

      <div className="mt-6">
        <p className="mb-4 text-sm font-semibold text-slate-700">
          Added ({members.length})
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`
                flex
                items-center
                justify-between

                px-3 py-4 md:px-4

                ${
                  index !== members.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }
              `}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    text-sm
                    font-semibold
                    text-white

                    ${member.color}
                  `}
                >
                  {member.avatar}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-700">
                    {member.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="
                  rounded-lg
                  p-2
                  transition-all

                  hover:bg-red-50
                "
              >
                <HiOutlineXMark className="text-lg text-slate-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
};

export default InviteMemberCard;
