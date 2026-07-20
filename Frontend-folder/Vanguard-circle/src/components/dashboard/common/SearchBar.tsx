import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-xl">
      {/* Search Icon */}

      <HiMagnifyingGlass
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-xl
          text-slate-400
        "
      />

      {/* Input */}

      <input
        type="text"
        placeholder="Search assignments, circles..."
        className="
    h-12
    w-full
    rounded-xl
    border
    border-slate-200
    bg-white
    pl-11
    pr-12
    text-sm
    placeholder:text-slate-400
    focus:border-[var(--color-primary)]
    focus:outline-none
  "
      />
    </div>
  );
};

export default SearchBar;
