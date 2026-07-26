import { useState } from "react";

import CircleFilter from "../filters/CircleFilter";
import CircleSearch from "../filters/CircleSearch";
import CircleSort from "../filters/CircleSort";
import ViewToggle from "../filters/ViewToggle";

import type { ViewMode } from "../types";

interface FiltersSectionProps {
  view: ViewMode;
  setView: React.Dispatch<React.SetStateAction<ViewMode>>;
}

const FiltersSection = ({ view, setView }: FiltersSectionProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Circles");
  const [sort, setSort] = useState("Recently Active");

  return (
    <section className="mt-16">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Left Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:flex-1 md:items-center">
          <div className="flex-1">
            <CircleSearch value={search} onChange={setSearch} />
          </div>

          <CircleFilter value={category} onChange={setCategory} />

          <CircleSort value={sort} onChange={setSort} />
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
