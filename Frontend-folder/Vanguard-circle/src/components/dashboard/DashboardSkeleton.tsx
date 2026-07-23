const Block = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
);

const StatCard = () => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5">
    <Block className="h-10 w-10 rounded-2xl" />
    <Block className="mt-4 h-6 w-12" />
    <Block className="mt-2 h-3 w-20" />
  </div>
);

const CircleCard = () => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5">
    <div className="flex items-center gap-3">
      <Block className="h-10 w-10 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Block className="h-4 w-2/3" />
        <Block className="h-3 w-1/3" />
      </div>
    </div>
    <Block className="mt-5 h-3 w-full" />
    <Block className="mt-2 h-3 w-4/5" />
  </div>
);

const ListRow = () => (
  <div className="flex items-center gap-3 py-3">
    <Block className="h-9 w-9 shrink-0 rounded-xl" />
    <div className="flex-1 space-y-2">
      <Block className="h-3.5 w-3/4" />
      <Block className="h-3 w-1/2" />
    </div>
  </div>
);

// Mirrors DashboardPage's real layout (hero, stats, two-column lists, circle
// grid, streak card) so the page doesn't jump/reflow once real data arrives —
// replaces the plain "Loading your dashboard..." text with something that
// actually looks like the dashboard is about to appear.
const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 lg:space-y-10">
      {/* Hero */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <Block className="h-14 w-14 shrink-0 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Block className="h-5 w-1/3" />
            <Block className="h-3 w-1/2" />
          </div>
          <Block className="hidden h-11 w-36 rounded-xl sm:block" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCard key={i} />
        ))}
      </div>

      {/* Assignments + Agenda */}
      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
          <Block className="h-5 w-40" />
          <div className="mt-4 divide-y divide-slate-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <ListRow key={i} />
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
          <Block className="h-5 w-32" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <ListRow key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Circles */}
      <div className="space-y-4">
        <Block className="h-5 w-36" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CircleCard key={i} />
          ))}
        </div>
      </div>

      {/* Streak */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-5 md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Block className="h-14 w-14 shrink-0 rounded-2xl" />
            <div className="space-y-2">
              <Block className="h-4 w-32" />
              <Block className="h-3 w-48" />
            </div>
          </div>
          <Block className="h-11 w-full rounded-xl md:w-40" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
