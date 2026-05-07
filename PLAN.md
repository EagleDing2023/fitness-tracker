# Plan — Fitness Tracker

## Architecture

### Data model

```sql
-- No RLS (no auth). Anon key with RLS disabled on both tables.

CREATE TABLE sessions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at    timestamptz NOT NULL DEFAULT now(),
  ended_at      timestamptz,                        -- null = session in progress
  duration_secs integer                             -- populated on end
);

CREATE TABLE sets (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  exercise_name text NOT NULL,
  weight_kg     numeric(6,2) NOT NULL DEFAULT 0,   -- 0 = bodyweight
  reps          integer NOT NULL CHECK (reps > 0),
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX sets_session_idx ON sets(session_id);
```

Drizzle schema: `src/db/schema.ts`. Client singleton: `src/db/index.ts`.

Volume formula: `SUM(weight_kg * reps)` per session. Bodyweight sets contribute 0 — acceptable for v1.

### Routes

```
POST   /api/sessions           — create session, returns { id, started_at }
PATCH  /api/sessions/[id]      — end session: sets ended_at, computes duration_secs
GET    /api/sessions           — list sessions with total_volume (for graph); newest first
GET    /api/sessions/[id]      — session detail + all sets (for active session view)
POST   /api/sessions/[id]/sets — add a set { exercise_name, weight_kg, reps }
DELETE /api/sets/[id]          — delete a set (cut if time is short)
```

All routes: `app/api/.../route.ts`, typed `NextRequest` / `NextResponse`.

### Components

```
app/
  layout.tsx              — root layout, font, Tailwind globals
  page.tsx                — Home: orchestrates all sections

components/
  WorkoutTimer.tsx        — (client) shows elapsed hh:mm:ss; start/stop buttons
  ExerciseCard.tsx        — (client) one card per exercise name; lists sets + AddSetForm
  AddSetForm.tsx          — (client) inline form: exercise name, weight (opt), reps → POST set
  SessionPanel.tsx        — (client) wraps WorkoutTimer + list of ExerciseCards
  ProgressionChart.tsx    — (client) Recharts ScatterChart; x=session date, y=total volume
```

State: active session ID in React state (`page.tsx`). No global state manager needed at this scale.

### External services

| Service | Purpose | Auth model |
|---------|---------|------------|
| Supabase (Postgres) | Persistent DB for sessions + sets | Anon key, RLS disabled on both tables |

Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Task graph

| ID  | Name | Depends on | Size | Parallel? | Verifier |
|-----|------|------------|------|-----------|---------|
| T01 | Supabase project + env vars | — | S | N | `.env.local` exists, Supabase dashboard shows DB |
| T02 | Scaffold Next.js app | T01 | S | N | `bun dev` starts, no TS errors |
| T03 | Drizzle schema + `bunx drizzle-kit push` | T02 | S | N | Tables appear in Supabase table editor |
| T04 | Sessions API routes (POST, PATCH, GET list, GET detail) | T03 | M | N | `curl POST /api/sessions` returns `{ id }` |
| T05 | Sets API route (POST, DELETE) | T03 | S | Y (after T03) | `curl POST /api/sessions/{id}/sets` returns set row |
| T06 | WorkoutTimer component | T02 | S | Y (after T02) | Timer ticks, start/stop works in browser |
| T07 | ExerciseCard + AddSetForm components | T04, T05 | M | N | Adding a set persists and appears in card |
| T08 | ProgressionChart component | T04 | S | Y (after T04) | Chart renders with seeded session data |
| T09 | Home page assembly | T06, T07, T08 | S | N | Full happy path: start → log sets → end → see chart |
| T10 | Deploy to Vercel | T09 | S | N | Production URL loads, DB connected |

## Risks

1. **Next.js 16 availability** — may be pre-release. Use `create-next-app@latest`; pin to 15 if 16 isn't stable, update CLAUDE.md.
2. **Recharts + App Router SSR** — crashes on server render. Fix: `'use client'` + `dynamic(..., { ssr: false })`.
3. **Supabase anon key + no RLS = public write** — anyone with the URL can write. Acceptable for hackathon; note in UI.
4. **Timer drift** — store `startTime` as a timestamp, compute `Date.now() - startTime` on each tick rather than incrementing a counter.
5. **Budget overrun** — Supabase setup and chart are the long poles. Start T01 immediately; cut DELETE `/api/sets` if time is short.
