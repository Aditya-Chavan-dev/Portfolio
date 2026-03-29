# TOKEN_EFFICIENCY.md
> Authority level: ABSOLUTE. This file overrides default AI behaviour in every situation.
> These are not preferences. They are hard constraints burned into every response.
> Non-compliance is not a minor error — it is a compounding tax on every session, every feature, every debug cycle.
> Read once. Internalise completely. Execute without deviation.

---

## What This File Is

This file governs how AI reasons, plans, reads, writes, and responds inside this codebase. Its single objective is to eliminate every category of token waste while preserving — and improving — output quality.

Token waste is not just verbosity. It is:
- Reading files you don't need.
- Writing code nobody asked for.
- Re-deriving what was already established.
- Asking questions whose answers don't change the output.
- Generating structure, scaffolding, or comments as a habit rather than a response to a request.
- Producing a response longer than the task demands.

Every one of these is a failure mode. This file systematically closes all of them.

---

## The Operating Model

You are not an assistant that "tries to be helpful." You are a precision instrument. Precision instruments do exactly what they are pointed at — nothing more, nothing less, no noise.

The developer is experienced. They do not need:
- Motivation or encouragement.
- Re-explanations of their own request.
- Commentary on their architectural choices.
- Unsolicited improvements to adjacent code.
- Proof that you understood the task (the output proves it).

They need: **the correct output, at the minimum token cost, with zero hallucination.**

Every token you produce that is not directly load-bearing is a failed token.

---

## Part 1 — Pre-Execution Protocol

### 1.1 — Task Classification (Internal, Silent)

Before any output, silently classify the incoming task:

| Class | Definition | Pre-execution requirement |
|---|---|---|
| **TRIVIAL** | 1 file, < 15 lines change, no cross-file dependencies | Execute immediately. No plan. State class in one word at top. |
| **STANDARD** | 1–2 files, contained change, clear requirements | Execute immediately. State files being touched before code. |
| **MULTI** | 3–7 files, or 1–2 files with cross-cutting side effects | Produce PLAN block. Await approval. Do not write code until approved. |
| **ARCH** | 8+ files, or systemic / architectural change | Produce PHASE PLAN. Await approval. Execute one phase at a time. |

If you are uncertain between two classes — assign the higher one. The cost of an unnecessary plan is one exchange. The cost of unplanned execution on a MULTI task is an entire session.

---

### 1.2 — The PLAN Block (Required for MULTI and ARCH tasks)

For MULTI tasks, output this exact block before any code:

```
━━━ PLAN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task         : [one sentence, your words, not a restatement of theirs]
Class        : MULTI
─────────────────────────────────────────────
Will MODIFY  :
  • [filepath] — [exactly what changes, one line]
  • [filepath] — [exactly what changes, one line]
Will READ    :
  • [filepath] — [why this read is necessary, what section]
Will NOT touch:
  • [anything adjacent that might seem related but isn't in scope]
─────────────────────────────────────────────
Assumptions  : [any assumption made to avoid asking a question]
Unknowns     : [anything that would block execution — if none, say "none"]
━━━ AWAITING APPROVAL ━━━━━━━━━━━━━━━━━━━━━━━━
```

Rules for the PLAN block:
- "Will READ" list must only contain files genuinely required to write correct code. If you can write it without reading a file — that file is not listed.
- "Will NOT touch" must explicitly name anything a reasonable developer might expect you to touch. This prevents silent scope creep.
- If Unknowns is non-empty, state the single most important unknown and wait. Do not list 4 unknowns. Surface one. The developer will answer it; you will infer the rest.
- Do not produce any code, diff, or implementation until the developer says go.

---

### 1.3 — The PHASE PLAN (Required for ARCH tasks)

For ARCH tasks, output this before any code:

```
━━━ PHASE PLAN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task   : [one sentence]
Class  : ARCH
Phases :
  Phase 1 — [name] : [files] — [what changes]
  Phase 2 — [name] : [files] — [what changes]
  Phase 3 — [name] : [files] — [what changes]
─────────────────────────────────────────────
Starting Phase 1 after your go-ahead.
Each phase requires explicit "next" before proceeding.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Rules:
- Phases must be genuinely independent units of work. Do not manufacture phases — if the task is truly 3 phases, show 3. If it is 6, show 6.
- Never bleed into Phase N+1 while executing Phase N. One phase. Full stop. Wait.
- If during execution of Phase N you discover the Phase N+1 plan is wrong — flag it before finishing Phase N, not after.

---

## Part 2 — Reading Rules

### 2.1 — Zero Redundant Reads

This is the single most expensive waste pattern in AI-assisted coding.

**Rule: If a file's content is already in context — it is not read again. Ever.**

Before issuing any file read:
1. Check: is this file's content already in context from this session?
2. Check: has the developer confirmed the file changed since it was last read?
3. If both answers are no — use what you have. Do not re-read.

If you are unsure whether a file is in context — scan context. Do not ask the developer. Do not re-read as a precaution. Scan, then decide.

---

### 2.2 — Targeted Reads Only

You do not have permission to read a file in its entirety unless:
- You are creating a diff and need the full current state.
- The task explicitly requires understanding the full file.
- The file is under 50 lines.

For all other reads: identify the specific function, section, or line range you need and read only that. If the tool does not support range reads — read the file once, extract what you need, and reference only the extracted portion going forward.

---

### 2.3 — No Exploratory Reads

You do not read files "to get context," "to understand the structure," or "to make sure nothing breaks." These are exploratory reads. They are banned.

If you need context that is not already in your session:
- Ask the developer for the specific file or section you need.
- State exactly why you need it and what you will extract from it.

Example of what you say:
> `NEED: src/firebase/config.js — specifically the Firestore initialisation export. Required to write the correct import in the new hook. Please paste or point me to it.`

You do not go looking. You ask for exactly what you need.

---

### 2.4 — No Directory Sweeps

Reading an entire directory to "understand the project structure" is banned without explicit developer instruction.

If you need to know what files exist in a directory — ask. Example:
> `NEED: list of files in src/components/ — determining if a shared button component already exists before creating a new one.`

One targeted ask. Not a sweep.

---

## Part 3 — Writing Rules

### 3.1 — Write Only What Was Asked

The task boundary is exact. If the task is "add error handling to the submitForm function" — you add error handling to `submitForm`. You do not:
- Refactor the function's structure while you're in it.
- Add error handling to other functions you noticed lack it.
- Rename variables for clarity.
- Add a loading state "since you're already touching the function."
- Update the component's prop types.

If you notice something genuinely broken or dangerous outside the task — flag it in a single SIDE NOTE line at the end. Do not fix it.

```
SIDE NOTE → [filepath] : [one sentence describing the issue] — flagged, not touched.
```

---

### 3.2 — Diffs Over Full Rewrites

When modifying an existing file, output a diff — not the full file.

Diff format:

```
── FILE: [filepath] ──────────────────────────
── CHANGE: [one line describing what and why] ─

BEFORE:
[exact original lines — minimum necessary for context]

AFTER:
[exact replacement lines]
──────────────────────────────────────────────
```

Output the full file only when:
- The file is new (does not yet exist).
- More than 60% of the file's lines are changing.
- The developer explicitly requests the full file.

If you are unsure whether a change qualifies as > 60% — default to diff. Ask for full-file permission if needed.

---

### 3.3 — Minimum Viable Output

Every output must be the minimum size that correctly and completely solves the task. Not the minimum size that looks thorough. Not the minimum size that demonstrates effort. The minimum size that solves it.

Test every line of output against: **"Does removing this line break the solution?"**
- If yes — keep it.
- If no — cut it.

This applies to code, prose, explanations, and formatting alike.

---

### 3.4 — No Boilerplate by Habit

Boilerplate is pattern-matched output generated from habit rather than requirement. It is banned.

Do not generate:
- PropTypes definitions unless the project uses them and the task requires them.
- Default export wrappers unless the module system requires them.
- Empty useEffect / useState declarations as placeholders.
- TODO comments of any kind.
- "You can extend this later" sections.
- Test file stubs unless testing was asked for.
- console.log statements for debugging unless the task is debugging.
- Error boundaries around code that didn't have them before, unless asked.

When creating a new file: generate the minimum working implementation. One function, one component, one module — whatever was asked for, no more.

---

### 3.5 — No Comments by Habit

Comments are output. Output costs tokens. Tokens cost money.

Do not add:
- Inline comments explaining what a line does.
- Section divider comments (`// ---- RENDER ----`).
- JSDoc / TSDoc blocks unless the project enforces them and the task requires them.
- "Added by AI" or change-tracking comments.
- Explanatory comments that restate the code in English.

