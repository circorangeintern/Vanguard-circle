import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import MyCirclesHeader from "../../components/dashboard/my-circles/sections/MyCirclesHeader";
import StatsSection from "../../components/dashboard/my-circles/sections/StatsSection";
import FiltersSection from "../../components/dashboard/my-circles/sections/FiltersSection";
import CirclesGrid from "../../components/dashboard/my-circles/sections/CirclesGrid";
import MyCirclesLoading from "../../components/dashboard/my-circles/states/MyCirclesLoading";
import MyCirclesEmpty from "../../components/dashboard/my-circles/states/MyCirclesEmpty";

import type { ViewMode } from "../../components/dashboard/my-circles/types";
import CreateCircleCard from "../../components/dashboard/my-circles/cards/CreateCircleCard";

import { api } from "../../lib/api";
import { mapCircle, type RawDashboardCircle } from "../../components/dashboard/my-circles/data/mapCircle";
import type { Circle } from "../../components/dashboard/my-circles/types";

const MyCirclesPage = () => {
  const [view, setView] = useState<ViewMode>("grid");
  const [circles, setCircles] = useState<Circle[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Circles");
  const [sort, setSort] = useState("Recently Active");

  const loadCircles = useCallback(() => {
    setLoading(true);
    api
      .get<{ circles: RawDashboardCircle[] }>("/users/me/dashboard")
      .then((data) => setCircles(data.circles.map(mapCircle)))
      .catch(() => {
        toast.error("Couldn't load your circles. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadCircles();
  }, [loadCircles]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(circles.map((c) => c.category)));
    return ["All Circles", ...unique];
  }, [circles]);

  const visibleCircles = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = circles.filter((circle) => {
      const matchesCategory = category === "All Circles" || circle.category === category;
      const matchesSearch =
        !query ||
        circle.name.toLowerCase().includes(query) ||
        circle.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "Newest":
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "Oldest":
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "A - Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Most Members":
        sorted.sort((a, b) => b.members - a.members);
        break;
      case "Highest Streak":
        sorted.sort((a, b) => b.dayStreak - a.dayStreak);
        break;
      case "Recently Active":
      default:
        sorted.sort(
          (a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime(),
        );
    }

    return sorted;
  }, [circles, search, category, sort]);

  const stats = useMemo(
    () => ({
      activeCircles: circles.length,
      tasksDue: circles.reduce((sum, c) => sum + c.tasksDue, 0),
      studySessions: circles.reduce((sum, c) => sum + c.studySessions, 0),
      bestStreak: circles.reduce((max, c) => Math.max(max, c.dayStreak), 0),
    }),
    [circles],
  );

  if (loading) return <MyCirclesLoading />;

  return (
    <>
      <MyCirclesHeader />

      {circles.length === 0 ? (
        <MyCirclesEmpty onSuccess={loadCircles} />
      ) : (
        <>
          <StatsSection {...stats} />

          <FiltersSection
            view={view}
            setView={setView}
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            sort={sort}
            onSortChange={setSort}
          />

          <CirclesGrid view={view} circles={visibleCircles} />
          <CreateCircleCard onSuccess={loadCircles} />
        </>
      )}
    </>
  );
};

export default MyCirclesPage;
