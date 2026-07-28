import CircleFilter from "../filters/CircleFilter";
import CircleSearch from "../filters/CircleSearch";
import CircleSort from "../filters/CircleSort";
import ViewToggle from "../filters/ViewToggle";

import type { ViewMode } from "../types";

interface FiltersSectionProps {
  view: ViewMode;
  setView: React.Dispatch<React.SetStateAction<ViewMode>>;

  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];

  sort: string;
  onSortChange: (value: string) => void;
}

const FiltersSection = ({
  view,
  setView,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  sort,
  onSortChange,
}: FiltersSectionProps) => {
  return (
    <section className="mt-16">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Left Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:flex-1 md:items-center">
          <div className="flex-1">
            <CircleSearch value={search} onChange={onSearchChange} />
          </div>

          <CircleFilter
            value={category}
            onChange={onCategoryChange}
            categories={categories}
          />

          <CircleSort value={sort} onChange={onSortChange} />
        </div>

        {/* Right Controls */}
        <div className="flex justify-end">
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>
    </section>
  );
};

export default FiltersSection;