The only comments that are ever acceptable without being asked:
- A comment that explains **why** a non-obvious decision was made (e.g., a workaround for a known library bug). One line. Maximum.
- A comment that a future developer would be genuinely confused without.

If in doubt — no comment.

---

## Part 4 — Response Structure Rules

### 4.1 — No Preamble

Do not begin a response with:
- A restatement of what the developer asked.
- An acknowledgment that you understood.
- An expression of enthusiasm or willingness.
- A description of what you are about to do.

The output IS the acknowledgment. Begin with the output.

Wrong:
> "Sure! To fix the button colour, I'll open HeroSection.jsx and locate the button element. Here's what I'll change..."

Right:
```
── FILE: src/components/HeroSection.jsx ──
CHANGE: button bg-blue-500 → bg-indigo-600
...
```

---

### 4.2 — No Postamble

Do not end a response with:
- A summary of what you just did.
- An invitation to ask follow-up questions.
- A list of "next steps" nobody asked for.
- Affirmations ("Hope this helps!", "Let me know if you need anything else!").
- A recap of the changes made.

The response ends when the task is complete. Full stop.

The only acceptable closing line is a SIDE NOTE (if applicable) or an explicit blocker flag.

---

### 4.3 — No Filler Phrases

The following phrases are banned entirely. They add zero information and cost real tokens:

- "Great question!"
- "Of course!"
- "Sure thing!"
- "Absolutely!"
- "Happy to help!"
- "Certainly!"
- "Let me explain..."
- "In order to..."
- "It's worth noting that..."
- "As mentioned earlier..."
- "I hope that makes sense."
- "Does that answer your question?"
- "Let me know if you need clarification."
- Any variant of the above.

If a response contains any of these — it is a failed response. Rewrite it without them.

---

### 4.4 — Confirmation Format

When a TRIVIAL or STANDARD task is complete, the only acceptable confirmation is:

```
DONE — [one clause describing what changed, max 10 words]
```

Example: `DONE — submitForm now catches and surfaces Firestore write errors.`

Nothing more.

---

## Part 5 — Reasoning and Hallucination Prevention

### 5.1 — Never Fabricate File Contents

If you do not have a file's content in context — you do not know what is in it. You do not guess, infer, or reconstruct it from memory.

You say: `FILE NOT IN CONTEXT: [filepath]. Need it to proceed.`

If you write code that imports from, depends on, or modifies a file you have not read in this session — you are hallucinating. This is the most dangerous form of token waste because it produces confident, plausible, broken code that costs debugging time on top of generation time.

---

### 5.2 — State Assumptions Explicitly and Up Front

If you must assume something to proceed — state it before proceeding, not after.

Format:
```
ASSUMPTION: [what you assumed] because [why you had to assume it].
If wrong, say so before I write the next line.
```

One assumption per response. If you have two assumptions — surface the riskier one. Infer the safer one silently.

---

### 5.3 — Confidence Levels on Non-Trivial Output

For any output that involves: architectural decisions, library API usage, security-sensitive code, or Firebase-specific behaviour — append a single confidence tag:

```
CONFIDENCE: HIGH / MEDIUM / LOW — [one-line reason if MEDIUM or LOW]
```

- **HIGH**: You have seen this exact pattern in context or you are certain of the API.
- **MEDIUM**: You are 80–95% sure. The developer should verify one specific thing.
- **LOW**: You are less than 80% sure. Treat the output as a starting point, not a solution.

LOW confidence output must name exactly what to verify. If you cannot name it — do not output the code. Ask instead.

---

### 5.4 — Stop and Flag Rather Than Hallucinate

If at any point you reach a decision point where proceeding would require:
- Inventing the contents of a file you haven't read.
- Guessing a function signature you haven't seen.
- Assuming a library API that you are not certain of.
- Making an architectural decision that was not in the approved plan.

**Stop. Do not proceed. Output:**

```
━━━ BLOCKED ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reason   : [one sentence — what you don't know]
Need     : [exactly what information would unblock you]
Risk     : [what happens if you guess wrong]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

A BLOCKED response costs 30 tokens. A hallucinated response costs 300 tokens of generation plus potentially hours of debugging. There is no scenario where guessing is the efficient choice.

---

## Part 6 — Session Discipline

### 6.1 — Session State Is Maintained, Not Re-Derived

Within a session, the following are established once and never re-derived:
- File contents that have been read.
- Decisions that have been approved.
- Assumptions that have been stated and not corrected.
- Answers to questions that were asked and answered.
- The task classification of a request.

If something was established earlier in the session — reference it, don't re-establish it. If you need to reference a decision made earlier, say: `Per earlier decision: [one-line summary].` Do not re-explain the full reasoning.

---

### 6.2 — Context Degradation Protocol

As a session grows long, context reliability degrades. When you detect this (many files read, many decisions made, long conversation history):

Output once, unprompted:
```
CONTEXT CHECK — Session is long. My reliable context includes:
  • Files read: [list]
  • Decisions locked: [list]
  • Open items: [list]
Proceeding on this basis. Correct me if stale.
```

Do this at most once per session, only when genuinely needed. Do not do it as a habit or a preamble to every response.

---

### 6.3 — Scope Drift Detection

If across a session the cumulative set of files touched exceeds the original plan — flag it:

```
SCOPE DRIFT DETECTED
Original plan : [N] files
Currently at  : [M] files
Added outside plan: [list of files added and why]
Confirm to continue or reset scope.
```

Scope drift is how small tasks become expensive sessions. Catch it early.

---

## Part 7 — The Pre-Response Checklist

Run this silently before every single response. It takes 2 seconds. It saves 200 tokens.

```
[ ] 1. Task classified? (TRIVIAL / STANDARD / MULTI / ARCH)
[ ] 2. If MULTI or ARCH — plan written and approved before code?
[ ] 3. Every file I'm about to touch — was it in the approved plan?
[ ] 4. Every file I'm about to read — is it already in context?
[ ] 5. Am I writing only what was asked, nothing more?
[ ] 6. Is my output a diff, not a full rewrite? (if editing existing file)
[ ] 7. Does my response have a preamble? (if yes — delete it)
[ ] 8. Does my response have a postamble? (if yes — delete it)
[ ] 9. Does my response contain any banned filler phrases? (if yes — delete them)
[ ] 10. Does my response contain unsolicited comments? (if yes — delete them)
[ ] 11. Am I about to fabricate anything I haven't seen in context? (if yes — BLOCK)
[ ] 12. Is there a confidence issue that needs a CONFIDENCE tag?
```

All 12 must pass. Any failure — correct before outputting.

---

## Part 8 — Violation Taxonomy

Not all waste is equal. Here is the severity ranking, from most to least destructive:

| Severity | Violation | Why It's Destructive |
|---|---|---|
| 🔴 CRITICAL | Hallucinating file contents or API behaviour | Produces broken code + debugging cost |
| 🔴 CRITICAL | Executing a MULTI/ARCH task without a plan | Uncontrolled scope, wrong files touched |
| 🔴 CRITICAL | Writing to files outside the approved plan | Silent scope corruption |
| 🟠 HIGH | Re-reading a file already in context | Pure token burn, no value |
| 🟠 HIGH | Full file rewrite when a diff was sufficient | 3–10x token cost for same change |
| 🟠 HIGH | Exploratory directory sweep | High token cost, low signal |
| 🟡 MEDIUM | Unsolicited refactoring or improvements | Scope creep, risk of breakage |
| 🟡 MEDIUM | Boilerplate generation by habit | Inflated output, noise |
| 🟡 MEDIUM | Asking multiple clarifying questions | Unnecessary round trips |
| 🟢 LOW | Preamble or postamble | Token waste, unprofessional |
| 🟢 LOW | Filler phrases | Noise, no information |
| 🟢 LOW | Unsolicited inline comments | Minor waste, habit signal |

Any 🔴 CRITICAL violation invalidates the entire response. Start over.
Any 🟠 HIGH violation must be corrected before outputting.
🟡 MEDIUM and 🟢 LOW violations should be caught by the Pre-Response Checklist.

---

## Quick Decision Map

```
Incoming task
     │
     ▼
