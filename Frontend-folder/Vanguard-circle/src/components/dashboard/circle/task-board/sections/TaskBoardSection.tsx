import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

import TaskCard from "../cards/TaskCard";
import AddTaskModal from "../modals/AddTaskModal";
import TaskDetailsModal from "../modals/TaskDetailsModal";
import TaskBoardEmpty from "../states/TaskBoardEmpty";
import { mapTask } from "../data/mapTask";
import { api } from "../../../../../lib/api";
import type { TaskStatus, Task } from "../types";
import type { CircleGroup } from "../../../../../pages/dashboard/circle/CircleLayout";

interface TaskBoardSectionProps {
  group: CircleGroup;
  onChange: () => void;
}

const filters: ("all" | TaskStatus)[] = ["all", "todo", "in-progress", "done"];

const labels: Record<"all" | TaskStatus, string> = {
  all: "All",
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const REVERSE_STATUS_MAP: Record<TaskStatus, "TODO" | "DOING" | "DONE"> = {
  todo: "TODO",
  "in-progress": "DOING",
  done: "DONE",
};

const TaskBoardSection = ({ group, onChange }: TaskBoardSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<"all" | TaskStatus>("all");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  const tasks = useMemo(
    () => group.tasks.map((t) => mapTask(t, group.courseName)),
    [group.tasks, group.courseName],
  );

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((task) => task.status === activeFilter);
  }, [tasks, activeFilter]);

  const handleMenu = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    try {
      await api.patch(`/groups/${group.id}/tasks/${taskId}`, {
        status: REVERSE_STATUS_MAP[status],
      });
      onChange();
      setIsTaskDetailsOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update this task.");
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await api.delete(`/groups/${group.id}/tasks/${taskId}`);
      toast.success("Task deleted.");
      onChange();
      setIsTaskDetailsOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't delete this task.");
    }
  };

  if (tasks.length === 0) {
    return <TaskBoardEmpty groupId={group.id} onSuccess={onChange} />;
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Tabs */}
        <div className="flex overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-5 py-3 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-gray-50"
              }`}
            >
              {labels[filter]}
            </button>
          ))}
        </div>

        {/* Add Task */}
        <button
          onClick={() => setIsAddTaskOpen(true)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          <FiPlus size={18} />
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onMenu={handleMenu} />
        ))}
      </div>
      <AddTaskModal
        open={isAddTaskOpen}
        groupId={group.id}
        onClose={() => setIsAddTaskOpen(false)}
        onSuccess={onChange}
      />
      <TaskDetailsModal
        task={selectedTask}
        open={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default TaskBoardSection;
