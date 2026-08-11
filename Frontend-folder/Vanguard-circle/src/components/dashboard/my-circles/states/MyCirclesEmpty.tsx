import { useState } from "react";
import { motion } from "framer-motion";
import { FiUserPlus, FiPlus } from "react-icons/fi";

import Button from "../../../ui/Button";
import CreateCircleModal from "../../modals/CreateCircleModal";
import JoinCircleModal from "../../modals/JoinCircleModal";

// import studyTogetherImage from "../../../../images/dashboard/study-together.webp";

interface MyCirclesEmptyProps {
  onSuccess?: () => void;
}

const MyCirclesEmpty = ({ onSuccess }: MyCirclesEmptyProps) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openJoinModal, setOpenJoinModal] = useState(false);

  return (
    <>
      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mt-10"
      >
        <div
          className="
            rounded-3xl
            border
            border-[var(--color-border)]
            bg-white
            p-8
            text-center
            shadow-sm
            lg:p-10
          "
        >
          <span
            className="
              inline-flex
              rounded-full
              bg-blue-100
              px-4
              py-2
              text-sm
              font-semibold
              text-[var(--color-primary)]
            "
          >
            Start Collaborating
          </span>

          <h2 className="mt-6 font-heading text-3xl font-bold leading-tight text-[var(--color-text-primary)] lg:text-4xl">
            Study Better Together
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-8 text-[var(--color-text-secondary)]">
            Create or join circles to share resources, organize study
            sessions, complete assignments together and build consistent
            learning habits.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Create Circle */}
            <motion.div
              whileHover={{ y: -6 }}
              className="
                flex
                min-h-[280px]
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
                hover:shadow-xl
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
                  bg-blue-50
                "
              >
                <FiPlus className="text-3xl text-[var(--color-primary)]" />
              </div>

              <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)]">
                Create a Circle
              </h3>

              <p className="mt-3 max-w-xs leading-7 text-[var(--color-text-secondary)]">
                Build a study community where members collaborate and stay
                accountable together.
              </p>

              <Button className="mt-6" onClick={() => setOpenCreateModal(true)}>
                Create Circle
              </Button>
            </motion.div>

            {/* Join Circle */}
            <motion.div
              whileHover={{ y: -6 }}
              className="
                flex
                min-h-[280px]
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
                hover:shadow-xl
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
                  bg-blue-50
                "
              >
                <FiUserPlus className="text-3xl text-[var(--color-primary)]" />
              </div>

              <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)]">
                Join a Circle
              </h3>

              <p className="mt-3 max-w-xs leading-7 text-[var(--color-text-secondary)]">
                Have an invite link or code? Join a circle your classmates
                already started.
              </p>

              <Button className="mt-6" onClick={() => setOpenJoinModal(true)}>
                Join Circle
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

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

export default MyCirclesEmpty;
