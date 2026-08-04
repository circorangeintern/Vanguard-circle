export interface Profile {
  id: string;

  fullName: string;
  email: string;
  avatarUrl: string | null;

  joinedDate: string;
  memberSince: string;

  circlesCount: number;
}
