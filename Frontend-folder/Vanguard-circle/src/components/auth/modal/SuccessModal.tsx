import { motion, AnimatePresence } from "framer-motion";
import { HiCheck } from "react-icons/hi";
import AuthButton from "../../../components/auth/common/AuthButton";

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

const SuccessModal = ({
  isOpen,
  title,
  message,
  buttonText,
  onClose,
}: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
            px-5
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white
              p-8
              shadow-2xl
            "
          >
            <div className="flex justify-center">
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-green-100
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-green-500
                  "
                >
                  <HiCheck className="text-3xl text-green-500" />
                </div>
              </div>
            </div>

            <h2 className="mt-8 text-center text-3xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-3 text-center leading-7 text-slate-500">
              {message}
            </p>

            <div className="mt-8">
              <AuthButton onClick={onClose}>{buttonText}</AuthButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
