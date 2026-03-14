# Upgraded Protocols — Engineering Standards

---

## Rule 1 — Deep-Dive Context Analysis (Know Before You Touch)

### Purpose
Before any solution is defined or any code is written, the agent must build a verified understanding of the codebase relevant to the task. This rule exists to prevent solving the wrong problem, reinventing existing solutions, and making changes that break things that weren't visible at the start.

---

### Entry Condition — When This Rule Triggers
This rule triggers **every time a non-trivial task begins**. A non-trivial task is anything that involves writing, modifying, or deleting code or configuration. It does NOT trigger for:
- Read-only questions ("what does this function do?")
- Explanation requests with no planned code change
- Tasks explicitly scoped to a single known line or variable by the user

If in doubt, treat the task as non-trivial and run the analysis.

---

### Step 1 — Classify the Task Before Scanning

Before opening a single file, classify the task into one of three tiers. The tier determines how deep the analysis goes.

| Tier | Task Type | Examples |
|---|---|---|
| **Tier 1 — Targeted** | Small, well-scoped change in a known area | Fix a specific bug, update a config value, adjust a single component |
| **Tier 2 — Feature** | New functionality added to the existing system | Add a new API endpoint, build a new UI section, integrate a third-party service |
| **Tier 3 — Architectural** | Changes that affect how the system is structured | Refactor a core module, change the data model, replace a library, add a new layer |

Do not proceed until the tier is decided. The tier gates everything that follows.

---

### Step 2 — Scan the Codebase (Depth Depends on Tier)

#### For ALL tiers — always do this first:
- Read the root directory structure to understand how the project is organised.
- Check for and read any of the following if they exist: `README.md`, `SPEC.md`, `architecture.md`, `Project_specification.md`, `.env.example`, `package.json` / `pubspec.yaml` / equivalent dependency manifest.
- Check hidden config files: `.eslintrc`, `.babelrc`, `tsconfig.json`, `vite.config.js`, `next.config.js`, `firebase.json`, or any `.` prefixed config file in the root. Note what each one controls — do not just find them and move on.
- Check if the task area already has an existing implementation somewhere in the codebase. Search for it explicitly before assuming it needs to be built from scratch.

#### Tier 1 — additionally:
- Read only the files directly involved in the reported problem area.
- Trace one level of dependencies — what does this file import, and what imports it?

#### Tier 2 — additionally:
- Map the full module or feature area being touched — all files in that folder/domain.
- Trace how data flows into and out of this area (inputs, outputs, side effects).
- Check for any existing partial implementation of the feature — incomplete work, commented-out code, or TODO markers.

#### Tier 3 — additionally:
- Map the full dependency graph of the area being changed — every file that imports from or is imported by the modules being refactored.
- Identify every consumer of the system being changed — components, services, functions, tests that will be affected.
- Check for shared state, global context, or environment-level configuration that the change might affect.

---

### Step 3 — Verify the Spec Against Reality

If a specification file exists (`Project_specification.md`, `README.md`, `SPEC.md`, or equivalent):
- Do not treat it as ground truth.
- Actively compare what the spec describes against what the code actually does.
- Note every gap, contradiction, or divergence found.
- If the spec is significantly outdated or contradicts the code, flag this to the user before proceeding. Do not silently ignore the mismatch.

If no specification file exists:
- Note its absence explicitly.
- Use the existing codebase itself as the source of truth.
- Derive the intended architecture from the patterns, naming conventions, and structure already present.

---

### Step 4 — Record the Findings (Required Output)

The analysis is not complete until its findings are written down. This prevents the knowledge from evaporating when execution begins.

Write a short **Context Summary** before moving to planning. It must cover:

```
## Context Summary — [Task Name]

**Tier:** [1 / 2 / 3]

**What already exists relevant to this task:**
- [finding]

**Dependencies and affected areas:**
- [file or module] → [what it does and how it relates to this task]

**Spec vs Reality gaps found:**
- [gap or "None found"]

**Hidden config files relevant to this task:**
- [file] → [what it controls]

**Existing partial implementations found:**
- [finding or "None found"]

**Key constraints or risks identified:**
- [constraint or risk]
```

This summary is written into `task.md` before the plan is written. It is the foundation the plan is built on.

---

### Step 5 — Loop Back if the Analysis Changes the Approach

If the analysis reveals that the originally proposed solution is wrong, insufficient, or already partially exists, **stop and surface this to the user before planning**. Do not silently adjust the approach and proceed. The point of this rule is to catch misalignment early — that only works if the findings are communicated.

Say explicitly: *"The analysis found [X]. This changes the approach because [Y]. Here is what I recommend instead: [Z]. Confirm before I proceed."*

---

### What Counts as Done

This rule is complete when:
- [ ] Task tier is classified
- [ ] Codebase scan at the appropriate depth is finished
- [ ] Spec verified against reality (or absence noted)
- [ ] Existing implementations checked for
- [ ] Hidden config files read and noted
- [ ] Context Summary written into `task.md`
- [ ] Any approach-changing findings surfaced to the user and confirmed

Do not begin planning until all boxes are checked.

---

### Blind Spots This Rule Explicitly Guards Against

- Scanning files without writing down what was found — memory evaporates on the next step.
- Treating the spec as accurate without checking it against the code.
- Using `grep` alone as the analysis — it finds text, not architecture or data flow.
- Applying the same scan depth to a one-line fix and a full refactor.
- Skipping the check for existing implementations and building something that already exists.
- Finding hidden config files but not reading what they actually control.
- Proceeding after analysis reveals the approach is wrong without telling the user.
- Triggering a full forensic scan for a read-only question or a trivial single-line fix.

---

## Rule 2 — Structured Atomic Planning (The Blueprint Before the Build)

### Purpose
Before any code is written, a complete, ordered, and verifiable plan must exist in writing. This rule ensures that execution is never improvised — every action is deliberate, sequenced, and traceable back to a specific requirement. A plan that is vague, unordered, or disconnected from the codebase analysis is not a plan — it is a guess.

---

### Entry Condition — When This Rule Triggers
This rule triggers immediately after Rule 1's Context Summary is written. The plan is built on top of the Context Summary — never independently of it. If Rule 1 has not been completed, Rule 2 cannot begin.

---

### Step 1 — Locate or Create the Task File

Every task has exactly one `task.md` file. Its location and naming follow this convention:

```
tasks/
  active/
    {feature-or-task-name}.md    ← current active plan
  archive/
    {feature-or-task-name}.md    ← completed plans moved here
```

- If a `tasks/` folder does not exist, create it at the project root.
- One file per feature or task. Two concurrent features = two separate files.
- Do not reuse or overwrite an existing task file for a new task — create a new one and archive the old.

---

### Step 2 — Write the Task File in the Defined Format

Every `task.md` must follow this exact structure:

```markdown
# Task: [Task Name]
**Created:** [Date]
**Tier:** [1 / 2 / 3 — from Rule 1 classification]
**Status:** In Planning

---

## Context Summary Reference
[Copy the Context Summary from Rule 1 here, or link to it]

---

## Scope Boundary
What is explicitly IN scope for this task:
- [item]

What is explicitly OUT of scope (do not touch):
- [item]

---

## Plan

### [Parent Task 1 — e.g. "Set up Firebase Auth"]
- [ ] **[T1.1]** [Atomic task] — *Definition of done: [specific, observable outcome]*
  - Estimated effort: [S / M / L]
  - Depends on: [T1.0 or "none"]
  - External blocker: [yes/no — if yes, describe what is needed]
- [ ] **[T1.2]** [Atomic task] — *Definition of done: [specific, observable outcome]*
  - Estimated effort: [S / M / L]
  - Depends on: [T1.1]
  - External blocker: [none]

### [Parent Task 2]
- [ ] **[T2.1]** ...

---

## Rollback Plan
If execution fails or is abandoned midway:
- [What to undo or revert]
- [Which files to restore]
- [How to return the codebase to a clean state]

---

## Risk Flags (for user review)
High-impact or high-risk tasks that the user should scrutinise before approving:
- [T1.2] — [why it is high risk]

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
```

---

### Step 3 — Apply the Atomicity Test to Every Task

Before finalising the plan, apply this test to each task item. If any answer is "no," break the task down further.

| Test | Question |
|---|---|
| **Single action** | Can this be done in one focused action without switching context? |
| **Clear owner** | Is it obvious exactly which file, function, or config this applies to? |
| **Observable outcome** | Can you look at the result and immediately know if it worked or not? |
| **No hidden dependencies** | Does completing this task require something else to be true first that isn't listed? |
| **Size-bounded** | Is the effort S (< 30 min), M (30 min – 2 hrs), or L (2–4 hrs)? If larger than L, split it. |

A task that fails any of these tests is not atomic. Rewrite it until it passes all five.

---

### Step 4 — Sequence Tasks by Dependency

After all tasks are written, order them so that:
- Tasks with no dependencies come first.
- Tasks that depend on other tasks are placed after those dependencies.
- Tasks with external blockers are placed at the end with a clear `BLOCKED` label and a description of what is needed to unblock them.

Never place a blocked task in the middle of the plan — it will halt execution without warning.

---

### Step 5 — Scope Check Before Finalising

Read the completed plan and ask: *"Does any task here go beyond what was asked for?"*

Flag any task that:
- Touches files or systems not mentioned in the original request.
- Introduces new patterns or abstractions not present in the codebase.
- Adds features or improvements that weren't requested.

These are scope creep. Either remove them or explicitly call them out in the Scope Boundary section and get user confirmation before including them.

---

### Step 6 — Plan Change Protocol (Mid-Execution)

If during execution a task reveals that subsequent tasks in the plan are wrong or need to change:
- Stop execution immediately at the end of the current task.
- Update the affected tasks in `task.md` with the new information.
- Mark the status as `⚠️ Plan Revised — Pending Re-approval`.
- Surface the change to the user before continuing: *"Task [X] revealed [finding]. Tasks [Y] and [Z] need to change. Here is the updated plan. Confirm before I continue."*

Never silently update the plan and keep executing. The user approved a specific plan — any deviation requires explicit re-approval.

---

### Step 7 — Archival on Completion

When all tasks are marked done and the feature is verified working:
- Move the task file from `tasks/active/` to `tasks/archive/`.
- Update the Status Log with completion date and any final notes.
- Do not delete task files — they are a historical record of how decisions were made.

---

### What Counts as Done

This rule is complete when:
- [ ] Task file created in `tasks/active/` with the correct name
- [ ] Context Summary from Rule 1 referenced at the top
- [ ] Scope boundary defined — both in and out of scope
- [ ] Every task passes the atomicity test
- [ ] Tasks are sequenced by dependency
- [ ] Blocked tasks identified and placed at the end with `BLOCKED` label
- [ ] Rollback plan written
- [ ] Risk flags identified for user review
- [ ] Scope check completed — no unconfirmed scope creep
- [ ] Status set to "Pending User Approval" — do not begin execution until approved

---

### Blind Spots This Rule Explicitly Guards Against

- Writing a plan without first reading the Context Summary from Rule 1 — the plan becomes disconnected from reality.
- Tasks that sound atomic but hide multiple actions inside them.
- No sequencing — tasks done in the wrong order break each other.
- External blockers buried in the middle of the plan — they halt execution without warning.
- No rollback plan — a failed mid-execution task leaves the codebase in an unknown state.
- Scope creep silently embedded in the plan — work that was never asked for.
- Plan treated as immutable — mid-execution discoveries that invalidate tasks are ignored and execution continues on a broken foundation.
- Completed task files deleted — historical record of decisions is lost.
- Two features sharing one task file — progress tracking becomes impossible.
- No size estimate per task — the user cannot gauge total effort or push back on scope before approving.

---
## Rule 3 — Strict Plan Verification (The Approval Gate)

### Purpose
No execution begins until the plan has been explicitly reviewed and approved by the authorised approver. This rule is not a formality — it is the last checkpoint between intention and action. A plan that is approved without genuine understanding is not approved at all. This gate exists to catch wrong assumptions, hidden risks, scope creep, and architectural misalignments before they become code that has to be undone.

---

### Entry Condition — When This Rule Triggers
This rule triggers immediately after Rule 2 is complete and the task file status is set to "Pending User Approval." It also triggers any time the plan is revised mid-execution under Rule 2's Plan Change Protocol. Every version of the plan that will be executed must pass through this gate — not just the first one.

---

### Step 1 — Define the Approver

Before requesting approval, confirm who the approver is:
- **Solo project:** The project owner is always the approver. No exceptions.
- **Team project:** The approver must be explicitly named in `task.md` — the person who has authority over the feature area being changed. Silence from a non-authorised team member does not count as approval.
- **If unclear:** Ask the user to confirm who should approve before sending the request.

Approval from the wrong person is not approval. Execution must not begin based on it.

---

### Step 2 — Prepare the Approval Request

Do not simply ask "does this look good?" The approval request must be a structured summary that gives the approver everything they need to make an informed decision without having to read `task.md` in full.

The approval request must contain exactly these sections, presented in plain language:

```
## Plan Approval Request — [Task Name]

**What this plan does (plain language summary):**
[2–4 sentences describing what will be built, changed, or fixed and why]

**Scope — what will be touched:**
[List of files, modules, or systems that will be modified]

**Scope — what will NOT be touched:**
[Explicit list of things that are out of scope]

**Task count and estimated total effort:**
[e.g. "12 tasks — estimated 4–6 hours total"]

**High-risk tasks requiring your specific attention:**
[List each risk flag from task.md with a one-line explanation of why it is risky]
- [T1.2] — Deletes existing Firestore collection. Irreversible without rollback.
- [T2.4] — Changes Firebase Auth configuration. Could lock out all users if wrong.

**Blocked tasks (cannot proceed without input):**
[List any tasks marked BLOCKED and what is needed to unblock them]

**Rollback plan summary:**
[One sentence — what happens if execution fails midway]

**To approve:** Reply with "Approved" or list the specific tasks you want changed.
**To reject:** Reply with what needs to change before you will approve.
**To partially approve:** Reply with "Approve all except [task IDs]" and describe the required changes.
```

---

### Step 3 — Handle the Response

#### If the user replies "Approved" or equivalent:
- Record the approval in the task file Status Log with timestamp:
  ```
  | User Approval | ✅ Approved | [Date + Time] — Full plan approved |
  ```
- Lock the approved plan by noting the current version: *"Plan v1 approved [timestamp]. Any changes from this point require re-approval."*
- Proceed to execution (Rule 5).

