import { HiOutlineArrowRight, HiOutlinePlus } from "react-icons/hi2";

import CircleCard from "../cards/CircleCard";
import CircleListItem from "../cards/CircleListItem";
import CreateCircleCard from "../cards/CreateCircleCard";

const MyCircles = () => {
  return (
    <section className="space-y-6">
      {/* Header */}

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
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-[var(--color-primary)]
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            <HiOutlinePlus className="text-lg" />
            New Circle
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[var(--color-primary)]
            "
          >
            View All
            <HiOutlineArrowRight className="text-base" />
          </button>
        </div>
      </div>

      {/* Desktop */}

      <div className="hidden gap-6 lg:grid lg:grid-cols-4">
        <CircleCard
          title="Design Circle"
          members={8}
          tasks={4}
          progress={70}
          color="blue"
        />

        <CircleCard
          title="Marketing Circle"
          members={6}
          tasks={2}
          progress={45}
          color="purple"
        />

        <CircleCard
          title="CS 302 Circle"
          members={10}
          tasks={3}
          progress={85}
          color="green"
        />

        <CreateCircleCard />
      </div>

      {/* Mobile & Tablet */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white

          lg:hidden
        "
      >
        <div className="divide-y divide-slate-200 px-4">
          <CircleListItem
            title="Design Circle"
            members={8}
            tasks={4}
            progress={70}
            color="blue"
          />

          <CircleListItem
            title="Marketing Circle"
            members={6}
            tasks={2}
            progress={45}
            color="purple"
          />

          <CircleListItem
            title="CS 302 Circle"
            members={10}
            tasks={3}
            progress={85}
            color="green"
          />
        </div>

        <div className="border-t border-slate-200 p-4">
          <button
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border-2
              border-dashed
              border-slate-300
              py-3

              text-sm
              font-medium
              text-[var(--color-primary)]

              transition-all
              duration-300

              hover:border-[var(--color-primary)]
              hover:bg-blue-50
            "
          >
            <HiOutlinePlus className="text-lg" />
            Create New Circle
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyCircles;
