import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiVolume2, FiFileText } from "react-icons/fi";

interface CreatePostCardProps {
  avatar: string;
  value: string;
  selectedType: "announcement" | "resource";
  onChange: (value: string) => void;
  onTypeChange: (type: "announcement" | "resource") => void;
  onPost: () => void;
}

const CreatePostCard = ({
  avatar,
  value,
  selectedType,
  onChange,
  onTypeChange,
  onPost,
}: CreatePostCardProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-[var(--color-border)] p-5 mt-10"
    >
      {/* Top */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <img
          src={avatar}
          alt="User"
          className="h-11 w-11 rounded-full object-cover"
        />

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Share an update with your circle..."
          className="
    flex-1
    resize-none
    overflow-hidden
    rounded-xl
    border
    border-[var(--color-border)]
    px-4
    py-3
    text-sm
    leading-6
    outline-none
    transition
    focus:border-[var(--color-primary)]
    min-h-[48px]
    max-h-48
  "
        />

        <button
          onClick={onPost}
          className="
            flex
            h-11
            items-center
            
            justify-center
            rounded-xl
            bg-[var(--color-primary)]
            px-8
            font-medium
            text-white
            transition
            hover:bg-[var(--color-primary-dark)]
            md:w-auto
            w-full
          "
        >
          Post
        </button>
      </div>

      {/* Type Selector */}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => onTypeChange("announcement")}
          className={`
            flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition
            ${
              selectedType === "announcement"
                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
            }
          `}
        >
          <FiVolume2 className="h-4 w-4" />
          Announcement
        </button>

        <button
          onClick={() => onTypeChange("resource")}
          className={`
            flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition
            ${
              selectedType === "resource"
                ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                : "border-[var(--color-border)] hover:border-emerald-500"
            }
          `}
        >
          <FiFileText className="h-4 w-4" />
          Resource
        </button>
      </div>
    </motion.div>
  );
};

export default CreatePostCard;