#### If the user requests changes to specific tasks:
- Revise only the tasks the user flagged — do not change anything else.
- Re-present the full approval request with the revised tasks clearly marked: *"[REVISED]"*.
- Do not begin execution until the revised plan is explicitly approved.
- Record in the Status Log:
  ```
  | User Approval | ⚠️ Revision Requested | [Date] — Tasks [X, Y] revised |
  | User Approval | ✅ Approved | [Date] — Revised plan approved |
  ```

#### If the user rejects the plan entirely:
- Return to Rule 1 if the rejection reveals a fundamental misunderstanding of the codebase or requirements.
- Return to Rule 2 if the rejection is about task structure, scope, or sequencing.
- Do not begin execution under any circumstances.
- Record in the Status Log:
  ```
  | User Approval | ❌ Rejected | [Date] — Reason: [user's stated reason] |
  ```

#### If the user does not respond:
- Do not proceed. Do not assume silence is approval.
- After a reasonable wait, send one follow-up: *"Waiting for your approval on [Task Name] before I begin. Let me know if you'd like any changes to the plan."*
- If there is still no response, hold execution and note in the Status Log:
  ```
  | User Approval | ⏸ Waiting | [Date] — No response. Execution on hold. |
  ```

---

### Step 4 — High-Risk Task Confirmation (Separate Gate)

Blanket plan approval does not cover high-risk tasks. Any task in the plan that is:
- **Irreversible** — deletes data, drops tables, removes files permanently
- **Auth-touching** — changes authentication configuration, roles, or permissions
- **Schema-changing** — modifies the database structure in a way that affects existing data
- **Environment-level** — changes `.env`, CI/CD config, hosting config, or deployment settings

...must receive a **separate explicit confirmation** immediately before that specific task is executed, even if the overall plan was already approved.

The confirmation prompt format:
```
⚠️ High-Risk Task — Explicit Confirmation Required

Task: [T2.4] — [Task description]
Risk: [Specific reason this is high risk]
Reversible: [Yes / No — if yes, how]
Rollback: [What will be done if this goes wrong]

Type "CONFIRM [T2.4]" to proceed with this specific task.
```

Execution of the high-risk task does not begin until the user types the exact confirmation string.

---

### Step 5 — Re-Approval After Mid-Plan Changes

If Rule 2's Plan Change Protocol was triggered during execution and the plan was revised:
- The revised plan goes through Steps 2 and 3 of this rule again in full.
- The approval request must clearly highlight what changed from the previously approved plan:
  ```
  **Changes from previously approved plan:**
  - [T3.1] revised: [old description] → [new description]
  - [T3.2] removed: [reason]
  - [T3.5] added: [description and reason]
  ```
- The previously approved tasks that are unchanged do not need to be re-approved — only the delta.
- Record re-approval separately in the Status Log.

---

### What Counts as Done

This rule is complete when:
- [ ] Approver confirmed and named
- [ ] Approval request prepared in the defined format
- [ ] Plain language summary written — no technical jargon that obscures understanding
- [ ] High-risk tasks called out explicitly in the request
- [ ] Blocked tasks listed with unblock requirements
- [ ] User response received and handled per the response protocol
- [ ] Approval recorded in task file Status Log with timestamp
- [ ] High-risk tasks have individual confirmation prompts ready for execution time
- [ ] Any plan revisions re-submitted and re-approved before execution continues

---

### Blind Spots This Rule Explicitly Guards Against

- Treating silence as approval — no response means no approval, period.
- Blanket approval covering high-risk irreversible tasks — these require their own gate at execution time.
- Approval request that is too technical — the user cannot approve what they cannot understand.
- Partial approval handled incorrectly — revising tasks the user didn't flag or not revising the ones they did.
- Re-approval skipped after mid-plan changes — the user approved a plan that no longer exists.
- Approval recorded without a timestamp — no way to know which version of the plan was approved.
- Wrong person approving in a team context — approval from someone without authority is not approval.
- Proceeding because "the user will probably approve this" — probability is not approval.

---
## Rule 4 — Zero-Ambiguity Contract (Clarity Before Commitment)

### Purpose
Every requirement that will drive code must be unambiguous before planning begins and before execution continues. This rule exists because the cost of a wrong assumption compounds — a misunderstood requirement caught before planning costs nothing, caught after planning costs hours, and caught after execution costs days. Asking the right question at the right time is not a sign of uncertainty — it is the most efficient engineering decision possible.

---

### Entry Condition — When This Rule Triggers
Rule 4 triggers at three points in the workflow:

