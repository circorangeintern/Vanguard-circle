import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";
import { toast } from "sonner";

import { api } from "../../../lib/api";
import { trackSessionScheduled } from "../../../services/analytics";

interface CircleOption {
  groupId: string;
  name: string;
}

interface CreateSessionModalProps {
  open: boolean;
  circles: CircleOption[];
  onClose: () => void;
  onSuccess?: () => void;
}

function toDatetimeLocalDefault(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 60 - (d.getMinutes() % 60)); // round to next hour
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const CreateSessionModal = ({
  open,
  circles,
  onClose,
  onSuccess,
}: CreateSessionModalProps) => {
  const [groupId, setGroupId] = useState("");
  const [title, setTitle] = useState("Study Session");
  const [startTime, setStartTime] = useState(toDatetimeLocalDefault());
  const [submitting, setSubmitting] = useState(false);

  const selectedGroupId = groupId || circles[0]?.groupId || "";

  const handleSubmit = async () => {
    if (!selectedGroupId) {
      toast.error("Create a circle first before scheduling a session.");
      return;
    }
    if (!title.trim()) {
      toast.error("Give this session a title.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/groups/${selectedGroupId}/sessions`, {
        title,
        startTime: new Date(startTime).toISOString(),
      });
      trackSessionScheduled({ circleId: selectedGroupId, title });
      toast.success("Session scheduled!");
      setTitle("Study Session");
      setStartTime(toDatetimeLocalDefault());
      setGroupId("");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't schedule this session.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/70 bg-white p-6 shadow-[0_35px_100px_rgba(15,23,42,0.20)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-slate-900">
                  Schedule a Session
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                >
                  <HiOutlineXMark className="text-xl" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Circle
                  </label>
                  <select
                    value={selectedGroupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  >
                    {circles.length === 0 && <option value="">No circles yet</option>}
                    {circles.map((c) => (
                      <option key={c.groupId} value={c.groupId}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Study Session"
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="rounded-xl bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Scheduling..." : "Schedule"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CreateSessionModal;
