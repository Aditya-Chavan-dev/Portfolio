# Task: Fix Typewriter Layout Shift
**Created:** 2026-03-22
**Tier:** 1 (Targeted/Operational)
**Status:** In Planning

---

## Context Summary Reference
**What already exists:**
- `WelcomeDialogue.tsx` handles typewriter effect with a state machine (`READY`, `TYPING_LINE`, `PAUSE_LINE`, etc.).
- Line 144 returns `null` if a line is not typed and not typing: `if (!isCompleted && !isTyping) return null`.

**Problem:**
- During `PAUSE_LINE` and `PAUSE_BATMAN`, the line that just completed typing (`i === currentLine`) is no longer in `TYPING_LINE` state and not yet `i < currentLine`.
- Both `isCompleted` and `isTyping` become `false`, causing the line to vanish (`return null`) for the pause duration (200ms - 800ms).
- This triggers a layout collapse and shift.

---

## Scope Boundary
**In Scope:**
- Update state condition for `isCompleted` to include lines that are completed but paused.
- Standardise layout behavior to avoid collapses.

**Out of Scope:**
- Changing overall animation style.
- Modifying styles outside line typing.

---

## Plan

### [Parent Task 1 — Apply Fix]
- [ ] **[T1.1]** Update `isCompleted` condition in `WelcomeDialogue.tsx` line 139 to include `(i === currentLine && (state === 'PAUSE_LINE' || state === 'PAUSE_BATMAN'))`. — *Definition of done: Code uses the new condition.*
  - Estimated effort: S
  - Depends on: None

### [Parent Task 2 — Verify]
- [ ] **[T2.1]** Verify using browser that typewriter works smoothly without collapsing lines. — *Definition of done: Visual check reveals no layout jumps during pause.*
  - Estimated effort: S
  - Depends on: [T1.1]

---

## Rollback Plan
- Restore `WelcomeDialogue.tsx` from git using standard restore command.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| Execution | ⏳ Pending | Awaiting approval/execution |
| Completion | — | |
