import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import TaskCard from "../cards/TaskCard";
import { tasks } from "../data/tasks";
import type { TaskStatus } from "../types";
import AddTaskModal from "../modals/AddTaskModal";
import TaskDetailsModal from "../modals/TaskDetailsModal";
import type { Task } from "../types";

const filters: ("all" | TaskStatus)[] = ["all", "todo", "in-progress", "done"];

const labels: Record<"all" | TaskStatus, string> = {
  all: "All",
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const TaskBoardSection = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | TaskStatus>("all");

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;

    return tasks.filter((task) => task.status === activeFilter);
  }, [activeFilter]);

  const handleMenu = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);

    if (!task) return;

    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

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
        onClose={() => setIsAddTaskOpen(false)}
      />
      <TaskDetailsModal
        task={selectedTask}
        open={isTaskDetailsOpen}
        onClose={() => setIsTaskDetailsOpen(false)}
      />
    </section>
  );
};

export default TaskBoardSection;
