import type { Task, TaskStatus } from "../types";
import type { CircleTask } from "../../../../../pages/dashboard/circle/CircleLayout";

const STATUS_MAP: Record<CircleTask["status"], TaskStatus> = {
  TODO: "todo",
  DOING: "in-progress",
  DONE: "done",
};

export function mapTask(raw: CircleTask, courseName: string): Task {
  return {
    id: raw.id,
    title: raw.title,
    description: "",
    category: courseName,
    dueDate: new Date(raw.dueDate).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: STATUS_MAP[raw.status],
  };
}
