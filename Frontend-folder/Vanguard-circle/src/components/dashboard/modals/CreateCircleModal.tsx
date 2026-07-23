import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "../../../lib/api";
import CircleProgress from "../create-circle/CircleProgress";
import CircleDetailsStep from "../create-circle/CircleDetailsStep";
import CircleInviteStep from "../create-circle/CircleInviteStep";
import CircleSettingsStep from "../create-circle/CircleSettingsStep";
import { createPortal } from "react-dom";
import type {
  CircleFormData,
  Member,
  NotificationSettings,
  PendingInvite,
} from "../create-circle/types";
import { trackCircleCreated, trackMemberInvited } from "../../../services/analytics";

interface CreatedGroup {
  id: string;
  inviteCode: string;
}

interface CreateCircleModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateCircleModal = ({
  open,
  onClose,
  onSuccess,
}: CreateCircleModalProps) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<CircleFormData>({
    name: "",
    description: "",
    category: "",
    icon: "",

    visibility: "private",

    approval: false,

    maxMembers: 50,

    allowMemberInvites: true,
    requireAdminApproval: true,

    studyReminders: true,
    reminderFrequency: "Every day",
    reminderTime: "09:00 AM",
  });

  const [members, setMembers] = useState<Member[]>([]);

  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      newMemberJoins: true,
      newAssignments: true,
      mentions: true,
      dueDateReminders: true,
      weeklySummary: false,
      marketingEmails: false,
    });

  const [submitting, setSubmitting] = useState(false);

  // The circle is created as soon as the user leaves Step 1 (not on final
  // submit) — Step 2 needs a real invite code to generate a working invite
  // link/QR code for, and there was no way to do that against a circle that
  // doesn't exist in the database yet.
  const [createdGroup, setCreatedGroup] = useState<CreatedGroup | null>(null);
  const [creatingCircle, setCreatingCircle] = useState(false);
  const inviteLink = createdGroup
    ? `${window.location.origin}/invite/${createdGroup.inviteCode}`
    : undefined;

  const updateForm = <K extends keyof CircleFormData>(
    key: K,
    value: CircleFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!open) {
      setStep(1);
      setCreatedGroup(null);
      setMembers([]);
      setPendingInvites([]);
    }
  }, [open]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CircleDetailsStep formData={formData} updateForm={updateForm} />
        );

      case 2:
        return (
          <CircleInviteStep
            members={members}
            setMembers={setMembers}
            pendingInvites={pendingInvites}
            inviteLink={inviteLink}
          />
        );
      case 3:
        return (
          <CircleSettingsStep
            formData={formData}
            updateForm={updateForm}
            notificationSettings={notificationSettings}
            setNotificationSettings={setNotificationSettings}
          />
        );

      default:
        return null;
    }
  };

  // Creates the circle in the database the first time the user leaves Step 1.
  // Returns whether it's safe to advance to Step 2.
  const ensureCircleCreated = async () => {
    if (createdGroup) return true;

    if (!formData.name.trim()) {
      toast.error("Give your circle a name before continuing.");
      return false;
    }
    if (!formData.category) {
      toast.error("Choose a category before continuing.");
      return false;
    }

    setCreatingCircle(true);
    try {
      const result = await api.post<{
        group: CreatedGroup;
      }>("/groups", {
        name: formData.name,
        courseName: formData.category,
        description: formData.description,
        icon: formData.icon,
        visibility: formData.visibility,
        approval: formData.approval,
        maxMembers: formData.maxMembers,
        allowMemberInvites: formData.allowMemberInvites,
        requireAdminApproval: formData.requireAdminApproval,
        studyReminders: formData.studyReminders,
        reminderFrequency: formData.reminderFrequency,
        reminderTime: formData.reminderTime,
      });

      setCreatedGroup(result.group);

      // Fire the moment the circle actually exists in the database, not at
      // the end of the wizard — settings (step 3) are edits to an already-real
      // circle, and gating the event on finishing them undercounts every
      // circle whose creator closed the modal early (a real, valid circle
      // with zero analytics for it).
      trackCircleCreated({
        circleName: formData.name,
        category: formData.category,
        visibility: formData.visibility,
      });

      return true;
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't create the circle. Please try again.",
      );
      return false;
    } finally {
      setCreatingCircle(false);
    }
  };

  // Closing the modal after the circle already exists in the database (i.e.
  // past Step 1) should still refresh the dashboard — otherwise the circle
  // is real but invisible until the user manually reloads.
  const handleClose = () => {
    if (createdGroup) onSuccess?.();
    onClose();
  };

  const handleNext = async () => {
    if (step === 1) {
      const ok = await ensureCircleCreated();
      if (!ok) return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!createdGroup) return;

    try {
      setSubmitting(true);

      await api.patch(`/groups/${createdGroup.id}`, {
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        visibility: formData.visibility,
        approval: formData.approval,
        maxMembers: formData.maxMembers,
        allowMemberInvites: formData.allowMemberInvites,
        requireAdminApproval: formData.requireAdminApproval,
        studyReminders: formData.studyReminders,
        reminderFrequency: formData.reminderFrequency,
        reminderTime: formData.reminderTime,
      });

      if (members.length > 0) {
        try {
          await api.post(`/groups/${createdGroup.id}/invitations`, {
            emails: members.map((m) => m.email),
          });
          trackMemberInvited({
            circleId: createdGroup.id,
            inviteCount: members.length,
          });
        } catch (err) {
          // Circle is already created and configured — don't fail the whole
          // flow over invites; let the user retry those from the circle later.
          toast.error(
            err instanceof Error ? err.message : "Circle created, but some invites failed to send.",
          );
        }
      }

      toast.success(`${formData.name} is ready!`);

      // Reset everything
      setFormData({
        name: "",
        description: "",
        category: "",
        icon: "",
        visibility: "public",
        approval: false,
        maxMembers: 50,
        allowMemberInvites: true,
        requireAdminApproval: true,

        studyReminders: true,
        reminderFrequency: "Every day",
        reminderTime: "09:00 AM",
      });

      setMembers([]);
      setPendingInvites([]);
      setCreatedGroup(null);
      setNotificationSettings({
        newMemberJoins: true,
        newAssignments: true,
        mentions: true,
        dueDateReminders: true,
        weeklySummary: false,
        marketingEmails: false,
      });
      onSuccess?.();
      setStep(1);

      onClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Couldn't save circle settings. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="
              fixed
              inset-0
              z-[9998]
              bg-slate-900/40
              backdrop-blur-md
            "
          />

          {/* Modal */}

          <motion.div
            className="
             fixed
              inset-0
              z-[9999]
              flex
              justify-center
              items-start
              overflow-hidden
              px-6
              pt-4
              pb-6
            "
            onClick={handleClose}
          >
            <div
              className="
              flex
              min-h-full
              items-start
              justify-center
              py-6
            "
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: 30,
                }}
                transition={{ duration: 0.28 }}
                className="
                  w-full
                  max-w-[22rem]
                  h-[92dvh]
                  md:h-[90vh]
                  md:max-w-5xl
                "
              >
                <div
                  className="
                    flex
                    h-full
                    flex-col

                    rounded-[32px]
                    border
                    border-white/70
                    bg-white

                    shadow-[0_35px_100px_rgba(15,23,42,0.20)]
                "
                >
                  {/* Header */}

                  <div
                    className="
                    shrink-0
                  flex
                  items-center
                  justify-between

                  border-b
                  border-slate-100

                  px-8
                  py-6
                "
                  >
                    <h2 className="font-heading text-2xl font-bold text-slate-900">
                      Create New Circle
                    </h2>

                    <button
                      onClick={handleClose}
                      className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-full

                    text-slate-500
                    transition-all

                    hover:bg-slate-100
                    hover:text-slate-900
                  "
                    >
                      <HiOutlineXMark className="text-2xl" />
                    </button>
                  </div>

                  {/* Progress */}

                  <div className=" shrink-0 px-8 pt-8">
                    <CircleProgress currentStep={step} />
                  </div>

                  {/* Body */}

                  <div
                    className="
                      flex-1
                      overflow-y-auto
                      modal-scrollbar
                      px-3
                      md:px-8
                      py-8
                    "
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        {renderStep()}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Footer */}

                  <div
                    className="
                    shrink-0
                  flex
                  items-center
                  justify-between

                  border-t
                  border-slate-100

                  px-8
                  py-6
                "
                  >
                    <button
                      onClick={() => {
                        if (step === 1) {
                          handleClose();
                        } else {
                          setStep(step - 1);
                        }
                      }}
                      className="
                    rounded-xl
                    border
                    border-slate-200

                    px-6
                    py-3

                    font-medium
                    text-slate-700

                    transition-all

                    hover:bg-slate-50
                  "
                    >
                      {step === 1 ? "Cancel" : "Back"}
                    </button>

                    <button
                      disabled={submitting || creatingCircle}
                      onClick={() => {
                        if (step < 3) {
                          handleNext();
                        } else {
                          handleSubmit();
                        }
                      }}
                      className="
                    rounded-xl
                    bg-[var(--color-primary)]
                    px-8
                    py-3
                    font-medium
                    text-white
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
                    >
                      {creatingCircle
                        ? "Creating circle..."
                        : submitting
                          ? "Saving..."
                          : step === 3
                            ? "Finish Setup"
                            : "Next"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CreateCircleModal;