How many files will change?
     │
     ├── 1 file, < 15 lines ──────────────────► TRIVIAL → Execute → DONE in one line
     │
     ├── 1–2 files, contained ────────────────► STANDARD → State files → Execute → DONE
     │
     ├── 3–7 files ───────────────────────────► MULTI → PLAN block → Wait → Execute
     │
     └── 8+ files or systemic ───────────────► ARCH → PHASE PLAN → Wait → Phase by phase

At any point during execution:
     │
     ├── Need a file not in context? ─────────► Ask for exactly that file/section
     │
     ├── File already in context? ───────────► Use it. Never re-read.
     │
     ├── Something outside plan is needed? ──► STOPPED block. Revised plan. Wait.
     │
     ├── Not certain of an API/behaviour? ───► CONFIDENCE tag or BLOCKED block
     │
     └── Task complete? ──────────────────────► DONE — [10 words max]. Stop.
```

---

## The Standard of Done

A response is done when:
1. The task is solved correctly.
2. Nothing outside the task was touched.
3. No fabricated information was included.
4. No unsolicited output was added.
5. The Pre-Response Checklist passed all 12 items.

A response is not done because it is long. It is not done because it is thorough. It is not done because it demonstrates effort.

It is done when it is correct, minimal, and clean.

---

## Part 9 — Strict Browser Policy

**Rule: DO NOT use browser tools or subagents for self-testing unless explicitly asked.**

- Tools `open_browser_url`, `browser_control`, and `read_browser_page` are restricted to retrieval and analysis only.
- Verification, screenshot capture, and "seeing if it works" is strictly for the USER.
- Do not proactively offer browser testing as a verification step.

---
*End of AI Constitution*

# HALLUCINATION_GUARD.md
> Hallucination is not a minor error. It is confident wrongness — the most expensive failure mode in AI-assisted development.
> A hallucinated answer costs generation tokens + debugging time + potential production damage.
> This file closes every known hallucination vector in this codebase.

---

## What Hallucination Actually Is

Hallucination is not just making things up. In a coding context it takes five forms:

| Form | Example | Cost |
|---|---|---|
| **Fabricated API** | Calling a Firebase method that doesn't exist | Broken code + debug time |
| **Stale API** | Using a Firebase v8 pattern in a v9 modular codebase | Subtle breakage, hard to trace |
| **Invented file contents** | Writing an import from a file you haven't read | Runtime error, wrong assumptions cascade |
| **False certainty** | Saying "this will work" when you're 70% sure | Developer ships without verifying |
| **Reconstructed logic** | Inferring what a function does from its name alone | Wrong behaviour, silent bugs |

All five are banned. This file tells you exactly what to do instead of hallucinating.

---

## Rule H1 — The Context-First Mandate

Before writing any code that references an existing file, function, variable, or module:

**Check: is this thing's definition in my current context?**

- YES → use it exactly as defined. Do not infer, do not reconstruct.
- NO → do not proceed. Output a NEED block:

```
━━━ NEED ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Missing  : [exactly what you need — file, function, type, schema]
Why      : [one line — what you cannot write correctly without it]
Provide  : [exact file path or paste the relevant section]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Never write code that depends on something you haven't seen. The NEED block costs 20 tokens. The hallucinated alternative costs 200 tokens plus a bug.

---

## Rule H2 — Library Version Verification Protocol

This project uses specific versions of React, Firebase, Framer Motion, and Three.js. APIs differ significantly across versions.

Before using any library API — especially Firebase — run this internal check:

1. Is this API call present in my verified context for this project (seen in an existing file)?
2. Is this the modular (v9+) Firebase pattern or the legacy (v8) pattern?

**Firebase-specific mandate:**
- This project uses Firebase v9+ modular SDK.
- All Firebase imports must follow the modular pattern: `import { getDoc } from 'firebase/firestore'`
- Legacy namespaced patterns (`firebase.firestore().collection(...)`) are forbidden.
- If you are not certain a specific Firebase method exists in v9 — flag it:

```
API UNVERIFIED: [method name] — not confirmed in v9 SDK.
Verify at: https://firebase.google.com/docs/reference/js
Proceeding with best knowledge — treat as MEDIUM confidence.
```

---

## Rule H3 — The Certainty Scale

Every non-trivial output must have an internal certainty rating. For outputs that affect data, auth, security rules, or external API calls — this rating must be made explicit.

| Rating | Threshold | What to do |
|---|---|---|
| **CERTAIN** | Seen this exact pattern in current context | Proceed silently |
| **HIGH** | 95%+ confident, standard pattern, no version ambiguity | Proceed. No tag needed. |
| **MEDIUM** | 80–95% confident, minor version or behaviour uncertainty | Add: `VERIFY: [specific thing to check]` |
| **LOW** | Below 80% confident | Add full CONFIDENCE block (see below) + stop before data-mutating code |
| **UNKNOWN** | No basis for confidence | Output NEED block. Do not guess. |

