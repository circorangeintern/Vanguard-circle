import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

import { api } from "../../../lib/api";

interface TaskResult {
  id: string;
  title: string;
  circleName: string;
}
interface CircleResult {
  groupId: string;
  name: string;
  courseName?: string;
}
interface DashboardData {
  circles: {
    groupId: string;
    name: string;
    courseName?: string;
    upcomingTasks: { id: string; title: string }[];
  }[];
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [circles, setCircles] = useState<CircleResult[]>([]);
  const [tasks, setTasks] = useState<TaskResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetched once and filtered client-side — the dashboard already has
    // everything a "search" here can meaningfully cover (there's no per-circle
    // detail page to deep-link search results into yet).
    api
      .get<DashboardData>("/users/me/dashboard")
      .then((data) => {
        setCircles(
          data.circles.map((c) => ({
            groupId: c.groupId,
            name: c.name,
            courseName: c.courseName,
          })),
        );
        setTasks(
          data.circles.flatMap((c) =>
            c.upcomingTasks.map((t) => ({
              id: t.id,
              title: t.title,
              circleName: c.name,
            })),
          ),
        );
      })
      .catch(() => {
        /* silent — search just won't return results */
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const q = query.trim().toLowerCase();
  const matchedCircles = q
    ? circles.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.courseName?.toLowerCase().includes(q),
      )
    : [];
  const matchedTasks = q
    ? tasks.filter((t) => t.title.toLowerCase().includes(q))
    : [];
  const hasResults = matchedCircles.length > 0 || matchedTasks.length > 0;

  return (
    <div className="relative w-full max-w-xl" ref={containerRef}>
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

      <input
        type="text"
        placeholder="Search assignments, circles..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
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

      {open && q && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          {!hasResults && (
            <p className="px-3 py-4 text-center text-sm text-slate-400">
              No matches for "{query}"
            </p>
          )}

          {matchedCircles.length > 0 && (
            <div className="mb-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Circles
              </p>
              {matchedCircles.map((c) => (
                <div
                  key={c.groupId}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {c.name}
                  {c.courseName && (
                    <span className="ml-2 text-xs text-slate-400">
                      {c.courseName}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {matchedTasks.length > 0 && (
            <div>
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Assignments
              </p>
              {matchedTasks.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {t.title}
                  <span className="ml-2 text-xs text-slate-400">
                    {t.circleName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
