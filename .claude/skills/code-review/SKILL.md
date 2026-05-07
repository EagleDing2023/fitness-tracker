---
name: code-review
description: Structured code review on a diff. Use after a feature is built and before commit, or when 
the user asks for review of existing code. Catches bugs, edge cases, security issues, perf problems.
---

# Code Review

Review the staged diff (`git diff --cached`) or the named files. Output exactly
this structure, nothing else:

## Bugs
- [Concrete bugs with file:line. Reproducible. Empty list if none.]

## Edge cases not handled
- [Inputs that would break this. Empty list if none.]

## Security
- [SQL injection, XSS, secret leaks, RLS gaps, auth bypasses. Empty if none.]

## Performance
- [N+1 queries, missing indexes, unnecessary re-renders, large bundle adds.]

## Suggestions (non-blocking)
- [Style, naming, factoring. Mark NIT if minor.]

## Verdict
PASS | PASS_WITH_NITS | FAIL — [1 line reason]
Rules:
- No false positives. If you're not sure something's a bug, mark it as a question under Suggestions, not as a Bug.
- No style nitpicks above NIT. The user has a linter.
- Cite line numbers from the actual diff, not invented ones.