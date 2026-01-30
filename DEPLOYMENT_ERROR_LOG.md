# Deployment Error Log: Live Digital Portfolio

This ledger records failures, defects, and logical errors and how they were resolved. This is an append-only document.

---

## [2026-01-29 | 09:20:00] - Commit: 4628ef9

### Description of the problem encountered
Push rejection from GitHub due to the presence of sensitive secrets (`GITHUB_TOKEN` and `serviceAccountKey.json`) within the repository history.

### Root cause (logical, design, or assumption failure)
**Assumption Failure**: It was assumed that a root-level `.gitignore` was not immediately necessary for a new project initialization, or that manual environment management would suffice. Files containing secrets were staged and committed before a robust exclusion policy was enforced.

### User or system impact
The system was in a non-deployable state as GitHub's security rules blocked all push attempts to the `main` branch, preventing the synchronization of the new architectural foundation.

### Resolution applied
1.  **Secret Purge**: Removed the `GITHUB_TOKEN` from the local `.env` file.
2.  **Governance Enforcement**: Created a comprehensive root-level `.gitignore` to block `.env`, `serviceAccountKey.json`, and common build artifacts.
3.  **History Reconstruction**: Executed a `git reset --mixed` to the last clean commit, re-staged the codebase with the new exclusion rules, and force-purged the sensitive files from the git cache before re-committing.

### Justification for why this solution was chosen over alternatives
A clean reset and purge was the only way to satisfy GitHub's audit requirements and ensure that no sensitive credentials remained in the accessible history. This approach prioritizes long-term security over preserving a single faulty commit.

---

## [2026-01-29 | 09:40:00] - Commit: 0c13bcd
**No change required for this commit.**
**Reason for irrelevance**: This commit establishes the governance framework itself. No errors, defects, or logical failures were encountered during the implementation of these documentation files.

---

## [2026-01-29 | 13:25:00] - Commit: CLEANUP_20260129_01
**No change required for this commit.**
**Reason for irrelevance**: This commit was strictly for organizational cleanup and documentation renaming. No functional errors or defects were encountered or resolved.

---

## [2026-01-29 | 18:25:00] - Commit: PHASE_1_IRON_WALL
**No change required for this commit.**
**Reason for irrelevance**: This commit implements the architectural foundation. While it addresses "Blind Spots" identified during planning (potential future errors), no actual runtime errors or defects were encountered during the execution of the restructuring itself. The "Iron Wall" is a preventive measure, not a defect resolution.

## [2026-01-30 | 09:12:00] - Commit: TYPOGRAPHY_REFACTOR_V1
**No change required for this commit.**
**Reason for irrelevance**: This commit addresses a design refinement request (User Feedback) rather than a functional error or system defect. No bugs were triggered or fixed; only styles and assets were updated.

---

