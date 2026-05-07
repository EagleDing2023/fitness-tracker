# Project: Fitness Tracker

## What this is
A minimal workout tracking app where users log exercises (name, sets, reps) during a timed session and visualise progression across past sessions via a scatter plot.

## Stack
- Frontend: Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- Backend: Supabase (Postgres)
- ORM: Drizzle
- Deploy: Vercel
- Auth: None

## Routing — read these when relevant, not every turn
- Senior-dev behaviour rules: `.claude/rules/senior-dev.md`
- Bootstrap workflow (5 phases): `.claude/workflows/00-bootstrap.md`
- Current spec: `SPEC.md` (created in Phase 1)
- Current plan: `PLAN.md` (created in Phase 2)
- Infrastructure checklist + status: `INFRA.md` (Phase 3)
- Style guide / brand: `docs/style.md` (if it exists)

## Bash commands
- `bun dev` — local dev server, port 3000
- `bun test` — run test suite
- `bun typecheck` — `tsc --noEmit`
- `bun lint` — eslint
- `bunx drizzle-kit push` — sync schema in dev (no migrations)
- `bunx drizzle-kit generate && bunx drizzle-kit migrate` — production schema flow

## Conventions
- File naming: kebab-case for files, PascalCase for React components.
- API routes: `app/api/[resource]/route.ts`, always typed Request/Response.
- DB tables: snake_case, plural. RLS disabled (no auth in v1).
- Test files: co-located, `*.test.ts(x)`.

## Gotchas
