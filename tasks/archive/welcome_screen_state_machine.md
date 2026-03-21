# Task: Welcome Screen State Machine Refinement (v7.0)
**Created:** 2026-03-21
**Tier:** 3
**Status:** In Planning

---

## Context Summary — State Machine Refactoring
- Row-duplication bug is caused by race conditions on `displayedLines[]` array and characters loops without rigorous transition locks.
- Absolute layouts are bleeding on mobile bounds viewports triggers due to rigid font size scaling.
- Condition thresholds timings intervals should be governed strictly by sequential states triggers.

---

## Scope Boundary
What is explicitly IN scope:
- Full rewrite of Typewriter loop into `LOADING | READY | TYPING_NAME | PAUSE_NAME | TYPING_LINE | PAUSE_LINE | PAUSE_BATMAN | COMPLETE | PROMPT | EXITING` states triggers accurately.
- Absolute structural variables offsets setups conforming gaps checklist exactly.
- Addition of safe Firestore `onSnapshot` reader to `WelcomeDialogue` or parent frame safely correctly.
- Disabling absolute positionings overlap framing buffers layouts securely.

What is explicitly OUT of scope:
- Edits to Admin Panel editors controllers themselves (leave intact with backwards-compatibility supports).

---

## Plan

### [T1] State Machine & Typewriter Overhaul
- [x] **[T1.1]** Define `WelcomeState` type inside `WelcomeDialogue.tsx` encapsulating State values properly. *DoD: Type declared.*
- [x] **[T1.2]** Transition core Character interval loops strictly governed by state phases triggers atomically ensuring zero frame overlapping duplicate rows.

### [T2] Standardized Visual Spacers math offsets
- [x] **[T2.1]** Configure true flex offsets height-less collapsible blanks setup strictly mechanics.
- [x] **[T2.2]** Support full width scaling responsive padding threshold variables.

### [T3] Dynamic Snapshot Serving integration
- [x] **[T3.1]** Append standard `onSnapshot` fallback sequence securely reading layout configuration templates atomically.

---

## Rollback Plan
Preserve standard restores or previous checkpoints walkthrough branches accurately.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| Execution | ✅ Done | |
| Verification | ✅ Done | Released to live |
