# StudyCircle — Project Context

Study-group app. Backend: Express + Prisma + PostgreSQL (Neon), Firebase Auth
(Admin SDK verifies ID tokens server-side). Frontend: React + TypeScript +
Vite, Firebase client SDK for auth. Mixpanel for analytics.

## Repo layout
- `Backend-Folder/` — Express API (`src/routes/*.js`, `src/services/*.js`, `prisma/schema.prisma`)
- `Frontend-folder/Vanguard-circle/` — Vite React app

## Current deployment
Migrated off Render onto a friend's custom server + domain — **complete and verified**:
- Frontend: `https://studycircle.name.ng` — live
- Backend: `https://api.studycircle.name.ng` — live (was briefly 502 right after cutover; friend fixed it server-side, re-verified with a full 10-step live test: auth, profile, dashboard, create circle, invite link correctly reads the new domain, public invite preview, tasks, sessions, check-in/streak, delete)
- Old Render deploys (`studycircle-backend-ef5n.onrender.com`, `studycircle-vyo1.onrender.com`) still exist but are no longer the primary deployment — kept only as a fallback reference if needed.
- CORS on the backend is locked to an explicit allowlist in `src/server.js` (not `cors()` wide-open) — includes `FRONTEND_URL` env var, `https://studycircle.name.ng`, the old Render frontend URL, and localhost. If the new frontend can't reach the new backend once it's up, check `FRONTEND_URL` is set correctly there.

## Test accounts (Firebase, for Postman/manual testing — throwaway, not real users)
- `demo.reviewer@studycircle.dev` / `DemoReview2026!`
- `postman.test@studycircle.dev` / `PostmanTest123!`
Firebase Web API key (safe to expose client-side): `AIzaSyDBnR_KcsFJxx3KqsmRVIKvlqZqrHqrvqs`

## Postman collections
`Backend-Folder/postman/StudyCircle-Final.postman_collection.json` is the
most complete one — covers every endpoint including tasks, sessions
(with meeting link/duration), check-ins, notifications, delete-circle.
Has real captured example responses from a live run. Import, run "Sign In"
first (auto-saves token), then anything else works immediately.

## What's been fixed/built this session (chronological, most recent first)
- Built the circle activity **Feed** for real — it was the last piece of
  100%-mock UI in the app (`FeedSection.tsx` rendered a static `posts.ts`
  array; like/comment/post handlers were `console.log`). Added `Post`,
  `PostLike`, `PostComment` Prisma models + migration
  (`20260801083930_add_feed_posts`), a new `src/routes/posts.js` with the
  same `requireMembership` authorization pattern as tasks/sessions/checkins
  (`POST/GET /groups/:groupId/posts`, `DELETE /posts/:id` — author or
  organizer only, `POST /posts/:id/like` — toggle, `GET/POST
  /posts/:id/comments`), and wired the frontend (`FeedSection.tsx`,
  `CreatePostCard.tsx` now has a title field + optional attachment
  link/label, `FeedPostCard.tsx` now has real like/comment/delete instead
  of no-ops). Attachments are link-only by explicit choice (paste a URL +
  label) — no file storage was set up. New posts/comments notify other
  circle members via the existing in-app notification system
  (`new_post`/`post_comment` payload types added to
  `mapNotification.ts`). Verified end-to-end against the live Neon DB with
  the demo account: create (both post types), list, like/unlike toggle,
  add + list comments, delete with cascade cleanup, all confirmed via curl
  before wiring the frontend.
- Locked down CORS (was wide open, flagged by an external review)
- Fixed a real authorization gap: `POST/PATCH/DELETE` on tasks and `POST`
  check-ins never verified the requester was actually a member of the
  group — only checked "logged in," not "belongs to this circle." Fixed
  in `tasks.js` and `checkins.js` with the same `requireMembership` pattern
  `sessions.js`/`groups.js` already used. Verified: non-member gets 403,
  member still works.
- Fixed the real streak bug: `DashboardPage.tsx`'s "Keep Streak" widget
  picked which circle to show fresh on every render (preferring one not
  yet checked in today) — so the moment you checked into circle A, it
  became checked-in and the widget silently swapped to a *different*
  circle's number, reading as "the streak didn't update." Fixed by locking
  the circle choice in once (`streakGroupId` state), only re-picking if
  that circle stops existing. Proved with a real two-circle test — old
  logic would show a different circle's `streak: 0` right after checking
  in; fixed logic correctly shows the same circle going `0 → 1`.
- Wired every per-circle page (Task Board, Study Sessions, Members, Circle
  Settings) from 100% hardcoded mock data to the real backend. Notably:
  the Study Sessions "Schedule" submit button was physically outside its
  own `<form>` tag and did nothing at all before this.
- Added: meeting link + duration fields on study sessions, a live
  countdown on session cards ("Starts in 2h 15m" → "Live now" → "Missed"),
  a reminder scheduler (60s poll) that notifies circle members when a
  session is starting soon or a task is due soon, `DELETE /groups/:id`
  (organizer-only, cleans up dependent rows first since FKs are RESTRICT
  not CASCADE), `DELETE /groups/:groupId/tasks/:id`, notification bell
  polling every 30s instead of only on page load.
- Earlier in the session: real invite emails via Resend, fixed a wrong
  hardcoded invite-link domain fallback, real notifications system, real
  search/assignments/my-circles pages, a dashboard skeleton loader,
  a logout-after-404 race condition in `ProtectedRoute`, and a schema-drift
  incident where production was missing several columns entirely (fixed
  via a proper Prisma migration).

## Known gaps (by explicit choice, not oversight)
- **Google Calendar sync**: not built. The Calendar page still needs real
  OAuth (Google Cloud Console credentials) — user chose to skip this for
  now rather than fake a "Connected" state.
- **Feed** (circle activity feed with likes/comments/attachments): still
  mock data. Not explicitly requested yet; would need a new `Post` model.

## Working style notes for whoever's on this next
- Render's auto-deploy has repeatedly missed pushes silently (no failed
  build shown, just never triggers) — always verify a deploy actually
  picked up the latest commit with a live curl check before saying
  something is "fixed," and if it doesn't move after ~2 min, tell the user
  to Manual Deploy rather than keep waiting.
- Prisma schema changes: use `prisma migrate diff --from-url ... --to-schema-datamodel prisma/schema.prisma --script` to generate the SQL,
  write it into a new `prisma/migrations/<timestamp>_name/migration.sql`
  file by hand (matching Prisma's naming format), then `prisma migrate
  deploy`. Neon's DB occasionally cold-start-fails the first connection
  attempt (`P1001`) — just retry once.
- Always verify claims with a real request/response, not just "should
  work" — this was explicitly and repeatedly demanded this session after
  an earlier unverified "fix" turned out incomplete.
