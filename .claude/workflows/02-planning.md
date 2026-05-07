# Phase 2 — Architecture

**Goal**: produce `PLAN.md` — a task graph + architecture decisions.
**Model**: Opus 4.7. Use Plan Mode (`/plan`). Use ultrathink for the first plan.
**Output gate**: user reviews PLAN.md (open with Ctrl+G) and approves.

## Pre-flight
- Read SPEC.md fully.
- Read CLAUDE.md fully.
- Verify the stack is locked. If SPEC.md says "TBD" anywhere, stop and ask.

## Step 1 — Enter Plan Mode
Use `/plan`. (On Windows Claude Code 2.1.3+ Shift+Tab is broken — always use
the slash command.) In plan mode you can only read; you cannot write code.

## Step 2 — Ultrathink the architecture
Prepend `ultrathink` to your reasoning for the first architectural pass. Think about:
- Data model: tables, columns, relations, indexes, RLS policies.
- API surface: routes, methods, request/response types.
- AI surface (if any): prompts, model choices per call, streaming vs blocking, caching strategy.
- External integrations: which services, what auth model, fallback if down.
- Realtime needs: pgvector, Realtime channels, presence?
- Sub-agent opportunities: which features parallelise well via worktrees?

## Step 3 — Write PLAN.md
Structure exactly:
```
# Plan — [Project]
## Architecture
### Data model
[tables + columns, written as SQL or Drizzle schema sketch]
### Routes
[list of API routes with verbs and what they do]
### Components
[top-level component tree, 1–2 levels deep]
### External services
[what + why + auth model]
## Task graph
Tasks ordered by dependency. Each task has:- ID (T01, T02, …)
- Name
- Depends on: [list]
- Estimated complexity: S/M/L
- Worktree-safe parallel? Y/N
- Verifier check: [how we'll know it's done — test name / curl command / screenshot]

## Risks
[3–5 things most likely to bite. Mitigation per risk.]
## Open questions for user
[Anything that requires a human call before execution.]
```

## Step 4 — Surface open questions
Before exiting Plan Mode, list the open questions to the user using
`AskUserQuestion`. Resolve them, then update PLAN.md.

## Gate
Exit Plan Mode. Tell the user:
"PLAN.md is ready. Open it (Ctrl+G in Claude Code, or just open the file).
Edit anything you want changed. Say 'approved' to proceed to Phase 3
(Infrastructure), or push back on anything."
**Do not exit Plan Mode and start writing code. Phase 3 is non-code.**
