import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

import { api } from "../../../../../lib/api";
import type { CircleGroup } from "../../../../../pages/dashboard/circle/CircleLayout";

interface CircleSettingsSectionProps {
  group: CircleGroup;
  onChange: () => void;
  isOrganizer: boolean;
}

const CircleSettingsSection = ({ group, onChange, isOrganizer }: CircleSettingsSectionProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || "");
  const [savingName, setSavingName] = useState(false);
  const [savingDescription, setSavingDescription] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isNameChanged = name.trim() !== group.name;
  const isDescriptionChanged = description.trim() !== (group.description || "");

  const saveField = async (field: "name" | "description", value: string) => {
    const setSaving = field === "name" ? setSavingName : setSavingDescription;
    setSaving(true);
    try {
      await api.patch(`/groups/${group.id}`, { [field]: value });
      toast.success(`${field === "name" ? "Circle name" : "Description"} updated.`);
      onChange();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't save that change.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Permanently delete "${group.name}"? This cannot be undone.`)) return;

    setDeleting(true);
    try {
      await api.delete(`/groups/${group.id}`);
      toast.success("Circle deleted.");
      navigate("/my-circles");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't delete this circle.");
      setDeleting(false);
    }
  };

  return (
    <section className="space-y-6">
      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          Circle Settings
        </h1>

        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Manage your circle details and preferences.
        </p>
      </div>

      {/* Circle Name */}

      <div
        className="
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-white
          p-6
        "
      >
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          {/* Left */}

          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Circle Name
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              This is the name of your circle.
            </p>
          </div>

          {/* Right */}

          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              value={name}
              disabled={!isOrganizer}
              onChange={(e) => setName(e.target.value)}
              className="
                h-12
                flex-1
                rounded-xl
                border
                border-[var(--color-border)]
                px-4
                text-sm
                outline-none
                transition
                focus:border-[var(--color-primary)]
                focus:ring-2
                focus:ring-[var(--color-primary)]/10
                disabled:bg-gray-50
                disabled:text-gray-400
              "
            />

            <button
              disabled={!isNameChanged || savingName}
              onClick={() => saveField("name", name.trim())}
              className={`
                h-12
                rounded-xl
                px-8
                text-sm
                font-semibold
                transition-all
                duration-200

                ${
                  isNameChanged
                    ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }
            `}
            >
              {savingName ? "Saving..." : "Update"}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}

      <div
        className="
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-white
          p-6
        "
      >
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          {/* Left */}

          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Description
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Briefly describe what your circle is about.
            </p>
          </div>

          {/* Right */}

          <div className="space-y-4">
            <textarea
              rows={6}
              value={description}
              disabled={!isOrganizer}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-[var(--color-border)]
                p-4
                text-sm
                outline-none
                transition
                focus:border-[var(--color-primary)]
                focus:ring-2
                focus:ring-[var(--color-primary)]/10
                disabled:bg-gray-50
                disabled:text-gray-400
              "
            />

            <div className="flex justify-end">
              <button
                disabled={!isDescriptionChanged || savingDescription}
                onClick={() => saveField("description", description.trim())}
                className={`
                h-12
                rounded-xl
                px-8
                text-sm
                font-semibold
                transition-all
                duration-200

                ${
                  isDescriptionChanged
                    ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                }
            `}
              >
                {savingDescription ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone — organizer only */}

      {isOrganizer && (
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50/40
            p-6
          "
        >
          <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-center">
            <div>
              <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                Permanently delete this circle and all its data. This action
                cannot be undone.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="
                  inline-flex
                  h-12
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-red-300
                  bg-white
                  px-6
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-50
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <FiTrash2 size={18} />
                {deleting ? "Deleting..." : "Delete Circle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CircleSettingsSection;
