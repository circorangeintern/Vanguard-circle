import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 30,
    transition: {
      duration: 0.2,
    },
  },
};

const EditProfileModal = ({ open, onClose }: EditProfileModalProps) => {
  const [fullName, setFullName] = useState("Opeyemi");

  const [email] = useState("opeyemi@example.com");

  const [previewImage, setPreviewImage] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43b?w=500&q=80",
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [errors, setErrors] = useState<{
    fullName?: string;
    image?: string;
  }>({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!open) return;

    setFullName("Opeyemi");
    setPreviewImage(
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43b?w=500&q=80",
    );
    setSelectedImage(null);
    setErrors({});
  }, [open]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please choose a valid image.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 5MB.",
      }));
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      image: undefined,
    }));
  };

  const validate = () => {
    const newErrors: {
      fullName?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsUpdating(true);

    try {
      // TODO: Replace with your API call
      console.log({
        fullName,
        email,
        image: selectedImage,
      });

      onClose();
    } finally {
      setIsUpdating(false);
    }
  };
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            p-4
            backdrop-blur-md
            sm:p-6
            
          "
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              flex
              max-h-[90vh]
              w-full
              max-w-xl
              flex-col
              overflow-hidden
              rounded-3xl
              bg-white
              shadow-2xl
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--color-border)]
                px-6
                py-5
                sm:px-8
                sm:py-6
              "
            >
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-[var(--color-text-primary)]
                  "
                >
                  Edit Profile
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[var(--color-text-secondary)]
                  "
                >
                  Update your personal information and profile photo.
                </p>
              </div>

              <motion.button
                whileHover={{
                  rotate: 90,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={onClose}
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  text-slate-500
                  transition-colors
                  duration-200
                  hover:bg-slate-100
                  hover:text-[var(--color-primary)]
                "
              >
                <FiX className="text-2xl" />
              </motion.button>
            </div>

            {/* Body Starts Here */}
            <div
              className="
                modal-scrollbar
                flex-1
                overflow-y-auto
                px-6
                py-6
                sm:px-8
                sm:py-8
              "
            >
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative">
                  <motion.img
                    whileHover={{
                      scale: 1.03,
                    }}
                    src={previewImage}
                    alt="Profile"
                    className="
                      h-32
                      w-32
                      rounded-full
                      object-cover
                      ring-4
                      ring-white
                      shadow-lg
                      sm:h-36
                      sm:w-36
                    "
                  />
                  {/* Upload Button */}
                  <motion.label
                    whileHover={{
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    htmlFor="profile-image"
                    className="
                      absolute
                      bottom-2
                      right-2
                      flex
                      h-12
                      w-12
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--color-border)]
                      bg-white
                      shadow-lg
                      transition-colors
                      hover:text-[var(--color-primary)]
                    "
                  >
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <FiCamera className="text-xl" />
                  </motion.label>
                </div>
                {errors.image && (
                  <p className="mt-4 text-center text-sm text-red-500">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Form */}
              <div className="mt-10 space-y-7">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="full-name"
                    className="
                      mb-3
                      block
                      text-sm
                      font-semibold
                      text-[var(--color-text-primary)]
                    "
                  >
                    Full Name
                  </label>

                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);

                      if (errors.fullName) {
                        setErrors((prev) => ({
                          ...prev,
                          fullName: undefined,
                        }));
                      }
                    }}
                    placeholder="Enter your full name"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-[var(--color-border)]
                      bg-white
                      px-5
                      text-[15px]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-[var(--color-text-secondary)]
                      focus:border-[var(--color-primary)]
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-3
                      block
                      text-sm
                      font-semibold
                      text-[var(--color-text-primary)]
                    "
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    className="
                      h-14
                      w-full
                      cursor-not-allowed
                      rounded-2xl
                      border
                      border-[var(--color-border)]
                      bg-slate-100
                      px-5
                      text-[15px]
                      text-[var(--color-text-secondary)]
                      outline-none
                    "
                  />

                  <p
                    className="
                      mt-3
                      text-xs
                      leading-6
                      text-[var(--color-text-secondary)]
                    "
                  >
                    Email address cannot be changed from your profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-[var(--color-border)]
                px-6
                py-5
                sm:flex-row
                sm:justify-end
                sm:px-8
                sm:py-6
              "
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                disabled={isUpdating}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-white
                  px-6
                  font-medium
                  text-[var(--color-text-primary)]
                  transition-colors
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSubmit}
                disabled={isUpdating}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--color-primary)]
                  px-8
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-[var(--color-primary-dark)]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  sm:w-auto
                "
              >
                {isUpdating ? (
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                    Updating...
                  </div>
                ) : (
                  "Update Profile"
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default EditProfileModal;
