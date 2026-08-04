import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FiVolume2, FiFileText, FiLink, FiUpload, FiCheck } from "react-icons/fi";
import { toast } from "sonner";

import { Avatar } from "../../../ui";
import { api } from "../../../../lib/api";

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

interface CreatePostCardProps {
  authorName: string;
  authorAvatarUrl?: string | null;
  title: string;
  value: string;
  selectedType: "announcement" | "resource";
  attachmentName: string;
  attachmentUrl: string;
  submitting?: boolean;
  onTitleChange: (value: string) => void;
  onChange: (value: string) => void;
  onTypeChange: (type: "announcement" | "resource") => void;
  onAttachmentNameChange: (value: string) => void;
  onAttachmentUrlChange: (value: string) => void;
  onPost: () => void;
}

const CreatePostCard = ({
  authorName,
  authorAvatarUrl,
  title,
  value,
  selectedType,
  attachmentName,
  attachmentUrl,
  submitting,
  onTitleChange,
  onChange,
  onTypeChange,
  onAttachmentNameChange,
  onAttachmentUrlChange,
  onPost,
}: CreatePostCardProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  const handleFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("That file is too large — max 25MB.");
      return;
    }

    setUploading(true);
    try {
      const result = await api.upload<{ url: string; name: string }>("/uploads", file);
      onAttachmentNameChange(result.name);
      onAttachmentUrlChange(result.url);
      toast.success("File uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't upload that file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-[var(--color-border)] p-5 mt-10"
    >
      {/* Top */}

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <Avatar name={authorName} src={authorAvatarUrl} size={44} />

        <div className="flex-1 space-y-3">
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Give this post a title..."
            className="
              w-full
              rounded-xl
              border
              border-[var(--color-border)]
              px-4
              py-3
              text-sm
              font-medium
              outline-none
              transition
              focus:border-[var(--color-primary)]
            "
          />

          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Share an update with your circle..."
            className="
              w-full
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
        </div>

        <button
          onClick={onPost}
          disabled={submitting}
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
            disabled:cursor-not-allowed
            disabled:opacity-60
            md:w-auto
            w-full
          "
        >
          {submitting ? "Posting..." : "Post"}
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

      {/* Attachment: upload a file or paste a link (resource posts only) */}

      {selectedType === "resource" && (
        <div className="mt-4 space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelected}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-xl border border-dashed border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-emerald-500 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              "Uploading..."
            ) : attachmentUrl ? (
              <>
                <FiCheck className="h-4 w-4 text-emerald-500" />
                {attachmentName || "File attached"} — change file
              </>
            ) : (
              <>
                <FiUpload className="h-4 w-4" />
                Upload a file
              </>
            )}
          </button>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={attachmentName}
              onChange={(e) => onAttachmentNameChange(e.target.value)}
              placeholder="Link label (e.g. Auto Layout Guide.pdf)"
              className="w-full rounded-xl border border-[var(--color-border)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--color-primary)]"
            />
            <div className="relative">
              <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
              <input
                type="url"
                value={attachmentUrl}
                onChange={(e) => onAttachmentUrlChange(e.target.value)}
                placeholder="Or paste a link instead — https://..."
                className="w-full rounded-xl border border-[var(--color-border)] py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CreatePostCard;