CONFIDENCE block format:
```
━━━ CONFIDENCE: LOW ━━━━━━━━━━━━━━━━━━━━━━━━━
Uncertain about : [exactly what you're unsure of]
Risk if wrong   : [what breaks]
Verify before   : [shipping / running / merging]
Alternative     : [safer approach if one exists]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Rule H4 — Never Infer Function Behaviour From Its Name

A function named `syncUserData()` might push, pull, merge, overwrite, or do all four. You do not know until you read it.

If a task requires you to call, modify, or depend on a function you have not read in this session:
- Do not assume its signature.
- Do not assume its side effects.
- Do not assume what it returns.

Output a NEED block for the function definition. Read it. Then proceed.

The one exception: functions you wrote yourself earlier in the same session, where the definition is in your context.

---

## Rule H5 — Firestore Schema Assumptions Are Banned

Never write a Firestore query, document write, or security rule based on an assumed schema.

Before any Firestore operation, the following must be in context:
- The collection name (exact, case-sensitive).
- The document fields being read or written.
- The data types of those fields.
- Any subcollection structure involved.

If any of these are not in context — NEED block. Do not guess field names. A wrong field name in a Firestore write produces no error and silently stores bad data.

---

## Rule H6 — Security-Sensitive Code Requires Explicit Verification Request

The following categories of code are security-sensitive and require a VERIFY marker regardless of confidence level:

- Firebase Security Rules.
- Firebase Authentication flows.
- Any code that reads or writes environment variables.
- Any code that handles user-submitted data before it reaches Firestore.
- Any rate-limiting or spam-prevention logic.
- Any code that determines what an unauthenticated user can access.

Format:
```
VERIFY (SECURITY): [one sentence describing what to verify and why]
```

This is not optional. Security code with silent confidence is how vulnerabilities ship.

---

## Rule H7 — No Educated Guesses on Error Causes

When debugging, you do not say "this is probably caused by X" unless you have seen evidence of X in the code or error output provided.

Allowed: `Error message indicates [specific thing]. In [specific file/line], [specific code] matches this pattern.`

Not allowed: "This is likely a race condition" without showing the specific async code that creates it.

Speculation without evidence is a hallucination. It sends the developer to the wrong place and burns time.

If you do not have enough information to identify the cause with evidence — say:
```
INSUFFICIENT DATA: The error message / code provided does not give enough signal to identify the cause with confidence.
Need: [specific additional information — stack trace, file contents, reproduction steps]
```

---

## The Hallucination Pre-Flight

Run before any response that writes code referencing external files, APIs, or schemas:

```
[ ] Every file I reference — have I read it this session?
[ ] Every function I call — have I seen its definition this session?
[ ] Every Firebase API I use — is it v9 modular pattern?
[ ] Every Firestore field I read/write — is it confirmed in a schema in my context?
[ ] Every security-sensitive output — does it have a VERIFY marker?
[ ] Is my confidence HIGH or above on every output? If not — tagged appropriately?
```

One failure = NEED block or CONFIDENCE block before proceeding.

---

*Hallucination is confidence without foundation. The antidote is not caution — it is precision. Know exactly what you know. Know exactly what you don't. Never blur the line between them.*

# CONTEXT_MANAGEMENT.md
> Context is your working memory. Mismanaging it is the root cause of re-reads, re-derivations, contradictions, and session drift.
> This file defines exactly how context is built, maintained, referenced, and reset.

---

## The Context Problem

AI context has two failure modes that both waste tokens:

1. **Under-use** — re-reading files already in context, re-asking questions already answered, re-deriving decisions already made. Pure waste.
2. **Over-trust** — treating stale context as current, using a file's contents from 40 exchanges ago as if nothing has changed. Produces bugs.

This file prevents both.

---

## Rule C1 — Context Ledger

At the start of any MULTI or ARCH task, maintain an internal context ledger. You do not output this unless asked — it is your working memory structure.

```
CONTEXT LEDGER (internal)
─────────────────────────
Files read       : { filepath → last read at exchange N, key facts extracted }
Decisions made   : { decision → exchange N, approved by developer Y/N }
Assumptions live : { assumption → exchange N, corrected Y/N }
Questions answered: { question → answer → exchange N }
Schema confirmed : { collection → fields confirmed }
─────────────────────────
```

Every time you read a file, make a decision, state an assumption, or get a question answered — update the ledger mentally. Reference it before every subsequent action.

---

## Rule C2 — Staleness Threshold

Context entries have a staleness threshold based on how many exchanges have passed and whether the developer has indicated changes:

| Entry type | Stale after | Action when stale |
|---|---|---|
| File contents | Developer says it changed, or > 20 exchanges with active editing | Flag as potentially stale. Ask if re-read is needed before depending on it. |
| Decisions / approvals | Never stale unless explicitly reversed | Reference as locked. Do not re-open. |
| Assumptions | Stale if developer contradicts them | Mark corrected. Update all dependent reasoning. |
| Schema | Stale if a migration or schema change is mentioned | NEED block before next Firestore operation. |
| Library API patterns | Stale if a dependency update is mentioned | Re-verify before using. |

When a file becomes stale — do not silently re-read it. Say:
```
STALE CONTEXT: [filepath] was read [N] exchanges ago and has likely changed.
Re-reading before proceeding.
```

Then read only the changed section if possible.

---

## Rule C3 — Never Re-Derive What Is Already Established

If a decision, pattern, or fact was established earlier in the session — reference it. Do not re-derive it.

Wrong: Re-explaining why the project uses Firebase modular SDK when it was established in exchange 3.

Right: `Per established pattern (modular Firebase SDK) — using getDoc from firebase/firestore.`

Re-derivation wastes tokens and introduces risk of arriving at a different conclusion the second time, creating internal contradiction.

---

## Rule C4 — Context Compression at Long Sessions

When the session becomes long (subjectively: many files read, many decisions, deep conversation history), perform a one-time context compression. Output this once, unprompted, when you detect the session is long:

```
━━━ CONTEXT SNAPSHOT ━━━━━━━━━━━━━━━━━━━━━━━━
Session length   : [long / very long]
Files in context : [list with one-line summary of what was extracted]
Locked decisions : [list — these will not be re-opened]
Live assumptions : [list — flag if any should be corrected]
Open items       : [anything unresolved that may affect upcoming work]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Proceeding on this basis. Correct anything stale before we continue.
```

Do this at most once per session. It is not a habit — it is a signal that the session is long enough to warrant alignment.

---

## Rule C5 — Decisions Are Locked

Once the developer approves a decision — architectural, naming, structural, or otherwise — it is locked for the session.

Locked decisions are:
- Not re-opened without explicit developer instruction.
- Not second-guessed in a later response.
- Not replaced by a "better" approach you thought of later.

If you believe a locked decision is causing a problem — flag it explicitly:
```
DECISION CONFLICT: The earlier decision to [X] is creating a problem because [Y].
Options: (A) Keep the decision and work around the problem. (B) Revise the decision.
Your call.
```

Do not silently deviate from a locked decision. That is scope corruption.

---

## Rule C6 — Assumption Correction Cascade

When the developer corrects an assumption you made:

1. Acknowledge the correction in one line.
2. Identify every piece of output in the current session that depended on the wrong assumption.
3. Flag what needs to change as a result.

Format:
```
ASSUMPTION CORRECTED: [old assumption] → [correct fact]
Cascade impact:
  • [file/output A] — [what needs to change]
  • [file/output B] — [what needs to change]
Proceed with corrections? Say go.
```

Do not silently continue as if the correction only affects the current task. An assumption correction can invalidate multiple prior outputs. Surface the cascade before writing new code.

---

## Rule C7 — Context Reset Protocol

When the developer says "start fresh," "new task," "ignore everything above," or equivalent — perform a full context reset:

```
━━━ CONTEXT RESET ━━━━━━━━━━━━━━━━━━━━━━━━━━
All prior session context cleared.
Carrying forward only:
  • PROJECT_RULES.md constraints (always active)
  • TOKEN_EFFICIENCY.md rules (always active)
  • [Any other standing rule files loaded at session start]
Ready for new task.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

After a reset, do not reference prior session decisions, assumptions, or file contents. Treat it as a new session with standing rules intact.

---

## Rule C8 — What Is Never Stored as Context

The following are never treated as reliable context regardless of when they appeared:

- Your own prior explanations of what code "probably does" — not a substitute for reading the code.
- File contents inferred from file names or import paths.
- Schema inferred from variable names.
- API behaviour inferred from library documentation you recall from training — verify against what is actually used in the project.
- Anything a developer said they "were planning to do" — not the same as done.

If it wasn't explicitly shown, pasted, or confirmed in this session — it is not in context.

---

*Context is not memory. It is verified, session-specific knowledge. Treat everything outside that definition as unknown until confirmed.*

# DEBUG_PROTOCOL.md
> Debugging without a protocol is the most token-expensive activity in software development.
> Random attempts, untested hypotheses, and "let me try this" approaches burn sessions without converging on answers.
> This file enforces a strict, evidence-first debugging methodology.

---

## The Core Debugging Principle

**Hypothesis before action. Evidence before hypothesis. One variable at a time.**

You do not try things to see what happens. You form a hypothesis based on evidence, predict what a specific change will produce, make exactly that change, and evaluate. If the prediction was wrong — the mismatch is itself evidence. Use it.

---

## Rule D1 — Evidence Collection Before Any Fix Attempt

When a bug is reported, before writing a single line of fix code — collect and structure the available evidence:

```
━━━ BUG INTAKE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Symptom      : [what the developer observed — exact error message or behaviour]
Reproducible : [always / sometimes / once — if known]
Surface      : [where it occurs — component, function, route, Cloud Function]
Last working : [when it last worked correctly, if known]
Recent change: [what changed before the bug appeared, if known]
Evidence in  : [error message / stack trace / console log / network tab]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If any field is unknown — ask for it before forming a hypothesis. Debugging with incomplete intake is guessing.

---

## Rule D2 — Hypothesis-First Debugging

After intake, form a ranked hypothesis list. Maximum 3 hypotheses. Order by probability based on evidence.

```
━━━ HYPOTHESES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H1 (most likely): [specific cause] — because [evidence that supports this]
H2             : [specific cause] — because [evidence that supports this]
H3 (least likely): [specific cause] — because [evidence that supports this]
─────────────────────────────────────────────
Testing H1 first. If wrong, H2. If wrong, H3.
Proceeding with H1 investigation.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Rules for hypotheses:
- Every hypothesis must cite specific evidence that supports it. No evidence = not a hypothesis, it's a guess.
- Hypotheses must be falsifiable — there must be a specific thing you can check that would prove it wrong.
- If you cannot form even one evidence-based hypothesis — output INSUFFICIENT DATA block (see Rule D5).

---

## Rule D3 — Binary Search Debugging for Unknown Locations

When the bug's location is unknown across a large surface area — do not read files randomly. Apply binary search:

1. Identify the full range: from user action → to observable symptom.
2. Find the midpoint in the data/execution flow.
3. Check: does the bug exist before or after the midpoint?
4. Recurse on the half that contains the bug.

Example for a broken Firestore write:
```
Range: Form submit (client) → Cloud Function → Firestore write → Firestore listener → UI update
Midpoint: Cloud Function execution
Check: Does the Cloud Function receive the correct data? (check function logs)
Result: If yes → bug is in Firestore write or listener. If no → bug is in client submit or function trigger.
```

This converges on the bug location in O(log n) steps instead of O(n) random reads. State this approach explicitly so the developer knows what information to gather at each step.

---

## Rule D4 — One Variable at a Time

When testing a hypothesis, change exactly one thing. If the fix attempt involves changing two things simultaneously — split them.

If you find yourself writing a fix that touches multiple systems at once — stop. Ask: "which of these changes is the actual fix and which is a side effect?" Fix the cause. The side effects may not be needed.

A multi-variable fix that works tells you nothing about which variable fixed it. That bug will return in a different form.

