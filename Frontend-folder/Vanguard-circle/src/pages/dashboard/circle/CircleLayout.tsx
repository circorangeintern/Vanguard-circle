import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import CircleHeroCard from "../../../components/dashboard/circle/cards/CircleHeroCard";
import CircleTabs from "../../../components/dashboard/circle/sections/CircleTabs";
import { api } from "../../../lib/api";
import { auth } from "../../../lib/firebase";
import { resolveCircleIcon } from "../../../lib/circleIcon";

export interface CircleMember {
  id: string;
  userId: string;
  role: "ORGANIZER" | "MEMBER";
  joinedAt: string;
  user: { id: string; firebaseUid: string; name: string; email: string };
}

export interface CircleTask {
  id: string;
  title: string;
  dueDate: string;
  status: "TODO" | "DOING" | "DONE";
  assignedTo: string | null;
}

export interface CircleGroup {
  id: string;
  name: string;
  courseName: string;
  description: string | null;
  icon: string | null;
  visibility: string;
  maxMembers: number | null;
  allowMemberInvites: boolean;
  requireAdminApproval: boolean;
  studyReminders: boolean;
  reminderFrequency: string;
  reminderTime: string;
  inviteCode: string;
  createdBy: string;
  tasks: CircleTask[];
  memberships: CircleMember[];
}

export interface CircleOutletContext {
  group: CircleGroup;
  refetchGroup: () => void;
  isOrganizer: boolean;
}

const CircleLayout = () => {
  const { circleId } = useParams<{ circleId: string }>();
  const navigate = useNavigate();

  const [group, setGroup] = useState<CircleGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGroup = useCallback(() => {
    if (!circleId) return;
    setLoading(true);
    api
      .get<CircleGroup>(`/groups/${circleId}`)
      .then(setGroup)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Couldn't load this circle.");
      })
      .finally(() => setLoading(false));
  }, [circleId]);

  useEffect(() => {
    loadGroup();
  }, [loadGroup]);

  if (loading) {
    return <div className="py-20 text-center text-slate-500">Loading circle...</div>;
  }

  if (error || !group) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-red-500">{error || "Circle not found."}</p>
        <Link
          to="/my-circles"
          className="rounded-xl bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white"
        >
          Back to My Circles
        </Link>
      </div>
    );
  }

  const myMembership = group.memberships.find(
    (m) => m.user.firebaseUid === auth?.currentUser?.uid,
  );
  const isOrganizer = myMembership?.role === "ORGANIZER";

  const inviteLink = `${window.location.origin}/invite/${group.inviteCode}`;

  return (
    <div className="space-y-6">
      <CircleHeroCard
        name={group.name}
        category={group.courseName}
        description={group.description || "No description yet."}
        members={group.memberships.length}
        icon={resolveCircleIcon(group.icon)}
        inviteCode={inviteLink}
        onInvite={() => toast.success("Invite link copied!")}
        onSettings={() => navigate("settings")}
      />

      <CircleTabs />

      <Outlet context={{ group, refetchGroup: loadGroup, isOrganizer } satisfies CircleOutletContext} />
    </div>
  );
};

export default CircleLayout;
