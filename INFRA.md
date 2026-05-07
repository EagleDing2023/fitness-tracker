# Infrastructure Checklist — Fitness Tracker

## Status legend
- [ ] Pending
- [x] Done

---

### 1. Scaffold Next.js app
**Why**: Creates the project structure, installs Next.js + Tailwind + TypeScript.
**I do**: Run `create-next-app` in this directory.
**Verification**: `bun dev` starts without errors.
- [x] Done

---

### 2. Create Supabase project
**Why**: We need a hosted Postgres DB for sessions + sets.
**You do**:
1. Go to https://supabase.com/dashboard/projects
2. Click **New project** → name it `fitness-tracker` → pick a region close to you → set a strong DB password → **Create project**
3. Wait ~1–2 min for provisioning
4. Go to **Settings → API** → copy:
   - `Project URL` (looks like `https://xxxx.supabase.co`)
   - `anon public` key (long JWT)
5. Go to **Settings → Database → Connection string → Transaction pooler** → copy the `postgresql://...` string (replace `[YOUR-PASSWORD]` with your DB password)

**You paste** (reply with these three values):
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
DATABASE_URL=postgresql://postgres.xxxx:password@aws-0-...pooler.supabase.com:6543/postgres
```
**I'll**: write `.env.local`, install Drizzle + Supabase client, push schema.
**Verification**: I'll run `bunx drizzle-kit push` and confirm no errors.
- [x] Done

---

### 3. Disable RLS on DB tables
**Why**: No auth in v1 — RLS would block all reads/writes via the anon key.
**You do** (after tables are created in step 2):
1. Open Supabase dashboard → **Table Editor**
2. Click on `sessions` table → **RLS disabled** (toggle off if on)
3. Repeat for `sets` table

**You say**: "RLS disabled"
**Verification**: I'll do a test API call and confirm data reads back correctly.
- [ ] Done (please disable RLS in Supabase dashboard)

---

### 4. Install shadcn/ui components
**Why**: Provides Button, Card, Input, Label — saves building from scratch.
**I do**: Run `bunx shadcn@latest init` and add required components.
**Verification**: `src/components/ui/` directory exists with component files.
- [x] Done

---

### 5. Verify full dev environment
**Why**: Confirm everything wires together before Phase 4 coding.
**I do**: `bun dev` → check homepage loads, no TS errors, no import errors.
**Verification**: Browser shows Next.js default page (or our stub), terminal shows no errors.
- [x] Done — typecheck passes clean
