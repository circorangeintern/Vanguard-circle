import type { FAQ } from "../types";

export const INITIAL_FAQS: ReadonlyArray<FAQ> = [
  {
    id: "create-circle",
    question: "How do I create a new circle?",
    answer:
      "Go to the My Circles page and click 'Create New Circle'. Enter your circle details, choose your study preferences, and invite members using a shareable invitation link.",
  },
  {
    id: "submit-assignment",
    question: "How do I submit an assignment?",
    answer:
      "Open the relevant study circle, navigate to the Assignments section, select the assignment, upload your work, and click Submit before the deadline.",
  },
  {
    id: "study-sessions",
    question: "How do study sessions work?",
    answer:
      "Study sessions allow circle members to schedule collaborative learning meetings. Members receive reminders before each session and can join directly from the platform.",
  },
  {
    id: "reset-password",
    question: "How do I reset my password?",
    answer:
      "Go to the Login page and click 'Forgot Password'. Enter your registered email address and follow the instructions sent to your inbox to create a new password.",
  },
  {
    id: "notification-preferences",
    question: "How do I update my notification preferences?",
    answer:
      "Open Settings, navigate to Notifications, and choose which reminders, assignments, and study updates you'd like to receive.",
  },
] as const;
