# Phase 3 — Infrastructure

**Goal**: produce `INFRA.md` — a numbered checklist of every external thing the user needs to do, with you waiting after each.
**Model**: Sonnet 4.6.
**Output gate**: every checklist item is marked DONE before Phase 4.

## Principles
1. **Hardcode endpoints over MCPs when only 1–2 operations are needed.** MCP tool definitions consume context. If we only read one Notion DB or one Supabase table, an `fetch()` call beats an MCP install.
2. **Connect only what PLAN.md requires.** No speculative MCPs. The default `.mcp.json` ships with Context7 (always useful) + Supabase, GitHub, Playwright, shadcn (commented out — uncomment per-project as needed).
3. **Read-only modes for production data.** Any DB MCP gets `read_only=true` unless writes are explicitly needed.

## Step 1 — Enumerate dependencies from PLAN.md
List every external dependency:
- DB: Supabase project? New or existing?
- Auth: Clerk? Supabase Auth?
- Deploy target: Vercel project? Domain?
- AI: Anthropic API key? OpenAI? Other?
- Other APIs: Stripe? SendGrid? IESO?
- MCPs to enable for this project: which from the default + which to add?

## Step 2 — Write INFRA.md as a numbered checklist
Each item has this exact shape:
```
### N. [Action]
**Why**: [1 line]
**You do**: [exact clicks / commands / URLs]
**I'll wait for**: [what you tell me when it's done — usually paste a key, or "done"]
**Verification**: [how I'll confirm it worked]- [ ] Done
```
Example:
```
### 3. Create Supabase project
**Why**: We need a Postgres DB + auth.
**You do**:
1. Go to https://supabase.com/dashboard/projects
2. New project → name: [project_name] → region: us-east-1 → strong DB password
3. Wait ~2 min for provisioning
4. Settings → API → copy `Project URL` and `anon public key`
5. Settings → Database → copy `Connection string (Transaction pooler)`
**You paste**:
- SUPABASE_URL=...
- SUPABASE_ANON_KEY=...
- DATABASE_URL=...
**I'll**: write these to .env.local and run `bunx drizzle-kit push` to sync schema.
- [ ] Done
```
## Step 3 — Walk through, item by item
For each item, paste it to the user. Wait for "done" or for them to paste keys.
Verify before checking the box. If verification fails, debug it WITH the user
— do not silently move on.

## Step 4 — Final environment
After all items are checked:- `.env.local` written, `.env.example` committed (no secrets).
- `.gitignore` covers `.env*`, `.next/`, `node_modules/`, `.claude/local/`.
- Commit: `chore: infrastructure setup complete`.
- Run a smoke test: `bun dev`, hit the homepage, see no errors.

## Gate
"Phase 3 complete. INFRA.md shows everything is connected and verified.
Say 'approved' to start Phase 4 (Execution)."