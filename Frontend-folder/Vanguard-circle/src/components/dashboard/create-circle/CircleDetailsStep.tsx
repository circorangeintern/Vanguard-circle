import CircleCategorySelect from "./CircleCategorySelect";
import CircleIconPicker from "./CircleIconPicker";
import type { CircleFormData } from "./types";

const MAX_NAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 150;

interface CircleDetailsStepProps {
  formData: CircleFormData;
  updateForm: <K extends keyof CircleFormData>(
    key: K,
    value: CircleFormData[K],
  ) => void;
}

const CircleDetailsStep = ({
  formData,
  updateForm,
}: CircleDetailsStepProps) => {
  return (
    <div className="space-y-7">
      {/* Circle Name */}

      <div className="space-y-2">
        <label
          htmlFor="circle-name"
          className="block text-sm font-medium text-slate-700"
        >
          Circle Name
        </label>

        <div className="relative">
          <input
            id="circle-name"
            type="text"
            value={formData.name}
            maxLength={MAX_NAME_LENGTH}
            onChange={(event) => updateForm("name", event.target.value)}
            placeholder="e.g. Design Circle"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              pr-16
              text-sm
              text-slate-700
              outline-none
              transition-all
              duration-200

              placeholder:text-slate-400

              focus:border-[var(--color-primary)]
              focus:ring-4
              focus:ring-blue-100
            "
          />

          <span
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2

              text-xs
              font-medium
              text-slate-400
            "
          >
            {formData.name.length}/{MAX_NAME_LENGTH}
          </span>
        </div>
      </div>

      {/* Description */}

      <div className="space-y-2">
        <label
          htmlFor="circle-description"
          className="block text-sm font-medium text-slate-700"
        >
          Description{" "}
          <span className="font-normal text-slate-400">(optional)</span>
        </label>

        <div className="relative">
          <textarea
            id="circle-description"
            rows={4}
            value={formData.description}
            maxLength={MAX_DESCRIPTION_LENGTH}
            onChange={(event) => updateForm("description", event.target.value)}
            placeholder="What is this circle about?"
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-200
              p-4
              pb-8
              text-sm
              text-slate-700
              outline-none
              transition-all
              duration-200

              placeholder:text-slate-400

              focus:border-[var(--color-primary)]
              focus:ring-4
              focus:ring-blue-100
            "
          />

          <span
            className="
              absolute
              bottom-3
              right-4

              text-xs
              font-medium
              text-slate-400
            "
          >
            {formData.description.length}/{MAX_DESCRIPTION_LENGTH}
          </span>
        </div>
      </div>

      {/* Category */}

      <CircleCategorySelect
        value={formData.category}
        onChange={(value) => updateForm("category", value)}
      />

      {/* Icon Picker */}

      <CircleIconPicker
        value={formData.icon}
        onChange={(value) => updateForm("icon", value)}
      />
    </div>
  );
};

export default CircleDetailsStep;
