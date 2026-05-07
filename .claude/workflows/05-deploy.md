# Phase 5 — Deploy

**Goal**: live URL the user can share. Verified working in production.
**Model**: Sonnet 4.6.

## Step 1 — Pre-deploy checklist
- [ ] All env vars in `.env.example` (no secrets).
- [ ] `next build` succeeds locally (full prod build, not dev).
- [ ] No console errors on critical paths.
- [ ] DB migrations run cleanly: `bunx drizzle-kit generate && drizzle-kit migrate` against a fresh DB if possible.
- [ ] README.md exists with: what it is, how to run locally, how to deploy.

## Step 2 — Vercel link
If not already linked: `vercel link`. Walk the user through any prompts.
Set env vars: `vercel env add` for each one in `.env.example`.

## Step 3 — Deploy preview first
`vercel` (no flags) → preview URL.
Test the preview URL hands-on:
- Sign up / sign in flow
- Each must-have feature from SPEC.md
- One known-broken case (verify error UI looks right)

## Step 4 — Production
Only after preview passes: `vercel --prod`.
Note: in HACKATHON mode, the preview URL IS your demo URL. You may not need
production deploy at all. Confirm with user before pushing prod.

## Step 5 — Post-deploy
- Open the live URL, screenshot it, save to `docs/launch-screenshot.png`.
- Append the live URL to README.md.
- Final commit: `chore: deploy v1`.
- Update CLAUDE.md with the live URL under "## Deployed at".

## Gate (final)
"Phase 5 complete. Live at [URL]. Project is shipped. Say 'wrap' to close out,
or tell me what to iterate on next (style, new features, performance)."