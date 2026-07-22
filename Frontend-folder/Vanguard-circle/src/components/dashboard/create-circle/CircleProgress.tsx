import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi2";

interface CircleProgressProps {
  currentStep: number;
}

const steps = [
  {
    id: 1,
    title: "Details",
  },
  {
    id: 2,
    title: "Invite",
  },
  {
    id: 3,
    title: "Settings",
  },
];

const CircleProgress = ({ currentStep }: CircleProgressProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const completed = currentStep > step.id;
        const active = currentStep === step.id;

        return (
          <div
            key={step.id}
            className="flex flex-1 items-center last:flex-none"
          >
            {/* Step */}

            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.08 : 1,
                }}
                transition={{
                  duration: 0.25,
                }}
                className={`
                  flex h-12 w-12 items-center justify-center
                  rounded-full border-2 font-semibold transition-all duration-300

                  ${
                    completed
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : active
                        ? "border-[var(--color-primary)] bg-blue-50 text-[var(--color-primary)]"
                        : "border-slate-300 bg-white text-slate-400"
                  }
                `}
              >
                {completed ? (
                  <HiCheck className="text-xl" />
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>

              <p
                className={`
                  mt-3 text-sm font-medium transition-colors duration-300

                  ${active || completed ? "text-slate-900" : "text-slate-400"}
                `}
              >
                {step.title}
              </p>
            </div>

            {/* Line */}

            {index < steps.length - 1 && (
              <div className="mx-4 flex-1">
                <div className="relative h-[3px] rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{
                      width: completed ? "100%" : "0%",
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="absolute left-0 top-0 h-full rounded-full bg-[var(--color-primary)]"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CircleProgress;
