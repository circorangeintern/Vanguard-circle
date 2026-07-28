import { FiGrid, FiList } from "react-icons/fi";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

const ViewToggle = ({ view, onChange }: ViewToggleProps) => {
  return (
    <div
      className="
        flex
        w-fit
        items-center
        rounded-xl
        border
        border-[var(--color-border)]
        bg-white
        p-1
        shadow-sm
      "
    >
      <button
        type="button"
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          text-lg
          transition-all
          duration-200
          ${
            view === "grid"
              ? "bg-[var(--color-primary)] text-white shadow-sm"
              : "text-[var(--color-text-secondary)] hover:bg-slate-100"
          }
        `}
      >
        <FiGrid />
      </button>

      <button
        type="button"
        onClick={() => onChange("list")}
        aria-label="List view"
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          text-lg
          transition-all
          duration-200
          ${
            view === "list"
              ? "bg-[var(--color-primary)] text-white shadow-sm"
              : "text-[var(--color-text-secondary)] hover:bg-slate-100"
          }
        `}
      >
        <FiList />
      </button>
    </div>
  );
};

export default ViewToggle;