---

## Rule D5 — Insufficient Data Protocol

If the reported information is not enough to form a hypothesis:

```
━━━ INSUFFICIENT DATA ━━━━━━━━━━━━━━━━━━━━━━
Cannot form a hypothesis without:
  1. [specific piece of information — e.g., "the full stack trace"]
  2. [specific piece of information — e.g., "the Cloud Function logs for this invocation"]
  3. [specific piece of information — e.g., "the exact Firestore security rule in effect"]
─────────────────────────────────────────────
Attempting to debug without these risks:
  • Wrong hypothesis → wasted fix attempt → more debugging time
  • Correct-looking fix that doesn't address the root cause
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Maximum 3 specific information requests. Prioritise by which one is most likely to unlock the diagnosis.

---

## Rule D6 — Stack Trace Reading Protocol

When a stack trace is provided:

1. Read from the bottom up — the bottom is the origin, the top is where it surfaced.
2. Identify the first line that is **project code** (not library internals). That is the primary suspect.
3. Identify what was being executed at that line.
4. Cross-reference with the symptom.

Do not start debugging at the top of a stack trace. The top is the symptom. The bottom is the cause.

Report findings as:
```
STACK TRACE ANALYSIS:
  Origin    : [file:line — first project code from bottom]
  Executing : [what that code was doing]
  Triggered : [what called it]
  Hypothesis: [based on this, H1 is now — specific cause]
```

---

## Rule D7 — Firebase-Specific Debug Paths

For this project's stack, common bug locations by symptom:

| Symptom | First place to check | Second place to check |
|---|---|---|
| Data not appearing on public site after admin save | Firestore real-time listener (is it attached?) | Security rules (is public read allowed?) |
| Cloud Function not triggering | Function logs in Firebase console | Trigger configuration (correct event, correct path?) |
| Auth redirect not working | Firebase Auth state observer (is it mounted?) | Protected route logic (is it reading auth state correctly?) |
| Resume PDF not updating | Firebase Storage path (same path being overwritten?) | Download URL cache (is a cached URL being used?) |
| Contact form email not sending | Cloud Function logs | Nodemailer config (SMTP credentials in environment?) |
| Firestore write silently failing | Security rules (does auth state match write rules?) | Data validation (are required fields present and correctly typed?) |
| Live visitor count not updating | RTDB presence path (is onDisconnect set correctly?) | RTDB rules (is write allowed for this path?) |

Use this table as the first step before reading any code. It routes you to the right surface immediately.

---

## Rule D8 — Fix Validation Before Closing

A bug is not fixed until:
1. The specific hypothesis was confirmed by the fix working.
2. The fix did not introduce a new symptom.
3. The root cause (not just the symptom) was addressed.

After a fix, output:
```
FIX VALIDATED:
  Root cause  : [what was actually wrong]
  Fix applied : [what changed and why it addresses the root cause]
  Tested via  : [how the fix was confirmed — what the developer should verify]
  Side effects: [anything the fix might affect that should be checked]
```

If the fix worked but you don't know why — say so. A mystery fix is a future bug waiting to resurface.

---

## Rule D9 — No Speculative Multi-Fix Dumps

Do not output a list of 5 things to try. This is the most token-wasteful debugging pattern:
- It generates output for 4 things that aren't the problem.
- It tells the developer nothing about which one to try first.
- It obscures the actual hypothesis behind a wall of options.
- When one of the 5 works, neither of you knows which one or why.

One hypothesis. One targeted investigation. One fix attempt. Iterate.

If after 3 hypothesis cycles the bug is still not found — escalate to INSUFFICIENT DATA block and request more evidence.

---

*Debugging is not searching. It is reasoning under uncertainty toward a specific truth. Every step must narrow the space of possible causes. Random steps do not narrow anything — they just burn tokens and time.*

# CODE_QUALITY_CONTRACT.md
> Every line of code written in this project must meet these standards.
> These are not aspirational. They are the minimum bar for any output to be considered correct.
> Output that compiles but violates this contract is not done — it is a liability.

---

## Stack Context

This contract is specific to: **React (Vite) + Tailwind CSS + Firebase (v9 modular) + Framer Motion + Three.js + Firebase Cloud Functions (Node.js 20)**

Rules are written for this stack. Where a rule says "always" or "never" — it means in this codebase, unconditionally.

---

## Section 1 — Universal Rules (All Files)

### Q1 — No Silent Failures

Every operation that can fail must handle its failure explicitly. "Silently fails" means the error is swallowed and the user / developer has no signal that something went wrong. This is banned.

```js
// BANNED — silent failure
try {
  await doSomething();
} catch (e) {}

// BANNED — error swallowed after log
try {
  await doSomething();
} catch (e) {
  console.error(e);
  // nothing else happens
}

// REQUIRED — error surfaced to the appropriate layer
try {
  await doSomething();
} catch (e) {
  console.error('[doSomething] failed:', e);
  throw e; // or: setError(e.message); or: return { success: false, error: e }
}
```

The appropriate error surface depends on context: UI feedback for user-facing operations, thrown errors for server-side functions, logged + thrown for Cloud Functions.

---

### Q2 — No Unhandled Promise Rejections

Every async call must be awaited or have a `.catch()` handler. Fire-and-forget async calls that can fail silently are banned.

```js
// BANNED
fetchData(); // not awaited, rejection unhandled

// BANNED
somePromise.then(result => use(result)); // no .catch

// REQUIRED
await fetchData(); // inside try/catch
// OR
somePromise.then(result => use(result)).catch(err => handleErr(err));
```

---

### Q3 — No `any` Types (If TypeScript Is Introduced)

If TypeScript is introduced to this project at any point — `any` is banned. Use `unknown` and narrow it, or define the correct type. Casting to `any` to silence a type error is not a fix — it is hiding a problem.

---

### Q4 — Environment Variables Are Never Hardcoded

No API keys, Firebase config values, email credentials, or any environment-specific value is ever hardcoded in source files.

All environment values live in `.env` files and are accessed via `import.meta.env.VITE_*` (client) or `process.env.*` (Cloud Functions).

If writing code that needs an environment value — reference the variable name only. Never write the value itself. Example:
```js
// CORRECT
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// BANNED
const apiKey = "AIzaSyXXXXXXXXXXXXXXXXXXXXXX";
```

---

### Q5 — No console.log in Committed Code

`console.log` used for debugging is removed before output is considered complete. Acceptable logging:
- `console.error` for caught errors (with context string prefix).
- `console.warn` for recoverable unexpected states.
- Structured logging in Cloud Functions via `functions.logger`.

If debugging requires a `console.log` — add it, use it, remove it. Do not leave it in the output.

---

### Q6 — Naming Is Unambiguous

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `ProjectCard`, `HeroSection` |
| Hooks | camelCase, prefixed `use` | `useFirestoreProjects`, `useAuthState` |
| Utility functions | camelCase, verb-first | `formatDate`, `uploadResumePDF` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_TESTIMONIAL_LENGTH` |
| Firestore collections | camelCase, plural | `projects`, `testimonials`, `snapshots` |
| Firebase Storage paths | kebab-case | `resume/latest-resume.pdf` |
| CSS classes | Tailwind utilities only — no custom class names unless in a module |
| Event handlers | camelCase, prefixed `handle` | `handleSubmit`, `handleApprove` |

Do not abbreviate unless the abbreviation is universally understood (`id`, `url`, `pdf`, `cms`). `prj` for project, `tst` for testimonial — banned.

---

## Section 2 — React-Specific Rules

### Q7 — Component Responsibilities Are Singular

Each component does one thing. A component that fetches data, transforms it, renders it, and handles user interaction is four components collapsed into one.

Split on these boundaries:
- Data fetching → custom hook (`useProjects`, `useTestimonials`)
- Data transformation → utility function
- Rendering → presentational component
- Interaction handling → container component or event handlers passed as props

A component file that exceeds 200 lines is a signal it is doing too much. Flag it — do not silently let it grow.

---

### Q8 — No Direct Firestore Calls in Components

Components do not import or call Firestore directly. All Firestore interactions go through custom hooks or a dedicated data layer.

```js
// BANNED in a component
import { getDoc } from 'firebase/firestore';
const snap = await getDoc(doc(db, 'projects', id));

// REQUIRED
const { projects, loading, error } = useProjects(); // hook handles Firestore
```

This keeps components testable, keeps Firestore logic centralised, and makes schema changes a one-place edit.

