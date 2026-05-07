---
name: error-triage
description: Use when an error occurs (build error, runtime error, test failure). Forces structured 
diagnosis instead of guessing fixes.
---

# Error Triage

When an error appears, you MUST follow this sequence before changing any code.

## 1. Capture
Paste the FULL error: message, stack trace, file:line. Don't summarise.

## 2. Classify
Pick one:
- TypeError / runtime — something is `undefined` or wrong type
- Build error — TS / bundler complaint
- Network / API — request failed, bad response shape
- DB — constraint, RLS, connection- Hydration — server/client mismatch in Next.js
- Test failure — assertion didn't match

## 3. Reproduce
Can you reproduce it deterministically? If yes, write the repro as a test (this is free regression coverage). If no, gather more info first.

## 4. Hypothesise (3 candidates)
List 3 plausible causes, ordered by likelihood. Don't fix yet.

## 5. Verify the top hypothesis
Read the actual code. Add a `console.log` or breakpoint if needed.
Confirm the cause before patching.

## 6. Fix the root cause
Not the symptom. If the symptom is "undefined", don't add `?.` — find why it's undefined and fix that.

## 7. Verify the fix
Re-run the failing case. Add a regression test if you didn't in step 3.