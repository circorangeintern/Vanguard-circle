export interface CircleFormData {
  name: string;
  description: string;
  category: string;
  icon: string;

  visibility: "public" | "private";

  approval: boolean;

  maxMembers: number;

  allowMemberInvites: boolean;
  requireAdminApproval: boolean;

  studyReminders: boolean;
  reminderFrequency: "Every day" | "Weekdays" | "Weekends";
  reminderTime: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  avatar: string;
  color: string;
}

export interface PendingInvite {
  id: number;
  email: string;
  sentAt: string;
}

export interface NotificationSettings {
  newMemberJoins: boolean;
  newAssignments: boolean;
  mentions: boolean;
  dueDateReminders: boolean;
  weeklySummary: boolean;
  marketingEmails: boolean;
}
