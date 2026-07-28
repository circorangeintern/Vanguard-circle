import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

import CreateCircleModal from "../../modals/CreateCircleModal";
import JoinCircleModal from "../../modals/JoinCircleModal";

interface CreateCircleCardProps {
  onSuccess?: () => void;
}

const CreateCircleCard = ({ onSuccess }: CreateCircleCardProps) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);

  return (
    <>
      <motion.div className="grid gap-6 lg:grid-cols-2 mt-16">
        {/* Create Card */}
        <div
          className="
            flex
            min-h-[230px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-blue-200
            bg-white
            p-8
            text-center
            transition-all
            duration-300
            hover:border-[var(--color-primary)]
            hover:shadow-lg
          "
          onClick={() => setOpenCreateModal(true)}
        >
          <div
            className="
              mb-6
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border-2
              border-blue-200
              text-[var(--color-primary)]
            "
          >
            <FiPlus className="text-3xl" />
          </div>

          <h3 className="font-heading text-xl font-semibold text-[var(--color-primary)]">
            Create New Circle
          </h3>

          <p className="mt-3 max-w-[220px] text-sm leading-7 text-[var(--color-text-secondary)]">
            Bring your study group together and achieve more.
          </p>
        </div>

        {/* Join Circle Card */}
        <div
          className="
            flex
            min-h-[230px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-blue-200
            bg-white
            p-8
            text-center
            transition-all
            duration-300
            hover:border-[var(--color-primary)]
            hover:shadow-lg
          "
          onClick={() => setOpenJoinModal(true)}
        >
          <div
            className="
              mb-6
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border-2
              border-blue-200
              text-[var(--color-primary)]
            "
          >
            <FiPlus className="text-3xl" />
          </div>

          <h3 className="font-heading text-xl font-semibold text-[var(--color-primary)]">
            Join New Circle
          </h3>

          <p className="mt-3 max-w-[220px] text-sm leading-7 text-[var(--color-text-secondary)]">
            Discover existing study circles
          </p>
        </div>
      </motion.div>

      <CreateCircleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={onSuccess}
      />
      <JoinCircleModal
        open={openJoinModal}
        onClose={() => setOpenJoinModal(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default CreateCircleCard;
