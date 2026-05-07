---
name: tdd
description: Strict red-green-refactor TDD. Use when adding non-trivial logic, especially business 
rules, calculations, parsers, validators, or anything with edge cases. Skip for pure presentational UI 
changes.
---

# Test-Driven Development

You will write code in three strictly-ordered steps. **Do not combine steps.**

## RED — failing test first
1. Write ONE test for the smallest piece of behaviour.
2. Run it. Show me the failure output verbatim.
3. **Do not write any implementation code yet.** If you find yourself reaching for impl, stop and write a second test instead.

## GREEN — minimum to pass
4. Write the minimum implementation that makes the failing test pass.
5. Run all tests. Show output.
6. If a test you didn't expect fails, that's a real bug — fix it before moving on, don't suppress it.

## REFACTOR
7. Clean up duplication, naming, structure. Run tests after EACH change.
8. Stop when no further refactor improves clarity.

## Behavioural rules
- Never write impl + test in the same response. The order matters because the red phase proves the test would have caught a regression.
- Never edit a test to make it pass. If the test was wrong, delete it and start over from RED.
- Don't add tests for code you didn't write — that's audit, not TDD.