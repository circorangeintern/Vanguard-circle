import { useState } from "react";
import { HiOutlineArrowRight, HiOutlinePlus } from "react-icons/hi2";
import { toast } from "sonner";

import { api } from "../../../lib/api";
import CircleCard from "../cards/CircleCard";
import CircleListItem from "../cards/CircleListItem";
import CreateCircleCard from "../cards/CreateCircleCard";

interface Circle {
  groupId: string;
  name: string;
  courseName?: string;
  streak: number;
  checkedInToday: boolean;
  upcomingTasks: { id: string }[];
}

interface MyCirclesProps {
  circles: Circle[];
  onCircleCreated: () => void;
}

const colorCycle: Array<"blue" | "purple" | "green"> = ["blue", "purple", "green"];

const MyCircles = ({ circles, onCircleCreated }: MyCirclesProps) => {
  const [creating, setCreating] = useState(false);

  const handleCreateCircle = async () => {
    const name = window.prompt("Circle name (e.g. CS301 Study Group):");
    if (!name) return;
    const courseName = window.prompt("Course name (e.g. Data Structures):");
    if (!courseName) return;

    setCreating(true);
    try {
      await api.post("/groups", { name, courseName });
      toast.success("Circle created!");
      onCircleCreated();
    } catch (err) {
      toast.error("Couldn't create circle. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-slate-900 md:text-2xl">
            My Study Circles
          </h2>
          <p className="mt-1 hidden text-sm text-slate-500 md:block">
            Collaborate with classmates and stay productive.
          </p>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={handleCreateCircle}
            disabled={creating}
            className="
              flex items-center gap-2 rounded-xl bg-[var(--color-primary)]
              px-5 py-3 text-sm font-medium text-white transition-all
              duration-300 hover:-translate-y-0.5 hover:shadow-lg
            "
          >
            <HiOutlinePlus className="text-lg" />
            {creating ? "Creating..." : "New Circle"}
          </button>

          <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]">
            View All
            <HiOutlineArrowRight className="text-base" />
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-4">
        {circles.map((circle, index) => (
          <CircleCard
            key={circle.groupId}
            title={circle.name}
            subtitle={circle.courseName}
            tasks={circle.upcomingTasks.length}
            checkedInToday={circle.checkedInToday}
            color={colorCycle[index % colorCycle.length]}
          />
        ))}
        <CreateCircleCard onClick={handleCreateCircle} loading={creating} />
      </div>

      {/* Mobile & Tablet */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white lg:hidden">
        <div className="divide-y divide-slate-200 px-4">
          {circles.map((circle, index) => (
            <CircleListItem
              key={circle.groupId}
              title={circle.name}
              subtitle={circle.courseName}
              tasks={circle.upcomingTasks.length}
              checkedInToday={circle.checkedInToday}
              color={colorCycle[index % colorCycle.length]}
            />
          ))}
        </div>

        <div className="border-t border-slate-200 p-4">
          <button
            onClick={handleCreateCircle}
            disabled={creating}
            className="
              flex w-full items-center justify-center gap-2 rounded-xl
              border-2 border-dashed border-slate-300 py-3 text-sm font-medium
              text-[var(--color-primary)] transition-all duration-300
              hover:border-[var(--color-primary)] hover:bg-blue-50
            "
          >
            <HiOutlinePlus className="text-lg" />
            {creating ? "Creating..." : "Create New Circle"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyCircles;
