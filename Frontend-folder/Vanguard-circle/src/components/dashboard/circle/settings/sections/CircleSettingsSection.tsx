import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

import { settings } from "../data/settings";

const CircleSettingsSection = () => {
  const [name, setName] = useState(settings.name);
  const [description, setDescription] = useState(settings.description);

  const isNameChanged = name.trim() !== settings.name;

  const isDescriptionChanged = description.trim() !== settings.description;

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
              "
            />

            <button
              disabled={!isNameChanged}
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
              Update
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
              "
            />

            <div className="flex justify-end">
              <button
                disabled={!isDescriptionChanged}
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
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}

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
              "
            >
              <FiTrash2 size={18} />
              Delete Circle
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircleSettingsSection;
