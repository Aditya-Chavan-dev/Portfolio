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


## [2026-01-30 | 09:25:00] - Commit: TYPOGRAPHY_FINAL_POLISH
**No change required for this commit.**
**Reason for irrelevance**: This commit is a UI/UX refinement and animation extension. No errors or logical defects were triggered or resolved.

---




---

## [2026-01-31 | 09:15:00] - Commit: RESTRUCT_IMMERSIVE_V1
**No change required for this commit.**
**Reason for irrelevance**: Architectural configuration and skeleton implementation. No logic errors or runtime defects were encountered while establishing the independent module structure or the state-switching mechanism.
**No change required for this commit.**
**Reason for irrelevance**: This commit is an architectural refactor and skeleton implementation. No runtime defects or logic errors were encountered while establishing the new directory structure or integrating the sections.
**No change required for this commit.**
**Reason for irrelevance**: This commit is an architectural refactor and feature extension. No runtime defects or logical errors were encountered during the implementation of the new navigation options or the directory migration.
**No change required for this commit.**
**Reason for irrelevance**: This commit is an architectural refactor. While it broke temporary build aliases during the transition (which were resolved by updating `vite.config.ts`), no functional defects or runtime errors were encountered or resolved.

---

## [2026-01-31 | 14:30:00] - Commit: STRUCT_ADMIN_V1
**No change required for this commit.**
**Reason for irrelevance**: This commit is a structural addition of a new, isolated module. No existing code was modified in a way that could trigger regression, and no runtime errors were encountered during the folder creation.

---

## [2026-01-31 | 18:37:06] - Commit: LANDING_PAGE_REFINEMENT_V2

### Description of the problem encountered
**Scale Distortion Artifact**: Text elements appeared 'shaky', 'blurry', or 'jittery' during the layout expansion animation.

### Root cause (logical, design, or assumption failure)
**Optimization Logic Failure**: Framer Motion optimizes layout animations by applying a CSS \scale\ transform to the parent container. This is performant but causes child text elements to be stretched/squashed visually during the frame interpolation, resulting in a 'shaking' alias affect.

### User or system impact
The animation felt 'laggy' and 'low quality', directly undermining the 'State-of-the-art' claim of the portfolio.

### Resolution applied
**Inverse Scale Locking**: Applied the \layout\ prop directly to the text containers (children). This forces Framer Motion to recalculate the child's geometry frame-by-frame (Inverse Scale Correction) to counteract the parent's distortion.

### Justification for why this solution was chosen over alternatives
While slightly more expensive computationally, maintaining crisp text during animation is non-negotiable for a typography-centric design.

---

## [2026-01-31 | 21:45:00] - Commit: SECURITY_SECRET_REMOVAL
### Description of the problem encountered
**Security Incident**: Discovery of hardcoded sensitive credentials (Firebase API Keys and Project IDs) directly embedded within `src/services/firebase.ts`.

### Root cause (logical, design, or assumption failure)
**Process Failure**: The initial development phase lacked a strict "Secret Scanning" gate. Developers committed functional code without abstracting configuration into environment variables, assuming a private repo was sufficient protection (Security through Obscurity).

### User or system impact
**Critical Vulnerability**: If the repository were to be made public or accessed by an unauthorized party, they would immediately gain write-access to the Firebase instance.

### Resolution applied
1.  **Purge**: Removed all hardcoded strings and replaced them with `import.meta.env`.
2.  **Rotation**: Generated new API Keys and advised Service Account rotation.
3.  **Prevention**: Implemented a `scan:secrets` script and a strict `.env.example` template to prevent recurrence.
4.  **Audit**: Conducted a deep regex scan of the entire codebase to certify it clean.

### Justification for why this solution was chosen over alternatives
Immediate removal and rotation is the only acceptable industry standard. Leaving "obfuscated" keys is insufficient; they must be completely removed from the source.


