# Fitness Tracker

Log workout sessions, track exercises (name, sets, reps, weight), and visualise total volume progression over time via a scatter plot.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- Supabase (Postgres, no auth)
- Drizzle ORM
- Recharts

## Run locally

```bash
# 1. Copy env template and fill in your Supabase credentials
cp .env.example .env.local

# 2. Install dependencies
bun install

# 3. Push schema to Supabase
bun db:push

# 4. Start dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live

**https://fitness-tracker-six-zeta.vercel.app**

## Deploy

Deploy to Vercel. Add the three env vars from `.env.example` in the Vercel project settings.

## Env vars

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `DATABASE_URL` | Postgres connection string (transaction pooler) |
