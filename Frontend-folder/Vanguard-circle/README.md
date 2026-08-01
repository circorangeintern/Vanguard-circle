# StudyCircle Frontend

Vite + React + TypeScript. Firebase client SDK for auth.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` — the Firebase values in it are the real,
   safe-to-expose client-side ones (shared `study-circle-app-285a7` project),
   so you don't need to change those. `VITE_API_BASE_URL` defaults to
   `http://localhost:4000`, so you also need the backend running locally
   (see `Backend-Folder/README.md`) — ask a teammate for its `.env` values,
   since those include real secrets not safe to commit.
3. `npm run dev` — starts on `http://localhost:5173`

If you see "Network error — check your connection and try again" on every
request, it almost always means step 2 was skipped: `.env` is gitignored
(only `.env.example` is committed), so a fresh clone has no
`VITE_API_BASE_URL` set at all and every API call fails immediately.

## Structure

```
src/
  lib/api.ts        Thin fetch wrapper — attaches the Firebase ID token,
                     unwraps the backend's { success, data, error } shape
  lib/firebase.ts    Firebase client SDK init
  pages/             Route-level components (one per src/App.tsx route)
  components/        Feature-organized: dashboard/<feature>/{cards,sections,data,...}
```

## Build

`npm run build` (type-checks with `tsc -b`, then `vite build`)
