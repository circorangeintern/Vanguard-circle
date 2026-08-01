import type { Profile } from "../types";

export interface RawUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  circlesCount: number;
}

export function mapProfile(raw: RawUser): Profile {
  const joined = new Date(raw.createdAt).toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    id: raw.id,
    fullName: raw.name,
    email: raw.email,
    avatar: `https://i.pravatar.cc/300?u=${raw.id}`,
    joinedDate: joined,
    memberSince: joined,
    circlesCount: raw.circlesCount,
  };
}
