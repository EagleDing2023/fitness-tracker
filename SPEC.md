# Fitness Tracker

## What
A minimal workout tracking app where users log exercises (name, sets, reps) during a timed session and visualise progression across past sessions via a scatter plot.

## Mode
HACKATHON — 2 hours

## Stack
- Frontend: Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- Backend: Supabase (Postgres)
- ORM: Drizzle
- Deploy: Vercel
- Auth: None

## Must-haves (v1)
- Workout timer: start/stop/elapsed time per session
- Exercise logger: one row per set (weight × reps), grouped by exercise name; each exercise gets its own UI card/section within a session
- Progression graph: scatter plot, x-axis = session date, y-axis = total volume (sum of reps × sets across all exercises) per session

## Non-goals (v1)
- User authentication or accounts
- Social features or sharing
- Multi-user support
- Native mobile app
- External exercise API or autocomplete
- Video guidance or form feedback
- Rest timers, 1RM calculators, or advanced analytics

## External dependencies
- Supabase project (Postgres) — requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- No third-party APIs

## Demo / success criteria
A user can open the app, start a session timer, add multiple exercises with sets and reps, end the session, and see their current and past sessions plotted on a progression graph — all without logging in.

## Resolved decisions
- Graph x-axis: session date
- Graph y-axis: total volume (sum of reps × sets across all exercises in the session)
- Data entry: one row per set; each exercise name groups its sets into its own UI section
