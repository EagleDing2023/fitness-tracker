---
name: screenshot-check
description: Visual self-check loop for UI changes. Use after any frontend task. Takes a screenshot via Playwright MCP, compares against the spec or the user's design intent, reports visible problems.
---

# Screenshot Self-Check

For any UI change, you MUST run this before claiming done.

## Steps
1. Ensure `bun dev` is running on port 3000.
2. Use Playwright MCP `playwright_navigate` to open the relevant page.
3. Take a screenshot at desktop (1280×800) AND mobile (375×667) widths.
4. Look at both screenshots. Check:
   - Layout doesn't break at either width
   - Text is readable, not clipped
   - Buttons are reachable, not overlapping
   - Loading states render (test with throttled network if needed)
   - Empty states render (test with empty data)
   - Error states render (test with bad input)
5. Report findings as a 5-line summary:
   - Desktop: [PASS / issues]
   - Mobile: [PASS / issues]
   - Empty state: [PASS / issues / not tested]
   - Error state: [PASS / issues / not tested]
   - Verdict: [SHIP / FIX_FIRST]

## Iteration
If verdict is FIX_FIRST, make the fix, re-screenshot, re-check. Max 3 passes
before stopping and asking the user.