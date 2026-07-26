import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

import Button from "../../../ui/Button";
import CreateCircleModal from "../../modals/CreateCircleModal";

const CreateCircleCard = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

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

        {/* Study Together Card */}
        <div
          className="
            flex
            min-h-[230px]
            items-center
            justify-between
            gap-8
            rounded-3xl
            border
            border-[var(--color-border)]
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex-1">
            {/* <img
              src="/images/dashboard/study-together.webp"
              alt="Study Together"
              className="mx-auto max-h-40 object-contain"
            /> */}
          </div>

          <div className="max-w-xs">
            <h3 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">
              Study better together
            </h3>

            <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
              Create or join circles to collaborate, share resources and achieve
              your goals together.
            </p>

            <Button className="mt-6" onClick={() => setOpenCreateModal(true)}>
              Join Circle
            </Button>
          </div>
        </div>
      </motion.div>

      <CreateCircleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </>
  );
};

export default CreateCircleCard;
