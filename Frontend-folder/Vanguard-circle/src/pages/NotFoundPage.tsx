import { Link } from "react-router-dom";

// Client-side catch-all for genuinely unmatched routes. This is distinct from
// the "reload the dashboard and get a blank 404" bug, which was the *hosting*
// server returning its own 404 page before React Router ever loaded — that's
// fixed via the SPA rewrite config (vercel.json / public/_redirects), not here.
const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-heading text-6xl font-bold text-[var(--color-primary)]">
        404
      </p>
      <h1 className="font-heading text-2xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="max-w-sm text-slate-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFoundPage;