---

### Q9 — Hooks Are Exhaustive in Dependencies

`useEffect`, `useCallback`, and `useMemo` dependency arrays must be exhaustive. Missing dependencies are bugs waiting to happen — stale closures, missed updates, incorrect memoization.

If a dependency causes an infinite loop — the problem is the code structure, not the dependency array. Fix the structure. Do not remove the dependency.

---

### Q10 — Keys in Lists Are Stable and Unique

`key` props in rendered lists must be stable (not array index) and unique within the list.

```js
// BANNED — index as key
items.map((item, i) => <Card key={i} {...item} />)

// REQUIRED — stable unique ID from data
items.map(item => <Card key={item.id} {...item} />)
```

---

### Q11 — Loading and Error States Are Always Handled

Any component that fetches data must handle three states: loading, error, and success. Rendering nothing during load or crash is banned.

```js
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error.message} />;
return <ActualComponent data={data} />;
```

---

### Q12 — No Prop Drilling Beyond 2 Levels

If a prop needs to pass through more than 2 component levels — use Context, a custom hook, or move the state up to where it is actually needed. Prop drilling beyond 2 levels is a structural problem, not a styling one.

---

## Section 3 — Firebase-Specific Rules

### Q13 — Firestore Listeners Are Always Cleaned Up

Every `onSnapshot` listener must be unsubscribed in the cleanup function of its `useEffect`.

```js
useEffect(() => {
  const unsub = onSnapshot(query, (snap) => { /* handle */ });
  return () => unsub(); // REQUIRED — cleanup on unmount
}, []);
```

A listener without cleanup is a memory leak and a source of state updates on unmounted components.

---

### Q14 — Firestore Queries Are Always Bounded

Never query a Firestore collection without a limit unless the collection is guaranteed to be small (< 50 documents) and that guarantee is documented.

```js
// BANNED — unbounded read
const q = query(collection(db, 'projects'));

// REQUIRED — bounded
const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(20));
```

An unbounded query on a growing collection is a silent performance and cost bomb.

---

### Q15 — Cloud Functions Validate Input Before Any Operation

Every Cloud Function that receives user input must validate it before touching Firestore, Storage, or sending email.

Validation order:
1. Auth check (is the caller authenticated, if required?).
2. Input shape (are required fields present?).
3. Input type (are fields the correct type?).
4. Input content (are values within allowed bounds — length, format, range?).
5. Rate limit check.

Only after all five pass does the function proceed.

---

## Section 4 — Performance Rules

### Q16 — Heavy Imports Are Lazy-Loaded

Three.js and any other heavy library is never imported at the top level of a component that renders on initial load.

```js
// REQUIRED for Three.js
const ThreeCanvas = lazy(() => import('./ThreeCanvas'));
```

The public portfolio's FCP target is < 1.5s. Heavy synchronous imports kill it.

---

### Q17 — Images Have Explicit Dimensions

Every `<img>` tag or image component must have explicit `width` and `height` attributes or CSS dimensions defined. Images without dimensions cause layout shift (CLS), which tanks Lighthouse scores.

---

### Q18 — No Blocking Operations on the Main Thread

No synchronous operations that take > 16ms belong on the main thread. Heavy computation, large data transformation, and file parsing go into Web Workers or are moved server-side.

---

## The Quality Gate

Before marking any output as complete, verify:

```
[ ] Every async operation has error handling — no silent failures
[ ] No unhandled promise rejections
[ ] No hardcoded environment values
[ ] No console.log left in output
[ ] All names follow the naming convention
[ ] Components are single-responsibility
[ ] No direct Firestore calls in components
[ ] All useEffect dependencies are exhaustive
[ ] All list keys are stable and unique
[ ] Loading and error states handled
[ ] All Firestore listeners have cleanup
[ ] All Firestore queries are bounded
[ ] Cloud Functions validate before operating
[ ] Heavy imports are lazy-loaded
```

Output that fails any gate item is incomplete. Fix before delivering.

---

*Quality is not polish applied at the end. It is the default mode of every line written. A codebase where quality is enforced at the output level never accumulates the kind of debt that requires a rewrite.*

# ARCHITECTURE_GUARD.md
> Architecture decisions made carelessly compound. A wrong dependency added today becomes a migration next quarter.
> A new Firestore collection without a schema becomes a data integrity problem at scale.
> This file defines what AI can decide alone, what requires flagging, and what is a full stop.

---

## The Decision Authority Model

Not all decisions are equal. This file classifies every category of architectural decision by who has authority to make it:

| Authority | Meaning |
|---|---|
| **AI — proceed** | AI can make this decision and implement without asking |
| **AI — flag + proceed** | AI makes the decision, states it explicitly, continues unless developer objects |
| **AI — flag + wait** | AI proposes the decision, waits for explicit approval before implementing |
| **Full stop** | AI does not implement this under any circumstances without developer-initiated discussion |

---

## Section 1 — Dependency Management

### A1 — New Dependency Policy

| Situation | Authority |
|---|---|
| Using an existing dependency already in package.json | AI — proceed |
| Suggesting a new dependency in a recommendation | AI — flag + wait |
| Adding a new dependency to package.json | Full stop |

Before any new dependency is even suggested, AI must answer:
```
DEPENDENCY PROPOSAL
───────────────────
Package      : [name + version]
Purpose      : [exactly what it does that existing packages cannot]
Alternatives : [what existing tools in the stack were considered and why they fall short]
Bundle impact: [approximate size — check bundlephobia if unknown]
Maintenance  : [weekly downloads, last publish date, open issues signal]
───────────────────
Awaiting approval before adding.
```

Zero new dependencies without this block and explicit developer approval.

---

### A2 — Dependency Version Pinning

Do not upgrade existing dependencies without being asked. Do not suggest "while you're at it, update X to the latest version." Version upgrades are a separate, deliberate task.

If a bug is caused by a dependency version — flag the version issue, propose the upgrade as a separate action, wait for approval.

---

## Section 2 — Firestore Architecture

### A3 — New Collection Policy

Creating a new Firestore collection without an approved schema is a full stop.

Before any new collection is created, a schema must be approved:

```
NEW COLLECTION PROPOSAL
───────────────────────
Collection   : [name]
Purpose      : [what data this stores and why it can't go in an existing collection]
Schema       :
  id         : string (auto-generated)
  [field]    : [type] — [purpose]
  [field]    : [type] — [purpose]
  createdAt  : timestamp
  updatedAt  : timestamp
Subcollections: [none / name + purpose]
Access pattern: [who reads this, who writes this, query patterns]
Security rule : [public read / auth-only read / auth-only write / etc]
───────────────────────
Awaiting approval before creating.
```

---

### A4 — Schema Modifications

Adding or removing a field from an existing Firestore document schema is a flag + wait decision.

State:
- What field is being added or removed.
- What existing documents will look like after the change (migration plan if needed).
- Whether any existing queries or security rules are affected.

Do not add fields silently. Firestore is schemaless but this project is not — the schema is the contract.

---

### A5 — Security Rules Are Full Stop

Firestore security rules and Firebase Storage rules are never modified without explicit developer instruction and review.

Security rules are not "just config." A wrong security rule can expose all user data or break the entire application. No creative interpretation. No "this seems safer." No rule changes without the developer reading and approving the exact rule text.

If a task requires a security rule change — flag it, write the proposed rule, explain exactly what it permits and denies, wait for approval.

---

## Section 3 — Cloud Functions

### A6 — New Cloud Function Policy

New Cloud Functions require flag + wait approval before implementation.

Proposal format:
```
NEW FUNCTION PROPOSAL
─────────────────────
Name      : [function name]
Trigger   : [HTTPS callable / Firestore trigger / Auth trigger / Scheduled]
Purpose   : [what this function does]
Input     : [what data it receives]
Output    : [what it returns or writes]
Auth      : [who can call this — authenticated / unauthenticated / admin only]
Side effects: [what external systems it touches — email, Storage, RTDB, etc]
─────────────────────
Awaiting approval before implementing.
```

---

### A7 — Function Trigger Modification Is Full Stop

Modifying the trigger of an existing Cloud Function (changing what event fires it) is a full stop. Trigger changes can cause functions to fire unexpectedly, stop firing, or fire in loops. This requires deliberate developer decision.

---

## Section 4 — Frontend Architecture

### A8 — New Route Policy

Adding a new route to the React Router configuration requires flag + wait.

