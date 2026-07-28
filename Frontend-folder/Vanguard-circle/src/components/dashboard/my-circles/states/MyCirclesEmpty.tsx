import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlus } from "react-icons/fi";

import Button from "../../../ui/Button";
import CreateCircleModal from "../../modals/CreateCircleModal";

// import studyTogetherImage from "../../../../images/dashboard/study-together.webp";

const MyCirclesEmpty = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

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
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Create Circle */}
          <motion.div
            whileHover={{
              y: -6,
            }}
            className="
              flex
              min-h-[320px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-3xl
              border-2
              border-dashed
              border-blue-200
              bg-white
              p-10
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
                mb-8
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border-2
                border-blue-200
                bg-blue-50
              "
            >
              <FiPlus className="text-4xl text-[var(--color-primary)]" />
            </div>

            <h2 className="font-heading text-2xl font-bold text-[var(--color-text-primary)]">
              Create Your First Circle
            </h2>

            <p className="mt-4 max-w-xs leading-7 text-[var(--color-text-secondary)]">
              Build a study community where members collaborate, complete
              assignments and stay accountable together.
            </p>

            <Button className="mt-8" onClick={() => setOpenCreateModal(true)}>
              Create Circle
            </Button>
          </motion.div>

          {/* Right Card */}
          <motion.div
            whileHover={{
              y: -6,
            }}
            className="
              lg:col-span-2
              flex
              flex-col
              items-center
              justify-between
              gap-10
              rounded-3xl
              border
              border-[var(--color-border)]
              bg-white
              p-10
              shadow-sm
              lg:flex-row
            "
          >
            {/* <img
              src={studyTogetherImage}
              alt="Study Together"
              className="max-h-64 object-contain"
            /> */}

            <div className="max-w-md">
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

              <h2 className="mt-6 font-heading text-4xl font-bold leading-tight text-[var(--color-text-primary)]">
                Study Better Together
              </h2>

              <p className="mt-5 leading-8 text-[var(--color-text-secondary)]">
                Create or join circles to share resources, organize study
                sessions, complete assignments together and build consistent
                learning habits.
              </p>

              <Button className="mt-8" onClick={() => setOpenCreateModal(true)}>
                Get Started
                <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <CreateCircleModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </>
  );
};

export default MyCirclesEmpty;