1. **Before Rule 1 begins** — when the initial request is received and before any codebase analysis starts. Ambiguity about what is being asked must be resolved before the analysis is scoped.
2. **After Rule 1, before Rule 2** — when the Context Summary reveals that the codebase reality creates new ambiguity about the requirement (e.g. the requirement assumes something that doesn't exist yet).
3. **During execution (Rule 5)** — when implementation reveals an edge case or scenario the requirement didn't account for.

---

### Step 1 — Categorise the Ambiguity

Not all ambiguity is the same. Before asking anything, identify which category the ambiguity falls into. The category determines what kind of question to ask and how urgently it must be resolved.

| Category | Description | Example | Block execution? |
|---|---|---|---|
| **What** | Unclear about what needs to be built or changed | "Fix the user flow" — which user flow? | ✅ Yes — must resolve before planning |
| **Scope** | Unclear about how much or how far the change goes | "Clean up the codebase" — which files? how deep? | ✅ Yes — must resolve before planning |
| **Success** | Unclear about what "done" looks like | "Make it faster" — by how much? measured how? | ✅ Yes — must resolve before planning |
| **Priority** | Unclear about order when multiple items are involved | "Fix these bugs" — in what order? all of them? | ✅ Yes — must resolve before planning |
| **Ownership** | Unclear about which specific data, user, or system is meant | "Update user data" — which users? which fields? | ✅ Yes — must resolve before planning |
| **How** | Unclear about the implementation approach | "Use a better pattern here" — which pattern? | ⚠️ Resolve before the relevant task |
| **Edge case** | A scenario the requirement didn't account for | "What happens if the user submits twice?" | ⚠️ Resolve before the relevant task |

The first five categories block all execution. The last two block only the relevant task, not the whole plan.

---

### Step 2 — Distinguish Intent from Instructions

Before formulating a question, explicitly identify whether the gap is between:
- **Instructions** — what the user literally said
- **Intent** — what the user is actually trying to achieve

These often differ. A user who says "add a loading spinner" may intend "make the page feel fast and responsive." If you only address the literal instruction, you might add a spinner while missing three other things that would actually solve the intent.

To surface this gap, ask internally: *"If I do exactly what was asked, does it solve the actual problem?"*

If the answer is "not sure" or "no" — ask about the intent first, then address the instruction within that context. Never assume the instruction fully captures the intent for anything more than a trivial change.

---

### Step 3 — Determine Whether to Ask or Assume

Not every uncertainty requires a question. Over-asking breaks flow and signals lack of confidence. Use this decision framework:

**Ask when:**
- The ambiguity falls into a "What", "Scope", "Success", "Priority", or "Ownership" category.
- The wrong assumption would require significant rework to undo.
- The decision involves a trade-off the user has a preference on (e.g. performance vs simplicity).
- The requirement contradicts something already in the codebase.

**Assume and document when:**
- The ambiguity is in implementation detail only (how, not what).
- The assumption is consistent with patterns already established in the codebase.
- The effort to implement either option is identical and the difference is trivial.
- The user has previously stated a preference that applies here.

When assuming, the assumption must be written down explicitly (see Step 5). It is never silently assumed.

---

### Step 4 — Ask Questions in the Correct Format

When a question must be asked, follow this format. Never ask questions one at a time across multiple messages — batch all questions for a given point in the workflow into a single structured request.

```
## Clarification Needed — [Task Name]

Before I [begin analysis / begin planning / continue execution], I need clarity on the following.
Each question includes why it matters and what I will assume if you prefer not to answer.

**[Q1] — [Category: What / Scope / Success / etc.]**
Question: [Specific, single-focus question]
Why it matters: [What goes wrong if this is misunderstood]
Default assumption if unanswered: [What I will do if you don't respond to this]

**[Q2] — [Category]**
Question: [Specific, single-focus question]
Why it matters: [Impact of misunderstanding]
Default assumption if unanswered: [Safe fallback]
```

Rules for questions:
- One question per item — never bundle two questions into one.
- Each question must be specific enough that the user can answer it in one sentence.
- Always include the default assumption — this tells the user the cost of not answering and keeps execution unblocked for low-stakes decisions.
- Maximum 5 questions per clarification request. If more than 5 are needed, the requirement is fundamentally unclear and should be re-scoped entirely before proceeding.

---

### Step 5 — Handle Ambiguous Answers

If the user's answer to a clarification question is itself ambiguous:
- Do not ask the same question again in different words.
- Show the user your interpretation: *"I understand your answer to mean [X]. Is that correct?"*
- Offer two concrete options if the interpretation is genuinely unclear: *"Does this mean [Option A] or [Option B]?"*
- If after two rounds of clarification the answer is still unclear, escalate: *"I need a more specific answer to proceed safely. The risk of misunderstanding here is [specific consequence]. Can you give me one concrete example of what you expect to see when this is done?"*

A concrete example from the user resolves almost all remaining ambiguity.

---

### Step 6 — Document All Clarifications

Every question asked and every answer received must be recorded. This prevents the clarifications from existing only in the conversation where they can be lost or misremembered.

Write all confirmed clarifications into the task file under a dedicated section:

```markdown
## Clarifications Log

| # | Question | Answer | Resolved by | Date |
|---|---|---|---|---|
| Q1 | [Question asked] | [User's answer] | [User / Assumption] | [Date] |
| Q2 | [Question asked] | Assumed: [assumption made] | Assumption | [Date] |
```

- If the answer came from the user: mark as "User".
- If a default assumption was used because the user didn't respond: mark as "Assumption" and note what was assumed.
- If the plan was already written before the clarification was received, update the affected tasks in `task.md` to reflect the clarification before proceeding.

---

### Step 7 — Mid-Execution Ambiguity Protocol

If ambiguity is discovered during execution — an edge case the requirement didn't account for, a scenario that produces two valid but different outcomes — follow this protocol:

1. Stop execution at the end of the current atomic task. Do not skip past the ambiguity.
2. Categorise the ambiguity using Step 1.
3. If it blocks only the current task: pause that task, ask the question, and continue with unaffected tasks while waiting.
4. If it affects the overall approach: pause all execution and follow the full clarification process above.
5. Document the finding in the Clarifications Log with status "Pending."
6. Once resolved, update the task and resume.

Never make a silent judgment call on a mid-execution ambiguity and keep going. Document it, surface it, resolve it.

---

### What Counts as Done

This rule is complete when:
- [ ] All "What", "Scope", "Success", "Priority", and "Ownership" ambiguities resolved before planning
- [ ] Intent distinguished from instructions for non-trivial requirements
- [ ] Decision made for each ambiguity: ask or assume — no silent assumptions
- [ ] All questions batched into a single structured request per workflow point
- [ ] All answers (user-provided or assumed) documented in the Clarifications Log
- [ ] Any plan already written updated to reflect new clarifications
- [ ] Mid-execution ambiguities paused, surfaced, and resolved before continuing past them

---

### Blind Spots This Rule Explicitly Guards Against

- Asking about everything including trivial implementation details — over-asking is as damaging as under-asking.
- Asking questions one at a time across multiple messages — batch them.
- Accepting an ambiguous answer without surfacing the interpretation back to the user.
- Conflating instructions with intent — doing exactly what was said while missing what was meant.
- Silently assuming instead of documenting the assumption — silent assumptions are invisible bugs.
- Discovering ambiguity mid-execution and making a judgment call without surfacing it.
- Losing clarifications in the conversation — they must be written into the task file.
- Treating all ambiguity as equal — "What" ambiguity blocks everything, "How" ambiguity blocks only the relevant task.
- Asking more than 5 questions — if that many are needed, the requirement itself needs to be re-scoped.
- Forgetting to update the plan when a clarification changes a task that was already written.

---
## Rule 5 — Systematic Execution (Controlled, Verified, Traceable)

### Purpose
Execution is the highest-risk phase of the workflow. Every task is performed in a controlled, deliberate sequence — one task at a time, fully completed and verified before the next begins. No side-changes, no skipping ahead, no silent fixes. The goal is a codebase that moves from one verified state to the next — never through an ambiguous in-between.

---

### Entry Condition — When This Rule Triggers
This rule triggers only after Rule 3 confirms the plan is approved. Before beginning any task, explicitly verify:
- [ ] Task file status is "Approved" in the Status Log
- [ ] All clarifications from Rule 4 are resolved and logged
- [ ] All blocked tasks are identified and pushed to the end

If any of these are not true, do not begin execution. Return to the appropriate rule.

---

### Step 1 — Establish the Starting State

Before the first task begins, record the current state of the codebase as the baseline:
- Note the current git branch and last commit hash in the task file.
- If the project does not use git, note which files are about to be modified and their current state.
- This baseline is the guaranteed restore point if execution needs to be fully abandoned.

```markdown
## Execution Baseline
**Branch:** [branch name]
**Last commit:** [commit hash]
**Date started:** [date + time]
```

---

### Step 2 — Task Execution Protocol (One Task at a Time)

For every task in the plan, follow this exact sequence. Do not begin the next task until the current one is fully complete.

#### Before starting a task:
- Update the task status in `task.md` to `🔄 In Progress`.
- Re-read the task's Definition of Done from Rule 2 — this is what "done" means, not just "written."
- Confirm the task's dependencies are all marked `✅ Done` before proceeding.

#### While executing the task:
- Work only within the files and scope defined by that specific task.
- If a file outside the task scope needs to be touched to complete the task, stop and surface this to the user: *"Task [T1.2] requires a change to [file X] which is outside its defined scope. Confirm before I proceed."*
- Do not fix, improve, or refactor anything noticed in passing that is not part of the current task. Log it instead (see Step 4).

#### After completing the task:
- Verify against the Definition of Done — not the code's existence, but its observable outcome.
- For code tasks: run the relevant test, function, or build step to confirm the outcome is real.
- For non-code tasks (config, folder structure, documentation): confirm the output exists and matches what was described.
- Update the task status to `✅ Done` only after verification passes.
- If verification fails: mark as `❌ Failed` and follow the failure protocol (Step 5).

---

### Step 3 — Handling Blocked Tasks Mid-Execution

If a task is reached that is blocked by an external dependency (user input, API key, third-party service):
- Do not stop all execution.
- Identify every task in the plan that is independent of the blocker.
- Execute all independent tasks first.
- When independent tasks are exhausted, stop execution and surface the blocker: *"Execution is paused at [T3.2] — blocked by [specific dependency]. All independent tasks are complete. Provide [what is needed] to continue."*
- Mark the blocked task as `⏸ Blocked` in `task.md`.
- Do not attempt to work around the blocker by making assumptions.

---

### Step 4 — Out-of-Scope Discovery Log

During execution, issues, bugs, or improvement opportunities in code outside the current task scope will be noticed. These must not be silently ignored or silently fixed. They go into a dedicated log in the task file:

```markdown
## Out-of-Scope Discoveries

| # | File | What was noticed | Severity | Action |
|---|---|---|---|---|
| 1 | [file path] | [Description of bug or issue] | [Low / Medium / High] | Logged — address in separate task |
```

- **High severity** (security vulnerability, data loss risk, broken feature): surface to the user immediately — do not wait until the current task is done.
- **Medium severity** (non-critical bug, degraded performance): log and surface at the end of the current task.
- **Low severity** (code style, minor improvement): log silently and include in the end-of-session summary.

Nothing out of scope is ever fixed during execution of a different task — it is logged and addressed separately with its own plan.

---

### Step 5 — Task Failure Protocol

If a task fails during execution — the code doesn't work, a dependency is missing, an API returns unexpected results, a test fails:

1. Stop immediately. Do not attempt the next task.
2. Mark the task as `❌ Failed` in `task.md` with a description of what went wrong.
3. Assess the blast radius: does this failure affect tasks that come after it?
   - If yes: pause all subsequent dependent tasks and mark them `⏸ On Hold — dependency failed`.
   - If no: independent tasks can continue.
4. Attempt to resolve the failure within the scope of the current task — one retry with a different approach.
5. If the retry also fails: surface to the user with full context:
   ```
   ❌ Task [T2.3] failed after retry.
   
   What was attempted: [description]
   What happened: [specific error or outcome]
   Affected tasks: [list of tasks now on hold]
   Options:
   - [Option A]: [description and trade-off]
   - [Option B]: [description and trade-off]
   
   Which option should I take?
   ```
6. Do not make a unilateral decision on a failed task that affects the rest of the plan.

---

### Step 6 — Commit / Save Points

Long execution plans must not run to completion without intermediate save points. A save point is created after every parent task group is fully complete (all sub-tasks done and verified).

Save point protocol:
- If using git: commit with a descriptive message: `[Task Name] — [Parent task group] complete. Tasks [T1.1–T1.4] done.`
- If not using git: note the save point in the task file with the files modified and their verified state.
- Save points are the recovery baseline for the next group of tasks — if T2 group fails, T1 group is not re-done.

Never commit partial or failing work as a save point. A save point is only valid when all tasks up to that point are verified done.

---

### Step 7 — Session Boundary Protocol

If execution spans multiple sessions, never stop mid-task. Always stop at a clean task boundary — a task that is either fully done or has not been started.

At the end of each session:
- Record in the task file exactly where execution stopped:
  ```
  ## Session Log
  | Session | Date | Tasks completed | Stopped at | Notes |
  |---|---|---|---|---|
  | 1 | [date] | T1.1, T1.2, T1.3 | End of T1.3 | T2.1 not started |
  ```
- Ensure the codebase is in a working state at the session end — no half-written functions, no broken imports.
- The next session begins by reading the Session Log and re-verifying the last completed task before continuing.

---

### Step 8 — Progress Communication

The user must not be left without visibility during long executions. After every parent task group is complete, send a brief progress update:

```
## Execution Update — [Task Name]

✅ Completed: [T1.1], [T1.2], [T1.3]
🔄 In progress: [T2.1]
⏳ Remaining: [T2.2], [T2.3], [T3.1]
⏸ Blocked: [T2.4] — waiting for [dependency]
❌ Failed: none

Estimated remaining effort: [S / M / L]
Any issues to flag: [yes/no — if yes, describe]
```

Do not wait until the entire plan is complete to communicate. The user approved a plan — they are entitled to know its execution status.

---

### What Counts as Done

Rule 5 is complete when:
- [ ] Entry condition verified — plan is approved, clarifications resolved, blockers identified
- [ ] Execution baseline recorded in task file
- [ ] Every task executed one at a time in dependency order
- [ ] Every task verified against its Definition of Done before being marked Done
- [ ] All out-of-scope discoveries logged — none silently fixed
- [ ] All blocked tasks surfaced with context — not worked around
- [ ] All failed tasks handled via the failure protocol — not silently retried or skipped
- [ ] Save points created after every parent task group
- [ ] Sessions ended only at clean task boundaries
- [ ] Progress updates sent to user after each parent task group

---

### Blind Spots This Rule Explicitly Guards Against

- Starting execution before plan approval is confirmed — Rule 3 must be complete first.
- Marking a task Done when the code exists but the Definition of Done outcome hasn't been verified.
- "Vibecoding" — fixing, improving, or refactoring out-of-scope code noticed while passing through a file. Log it, never fix it mid-task.
- Stopping all execution when a single task is blocked — independent tasks can and should continue.
- Silently making a judgment call on a failed task that affects the rest of the plan.
- Committing partial or unverified work as a save point — save points are only valid when verified.
- Stopping mid-task at a session boundary — always stop at a clean task edge.
- Running a long execution with no progress updates — the user is left blind.
- Noticing a high-severity bug out of scope and logging it silently instead of surfacing it immediately.
- Treating all tasks as code tasks — non-code tasks have their own verification method and must be verified too.

---
## Rule 6 — Simplicity & Minimalism (The Right Solution, Not the Smallest One)

### Purpose
Every implementation decision must favour the solution that is easiest to understand, test, and delete — not the solution with the fewest lines, the most abstraction, or the most reuse. Complexity is the primary cause of bugs, maintenance burden, and developer confusion. This rule exists to prevent two equal and opposite failure modes: over-engineering (too much abstraction for the problem) and under-engineering (too little structure, creating future complexity by avoiding it now).

---

### Entry Condition — When This Rule Triggers
This rule is active during Rule 5 execution for every implementation decision where more than one approach is viable. It also triggers during Rule 2 planning when task design choices are being made. It is not a one-time gate — it is a continuous lens applied to every decision during the build.

---

### Step 1 — Define What "Simple" Means (In Priority Order)

Simplicity has multiple dimensions that are sometimes in tension. When evaluating whether a solution is simple, apply them in this priority order:

| Priority | Dimension | What it means |
|---|---|---|
| 1 | **Readable** | A developer unfamiliar with this code can understand what it does in under 60 seconds |
| 2 | **Deletable** | The feature can be removed without touching unrelated systems |
| 3 | **Testable** | The logic can be verified in isolation without needing the full system running |
| 4 | **Extensible** | A new requirement can be added without rewriting what already works |
| 5 | **Minimal** | No unnecessary code, dependencies, or abstractions exist |

If two solutions are equal on priority 1, compare on priority 2, and so on. Line count is not in this list — it is never the primary metric.

---

### Step 2 — The Implementation Decision Framework

When more than one implementation approach is viable, use this framework to choose:

**Question 1: Does a simpler version solve the problem completely?**
If yes — use the simpler version. Do not add structure "for the future" unless a future requirement is confirmed and imminent.

**Question 2: Does existing code already do part of this?**
Search the codebase before writing anything new. If existing logic can be used or extended with minimal change, prefer that over creating new code — but only if extending it does not make the existing code harder to understand or test.

**Question 3: Is the abstraction earning its complexity?**
An abstraction (new function, class, module, layer) is justified only if it either:
- Eliminates duplication that exists across 3 or more places, OR
- Makes the calling code meaningfully clearer and easier to read.

If the abstraction exists to serve only one caller, it is over-engineering. Inline it.

**Question 4: What is the cost of being wrong?**
If the simpler approach is easy to replace later, choose it now. If the simpler approach would be expensive to undo (because it gets called from many places or bakes in a hard assumption), invest slightly more structure upfront. Reversibility matters more than cleverness.

**Question 5: Can this be deleted cleanly?**
If the feature were removed tomorrow, how much of the codebase would need to change? If the answer is "a lot," the implementation is too coupled. A good implementation can be deleted by removing a small, contained set of files or functions.

---

### Step 3 — Refactor vs New Layer Decision

The original rule defaults to "refactor existing logic." This is sometimes wrong. Use this decision to choose between the two:

**Refactor existing logic when:**
- The existing logic does the same thing but differently — it is genuinely a duplication problem.
- The existing logic is already tested and the refactor does not change its observable behaviour.
- The existing code is small and contained enough that changing it does not risk unintended regressions.

**Add a new contained layer when:**
- The existing code is tested, working, and depended upon by other systems — touching it introduces regression risk that outweighs the benefit of deduplication.
- The new need is genuinely different from what the existing code does, even if it looks similar.
- The existing code is so complex that modifying it would require understanding and testing the entire surrounding system.

**Never do either when:**
- A third-party library already does it well. Use the library and move on.
- The problem is small enough that a direct, inline solution is clearest.

When a refactor is chosen, note the regression risk in the task file and ensure the existing tests still pass after the refactor before marking the task done.

---

### Step 4 — Identify and Avoid the Two Failure Modes

#### Over-Engineering (Too Much Structure)
Signs you are over-engineering:
- Creating a generic, configurable solution for a problem that has only one current use case.
- Adding an abstraction layer that the calling code has to work harder to use.
- Introducing a design pattern (factory, observer, strategy, etc.) because it fits conceptually, not because it solves a real problem in the current code.
- Writing code that anticipates requirements that have not been confirmed.
- A new file, class, or module that is only ever called from one place.

If any of these signs are present: simplify. Inline the abstraction. Solve only the current confirmed problem.

#### Under-Engineering (Too Little Structure)
Signs you are under-engineering:
- Copy-pasting logic that already exists in two or more other places.
- Writing a function that does three unrelated things because "it's only a few lines."
- Hardcoding a value that will obviously need to change (environment URL, threshold, config value).
- Writing code that can only be tested by running the full application.
- Making a change that touches 8 files when a small structural adjustment would have touched 2.

If any of these signs are present: add the minimum structure needed to eliminate the specific problem. Do not over-correct into over-engineering.

---

### Step 5 — Handling Existing Complex Code

When a task requires touching code that is already over-engineered or poorly structured:

- Do not simplify it as a side task during execution — that is out-of-scope work (Rule 5, Step 4).
- Log the complexity in the Out-of-Scope Discovery Log with severity.
- Complete the current task by working within the existing structure.
- After the current task is done, surface the complexity to the user: *"I noticed [file X] is over-engineered in a way that will slow down future work. I can address this in a separate task. Shall I add it to the plan?"*

Never silently simplify code that is outside the current task scope — even if the simplification is obviously correct.

---

### Step 6 — Document the Simplicity Decision

When a simpler approach is chosen over a more complex one, record the reasoning. Without this, the next developer assumes the simpler approach is incomplete and adds the complexity back.

Add a brief comment at the implementation site:
```javascript
// Intentionally simple — no abstraction needed until this is called from more than one place.
// If that changes, extract to [suggested name].
```

And note the decision in the task file:
```markdown
## Implementation Decisions

| Task | Decision | Reason | Trade-off |
|---|---|---|---|
| T2.3 | Inlined the transform logic rather than creating a utility function | Only one caller exists | Will need extraction if reused elsewhere |
```

This log prevents future developers from "fixing" a deliberate simplicity choice without understanding why it was made.

---

### What Counts as Done

This rule is applied correctly when for every implementation decision:
- [ ] Simplicity evaluated on the 5-dimension priority list — not by line count
- [ ] Existing code checked before writing anything new
- [ ] Abstraction justified against the "3 or more places or meaningfully clearer" test
- [ ] Refactor vs new layer decision made explicitly — not by default
- [ ] Both over-engineering and under-engineering signs checked
- [ ] Existing complex code outside scope logged, not silently fixed
- [ ] Simplicity decision documented at the implementation site and in the task file

---

### Blind Spots This Rule Explicitly Guards Against

- Using line count as the measure of simplicity — short code is not always simple code.
- Defaulting to refactoring existing logic without assessing regression risk first.
- Adding an abstraction that has only one caller — that is always over-engineering.
- Building for unconfirmed future requirements — solve the current confirmed problem only.
- Ignoring under-engineering — copy-pasted logic and multi-responsibility functions are complexity too, just in the other direction.
- Silently simplifying complex code that is outside the current task scope.
- Failing to document a simplicity decision — the next developer will add the complexity back.
- Choosing an approach because it uses a familiar design pattern rather than because it solves the specific problem.
- Treating "fewer dependencies" as always better — sometimes a well-maintained library is simpler than writing the logic yourself.

---
## Rule 7 — Pragmatic Prioritisation (Ship What Matters, Defer What Doesn't)

### Purpose
Every engineering decision has an opportunity cost. Time spent on work that doesn't move the project forward is time not spent on work that does. This rule ensures that prioritisation is deliberate — that what gets built, when it gets built, and what gets deferred is always a conscious decision grounded in the project's actual context and goals, not in perfectionism, habit, or enthusiasm for a particular solution.

---

### Entry Condition — When This Rule Triggers
This rule triggers at three points:

1. **During Rule 2 (Planning)** — when deciding which tasks to include in the current plan and which to defer.
2. **During Rule 3 (Approval)** — when presenting the plan and flagging scope that could be cut without affecting the core goal.
3. **During Rule 5 (Execution)** — when a task reveals it is larger than estimated and a decision must be made about whether to complete it fully or ship a working subset and defer the rest.

---

### Step 1 — Calibrate to the Actual Project Scale

Before applying any prioritisation decision, establish the project's real scale context. This is recorded once in the task file and referenced throughout:

```markdown
## Project Scale Context
**Type:** [Personal project / Startup MVP / Internal tool / Production SaaS / Enterprise system]
**Current users:** [Number or estimate]
**Growth expectation:** [Stable / Moderate growth / Rapid scaling]
**Criticality:** [Experimental / Important / Business-critical / Safety-critical]
```

Prioritisation decisions are made relative to this context — not relative to an abstract "billion users" standard. A personal portfolio and a production payment system have completely different definitions of "good enough to ship."

---

### Step 2 — Define Impact for This Project

"Impact" means different things for different projects. Before prioritising, confirm which impact dimensions matter for the current project and in what order:

| Impact Dimension | Description | Example |
|---|---|---|
| **User-facing functionality** | Does it directly enable users to do something they couldn't before? | New feature, bug fix that blocked a workflow |
| **System stability** | Does it prevent or recover from failure? | Error handling, crash fix, data integrity |
| **Security** | Does it reduce attack surface or protect user data? | Auth fix, input validation, secret management |
| **Performance** | Does it make the system measurably faster for real users? | Response time, load time, memory usage |
| **Developer velocity** | Does it make future work meaningfully faster or safer? | Tooling, test coverage, documentation |
| **Compliance** | Is it required by law, contract, or platform policy? | Accessibility, data privacy, terms of service |

Work in the first three categories (user-facing, stability, security) is always prioritised. Work in the last three is important but can be deferred if it competes with the first three for the same time slot.

---

### Step 3 — The Prioritisation Decision Framework

When two or more work items compete for the same time, use this framework:

**Question 1: Is any item a blocker?**
A blocker prevents other work from proceeding or prevents the project from shipping. Blockers go first, always. Non-blockers compete for the remaining time.

**Question 2: What is the severity of the consequence if this is deferred?**

| Consequence | Deferral decision |
|---|---|
| Users cannot use the product | Cannot defer |
| Users experience data loss or security risk | Cannot defer |
| Users experience degraded but functional experience | Can defer one cycle |
| Developer experience is worse | Can defer until stable |
| Code quality or technical debt increases | Can defer, must be logged |
| Nice-to-have improvement | Defer indefinitely, log it |

**Question 3: What is the effort-to-impact ratio?**
High impact, low effort: do it now.
High impact, high effort: plan it properly, don't rush it.
Low impact, low effort: batch with similar small items or defer.
Low impact, high effort: cut it. Log the decision.

**Question 4: Is this reversible?**
If a decision to defer is easy to reverse later, defer it. If deferring now creates a structural dependency that makes it ten times harder to add later, do it now even if it's not urgent.

---

### Step 4 — Define "Shippable Quality"

Pragmatism requires a clear definition of when something is good enough to ship. This is not "technically works" — it is a minimum bar that must be met before any feature is considered shippable:

**The shippable quality bar:**
- [ ] The feature does what it was designed to do under normal conditions
- [ ] The feature fails gracefully under abnormal conditions (bad input, network drop, missing data) — no crashes, no silent data corruption
- [ ] The feature does not break any existing functionality
- [ ] The feature has no known security vulnerability introduced by this change
- [ ] The feature is understandable to the next developer without needing the original author to explain it

A feature that meets all five is shippable. A feature that fails any one is not — regardless of how pragmatic the pressure to ship is.

What shippable quality does NOT require:
- Perfect test coverage
- Optimal performance (unless performance was the stated goal)
- Zero technical debt
- Complete documentation
- Edge case handling for scenarios that haven't occurred and aren't likely to

---

### Step 5 — The Cut / Defer / Ship Decision

When a work item is being evaluated, it goes into one of three buckets:

**Ship now:**
The item meets shippable quality, is in the current plan's scope, and its impact dimension is in the top three categories. Complete it and ship it.

**Defer:**
The item is real and valuable but not urgent enough to compete with current priorities. It goes into the Deferred Work Log (Step 6) with a re-evaluation trigger — a condition that would move it back into active planning.

**Cut:**
The item's impact dimension is low, its effort is not trivial, and deferring it indefinitely loses nothing. It is removed from consideration. The decision is logged with the reason so it doesn't resurface without new information.

---

### Step 6 — Deferred Work Log

Work that is deferred must be logged — it does not simply disappear. Add it to a dedicated section in the task file:

```markdown
## Deferred Work Log

| # | Item | Reason deferred | Re-evaluation trigger | Date deferred |
|---|---|---|---|---|
| 1 | [Description] | [Why it was deferred] | [What would make this urgent — e.g. "when user count exceeds 100" or "when this error occurs in production"] | [Date] |
```

At the start of every new planning session (Rule 2), review the Deferred Work Log and check whether any re-evaluation trigger has been met. If yes, the deferred item re-enters active planning. If no, it stays deferred.

---

### Step 7 — Communicate Pragmatic Decisions

When a pragmatic decision is made — something is cut, deferred, or shipped at minimum viable quality — the user must be told explicitly. Silent pragmatic decisions are invisible technical debt.

The communication format:
```
## Pragmatic Decision — [Item Name]

**Decision:** [Cut / Deferred / Shipped at minimum viable quality]
**Reason:** [Why this decision was made]
**What was NOT built:** [Specific functionality that was excluded]
**Impact of this decision:** [What the user or system cannot do as a result]
**Re-evaluation trigger:** [What would change this decision]
```

This is not optional. The user approved a plan — if the plan is being executed more pragmatically than approved, they need to know.

---

### Step 8 — Resolving the Speed vs Scale Tension

When shipping speed and building for scale conflict directly — acknowledge the tension explicitly rather than silently choosing one. Present the trade-off to the user:

```
⚖️ Trade-off Decision Required

**Fast approach:** [Description] — ships in [time], but [specific limitation at scale or under load]
**Scalable approach:** [Description] — ships in [time], and handles [scale], but costs [extra time/complexity]

**Recommendation:** [Which to choose and why, given the project's scale context from Step 1]
```

Do not make this choice unilaterally. The user decides which trade-off to accept.

---

### What Counts as Done

This rule is applied correctly when:
- [ ] Project scale context is recorded and referenced for all prioritisation decisions
- [ ] Impact dimensions defined and ranked for the current project
- [ ] Competing work items evaluated against the prioritisation framework — not by gut feel
- [ ] Shippable quality bar checked before any feature is marked done
- [ ] Deferred work logged with re-evaluation triggers — not silently dropped
- [ ] Cut decisions logged with reasons — not silently removed
- [ ] All pragmatic decisions communicated to the user explicitly
- [ ] Speed vs scale tensions surfaced as explicit trade-off decisions — not resolved unilaterally

---

### Blind Spots This Rule Explicitly Guards Against

- Calibrating to "a billion users" when the actual project has 50 — produces over-engineered infrastructure that slows shipping.
- Treating "ship fast" as a licence to skip the shippable quality bar — pragmatism is not an excuse for broken code.
- Cutting work silently — deferred and cut decisions must be logged and communicated.
- Applying the same prioritisation to a security vulnerability and a nice-to-have feature — severity of consequence determines priority, not effort or enthusiasm.
- Deferring work with no re-evaluation trigger — it becomes permanently forgotten debt.
- Resolving speed vs scale tensions unilaterally — this is a trade-off the user must consciously accept.
- Treating perfectionism as the only anti-pattern — rushing is an equal and opposite failure mode.
- Ignoring developer velocity work entirely — it has a real impact on future shipping speed and belongs in the prioritisation framework.

---
## Rule 8 — Defensive Security Posture (Assume Hostile, Verify Everything)

### Purpose
Every piece of code that handles data, authentication, user input, external services, or system resources must be written assuming it will be attacked. Security is not a feature added at the end — it is a property of every implementation decision made throughout the build. This rule defines what a genuine defensive security posture looks like across the full attack surface, not just input validation and secret scanning.

---

### Entry Condition — When This Rule Triggers
This rule is active during Rule 5 execution for every task that touches:
- User input of any kind (form fields, URL parameters, headers, file uploads, API payloads)
- Authentication or authorization logic
- Database reads or writes
- External API calls (outbound or inbound)
- File system operations
- Environment variables or configuration
- Third-party dependencies (adding, updating, or removing)
- Logging or error handling
- Any data that crosses a trust boundary (client → server, service → service, user → system)

If a task touches none of the above, this rule still applies to the final output sanitization and dependency check steps.

---

### Step 1 — Classify the Task's Security Surface

Before implementing, identify which attack surfaces are relevant to the current task. Each surface has a specific set of controls required.

| Surface | Relevant attacks | Required controls |
|---|---|---|
| **User input** | Injection (SQL, NoSQL, command, LDAP), XSS, path traversal | Input validation + output sanitization per context |
| **Authentication** | Brute force, credential stuffing, session hijacking, token leakage | Rate limiting, secure token storage, session management |
| **Authorization** | Broken access control, IDOR, privilege escalation | Per-resource permission checks, not just route-level auth |
| **External APIs** | SSRF, data leakage, dependency on unvalidated external data | Validate external responses, don't trust third-party data implicitly |
| **File operations** | Path traversal, arbitrary file write, zip slip | Validate and sanitize file paths, restrict to allowed directories |
| **Database** | SQL/NoSQL injection, mass assignment, over-fetching | Parameterised queries, explicit field selection, input whitelisting |
| **Dependencies** | Known CVEs, supply chain attacks, malicious packages | Audit before adding, pin versions, check for known vulnerabilities |
| **Configuration** | Secret leakage, misconfiguration, environment bleed | Environment separation, secret scanning, no hardcoded credentials |
| **Logging** | Sensitive data in logs, insufficient audit trail | Scrub PII and secrets from logs, log security-relevant events |
| **Rate limiting** | Brute force, DDoS, API abuse | Apply rate limits to all public-facing endpoints and auth flows |

---

### Step 2 — Input Validation (Complete Definition)

"Validate every input" means applying all of the following checks that are relevant to the input type. A partial check is not validation.

**Type validation:** Confirm the input is the expected data type. Reject anything that is not.

**Length / size validation:** Enforce minimum and maximum length or size. Reject inputs outside the allowed range. This applies to strings, arrays, file sizes, and numeric ranges.

**Format validation:** If the input must match a specific format (email, URL, date, UUID, phone number), validate against that format explicitly. Do not infer format from partial matching.

**Allowed value validation (whitelist):** If the input must be one of a known set of values, validate against that whitelist explicitly. Never use a blacklist as the primary defence — blacklists miss variations.

**Business rule validation:** Does this input make sense in the context of the application's domain? A quantity of -500 may be a valid integer but is not a valid order quantity.

**Authorization check:** Does the authenticated user have permission to submit this input affecting this specific resource? This is separate from authentication — a logged-in user may not be authorised to modify another user's data.

Validation must happen **server-side**. Client-side validation is a UX convenience only — it is not a security control and must never be the only check.

---

### Step 3 — Output Sanitization by Context

"Sanitize every output" means applying context-specific sanitization. The sanitization required depends on where the output goes — not on where it came from.

| Output context | Attack prevented | Sanitization method |
|---|---|---|
| **HTML page** | XSS | Escape HTML entities. Use templating engine auto-escaping. Never use `innerHTML` with user data. |
| **HTML attribute** | XSS | Escape attribute-specific characters. Never use unquoted attributes with dynamic content. |
| **SQL query** | SQL injection | Parameterised queries / prepared statements. Never concatenate user input into SQL strings. |
| **NoSQL query** | NoSQL injection | Validate and cast input types before using in queries. Never pass raw user objects as query filters. |
| **Shell command** | Command injection | Avoid shell commands with user input entirely. If unavoidable, use allowlist of safe values only. |
| **File path** | Path traversal | Resolve the path and verify it is within the allowed directory before use. |
| **JSON API response** | Data leakage | Explicitly select fields to return. Never return entire database objects — strip internal fields. |
| **Log entry** | Sensitive data exposure | Scrub PII (email, name, address), credentials, and tokens before writing to logs. |
| **Redirect URL** | Open redirect | Validate redirect targets against an allowlist of known safe destinations. |

---

### Step 4 — Authentication vs Authorization (Treated Separately)

These are distinct security layers. Both must be present. One does not substitute for the other.

**Authentication** — verifying identity:
- Tokens must be cryptographically signed and validated on every request — not just on login.
- Tokens must have an expiry. Expired tokens must be rejected.
- Passwords must be hashed using a strong algorithm (bcrypt, argon2). Never store plaintext or MD5/SHA1 hashed passwords.
- Failed authentication attempts must be rate-limited and logged.
- Session tokens must be rotated after privilege changes (login, password change, role change).

**Authorization** — verifying permission:
- Every resource access must check: does this authenticated user have permission to access THIS specific resource?
- Route-level auth checks are not sufficient — check at the data level too (does this user own this record?).
- Never rely on the client to send the user's role or permissions — derive them server-side from the authenticated identity.
- Use the principle of least privilege — grant the minimum permissions needed for the operation, not broad access.

---

### Step 5 — Third-Party Dependency Security

Before adding any new dependency:
- Check it against a known vulnerability database. For Node.js: `npm audit`. For Python: `pip-audit`. For other ecosystems: use the equivalent tool or check the [OSV database](https://osv.dev).
- Check the package's last publish date and maintenance status — abandoned packages accumulate unpatched vulnerabilities.
- Check the package's download count and community trust signals — low-download packages with no community are higher supply chain risk.
- Pin the dependency to an exact version in production. Floating versions (`^1.2.0`) can silently pull in a compromised update.

When updating existing dependencies:
- Read the changelog for the version being updated to — look for security-relevant changes.
- Run the full test suite after updating before marking the task done.

---

### Step 6 — Secret and Credential Management

**Never hardcode secrets.** This includes: API keys, database connection strings, private keys, tokens, passwords, webhook secrets, and internal service URLs that shouldn't be public.

**Environment separation:**
- Secrets for development, staging, and production must be separate. A development secret must never work in production.
- Use `.env` files for local development only. Never commit `.env` files — use `.env.example` with placeholder values as the committed reference.

**Secret scanning — ecosystem-agnostic:**
Run a secret scan before marking any auth or data task complete. Use the appropriate tool for your ecosystem:
- Node.js: `npm run scan:secrets` if configured, or `git-secrets`, `trufflehog`, or `gitleaks`
- Python / other: `gitleaks` or `trufflehog` (both work across ecosystems)
- If none of these are configured: manually grep for common secret patterns before committing: `grep -r "sk_", "api_key", "password", "secret", "token"` in staged files

**If a secret is found during scanning:**
1. Do not commit. Stage the fix immediately.
2. Rotate the secret at the source (regenerate the API key, change the password) — the old value is compromised whether or not it was committed.
3. Check git history: `git log -p | grep [pattern]` — if the secret was ever committed previously, it is in the history and must be purged using `git filter-repo` or equivalent.
4. Surface to the user immediately with the above steps taken and confirmed.

---

### Step 7 — Rate Limiting

Apply rate limiting to:
- All authentication endpoints (login, password reset, token refresh)
- All public-facing API endpoints that accept user input
- All endpoints that trigger expensive operations (file processing, email sending, external API calls)

Rate limiting must be implemented server-side. Client-side throttling is a UX choice, not a security control.

Document the rate limit applied per endpoint in the task file:
```
## Rate Limits Applied
| Endpoint | Limit | Window | Response on exceed |
|---|---|---|---|
| POST /login | 5 attempts | 15 minutes | 429 + lockout message |
| POST /contact | 3 requests | 1 hour | 429 + retry-after header |
```

---

### Step 8 — Security Logging

Log the following events with enough detail to reconstruct what happened, but never log sensitive data:
- Failed authentication attempts (timestamp, IP, user identifier — not the password attempted)
- Successful authentication (timestamp, IP, user identifier)
- Authorization failures (timestamp, user, resource attempted, action attempted)
- Input validation failures on security-sensitive fields (timestamp, field, failure reason — not the submitted value)
- Rate limit triggers (timestamp, IP, endpoint)
- Any detected injection attempt (timestamp, IP, input pattern — sanitized)

Never log: passwords, tokens, full credit card numbers, SSNs, raw request bodies containing sensitive fields.

---

### Step 9 — Security Checklist Per Task Type

Apply the relevant checklist based on the task type before marking it done:

**API endpoint task:**
- [ ] Input validated (type, length, format, whitelist, business rules, authorization)
- [ ] Output sanitized for the response context
- [ ] Authentication verified server-side
- [ ] Authorization checked at the resource level
- [ ] Rate limiting applied
- [ ] Security-relevant events logged
- [ ] No sensitive data in error responses returned to client

**Authentication / authorization task:**
- [ ] Passwords hashed with strong algorithm
- [ ] Tokens signed, validated, and expiry enforced
- [ ] Failed attempts rate-limited and logged
- [ ] Authorization checked at data level, not just route level
- [ ] Session rotated after privilege change
- [ ] Secret scan run

**Database task:**
- [ ] Parameterised queries used — no string concatenation
- [ ] Explicit field selection — no `SELECT *` returning internal fields to client
- [ ] Input whitelisted before use in query filters
- [ ] Mass assignment prevented — explicit field allowlist on write operations

**File upload / file operation task:**
- [ ] File type validated (MIME type + extension, not just extension)
- [ ] File size limited
- [ ] File path validated and resolved within allowed directory
- [ ] Uploaded files not executed (stored outside webroot or with execution disabled)

**Dependency addition task:**
- [ ] Vulnerability audit run
- [ ] Maintenance status checked
- [ ] Version pinned
- [ ] Changelog reviewed

---

### What Counts as Done

A task with a security surface is not done until:
- [ ] All relevant surfaces from Step 1 identified
- [ ] Input validation complete per Step 2 definition — not partial
- [ ] Output sanitized for the correct context per Step 3
- [ ] Authentication and authorization treated as separate layers
- [ ] Third-party dependencies audited if added or updated
- [ ] Secret scan run — any findings handled per the full protocol
- [ ] Rate limiting applied where required and documented
- [ ] Security-relevant events logged without sensitive data
- [ ] Task-type-specific checklist from Step 9 completed

---

### Blind Spots This Rule Explicitly Guards Against

- Treating client-side validation as a security control — it is UX only.
- Treating authentication as sufficient without checking authorization at the resource level.
- Applying the same sanitization to all output contexts — each context needs context-specific treatment.
- Hardcoding a secret and relying on `.gitignore` to keep it safe — `.gitignore` does not remove secrets already in history.
- Using `npm run scan:secrets` as the only scanning approach — it doesn't exist outside Node.js ecosystems.
- Finding a secret during scanning and only removing it from the current file — it must be rotated at the source and purged from git history.
- Adding a new dependency without auditing it — known CVEs in dependencies are one of the most common real-world attack vectors.
- Logging security events with sensitive data in the log entry — logs are often less protected than the application itself.
- Assuming internal APIs are safe to trust — validate their responses the same as any external input.
- Skipping rate limiting because "this is an internal endpoint" — internal endpoints are attacked via compromised accounts and SSRF.

---
## Rule 9 — Context-Aware Communication (The Right Information, To the Right Person, At the Right Time)

### Purpose
Every significant action, decision, risk, and trade-off must be communicated clearly to the user — before it becomes a problem, in a format they can understand, and with enough context that they can make informed decisions without needing to reconstruct what happened from the code itself. Communication is not a summary appended at the end of work — it is an active, ongoing part of the workflow.

---

### Entry Condition — When This Rule Triggers
This rule is active throughout the entire workflow. It defines the communication standard for:
- Rule 1: Surfacing analysis findings and approach-changing discoveries
- Rule 2: Presenting the plan and flagging risks
- Rule 3: The approval request format
- Rule 4: Asking clarifying questions
- Rule 5: Progress updates, failure reports, and out-of-scope discoveries
- Rule 6: Documenting simplicity decisions
- Rule 7: Communicating pragmatic decisions and trade-offs
- Rule 8: Security findings and risk flags
- End of session: Wrap-up summary

---

### Step 1 — Calibrate to the Audience

Before writing any communication, identify who is reading it and adjust accordingly. The same information delivered at the wrong level is either useless or condescending.

| Audience type | What they need | What to avoid |
|---|---|---|
| **Senior engineer** | Design decisions, trade-offs, architectural implications, what was NOT done and why | Over-explaining basics, listing obvious steps |
| **Junior developer** | Step-by-step reasoning, why each choice was made, what to watch out for next | Assuming background knowledge, using unexplained jargon |
| **Non-technical founder / PM** | What changed for the user, what risk exists, what decision they need to make | Technical implementation details, file names, code patterns |
| **Designer** | What constraints the implementation places on the UI, what is flexible vs fixed | Database schemas, algorithm choices |

If the audience is unknown: default to the senior engineer level but define all non-obvious technical terms on first use.

---

### Step 2 — Define Communication Triggers (What Counts as "Meaningful")

A communication is required when any of the following occur. These are the triggers — not "every change."

| Trigger | Communication required |
|---|---|
| A task is completed | Post-task summary (see Step 4) |
| A parent task group is completed | Progress update (Rule 5 format) |
| A decision was made that affects future work | Forward-looking note (see Step 5) |
| A risk or security issue is identified | Risk flag (see Step 6) |
| A trade-off was made | Trade-off explanation (see Step 7) |
| A plan changes mid-execution | Re-approval request (Rule 3 format) |
| A task fails | Failure report (Rule 5 format) |
| The session ends | Session wrap-up (see Step 8) |
| Uncertainty exists in a decision made | Confidence flag (see Step 9) |

A communication is NOT required for:
- Routine task execution that proceeds exactly as planned
- Internal implementation details that don't affect the user's understanding or decisions
- Changes that are fully covered by an already-approved plan with no deviations

---

### Step 3 — The "Reasoning Glue" Principle

Every meaningful communication must contain the reasoning that connects the action to its purpose. Without this, the user sees what was done but not why — and cannot evaluate whether it was the right decision.

Reasoning glue answers three questions for every significant action:

1. **What was done** — specific and concrete, not vague ("added input validation to the login endpoint" not "improved security")
2. **Why it was done this way** — the design choice and what alternatives were considered and rejected
3. **What it affects going forward** — what this decision enables, constrains, or changes for future work

A communication that answers only question 1 is a log entry, not a useful summary. All three must be present for decisions that have trade-offs or future implications.

---

### Step 4 — Post-Task Summary Format

After a task is completed, provide a summary in this format:

```
## Task Complete — [Task ID]: [Task Name]

**What was done:**
[1–3 sentences describing the specific change made — concrete, not vague]

**Why this approach:**
[The design choice made and why. If alternatives were considered, name them and explain why they were rejected]

**Files changed:**
- [file path] — [what changed and why this file]

**What this enables / constrains going forward:**
[Any implications for future tasks or features — if none, say "No forward implications"]

**Confidence level:** [High / Medium / Low]
[If Medium or Low: explain what makes this uncertain and what to watch for]
```

This format is used for Tier 2 and Tier 3 tasks (from Rule 1 classification). Tier 1 tasks get a one-line confirmation: *"[T1.1] done — [one sentence describing the outcome]."*

---

### Step 5 — Forward-Looking Notes

When an implementation decision constrains or shapes future work, this must be communicated explicitly — not buried in a task summary or left for the user to discover when they attempt the future work.

```
## Forward-Looking Note — [Decision Topic]

**Decision made:** [What was implemented or chosen]
**Future implication:** [What this means for future features, tasks, or architectural decisions]
**What is now easier:** [What this decision enables]
**What is now harder or constrained:** [What this decision rules out or makes more complex]
**Recommended action:** [What the user or next developer should know before touching this area]
```

Examples of decisions that always require a forward-looking note:
- A data model choice that affects future queries
- A third-party library chosen that locks in a particular pattern
- A caching strategy that affects data freshness guarantees
- An authentication approach that constrains future role additions
- A file structure decision that determines where future features must live

---

### Step 6 — Risk Flag Format

When a risk is identified — security, stability, performance, or business — surface it immediately in this format:

```
⚠️ Risk Flag — [Risk Type]: [Short Description]

**Severity:** [Critical / High / Medium / Low]
**What the risk is:** [Specific description — not vague]
**When it would occur:** [The condition under which this risk becomes a problem]
**Current exposure:** [Is this risk currently active or only potential?]
**Recommended action:** [What should be done and by when]
**If ignored:** [Specific consequence of not addressing this]
```

Severity definitions:
- **Critical** — active vulnerability or data loss risk. Surface immediately, pause relevant execution.
- **High** — will become a problem under foreseeable conditions. Surface before session ends.
- **Medium** — may become a problem under less likely conditions. Surface in session wrap-up.
- **Low** — worth knowing but unlikely to matter soon. Log in Deferred Work Log.

---

### Step 7 — Trade-Off Explanation Format

When a trade-off is made — speed vs quality, simplicity vs flexibility, consistency vs pragmatism — communicate it explicitly rather than presenting the chosen option as if it were the obvious and only answer:

```
## Trade-Off — [Decision Area]

**Option A (chosen):** [Description]
- Advantage: [What this option does well]
- Cost: [What this option sacrifices]

**Option B (not chosen):** [Description]
- Advantage: [What this option would have done better]
- Cost: [Why it was not chosen]

**Why Option A was selected:** [The specific reason given the project's context, scale, and constraints]
**Revisit if:** [The condition under which this trade-off should be re-evaluated]
```

---

### Step 8 — Session Wrap-Up Format

At the end of every working session, provide a structured wrap-up — even if nothing went wrong. This is the user's primary reference for understanding what happened without reading all the individual task updates.

```
## Session Wrap-Up — [Date]

**Tasks completed this session:**
- [T1.1] [Task name] — [one-line outcome]
- [T1.2] [Task name] — [one-line outcome]

**Tasks in progress (not yet complete):**
- [T2.1] [Task name] — [current state and what remains]

**Blocked tasks:**
- [T2.4] [Task name] — blocked by [specific dependency]

**Decisions made this session:**
- [Decision] — [brief reasoning]

**Risks identified:**
- [Risk] — [severity and recommended action]

**Deferred work added:**
- [Item] — [reason deferred]

**What to do next session:**
[Specific starting point and any pre-conditions to check before continuing]

**Open questions for the user:**
[Any decisions or clarifications needed before next session can begin]
```

---

### Step 9 — Communicate Confidence Level

Every significant decision or implementation must be tagged with a confidence level. Presenting uncertain decisions with the same confidence as verified facts misleads the user into over-trusting something that should be reviewed.

| Level | Meaning | How to communicate |
|---|---|---|
| **High** | Verified — tested, well-understood, consistent with established patterns | State it directly. No qualifier needed. |
| **Medium** | Reasonable — based on sound reasoning but not fully tested or verified | Add: *"This is my best judgment — worth reviewing before relying on it in production."* |
| **Low** | Uncertain — best-guess under ambiguity or limited information | Add: *"I'm not fully confident in this — I recommend verifying [specific aspect] before proceeding."* |

Low-confidence decisions must always include a specific recommendation for how the user can verify or validate the decision independently.

---

### Step 10 — Two-Way Communication Check

Communication is not complete when the summary is sent — it is complete when the user has understood it sufficiently to make the decisions it requires of them.

After any communication that requires a user decision (risk flag, trade-off, forward-looking note, re-approval request):
- Wait for a response before proceeding with work that depends on that decision.
- If the user's response indicates they misunderstood: do not repeat the same explanation. Reframe it from a different angle — use an analogy, a concrete example, or a simpler description of the same concept.
- If the user asks a follow-up question: answer it fully before resuming execution.

Do not interpret silence as comprehension. Do not interpret "ok" as informed approval. If a decision is significant enough to communicate, it is significant enough to confirm was understood.

---

### What Counts as Done

This rule is applied correctly when:
- [ ] Audience identified and communication calibrated to their level
- [ ] Communication trigger identified from the defined list — no over-communication or under-communication
- [ ] Reasoning glue present — What, Why, and Forward implications all covered for significant decisions
- [ ] Correct format used for the communication type (post-task, forward-looking, risk flag, trade-off, wrap-up)
- [ ] Confidence level stated for every significant decision
- [ ] Forward-looking notes written for all decisions that constrain future work
- [ ] Risk flags delivered at the correct severity and timing
- [ ] Session wrap-up delivered at end of every session
- [ ] Two-way check completed for communications requiring user decisions

---

### Blind Spots This Rule Explicitly Guards Against

- Over-communicating routine execution — creates noise that trains the user to ignore summaries.
- Under-communicating significant decisions — leaves the user unable to evaluate what was built.
- Presenting uncertain decisions with the same confidence as verified facts — leads to misplaced trust.
- Delivering a summary after a two-hour execution with no intermediate updates — the user was blind the entire time.
- Burying forward-looking implications in a general task summary — the user discovers the constraint when it's too late.
- Treating "ok" or silence as informed approval on a significant decision.
- Writing a summary for a senior engineer audience when the reader is a non-technical founder — the information is inaccessible.
- Delivering a risk flag without a recommended action — surfaces the problem without helping solve it.
- Repeating the same explanation when the user didn't understand — reframe it, don't repeat it.
- Skipping the session wrap-up — the next session starts without orientation.

---
## Rule 10 — Self-Correction Loop (Review Before It Leaves Your Hands)

### Purpose
Every output — code, configuration, documentation, migration, or environment change — must be reviewed by the agent before it is presented to the user or marked complete. This review is not a hygiene pass for leftover debug statements — it is a structured quality gate covering correctness, safety, readability, integration, and regression risk. Work that passes this gate is genuinely ready. Work that doesn't is sent back internally before the user ever sees it.

---

### Entry Condition — When This Rule Triggers
This rule triggers after every task is implemented and before it is marked `✅ Done` in `task.md`. The depth of the review is calibrated to the task tier from Rule 1:

| Tier | Review depth |
|---|---|
| **Tier 1** | Quick check — hygiene, correctness, one integration point |
| **Tier 2** | Full review — all categories in the checklist below |
| **Tier 3** | Full review + regression check + forward implication review |

---

### Step 1 — Review in Priority Order

Apply the review categories in this order. Higher priority categories are reviewed first — if a critical issue is found, fix it before continuing to lower priority checks.

| Priority | Category | What it covers |
|---|---|---|
| 1 | **Correctness** | Does the code do what the task required? Does it handle the expected inputs and produce the expected outputs? |
| 2 | **Security** | Does this output introduce any security surface from Rule 8? Any hardcoded secrets, missing validation, missing auth check? |
| 3 | **Error handling** | Are all failure paths handled? Does the code fail gracefully — no unhandled exceptions, no silent failures, no crashes on bad input? |
| 4 | **Regression risk** | Does this change break anything that existed before? Are modified function signatures, return values, or data shapes compatible with their callers? |
| 5 | **Readability** | Can another developer understand this code in 60 seconds without the author present? Are names meaningful? Is the logic flow clear? |
| 6 | **Integration** | Does this code integrate correctly with the surrounding code it was placed into? Does it follow the existing patterns, naming conventions, and architectural style? |
| 7 | **Hygiene** | No `console.log` / `print` / debug statements left in. No commented-out dead code. No unused imports or variables. No TODO comments that were supposed to be resolved in this task. |

---

### Step 2 — The Correctness Check

Read the task's Definition of Done from Rule 2. For each criterion:
- Is it met? If yes, confirm. If no, fix before proceeding.
- Are there edge cases the Definition of Done didn't mention that could produce an incorrect result?
  - Empty input
  - Null or undefined values
  - Maximum and minimum boundary values
  - Concurrent requests or race conditions (if applicable)
  - Unexpected data types passed by callers

If an edge case is found that was not covered in the Definition of Done: fix it if the fix is small and contained. If the fix is significant, log it in the Out-of-Scope Discovery Log and surface it to the user — do not silently expand the task scope.

---

### Step 3 — The Regression Check

For any task that modified existing code (not just created new files):

1. Identify every caller of the modified code — functions, components, or services that call the changed function, import the changed module, or depend on the changed data shape.
2. For each caller: confirm that the change is backward-compatible. If the function signature changed, the return value changed, or the data shape changed — every caller must be updated or the change must be made backward-compatible.
3. If tests exist for the modified code: run them. If they pass, confirm. If they fail, fix the regression before marking done — do not mark a task done with failing tests.
4. If no tests exist: note this in the Out-of-Scope Discovery Log as Medium severity.

---

### Step 4 — The Readability Check

Read the new or modified code as if you are seeing it for the first time. Ask:

- **Names:** Do variable, function, and class names describe what they are and do — not how they do it?
- **Function length:** Is each function doing one thing? If a function is doing more than one thing and is longer than ~30 lines, it is a candidate for extraction. Log it if out of scope.
- **Comments:** Are there comments that explain *why* something is done (valuable) rather than *what* the code does (redundant)? Remove redundant comments. Add why-comments where the reasoning is non-obvious.
- **Magic values:** Are there unexplained numbers, strings, or booleans hardcoded in the logic? Replace with named constants.
- **Complexity:** Is there a simpler way to express this logic that would be equally correct? Apply Rule 6's simplicity framework.

If the code cannot be understood in 60 seconds by a developer unfamiliar with this area: rewrite for clarity. Clever code that works is worse than clear code that works equally well.

---

### Step 5 — The Integration Check

When code is placed into an existing file or system:

- Does it follow the file's existing naming conventions? (camelCase vs snake_case, prefix patterns, etc.)
- Does it follow the file's existing architectural patterns? (how errors are handled, how async is managed, how data flows)
- Does it use the same utilities, helpers, and abstractions the rest of the file uses — or does it introduce a parallel approach?
- Is it placed in the right location within the file? (grouped with related functions, not dumped at the bottom)
- Does it introduce a new dependency that other parts of the file don't already use? If yes — is that dependency justified, or does an existing import cover it?

---

### Step 6 — The Hygiene Check

Apply this checklist to every code output before marking done:

- [ ] No `console.log`, `print`, `debugger`, `dd()`, or equivalent debug statements
- [ ] No commented-out code blocks (code that was tried and abandoned — delete it, don't comment it)
- [ ] No unused imports or variables that were added during development and not removed
- [ ] No TODO or FIXME comments that were supposed to be resolved in this task
- [ ] No hardcoded secrets, credentials, or environment-specific values
- [ ] No empty catch blocks that silently swallow errors
- [ ] No unreachable code (code after a return statement, dead branches)
- [ ] Formatting is consistent with the rest of the file (indentation, spacing, quote style)

---

### Step 7 — Non-Code Output Review

Self-review applies to all task outputs, not just code. Apply the relevant checklist:

**Configuration files (`.env`, `tsconfig.json`, `firebase.json`, etc.):**
- [ ] No secrets in committed config files
- [ ] Values are correct for the target environment (not copy-pasted from a different environment)
- [ ] The change does not affect other parts of the system that depend on this config
- [ ] The change is documented in the task file

**Database migrations:**
- [ ] Migration is reversible — a rollback path exists
- [ ] Migration does not delete or transform data in a way that cannot be undone
- [ ] Migration has been reviewed for performance impact on large datasets
- [ ] Migration is idempotent — running it twice does not corrupt data

**Documentation:**
- [ ] Accurate — reflects what the code actually does, not what it was intended to do
- [ ] Complete — no sections left as placeholders or "TBD"
- [ ] Written for the intended reader — not too technical or too vague for the audience

**Environment changes (CI/CD, hosting config, DNS, etc.):**
- [ ] Change is tested in a non-production environment first where possible
- [ ] Rollback plan exists if the change causes an outage
- [ ] Change is documented with the reason and the expected outcome

---

### Step 8 — Self-Review Output (Required)

The self-review is not complete until its findings are recorded. Add a review note to the task file:

```markdown
## Self-Review — [Task ID]

**Reviewed:** [Date + Time]
**Review depth:** [Quick / Full / Full + Regression]

**Issues found and fixed:**
- [Issue] → [How it was fixed]

**Issues found and logged (not fixed — out of scope):**
- [Issue] → [Logged in Out-of-Scope Discovery Log, severity: X]

**Regressions checked:** [Yes / Not applicable — new code only]
**Tests run:** [Yes — all pass / No tests exist — logged / Not applicable]

**Clean bill of health:** [Yes / No — describe what remains]
```

If the clean bill of health is "No" — the task is not marked Done. Fix the outstanding issues first or explicitly escalate to the user with the reason it cannot be resolved within the current task scope.

---

### What Counts as Done

This rule is applied correctly when:
- [ ] Review depth matched to task tier
- [ ] All seven review categories applied in priority order
- [ ] Correctness verified against Definition of Done including edge cases
- [ ] Regression check performed for all modified existing code
- [ ] Callers of modified code confirmed as backward-compatible or updated
- [ ] Readability check applied — magic values replaced, comments cleaned, complexity assessed
- [ ] Integration check confirmed — naming, patterns, and utilities consistent with surrounding code
- [ ] Hygiene checklist fully cleared
- [ ] Non-code outputs reviewed with the relevant checklist
- [ ] Self-review output recorded in task file
- [ ] Task marked Done only after clean bill of health confirmed

---

### Blind Spots This Rule Explicitly Guards Against

- Treating hygiene (console.logs, dead code) as the full scope of self-review — it is the lowest priority category.
- Diffing the changes without a structured review framework — the diff shows what changed, not whether it's correct or safe.
- Marking a task Done when tests are failing — failing tests mean the task is not done.
- Missing regressions in callers of modified functions — the modified code works, but it broke something it was feeding into.
- Reviewing only code outputs — configuration, migrations, and documentation need their own review checklists.
- Silently fixing an edge case that expands the task scope — log it and surface it instead.
- Clever code that the author understands but no one else will — clear code is always preferred.
- Self-review with no recorded output — the review happened invisibly and produced no accountability.
- Marking a task Done when the self-review found issues that were logged but not resolved — resolve or escalate first.

---
## Rule 11 — Automated Integrity Checks (Verify, Don't Assume)

### Purpose
Code that looks correct is not the same as code that is correct. Every task output must be verified by automated checks before it is marked done — not by visual inspection alone. This rule defines which checks to run, in what order, for which task types, across any technology stack, and what to do when a check fails. The goal is a codebase where every completed task leaves the system in a verifiably working state — not a hopefully working state.

---

### Entry Condition — When This Rule Triggers
This rule triggers at two points:

1. **Before the first task of a new plan begins** — to establish the pre-task baseline.
2. **After every task is implemented and Rule 10's self-review is complete** — to verify the output before marking done.

Both triggers are required. A post-task check without a pre-task baseline cannot distinguish new failures from pre-existing ones.

---

### Step 1 — Establish the Pre-Task Baseline

Before executing any task in a new plan, run the full check suite for the project's ecosystem (defined in Step 2) and record the results:

```markdown
## Integrity Baseline — [Plan Name]
**Date:** [Date]
**Pre-existing failures:**
- Lint: [0 errors, 3 warnings / or list specific pre-existing errors]
- Type check: [0 errors / or list]
- Tests: [X passing, Y failing — list failing test names]
- Build: [passing / failing]

**Agreed treatment of pre-existing failures:**
[Fix before starting / Accept and track / User decision required]
```

If pre-existing failures exist: surface them to the user before starting execution. Do not inherit a broken baseline silently — the user must decide whether to fix them first or accept them as known and track only new failures introduced by the current plan.

---

### Step 2 — Check Suite by Ecosystem

Run the appropriate checks for the project's technology stack. If the project uses multiple stacks (e.g. a React frontend with a Python backend), run the checks for each.

**JavaScript / TypeScript (Node.js, React, Next.js, etc.):**
```
1. tsc --noEmit              # Type check (fastest — run first)
2. eslint .                  # Lint
3. prettier --check .        # Formatting
4. npm run test              # Unit tests
5. npm run build             # Production build
6. npm run test:e2e          # E2E tests (slowest — run last)
```

**Python:**
```
1. mypy .                    # Type check
2. flake8 . / ruff check .   # Lint
3. black --check .           # Formatting
4. pytest                    # Tests
5. python -m build           # Build (if applicable)
```

**Go:**
```
1. go vet ./...              # Static analysis
2. staticcheck ./...         # Lint
3. gofmt -l .                # Formatting
4. go test ./...             # Tests
5. go build ./...            # Build
```

**Dart / Flutter:**
```
1. dart analyze              # Static analysis + type check
2. dart format --set-exit-if-changed . # Formatting
3. flutter test              # Tests
4. flutter build [target]    # Build
```

**Other ecosystems:** Apply the same pattern — type check → lint → format → test → build. Always run in this order: fastest checks first, slowest last. Stop and fix before proceeding to slower checks if a faster check fails.

---

### Step 3 — Check Set by Task Type

Do not run the full suite for every task. Match the check set to the task type. Running E2E tests after a documentation change is wasteful. Running only a type check after a database migration is insufficient.

| Task type | Minimum required checks |
|---|---|
| **Comment / documentation only** | Formatting check only |
| **CSS / styling only** | Lint + build (verify no broken imports) |
| **Single component / UI change** | Type check + lint + unit tests for that component + build |
| **Logic / utility function** | Type check + lint + unit tests for the function and its callers |
| **API endpoint** | Type check + lint + unit tests + integration tests for that endpoint |
| **Authentication / authorization** | Full suite including security scan (Rule 8) |
| **Database migration** | Type check + migration-specific tests + manual review of rollback path |
| **Configuration change** | Build + deployment environment parity check |
| **Dependency add / update** | Dependency audit (Rule 8 Step 5) + full test suite + build |
| **Refactor** | Full suite — type check + lint + all tests + build |
| **New feature (Tier 2)** | Full suite |
| **Architectural change (Tier 3)** | Full suite + E2E tests + performance check |

---

### Step 4 — Define "Passing"

A check is passing when it meets this threshold. Anything below is a failure.

| Check | Passing threshold |
|---|---|
| **Type check** | Zero type errors. Warnings may be accepted if pre-existing and documented in baseline. |
| **Lint** | Zero errors. Warnings: zero new warnings introduced by this task (pre-existing warnings are tracked in baseline). |
| **Formatting** | Zero formatting violations. Formatter must be run to fix, not just to check. |
| **Unit tests** | All tests pass. Zero new failures. Pre-existing failures documented in baseline are excluded. |
| **Build** | Build completes successfully with no errors. |
| **E2E tests** | All E2E tests pass. No new failures. |
| **Bundle size** | No more than 5% increase vs the pre-task baseline (Tier 2/3 tasks). Flag any increase over 5% to the user. |

A task is not done if any check is below its passing threshold. The check result — not the agent's confidence — determines whether the task is complete.

---

### Step 5 — Check Failure Protocol

When a check fails after a task is implemented:

1. **Identify whether the failure is new or pre-existing.**
   Compare against the pre-task baseline. If the failure was in the baseline, it is pre-existing and was agreed to be tracked — do not block the current task on it. If it is new, proceed to step 2.

2. **Identify the root cause of the new failure.**
   Is it caused directly by this task's changes? Or by an interaction with another part of the system? Check the diff — the failure should be traceable to a specific change made in this task.

3. **Fix the failure within the current task scope if possible.**
   If the fix is small and contained within the task's defined scope, fix it and re-run the checks.

4. **If the fix requires out-of-scope changes:**
   - Do not silently expand the task scope.
   - Mark the task as `⚠️ Blocked — check failure` in `task.md`.
   - Surface to the user:
     ```
     ⚠️ Check Failure — [Task ID]

     Check: [which check failed]
     Failure: [specific error or test name]
     Root cause: [what in this task caused it]
     Fix required: [description of what needs to change]
     Scope impact: [in-scope fix / requires out-of-scope change]

     Options:
     - Option A: [fix description — in scope]
     - Option B: [fix description — requires expanding scope]
     - Option C: Roll back this task and redesign the approach

     Which option should I take?
     ```
   - Do not proceed to the next task until the failure is resolved.

5. **Never mark a task Done with a known new check failure.**
   A task with a failing check is not done — regardless of whether the code looks correct, the feature appears to work manually, or the failure seems minor.

---

### Step 6 — Environment Parity Check

A build that passes locally can fail in CI/CD or production due to environment differences. For Tier 2 and Tier 3 tasks, verify:

- **Runtime version:** Is the local runtime version (Node, Python, Go, etc.) the same as the deployment environment? Check `.nvmrc`, `.python-version`, `go.mod`, or equivalent version pinning files.
- **Environment variables:** Does the task require any new environment variables? If yes, ensure they are added to `.env.example` (with placeholder values) and documented. Never add a new required env var without documenting it.
- **OS-specific behaviour:** Does any new code use file paths, line endings, or system calls that behave differently on Windows vs Unix? If the deployment target is Linux/Unix, test path handling explicitly.
- **CI configuration:** If the project has a CI configuration (`.github/workflows`, `Jenkinsfile`, `circleci.yml`, etc.), does the task require any change to it? If yes, update it and note the change in the task file.

---

### Step 7 — Performance and Bundle Size Check (Tier 2 / Tier 3)

For feature-level and architectural tasks, verify the performance impact before marking done:

- **Bundle size:** Compare the production build output size before and after the task. A greater than 5% increase requires a forward-looking note (Rule 9 Step 5) explaining what caused it and whether it is justified.
- **Render / response time:** If the task added a new computation, query, or network call to a critical path — estimate or measure the impact. Flag to the user if the impact is significant.
- **New dependencies:** Every new dependency adds to the bundle. Check the dependency's size using `bundlephobia.com` or equivalent before committing to it.

---

### Step 8 — Record Check Results

After all checks pass, record the results in the task file:

```markdown
## Integrity Check Results — [Task ID]

**Date:** [Date]
**Check set applied:** [Task type from Step 3]

| Check | Result | Notes |
|---|---|---|
| Type check | ✅ Pass | 0 errors |
| Lint | ✅ Pass | 0 new errors, 2 pre-existing warnings (baseline) |
| Formatting | ✅ Pass | |
| Unit tests | ✅ Pass | 47 passing, 0 failing |
| Build | ✅ Pass | |
| Bundle size | ✅ Pass | +1.2% vs baseline (justified — new feature) |

**New failures introduced:** None
**Pre-existing failures encountered:** [list or "None"]
**Environment parity confirmed:** [Yes / Not applicable]
```

---

### What Counts as Done

This rule is applied correctly when:
- [ ] Pre-task baseline established before first task execution
- [ ] Pre-existing failures surfaced to user and agreed treatment recorded
- [ ] Correct check set selected for the task type
- [ ] Checks run in order — fastest first, slowest last
- [ ] All checks meet the defined passing threshold — not just "no build errors"
- [ ] New failures distinguished from pre-existing baseline failures
- [ ] Check failures handled via the failure protocol — not ignored or worked around
- [ ] Environment parity confirmed for Tier 2 / Tier 3 tasks
- [ ] Performance and bundle size checked for Tier 2 / Tier 3 tasks
- [ ] Check results recorded in task file
- [ ] Task marked Done only after all checks pass

---

### Blind Spots This Rule Explicitly Guards Against

- Running `npm run build` and `tsc` as the entire integrity check — these cover two checks out of a full suite of ten.
- Hardcoding ecosystem-specific commands — the check suite must work for any technology stack.
- Running checks without a pre-task baseline — new failures cannot be distinguished from pre-existing ones.
- Inheriting a broken baseline silently — pre-existing failures must be surfaced to the user and agreed treatment recorded before starting.
- Running the full suite for a documentation change — calibrate check depth to task type.
- Running slow checks before fast ones — a type error discovered after a 10-minute E2E run is a wasted 10 minutes.
- Treating warnings as passing without checking whether they are new — new warnings introduced by a task are failures.
- Marking a task Done because it "looks like it works" when a check is failing — the check result is the authority.
- Missing environment differences between local and deployment — a local pass is not a deployment pass.
- Ignoring bundle size growth — a passing build that doubled the bundle size has failed a real quality criterion.

---
## Rule 12 — Senior Engineer Walkthrough (Prove It, Don't Just Ship It)

### Purpose
Every non-trivial implementation must be explainable in plain language — not to prove the agent is smart, but to prove the solution is sound. If an implementation cannot be explained clearly, it is not well understood. If it is not well understood, it cannot be maintained, debugged, or extended. This rule ensures every significant output is accompanied by a walkthrough that makes the logic transparent, the decisions visible, and the trade-offs explicit — for the current user and for any future developer who inherits the code.

---

### Entry Condition — When This Rule Triggers
This rule triggers after Rule 10 (self-review) and Rule 11 (integrity checks) are complete, for all Tier 2 and Tier 3 tasks. Tier 1 tasks require only a one-paragraph explanation, not a full walkthrough.

---

### Step 1 — Structure the Walkthrough

Every walkthrough must follow this structure. The depth scales with task complexity but the structure never changes:

```markdown
## Senior Engineer Walkthrough — [Task ID]: [Task Name]

### 1. The Problem
[What specific problem does this implementation solve? State it in one or two sentences
as if explaining to someone who has never seen the codebase. No jargon.]

### 2. The Approach
[How does the implementation solve it? Walk through the logic step by step.
Use numbered steps. Describe what each significant piece of code does and why
it does it that way — not just what it does.]

### 3. Why This Approach (Not the Alternatives)
[Name at least one alternative approach that was considered.
Explain specifically why it was rejected in favour of the chosen approach.
Trade-offs must be explicit — not "this is better" but "this trades X for Y because Z."]

### 4. The Critical Logic
[Identify the single most complex, subtle, or non-obvious part of the implementation.
Explain it in enough detail that a junior developer could understand it without
needing to run the code. If there is a regex, algorithm, or non-obvious data
transformation — break it down step by step.]

### 5. What Could Go Wrong
[Identify the most likely failure modes of this implementation under real conditions.
What happens on bad input? What happens under load? What happens if a dependency fails?
What assumption, if violated, would break this completely?]

### 6. How to Extend This
[If a new requirement arrives that is adjacent to what this implements — what would
need to change? What is the extension point? What should NOT be changed?]
```

---

### Step 2 — Calibrate Depth to Audience

Before writing the walkthrough, identify the reader from Rule 9 Step 1. Adjust:

- **Senior engineer:** Focus on trade-offs, non-obvious decisions, and extension points. Skip basic explanations.
- **Junior developer:** Explain every non-trivial step. Define terms. Include the "why" behind standard patterns, not just the patterns themselves.
- **Non-technical stakeholder:** Skip implementation detail entirely. Focus on what the feature does for the user, what risks were considered, and what was deliberately not built.

---

### Step 3 — The Critical Logic Requirement

Every walkthrough must identify and fully explain the single most complex part of the implementation. This is non-negotiable. Common examples:

- A non-obvious algorithm or data structure choice
- A regex pattern with multiple conditions
- An asynchronous flow with multiple failure paths
- A caching strategy with specific invalidation conditions
- A permission check that has multiple layers
- A database query with joins, filters, or aggregations

If the implementation has no complex logic — it is a straightforward task and a full walkthrough is not required. A one-paragraph explanation suffices.

---

### Step 4 — Walkthrough Delivery

The walkthrough is delivered:
- In the task file under the relevant task entry
- As part of the post-task communication to the user (Rule 9 Step 4) for Tier 2 and Tier 3 tasks
- As a code comment at the top of any new file that contains non-obvious logic — not the full walkthrough, but a 3–5 sentence summary of what the file does and why it exists

The walkthrough is NOT:
- A repeat of what the code says line by line
- A list of file paths with descriptions
- A summary of what was changed (that is the task log's job)
- Written after the fact to justify a decision already made — it is written as part of completing the task

---

### Step 5 — Walkthrough as a Quality Gate

If the walkthrough cannot be written clearly — the implementation is not ready. Difficulty explaining an implementation is a signal, not a blocker to work around. It means one of three things:

1. The implementation is more complex than it needs to be — simplify (Rule 6).
2. The implementation is not fully understood by the author — understand it before shipping it.
3. The problem itself is not fully understood — return to Rule 4 for clarification.

The walkthrough is not documentation written after the fact. It is a verification tool that surfaces problems in the implementation before they reach the user.

---

### What Counts as Done

This rule is applied correctly when:
- [ ] Walkthrough written for all Tier 2 and Tier 3 tasks before marking done
- [ ] All six sections present and completed — no placeholders
- [ ] Critical logic section identifies and fully explains the most complex part
- [ ] At least one alternative approach named and rejected with explicit trade-off reasoning
- [ ] Depth calibrated to the identified audience
- [ ] Walkthrough added to task file and delivered as part of post-task communication
- [ ] New files with non-obvious logic have a 3–5 sentence summary comment at the top
- [ ] If walkthrough could not be written clearly — implementation revisited before proceeding

---

### Blind Spots This Rule Explicitly Guards Against

- Writing the walkthrough as a list of file paths and changes — that is a log, not an explanation.
- Explaining what the code does without explaining why it does it that way.
- Skipping the alternatives section because "the chosen approach was obviously right" — no decision is obvious without context.
- Treating the walkthrough as optional documentation — it is a quality gate that surfaces implementation problems.
- Writing the walkthrough after marking the task done — it must be written as part of completing the task.
- Using the walkthrough to justify a bad decision rather than to surface it — if the trade-off is indefensible, fix the implementation.
- Writing at the wrong depth for the audience — a senior engineer walkthrough written for a junior developer wastes both parties' time.

---
## Rule 13 — Implementation Knowledge Base (The How-We-Built-It Log)

### Purpose
When a feature is fully working and tested, a permanent record of how it was built must be created. This record is not a changelog, not a commit message, and not a list of files changed. It is a structured implementation guide — written well enough that a developer who has never seen this codebase could understand what was built, why it was built that way, and how to avoid the mistakes made along the way. This log is the system's long-term memory. It is written once, written well, and never left as a draft.

---

### Entry Condition — When This Rule Triggers
This rule triggers exactly once per feature — when the feature is fully working and tested end-to-end. It does NOT trigger:
- During development
- After individual tasks are complete
- For small fixes, styling changes, config adjustments, or copy edits
- For partial implementations

The trigger is a feature that works completely, has passed all integrity checks from Rule 11, and has been confirmed by the user. Not before.

---

### Step 1 — File Location and Naming

Implementation records are stored in a dedicated folder structure:

```
docs/
  implementations/
    {milestone-name}/
      {feature-name}.md
```

- One folder per milestone (matching the milestone names from the PRD or task plan).
- One file per feature inside that milestone folder.
- File names use kebab-case: `user-authentication.md`, `contact-form.md`, `admin-deploy-flow.md`.
- If a `docs/implementations/` folder does not exist, create it.
- Never store implementation records in the root, in `task.md`, or mixed with other documentation.

---

### Step 2 — Implementation Record Format

Every implementation record must contain exactly these sections. No placeholders. No "TBD." If a section cannot be written, the feature is not ready to be logged.

```markdown
# Implementation: [Feature Name]
**Milestone:** [Milestone name]
**Completed:** [Date]
**Built by:** [Agent / Developer name]
**Status:** Complete

---

## 1. Problem
[What problem does this feature solve? Who does it affect? Why did it need to be built?
Write this in plain language — no technical jargon. If a non-technical person read this,
they should understand why this feature exists.]

## 2. Implementation Steps
[Numbered, sequential steps describing exactly how this feature was built.
Each step should be specific enough that a developer could reproduce it.
Include the key decisions made at each step — not just the actions taken.]

1. [Step one — what was done and why]
2. [Step two — what was done and why]
3. ...

## 3. Files Created / Modified
[Every file touched during this feature's implementation. For each file: its path,
what it does, and why it was created or modified.]

| File | Action | Purpose |
|---|---|---|
| [path] | Created / Modified | [What it does and why] |

## 4. Key Decisions
[The architectural and design decisions made during this feature's implementation.
For each decision: what was decided, what the alternatives were, and why this
choice was made. These are the decisions that a future developer must understand
before modifying this feature.]

| Decision | Alternatives considered | Reason chosen |
|---|---|---|
| [Decision] | [Alternatives] | [Reason] |

## 5. Pitfalls
[What went wrong during implementation. What dead ends were explored and abandoned.
What assumptions proved incorrect. What should NOT be done when working in this area.
This section is the most valuable part of the record — write it honestly.]

- **Pitfall:** [What went wrong or what to avoid]
  **Why it happens:** [The underlying reason]
  **What to do instead:** [The correct approach]

## 6. How to Extend This
[If a new requirement arrives that is adjacent to this feature — what is the
extension point? What files would need to change? What must not be changed?
What would break if the underlying data model or API changed?]
```

---

### Step 3 — Quality Standard for the Record

The implementation record is not a rough draft cleaned up later. It is written to production quality the first time. Apply these standards:

- **Accuracy:** The record describes what was actually built — not what was planned. If the implementation deviated from the plan, the record reflects the actual implementation.
- **Completeness:** Every section is filled. A missing section means the feature is not fully understood and is not ready to be logged.
- **Plain language:** The Problem section must be understandable by a non-technical reader. The Implementation Steps must be understandable by a developer who did not build this feature.
- **Honesty in pitfalls:** The Pitfalls section must reflect real problems encountered — not sanitised to look like the implementation was smooth. Honest pitfalls are the most valuable part of the record for future developers.
- **No doc drift:** The record is written immediately when the feature is complete — not days later when memory has faded and the accurate details are gone.

---

### Step 4 — What Does NOT Get Logged

To keep the knowledge base useful, the following do not receive implementation records:

- Typo or copy fixes
- CSS or styling tweaks
- Console.log removal
- Comment updates
- Small config adjustments
- Variable renaming
- Any change that does not constitute a complete, independently testable feature

If in doubt: ask whether a new developer could benefit from knowing how this was built. If the answer is no — do not log it.

---

### Step 5 — Record Maintenance

Implementation records are written once and updated only if the feature itself is significantly changed by a future implementation. When updating:
- Note the update date and what changed at the top of the file.
- Do not overwrite the original — append a dated update section.
- The original implementation history is preserved.

---

### What Counts as Done

This rule is applied correctly when:
- [ ] Feature is fully working and tested before logging begins
- [ ] Record created in `docs/implementations/{milestone}/{feature-name}.md`
- [ ] All six sections completed — no placeholders or TBDs
- [ ] Problem section written in plain language for non-technical readers
- [ ] Implementation steps specific enough to reproduce the build
- [ ] All files listed with their purpose
- [ ] Key decisions documented with alternatives and reasoning
- [ ] Pitfalls section written honestly — real problems, not sanitised summary
- [ ] Record written immediately on feature completion — not days later
- [ ] Record meets production quality standard — not a rough draft

---

### Blind Spots This Rule Explicitly Guards Against

- Logging after every small commit — the knowledge base becomes noise and stops being read.
- Writing the record during development — implementation details change constantly before completion.
- Sanitising the pitfalls section to make the implementation look smooth — honest pitfalls are the most valuable content.
- Leaving any section as a placeholder — an incomplete record is worse than no record because it creates false confidence.
- Storing records in the wrong location — mixed with task files, in the root, or in commit messages.
- Allowing doc drift — the record must describe what was actually built, not what was planned.
- Writing the record days after completion — memory fades and critical details are lost.

---

## Rule 14 — Legacy & Debt Management (Remove What No Longer Earns Its Place)

### Purpose
Every piece of code that exists in a codebase has a maintenance cost. Dead code — functions, files, imports, types, constants, and configurations that are no longer used — pays nothing and costs something every time a developer reads past it, wonders what it does, and decides to leave it "just in case." This rule ensures that code made obsolete by the current task is identified, evaluated, and removed deliberately — not left to accumulate silently.

---

### Entry Condition — When This Rule Triggers
This rule triggers at two points:

1. **During Rule 10 (self-review)** — when reviewing the changes made in the current task, actively look for code rendered obsolete by those changes.
2. **After Rule 11 (integrity checks) passes** — before marking a task done, confirm that all obsolete code identified has been handled.

This rule also triggers when the Out-of-Scope Discovery Log from Rule 5 contains entries flagged as dead code or technical debt from previous tasks.

---

### Step 1 — Identify Obsolete Code

After completing a task, actively search for code made obsolete by the changes. Do not rely on the compiler or linter to catch everything — many forms of dead code are syntactically valid and pass all checks.

Categories to check:

| Category | What to look for |
|---|---|
| **Unused functions** | Functions defined but never called after this change. Check all callers — not just obvious ones. |
| **Unused imports** | Imports that were needed before the change but are no longer referenced. |
| **Unused variables and constants** | Variables declared but never read, or constants that no longer match any usage. |
| **Unused types and interfaces** | Type definitions that were replaced by new types in this task. |
| **Replaced files** | Entire files that have been superseded by new implementations. |
| **Obsolete configuration** | Config keys or feature flags that no longer correspond to any active code path. |
| **Replaced API endpoints** | Old routes or handlers that were replaced by new ones in this task. |
| **Dead branches** | Conditional branches that can never be reached given the current logic. |
| **Commented-out code** | Code commented out during development and never restored — remove it, don't keep it. |
| **Stale TODOs** | TODO comments that were meant to be addressed in this task and now either are addressed or are no longer relevant. |

---

### Step 2 — Evaluate Before Removing

Not all apparently dead code should be immediately removed. Apply this evaluation before deleting:

**Remove immediately if:**
- The code is unreachable and has no callers, references, or usages anywhere in the codebase.
- The code was explicitly replaced by the current task's implementation.
- The code is commented-out and has been commented out for more than one task cycle.
- The TODO was meant to be addressed in this task.

**Investigate before removing if:**
- The code has no obvious callers but appears in a public API or exported module — it may be called by external consumers not visible in the current codebase.
- The code is referenced in a configuration file, test fixture, or seed data rather than in source code.
- The code has a comment suggesting it is intentionally kept for future use.

**Do not remove — log instead if:**
- Removal is out of scope for the current task (the dead code is in a file not touched by this task).
- Removal would require changes to multiple files and constitutes its own task.
- The code appears dead but its removal would require verifying external consumers.

---

### Step 3 — Removal Protocol

When dead code is confirmed safe to remove:

1. Remove it cleanly — do not comment it out. Commented-out code is not removed code.
2. Re-run the integrity checks from Rule 11 after removal to confirm nothing depended on it unexpectedly.
3. If the removal causes a check failure: the code was not actually dead. Restore it, log the false positive, and investigate the actual dependency.
4. Record the removal in the task file:

```markdown
## Dead Code Removed — [Task ID]

| Item removed | File | Reason | Verified by |
|---|---|---|---|
| [Function/file/import name] | [path] | [Why it was obsolete] | [Check that confirmed no dependents] |
```

---

### Step 4 — Technical Debt Log

For dead code and debt identified but not removed in the current task (out of scope), add it to the Technical Debt Log in the task file:

```markdown
## Technical Debt Log

| # | Item | File | Type | Severity | Identified in task | Recommended action |
|---|---|---|---|---|---|---|
| 1 | [Description] | [path] | [Dead code / Over-engineering / Missing tests / etc.] | [Low / Medium / High] | [Task ID] | [What should be done] |
```

Severity guide:
- **High** — actively misleads future developers or creates a real risk of bugs (e.g. a dead function with the same name as an active one).
- **Medium** — adds maintenance cost and confusion but no immediate risk.
- **Low** — cosmetic or minor — clutters the codebase but causes no functional harm.

The Technical Debt Log is reviewed at the start of every new planning session (Rule 2). High severity items must be scheduled in the next plan. Medium items are prioritised when adjacent work is planned. Low items are addressed opportunistically.

---

### Step 5 — The "Just In Case" Test

Before leaving any code in place that appears dead, apply this test explicitly:

*"What specific, confirmed future requirement would this code serve?"*

If the answer is a confirmed, planned requirement: keep it and document why in a comment.
If the answer is a hypothetical or unconfirmed future need: remove it. Code is not a hedge against unconfirmed futures — requirements are. If the requirement is confirmed later, the code can be written again with the benefit of the actual context.

Dead code left "just in case" is never a safe choice. It is a maintenance cost paid indefinitely against a future that may never arrive.

---

### What Counts as Done

This rule is applied correctly when:
- [ ] All ten categories of obsolete code checked after task completion
- [ ] Each identified item evaluated — remove, investigate, or log
- [ ] Confirmed dead code removed cleanly — not commented out
- [ ] Integrity checks re-run after removal to confirm no hidden dependencies
- [ ] All removals recorded in the task file
- [ ] Out-of-scope dead code logged in Technical Debt Log with severity
- [ ] "Just in case" test applied to any code left in place despite appearing dead
- [ ] Technical Debt Log reviewed at start of next planning session

---

### Blind Spots This Rule Explicitly Guards Against

- Leaving dead code "just in case" — unconfirmed future needs are not a justification for maintenance cost today.
- Commenting out dead code instead of deleting it — commented-out code is not removed code and accumulates indefinitely.
- Relying on the linter or compiler to catch all dead code — many valid forms of dead code pass all automated checks.
- Removing code without re-running integrity checks — the code may have had a hidden dependent.
- Not distinguishing between truly dead code and exported public API code with external consumers.
- Logging dead code in the Technical Debt Log and never reviewing it — debt logged without a review cycle is debt that grows permanently.
- Treating all technical debt as equal — High severity debt that misleads developers must be scheduled, not left indefinitely.

---

## Rule 15 — Artifact Hygiene (Production-Ready Before It Leaves Your Hands)

### Purpose
Every artifact produced by the workflow — task files, implementation records, walkthroughs, configuration files, environment files, and any other output that will be read or used by a human or system after this session — must be in production-ready condition before the session ends. A draft that is "good enough for now" becomes the permanent record the moment attention moves on. This rule ensures that nothing leaves the workflow in an unfinished state.

---

### Entry Condition — When This Rule Triggers
This rule triggers at two points:

1. **At the end of every task** — the task file entry for the completed task must be in final state before moving to the next task.
2. **At the end of every session** — all artifacts produced or modified during the session are reviewed for completeness and production quality before the session wrap-up (Rule 9 Step 8) is delivered.

---

### Step 1 — Define "Production-Ready" for Each Artifact Type

Production-ready means different things for different artifact types. Apply the relevant standard:

**Task file (`task.md`):**
- [ ] All completed tasks marked `✅ Done` with Definition of Done verified
- [ ] All in-progress tasks marked `🔄 In Progress` with current state noted
- [ ] All blocked tasks marked `⏸ Blocked` with blocker described
- [ ] All failed tasks marked `❌ Failed` with failure described and resolution status
- [ ] Self-review output present for all completed Tier 2 / Tier 3 tasks
- [ ] Integrity check results recorded for all completed tasks
- [ ] Dead code removal log updated
- [ ] Technical Debt Log updated
- [ ] Out-of-Scope Discovery Log updated
- [ ] Clarifications Log updated
- [ ] No placeholder text, no "TBD", no empty sections that were supposed to be filled

**Implementation record (`docs/implementations/{milestone}/{feature}.md`):**
- [ ] All six sections complete — no placeholders
- [ ] Problem section readable by a non-technical person
- [ ] Pitfalls section written honestly
- [ ] Accurate — reflects actual implementation, not planned implementation
- [ ] Written in present tense — describes what exists, not what was done

**Walkthrough (Rule 12 output):**
- [ ] All six sections present and completed
- [ ] Critical logic section explains the most complex part fully
- [ ] Alternatives named with explicit trade-off reasoning
- [ ] Written at the correct depth for the identified audience
- [ ] No placeholder reasoning — every decision explained

**Configuration files (`.env.example`, `tsconfig.json`, etc.):**
- [ ] No secrets or real credentials in committed files
- [ ] All new required environment variables documented in `.env.example`
- [ ] Comments explain non-obvious configuration values
- [ ] Changes noted in the task file

**Code comments:**
- [ ] Why-comments present where logic is non-obvious
- [ ] No what-comments that merely repeat what the code says
- [ ] No TODO comments left unresolved from the current task
- [ ] No commented-out code blocks

---

### Step 2 — The End-of-Task Artifact Check

After each task is marked done, before moving to the next task, verify:

```markdown
## End-of-Task Artifact Check — [Task ID]

- [ ] Task file entry complete and accurate
- [ ] Self-review output recorded (Tier 2 / Tier 3)
- [ ] Integrity check results recorded
- [ ] Walkthrough written and delivered (Tier 2 / Tier 3)
- [ ] All logs updated (dead code, debt, discoveries, clarifications)
- [ ] No placeholders remaining in any artifact touched by this task
```

If any item is unchecked: complete it before moving to the next task. Artifact hygiene debt accumulates exactly like code debt — it is always harder to clean up later than to do correctly now.

---

### Step 3 — The End-of-Session Artifact Review

At the end of every session, before delivering the session wrap-up (Rule 9 Step 8), review every artifact touched during the session:

1. Read every task file entry written or updated this session. Confirm it is accurate, complete, and in final state.
2. Read every implementation record written this session. Apply the production-ready standard from Step 1.
3. Read every walkthrough written this session. Confirm all sections are complete.
4. Check every configuration file modified this session. Confirm no secrets, no undocumented new variables.
5. Scan all code comments added this session. Remove what-comments. Confirm why-comments are present where needed.

For each artifact that fails the review: fix it before delivering the session wrap-up. The session wrap-up is the final output of the session — everything before it must be in production-ready state.

---

### Step 4 — The Draft Trap

The most common failure mode for artifact hygiene is the draft trap: an artifact is created quickly as a working draft with the intention of polishing it "before the end of the session." The session ends, attention moves on, and the draft becomes permanent.

To prevent the draft trap:
- Never create an artifact with placeholder text that says "fill in later" or "TBD."
- If a section cannot be completed now, do not create a placeholder — leave the section out and note in the task file that it must be completed before the task is marked done.
- Every artifact is written to its final standard on the first pass. Editing is acceptable. Placeholder-to-final rewriting is not.

---

### Step 5 — Visual Proof and Evidence (Where Applicable)

For features with a visual component or a user-facing outcome, attach evidence that the feature works as intended:

- **UI features:** A description of the verified visual state (e.g. "Login form renders correctly on mobile at 375px width. Error state shows inline validation message. Success redirects to dashboard."). If screenshots can be attached to the task file or implementation record, attach them.
- **API features:** The verified request/response pair (with sensitive data redacted) that confirms the endpoint works as expected.
- **Data migrations:** The before/after record counts or state confirmation that the migration ran correctly.
- **Configuration changes:** The verified output or behaviour that confirms the configuration change had the intended effect.

Evidence is not optional for Tier 2 and Tier 3 features. "It works on my machine" is not evidence.

---

### Step 6 — Artifact Ownership

Every artifact has one owner — the agent or developer who last touched it. Ownership means:
- The artifact is accurate at the time of handoff.
- Any known inaccuracies are explicitly noted.
- The next person to read it does not need to verify it from scratch.

When handing off at the end of a session: if any artifact is known to be incomplete or inaccurate, note it explicitly in the session wrap-up. Do not hand off silently broken artifacts.

---

### What Counts as Done

This rule is applied correctly when:
- [ ] Every artifact touched in the session reviewed against its production-ready standard
- [ ] End-of-task artifact check completed for each task before moving on
- [ ] End-of-session artifact review completed before session wrap-up is delivered
- [ ] No placeholder text in any artifact — "TBD" and "fill in later" do not exist
- [ ] Visual proof or evidence attached for all Tier 2 / Tier 3 features with verifiable outcomes
- [ ] All code comments reviewed — what-comments removed, why-comments present where needed
- [ ] Session wrap-up delivered only after all artifacts are confirmed in production-ready state
- [ ] Any known inaccuracies at handoff explicitly noted — no silent broken artifacts

---

### Blind Spots This Rule Explicitly Guards Against

- Creating placeholder sections with "TBD" intending to fill them in before the session ends — the session always ends sooner than expected.
- Writing the task file in rough note form and planning to clean it up later — later never comes.
- Treating "it works" as sufficient evidence for a feature — works how? verified how? by whom?
- Leaving TODO comments in code that were supposed to be resolved in the current task.
- Commenting out code instead of deleting it and calling it "cleaned up."
- Delivering the session wrap-up before reviewing artifacts — the wrap-up is the last thing, not a shortcut to ending the session.
- Handing off a session with silently inaccurate artifacts — the next session starts from a false baseline.
- Assuming configuration comments are self-explanatory — non-obvious values must be explained.

---
