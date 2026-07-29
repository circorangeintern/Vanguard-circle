export type MemberRole = "creator" | "member";

export interface Member {
  id: string;

  name: string;

  email: string;

  avatar: string;

  role: MemberRole;
}
