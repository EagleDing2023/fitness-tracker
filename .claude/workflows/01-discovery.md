# Phase 1 — Discovery

**Goal**: produce `SPEC.md` — a 1-page PRD with explicit non-goals.
**Default model**: Opus 4.7. Do not use Plan Mode here; this is conversational.
**Output gate**: user reads SPEC.md and says "approved" before Phase 2.

## Step 1 — Mode + git baseline
Ask the user, using `AskUserQuestion`:
1. Hackathon (time-boxed) or Personal (open-ended)?
2. Time budget (hours/days/weeks)?
3. Is this a fresh repo, or are we adding to an existing one?

If fresh repo: confirm the project directory is initialised:
- `git init` if no `.git` directory exists
- Confirm GitHub remote: ask the user whether they want a new GitHub repo. If yes, walk them through `gh repo create` step-by-step and pause for them to
authenticate `gh` if needed.
- Initial commit: `chore: bootstrap` after the starter kit files are in place.

## Step 2 — Interview
Ask the user 6–10 focused questions, one batch at a time using `AskUserQuestion`.
Cover:
- The problem being solved, in their words.
- The user (themselves? others? both?).
- The 1–3 must-have features for v1.
- Hard non-goals — what this is explicitly NOT.
- Any external services, datasets, or APIs that must be integrated.
- UI/UX preferences (minimal? data-heavy? mobile-first?).
- Stack override: do they want to use the Next.js + Supabase default, or something else? If something else, ask why and confirm.
- Auth requirement (Clerk / Supabase Auth / none for v1?).

**Skip questions whose answers are obvious from earlier context.** Don't ask
twice. Don't ask things that don't change the build.
After interviewing, summarise what you heard back to the user in 8–12 bullets
and ask "did I get this right?"

## Step 3 — Write SPEC.md
Once they confirm, write SPEC.md with this exact structure:
```
# [Project Name]
## What
1-sentence pitch.
## Mode
HACKATHON | PERSONAL — [duration]
## Stack
[from interview, default if not overridden]
## Must-haves (v1)
- [feature 1]
- [feature 2]
- [feature 3 max]
## Non-goals (v1)
- [explicit list — protects scope]
## External dependencies
- [services, APIs, datasets, with notes on credential needs]
## Demo / success criteria
[How we know this is "done" for v1]
## Open questions
[anything unresolved]
```

## Gate
After writing SPEC.md, output the file path and say:
"Phase 1 complete. SPEC.md is at the project root. Open it, edit if needed,
and tell me 'approved' when ready to move to Phase 2 (Architecture)."
**Do not start Phase 2 without explicit approval.**