State:
- The route path.
- Whether it is public or protected (auth-required).
- What component it renders.
- Whether it is linked from anywhere in the public site or admin panel.

New routes that are unlisted (not linked from anywhere) must be explicitly noted as such — unlisted routes are a security and discoverability decision.

---

### A9 — Global State Changes Are Flag + Wait

Changes to global state (React Context providers, any state management solution added in future) require flag + wait.

Changes to local component state — AI proceeds.

Changes to what data is available globally, how auth state is propagated, or what the root-level providers expose — flag + wait.

---

### A10 — New Custom Hook That Wraps Firebase Is Flag + Proceed

Creating a new custom hook that directly interacts with Firestore, RTDB, or Firebase Auth requires flagging before implementation:

```
NEW HOOK: [hook name]
Purpose  : [what it abstracts]
Firestore: [collection / document path it reads or writes]
Real-time: [uses onSnapshot Y/N — if yes, listener cleanup handled Y/N]
```

State the flag. Proceed unless developer objects within the same exchange.

---

## Section 5 — What AI Can Decide Alone

To be explicit about what does NOT require approval:

- Component structure within an approved feature scope.
- Tailwind class choices for styling.
- useState / useReducer for local component state.
- Extract a function from a component to improve readability (same file).
- Split a component file into smaller components within the same feature.
- Choose between two equivalent implementation patterns within the existing stack.
- Add a SIDE NOTE about a code smell without fixing it.
- Choose variable and function names within the naming convention.

These are implementation details. AI has full authority here — no flag needed.

---

## The Architecture Decision Log

For every flag + wait decision that gets approved — it becomes a locked architectural decision. It is referenced in subsequent work as: `Per architecture decision: [one-line summary].`

Locked decisions are not re-opened, re-debated, or replaced with a better idea AI thought of later. To change a locked decision — the developer must explicitly reopen it.

---

*Architecture is the set of decisions that are hardest to change later. Protecting those decisions from being made carelessly — by AI or by habit — is what keeps the project malleable as it grows.*

# GIT_DISCIPLINE.md
> Git history is not a backup system. It is a communication tool — a log of why the codebase is the way it is.
> A clean history makes debugging faster, rollbacks safer, and code reviews possible.
> This file defines how AI thinks about and describes changes in terms of commits.

---

## Rule G1 — Every Output Maps to Exactly One Commit

Every task AI completes should map to one atomic, self-contained commit. A commit is atomic when:
- It does one logical thing.
- The codebase works correctly before and after the commit.
- Rolling back the commit fully undoes the change with no orphaned side effects.

If a task AI is given would produce a commit that does two logical things — split it. Flag the split before implementing:

```
COMMIT SPLIT REQUIRED:
This task involves two independent changes:
  Commit 1: [logical unit A — files affected]
  Commit 2: [logical unit B — files affected]
Implementing in order. Say "next" between commits.
```

---

## Rule G2 — Commit Message Format

Every commit message AI proposes must follow this format:

```
<type>(<scope>): <what changed, present tense, max 60 chars>

[optional body — only if the why is not obvious from the title]
[max 3 lines, plain English, no bullet points]

[optional footer — only for breaking changes or issue references]
BREAKING CHANGE: [what breaks and what to do]
```

**Types:**
| Type | When to use |
|---|---|
| `feat` | New feature or capability added |
| `fix` | Bug fix |
| `refactor` | Code restructured, behaviour unchanged |
| `style` | Tailwind / CSS changes only, no logic change |
| `perf` | Performance improvement |
| `security` | Security fix or rule change |
| `config` | Firebase config, environment, build config |
| `content` | Firestore seed data, static content update |
| `test` | Tests added or changed |
| `docs` | Documentation only |
| `chore` | Dependency updates, CI changes, tooling |

**Scope** is the feature area or file group: `hero`, `admin-cms`, `projects`, `testimonials`, `cloud-functions`, `firestore-rules`, `auth`, `monitoring`, `time-machine`, `pwa`

**Examples of correct commit messages:**
```
feat(projects): add tech stack tag filtering to project grid
fix(auth): redirect unauthenticated admin users to login page
refactor(testimonials): extract approval logic into useTestimonialQueue hook
security(firestore-rules): restrict testimonial writes to unauthenticated users only
perf(hero): lazy-load Three.js canvas to reduce initial bundle
config(cloud-functions): add SMTP credentials to function environment
```

**Examples of banned commit messages:**
```
fix stuff
update
working now
changes
WIP
fixed the bug
```

---

## Rule G3 — Never Mix Refactoring With Features

A commit that adds a feature AND refactors surrounding code is two commits. They must be separated.

Why this matters: if the feature introduces a bug, rolling back the commit also rolls back the refactor. Now you have to redo the refactor. Clean separation means clean rollbacks.

When AI is implementing a feature and notices a refactor opportunity in the same area:
- Complete the feature commit first.
- Flag the refactor as a SIDE NOTE.
- If asked to do the refactor — it is a separate commit.

---

## Rule G4 — Never Mix Bug Fixes With Unrelated Changes

A bug fix commit contains exactly the fix and nothing else. No "cleaned up the file while I was in there." No "also improved the error message on a different function."

The fix commit must be surgically precise so that:
- It can be cherry-picked to another branch if needed.
- It can be reverted cleanly without touching anything else.
- The code review is focused on exactly what changed.

---

## Rule G5 — Breaking Changes Are Always Flagged

A breaking change is any change that:
- Changes a Firestore document schema that existing data doesn't match.
- Changes a Cloud Function's input/output contract.
- Changes a Firebase Storage path that existing URLs point to.
- Removes or renames a React prop that other components depend on.
- Changes environment variable names.

When AI is about to implement something that is a breaking change — full stop:

```
━━━ BREAKING CHANGE ━━━━━━━━━━━━━━━━━━━━━━━━━
What breaks    : [specific — existing data, existing callers, existing URLs]
Migration needed: [yes/no — if yes, what does the migration look like]
Rollback impact: [can this be rolled back cleanly? if not, why]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Awaiting explicit approval before implementing.
```

---

## Rule G6 — WIP Commits Are Not Output

AI never produces output framed as "work in progress" unless the developer explicitly asks for a WIP checkpoint. Every output should be committable as-is — complete, correct, not broken.

If a task is too large to complete in one session — use the PHASE PLAN from TOKEN_EFFICIENCY.md. Each completed phase is committable. Partial phases are not output.

---

## Rule G7 — .gitignore Awareness

The following are never included in any output intended for commit:

- `.env` files of any kind.
- `node_modules/`.
- Firebase emulator data directories.
- Build output (`dist/`, `.firebase/`).
- OS files (`.DS_Store`, `Thumbs.db`).
- IDE config files unless the project explicitly commits them.

If AI creates a new file that belongs in `.gitignore` — flag it:
```
GITIGNORE: [filename] should be added to .gitignore — [reason]
```

---

## Rule G8 — Commit Granularity for This Project

Calibrated to this project's feature areas, the right commit granularity is:

| Too small (combine) | Right size | Too large (split) |
|---|---|---|
| Fix a typo in a variable name | Add a complete new section to the public portfolio | Add the entire admin panel in one commit |
| Add one Tailwind class | Implement a complete Cloud Function with validation | Implement the full Time Machine feature in one commit |
| Fix one ESLint warning | Add a new Firestore custom hook | Refactor all components + add a feature |

When in doubt — smaller commits are safer. A 10-line commit is always easier to review and roll back than a 200-line one.

---

## Commit Message Generator

When a task is complete, AI proposes a commit message in this format:

```
COMMIT:
  git commit -m "<type>(<scope>): <title>"

  [body if needed]
```

The developer copies, modifies if needed, commits. AI does not run git commands — it proposes them.

---

*Git history written with discipline is worth more than any comment in the code. It is the only record of why decisions were made, when bugs were introduced, and what was working before a change. Treat every commit message as a message to the developer six months from now who is trying to understand what happened.*

# FIRESTORE_RULES.md
> Firestore is the backbone of this project's real-time CMS, testimonial system, snapshot vault, and visitor tracking.
> Misused, it is a silent cost bomb and a data integrity risk. Used correctly, it is invisible infrastructure.
> This file defines every Firestore pattern, constraint, and rule specific to this project.

---

## Project Firestore Architecture

### Collections

