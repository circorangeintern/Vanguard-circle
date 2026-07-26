import { FiPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useState } from "react";

import CreateCircleModal from "../../modals/CreateCircleModal";

import { Button } from "../../../ui";

const MyCirclesHeader = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="flex items-start gap-4">
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-violet-100
            to-indigo-50
          "
        >
          <HiOutlineUserGroup className="text-2xl text-[var(--color-primary)]" />
        </div>

        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl">
            My Circles
          </h1>

          <p className="mt-2 max-w-xl text-[15px] leading-7 text-[var(--color-text-secondary)]">
            All the study groups you're part of. Stay organized and keep
            collaborating.
          </p>
        </div>
      </div>

      {/* Right */}
      <Button
        size="md"
        className="w-full lg:w-auto"
        onClick={() => setOpenCreateModal(true)}
      >
        <FiPlus className="text-lg" />
        Create Circle
      </Button>
      <CreateCircleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </section>
  );
};

export default MyCirclesHeader;
