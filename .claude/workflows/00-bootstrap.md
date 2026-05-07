# Bootstrap workflow — phase orchestrator
You are about to bootstrap a new project for the user. You will execute 5 phases
in strict order. Each phase has its own workflow file. **Read each phase's file
when you enter that phase, not before.**

## Phases

| # | Name              | File                              | Default model |
|---|-------------------|-----------------------------------|---------------|
| 1 | Discovery         | `.claude/workflows/01-discovery.md`     | Opus 4.7 |
| 2 | Architecture      | `.claude/workflows/02-planning.md`      | Opus 4.7 + plan mode + ultrathink |
| 3 | Infrastructure    | `.claude/workflows/03-infrastructure.md`| Sonnet 4.6 |
| 4 | Execution         | `.claude/workflows/04-execution.md`     | Sonnet 4.6 |
| 5 | Deploy            | `.claude/workflows/05-deploy.md`        | Sonnet 4.6 |

## Hard rules across all phases
1. **Phase gates are non-negotiable.** At the end of every phase, you stop and
   wait for the user to say "approved" or "proceed" before moving on. Do not
   move to the next phase on your own initiative, ever.
2. **Read the senior-dev rulebook before Phase 1**: `.claude/rules/senior-dev.md`.
   These rules apply to all phases.
3. **Always announce the current phase** at the start of every response, like
   `[Phase 2 / Architecture]`. This makes context obvious to the user.
4. **First action in every new phase**: read that phase's workflow file. Do not
   try to remember what the previous run said.
5. **Mode flag**: in Phase 1, you ask the user whether this is HACKATHON mode
   (time-boxed, ship in 24–48h) or PERSONAL mode (open-ended). Record the
   answer in `SPEC.md`. Subsequent phases adapt:
   - HACKATHON: cut scope hard, deploy by hour 4, skip nice-to-haves, no auth
     unless required, no tests beyond happy-path on critical paths.
   - PERSONAL: full TDD, full architecture review, no scope shortcuts, aim to build a full stack app. 

## Start
Begin Phase 1 by reading `.claude/workflows/01-discovery.md` and following its
instructions. Announce: `[Phase 1 / Discovery]`. Confirm to the user that the
bootstrap is starting and that you'll interview them next.
