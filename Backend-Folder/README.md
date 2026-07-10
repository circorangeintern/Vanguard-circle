# StudyCircle Backend

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Postgres connection string
   - Firebase Admin credentials (from Firebase Console → Project Settings → Service Accounts → Generate new private key)
3. `npm run prisma:generate`
4. `npm run prisma:migrate` — creates tables in your database from `prisma/schema.prisma`
5. `npm run dev` — starts the server on `http://localhost:4000`

## Structure

```
src/
  config/firebase.js      Firebase Admin SDK init
  middleware/auth.js      Verifies Firebase ID tokens, links to Postgres User
  middleware/response.js  Consistent { success, data, error } response shape
  routes/groups.js        Create/join circles
  routes/tasks.js         Shared task board (with ownership)
  routes/checkins.js      Daily check-ins + per-circle streak logic
  routes/dashboard.js     Cross-circle overview (GET /users/me/dashboard)
  server.js               App entry point
prisma/schema.prisma      Core data model
```

## Key endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/groups` | Create a circle |
| POST | `/groups/:inviteCode/join` | Join via invite link |
| GET | `/groups/:id` | Single circle workspace |
| POST | `/groups/:groupId/tasks` | Add a task (optionally assigned) |
| PATCH | `/tasks/:id` | Update task status/assignee |
| POST | `/groups/:groupId/checkins` | Daily check-in for this circle |
| GET | `/users/me/dashboard` | Overview across all circles |

All routes except `/health` require `Authorization: Bearer <firebase-id-token>`.