| Collection | Purpose | Access |
|---|---|---|
| `projects` | Portfolio project cards (public) | Public read, admin write |
| `testimonials` | All testimonial submissions | Admin read/write, public read (approved only) |
| `content` | CMS content: bio, hero, skills, experience | Public read, admin write |
| `snapshots` | Time Machine content backups | Admin read/write only |
| `visitors` | Cumulative visitor count + session tracking | Public write (increment only), admin read |
| `settings` | Global settings: openToWork toggle, resume URL | Public read, admin write |

> ⚠️ OQ-1 and OQ-2 from PRD are unresolved. Do not create additional collections for monitoring data until OQ-1 is resolved. Do not add Storage metadata to `snapshots` until OQ-2 is resolved.

---

## Rule F1 — Always Use the Modular SDK

Every Firestore import must use the Firebase v9+ modular pattern. The legacy namespaced SDK is banned.

```js
// REQUIRED — modular
import { collection, doc, getDoc, setDoc, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/firebase/config';

// BANNED — legacy namespaced
import firebase from 'firebase/app';
firebase.firestore().collection('projects').get();
```

---

## Rule F2 — Every Query Must Be Bounded

No collection query executes without a `limit()` clause unless the collection is architecturally guaranteed to stay small.

Collections guaranteed small (no limit required): `settings` (1 document), `content` (bounded by sections).

All other collections — always limit:

```js
// BANNED
const q = query(collection(db, 'projects'));

// REQUIRED
const q = query(
  collection(db, 'projects'),
  orderBy('createdAt', 'desc'),
  limit(50)
);
```

---

## Rule F3 — Real-Time Listeners Have Mandatory Cleanup

Every `onSnapshot` listener must return its unsubscribe function from the `useEffect` that created it.

```js
// REQUIRED pattern for every real-time listener
useEffect(() => {
  const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(50));
  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(data);
  }, (error) => {
    console.error('[useProjects] listener error:', error);
    setError(error);
  });

  return () => unsub(); // MANDATORY cleanup
}, []);
```

A listener without cleanup is a memory leak. It also causes state updates on unmounted components, producing React warnings and potential crashes.

---

## Rule F4 — Document Reads vs Collection Reads

Use the right read type for the right situation:

| Situation | Use | Never use |
|---|---|---|
| Fetching a single known document | `getDoc(doc(db, collection, id))` | `getDocs(query(..., where('id', '==', id)))` |
| Fetching a list with filters | `getDocs(query(...))` | Full collection read + client filter |
| Watching a single document for changes | `onSnapshot(doc(db, collection, id), ...)` | Polling with setInterval |
| Watching a list for changes | `onSnapshot(query(...), ...)` | Multiple individual document listeners |

Never filter client-side what can be filtered server-side. Firestore charges per document read — fetching 100 documents to display 5 that match a condition costs 100 reads.

---

## Rule F5 — Atomic Writes for Related Data

When writing to multiple documents that must be consistent with each other — use a batch write or transaction. Never fire multiple independent `setDoc`/`updateDoc` calls for data that must be atomically consistent.

```js
// BANNED — two independent writes that can partially fail
await setDoc(doc(db, 'settings', 'global'), { openToWork: true });
await setDoc(doc(db, 'content', 'hero'), { badgeVisible: true });

// REQUIRED — atomic batch
const batch = writeBatch(db);
batch.set(doc(db, 'settings', 'global'), { openToWork: true });
batch.set(doc(db, 'content', 'hero'), { badgeVisible: true });
await batch.commit();
```

The Time Machine restore operation in particular must use a batch or transaction — partial restores are worse than no restore.

---

## Rule F6 — Timestamps Are Always Server Timestamps

Document `createdAt` and `updatedAt` fields always use Firestore server timestamps — never `new Date()` or `Date.now()`.

```js
// BANNED
await setDoc(docRef, { createdAt: new Date() });

// REQUIRED
import { serverTimestamp } from 'firebase/firestore';
await setDoc(docRef, { createdAt: serverTimestamp() });
```

Client clocks are unreliable and inconsistent. Server timestamps are authoritative.

---

## Rule F7 — Security Rules Are Explicit, Never Permissive

Firestore security rules for this project follow the principle of least privilege:

```
// Default: deny everything
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false; // deny all by default
    }
  }
}
```

Every allowed access is explicitly carved out. "Allow if authenticated" is too broad for most collections — rules must specify what authenticated users can do and to which documents.

Specific rules per collection:

```
// projects — public read, admin write only
match /projects/{projectId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.uid == [ADMIN_UID];
}

// testimonials — submit (create) for anyone, read/update/delete for admin only
match /testimonials/{testimonialId} {
  allow create: if request.resource.data.keys().hasAll(['name', 'relationship', 'message', 'consent'])
                && request.resource.data.consent == true
                && request.resource.data.message.size() <= 300;
  allow read, update, delete: if request.auth != null && request.auth.uid == [ADMIN_UID];
}

// content — public read, admin write
match /content/{sectionId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.uid == [ADMIN_UID];
}

// snapshots — admin only, no public access
match /snapshots/{snapshotId} {
  allow read, write: if request.auth != null && request.auth.uid == [ADMIN_UID];
}

// settings — public read, admin write
match /settings/{settingId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.uid == [ADMIN_UID];
}

// visitors — increment-only write for public, read for admin
match /visitors/{visitorId} {
  allow read: if request.auth != null && request.auth.uid == [ADMIN_UID];
  allow create: if true;
  allow update: if request.resource.data.count == resource.data.count + 1; // increment only
}
```

> Note: `[ADMIN_UID]` must be set as a Firestore environment variable or in a config document — never hardcoded in rules.

---

## Rule F8 — Time Machine Snapshot Schema

The `snapshots` collection stores complete Firestore content state. Each snapshot document:

```
snapshots/{snapshotId}
  id          : string (auto)
  name        : string (developer-provided label, e.g. "Pre-Update Backup")
  createdAt   : timestamp (server)
  contentData : map {
    hero      : map (full hero content document)
    about     : map (full about content document)
    experience: array (full experience timeline)
    skills    : array (full skills list)
    settings  : map (full settings document)
  }
  projectsData: array (snapshot of all project documents at time of snapshot)
  status      : "complete" | "restoring"
```

> OQ-2: Whether `testimonialsData` and Storage file references are included is unresolved. Do not add these fields until OQ-2 is answered.

Restore operation:
1. Set snapshot `status` to `"restoring"` (signals the admin UI to show a restore-in-progress state).
2. Execute a batch write of all `contentData` fields back to their respective documents.
3. Execute a batch write of all `projectsData` back to the `projects` collection (delete + recreate or merge).
4. Set snapshot `status` back to `"complete"`.
5. The real-time listeners on the public site pick up the batch write and reflect the restored state within 1 second.

---

## Rule F9 — Visitor Tracking Pattern

Live visitor count uses Firebase Realtime Database (RTDB) — not Firestore. Firestore is not designed for high-frequency presence updates. Do not implement presence in Firestore.

Cumulative visitor count is stored in Firestore `visitors` collection — updated via Cloud Function on each new session, not directly from the client.

```
// BANNED — client directly writing visitor count to Firestore
await updateDoc(doc(db, 'visitors', 'total'), { count: increment(1) });

// REQUIRED — Cloud Function handles the increment after RTDB presence event
// Client only writes to RTDB presence path
```

---

## Rule F10 — Offline Persistence

Firestore offline persistence is enabled for the admin panel only — not the public portfolio.

```js
// Admin app initialisation only
import { enableIndexedDbPersistence } from 'firebase/firestore';
enableIndexedDbPersistence(db).catch(err => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open — persistence available in one tab only
  } else if (err.code === 'unimplemented') {
    // Browser doesn't support persistence
  }
});
```

The public portfolio is stateless and does not need offline persistence — enabling it would waste IndexedDB storage on visitors.

---

## Firestore Read Cost Awareness

Every query costs reads. Keep this reference:

| Operation | Cost |
|---|---|
| `getDoc` (single document) | 1 read |
| `getDocs` (collection query) | 1 read per document returned |
| `onSnapshot` initial load | 1 read per document in result |
| `onSnapshot` on change | 1 read per changed document |
| Document not found | 1 read (the miss still costs) |

Design queries to return only what is rendered. A project detail modal that fetches all project data upfront wastes reads on projects the user never opens. Fetch the detail on click.

---

*Firestore's power is real-time, schemaless, and globally distributed. Its cost is proportional to reads and writes. Every pattern in this file is chosen to use that power without paying for it carelessly.*