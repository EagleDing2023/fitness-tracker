# Phase 4 — Execution

**Goal**: ship every task in PLAN.md.
**Model**: Sonnet 4.6 main. Sub-agents on Haiku 4.5.
**This phase has its own loop, repeated per task. Each task ends with a user gate.**

## Per-task loop (Explore → Plan → Code → Verify → Commit)

### 1. Pick the task
Pull the next undone task from PLAN.md task graph. Announce:
`[Phase 4 / Task T07: Add posts CRUD]`

### 2. Explore (lightweight)
- `git status` — clean tree before starting
- Read only the files this task touches. Don't dump the whole codebase.
- If any external API is involved, run a Context7 fetch to get current docs. Prefix prompts with `use context7` to force this.
- Spawn a researcher sub-agent (Haiku) ONLY if research >5 minutes is needed.

### 3. Plan (per-task plan mode)
Use `/plan`. Sketch the diff in 5–10 bullets. Open Plan with Ctrl+G if it's non-trivial. Surface to user only if the plan diverges from PLAN.md.

### 4. Worktree decision
If the task is marked worktree-safe and another task is also runnable:
- `claude --worktree task-T07` to isolate this work
- Continue main session; the worktree gets its own session
- Merge back when verifier reports PASS

### 5. Code with TDD (PERSONAL mode) or happy-path-first (HACKATHON mode)
PERSONAL mode:
- RED: write failing test. Show me the failure output. Do NOT write impl.
- GREEN: minimum code to pass. No extras.
- REFACTOR: clean up. Run tests after each change.

HACKATHON mode:
- Write the smallest useful impl that demos.
- Add a single happy-path test for any payment, auth, or data-loss-risk path.
- Skip tests for pure UI.

### 6. Self-verify before claiming done
Spawn the **verifier sub-agent** (`.claude/agents/verifier.md`). It runs:
- `bun typecheck`
- `bun test` (or scoped: `bun test path/to/this`)
- `bun lint`
- For UI tasks: spawn screenshot-check skill — Playwright MCP takes a screenshot, compare visually against PLAN.md description, report mismatches.
Verifier returns one of: PASS / PARTIAL / FAIL with specific reasons.

### 7. Self-correct (max 2 attempts)
If FAIL: read the failure carefully. Make targeted fix. Re-run verifier.
If still FAIL after 2 attempts: STOP. Tell the user, propose options:
(a) escalate to Opus + ultrathink, (b) /clear and restart task with better
prompt, (c) descope or defer the task. Do NOT keep patching.

### 8. Commit
- `git diff` — read it yourself. Anything you didn't intend? Revert it.
- Commit message: `feat(scope): what this does` — conventional commits.
- Update PLAN.md: mark T07 as DONE with commit SHA.

### 9. Gate (every task)
Tell the user: "T07 done at commit [sha]. [What changed in 1 sentence.]
Want to review before T08, or proceed?"
Wait for their call. They might say "proceed" — that's normal. They might say "let me try it" — that's the right time for them to verify.

## When you finish all tasks
- Run full test suite end-to-end.
- Run a manual screenshot-check of every page.
- Update CLAUDE.md "Gotchas" with anything new the project taught you (ask first).
- Tell the user: "Phase 4 complete. All [N] tasks merged. Say 'approved' for
  Phase 5 (Deploy)."