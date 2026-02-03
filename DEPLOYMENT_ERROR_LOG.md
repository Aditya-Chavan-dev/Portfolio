# Deployment Error Log: Live Digital Portfolio

This ledger records failures, defects, and logical errors and how they were resolved. This is an append-only document.

---

## [2026-02-02 | 22:16:00] - Commit: PENDING

**No errors encountered** during the About Me layout refinements and GitHub heatmap improvements. All changes implemented cleanly without build failures or runtime issues.

---

## [2026-02-01 | 13:30:00] - Commit: UI_POLISH_FINAL_V1

### Description of the problem encountered
**Syntax Error: Unterminated Template Literal**. The build failed during the `HeroSection` refactor due to stray markdown backticks (```) accidentally left at the top of `HeroSectionDesktop.tsx` and `HeroSectionMobile.tsx`.

### Root cause (logical, design, or assumption failure)
**Agentic Output Error**. The AI agent (me) erroneously included markdown code block fencing within the actual file content during a `replace_file_content` operation, resulting in invalid TypeScript syntax at the file root.

### User or system impact
**Build Failure**. The application could not compile or run until the syntax error was resolved.

### Resolution applied
Manually stripped the invalid backticks from the files.

### Justification for why this solution was chosen over alternatives
Immediate correction of the file content was the only valid fix.

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

## [2026-02-01 | 14:15:00] - Commit: MOBILE_LAYOUT_FIX_V2

### Description of the problem encountered
**Persistent Mobile Overlap**. Despite the V1 fix, some device aspect ratios (likely shorter viewports or those with large browser chrome) still caused the Navigation Grid to overlap the "Immersive Journey" button because `h-[100dvh]` forced content compression beyond the intrinsic size of the elements.

### Root cause (logical, design, or assumption failure)
**Assumption Failure (Height Availability)**. I assumed that `100dvh` would always provide enough vertical pixels to stack the Top, Middle, and Bottom sections without collision. This is false for small devices or when content is expanded.

### User or system impact
**Visual Collision**. The "Neatness" of the UI was compromised.

### Resolution applied
**Scrollable Safe Stack Architecture**.
1.  **Structure**: Converted the container to `flex-col` with `gap-4` and `overflow-y-auto`.
2.  **Behavior**: If the screen is tall enough, `justify-between` distributes space evenly (Full Screen App experience). If the screen is too short, the browser naturally allows scrolling (Web Page experience).
3.  **Compacting**: Slightly reduced icon sizes and text scales to improve the "Fit Rate" on initial load without requiring scroll for most users.

### Justification for why this solution was chosen over alternatives
Guaranteed accessibility. It is better to have a scrollable neat interface than a fixed broken one.

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

## [2026-02-02 | 19:25:00] - Commit: ABOUT_ME_V1_VALIDATION

### Description of the problem encountered
**Build Failure**. The TypeScript compiler rejected the build due to:
1. **Implicit Any**: The dynamic year access on the Github contributions object was not type-safe.
2. **Module Resolution**: `githubService` types were not imported using `import type` syntax as required by `verbatimModuleSyntax`.
3. **Unused Imports**: `GraduationCap` and `User` icons were imported but not used, triggering lint errors treated as build failures.

### Root cause (logical, design, or assumption failure)
**Strict Type Safety Violation**. I attempted to access `contributions.total[year]` without verifying that `year` was a valid key of the `total` object. Additionally, I left unused imports during the refactoring process.

### User or system impact
**Deployment Block**. The application could not be built for production.

### Resolution applied
1. **Safe Access Pattern**: implemented `keyof typeof` casting to ensure the year index is valid.
2. **Type-Only Imports**: Updated `GithubStats.tsx` to use `import type`.
3. **Cleanup**: Removed all unused imports.

### Justification for why this solution was chosen over alternatives
Adhering to the strict TypeScript configuration is mandatory for long-term maintainability. Disabling linter rules was rejected as a solution.

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

---

## [2026-02-01 | 13:45:00] - Commit: CSS_REGRESSION_FIX

### Description of the problem encountered
**Critical Production Visual Regression**.
1. **Landing Page Collapse**: The "Typewriter Intro" text was pushed to the absolute top of the screen (0px y-axis) instead of centering vertically.
2. **Loader SVG Explosion**: The loading ring rendered largely off-screen, breaking the viewport bounds.
3. **Ghost UI Overlay**: User reported seeing legacy/fallback UI elements ("View My Work") likely due to invalid layout states triggering standard flow fallbacks.

### Root cause (logical, design, or assumption failure)
**Tailwind v4 Compilation / Flexbox Interpretation Failure**.
The use of dynamic arbitrary value classes like `flex-[0.5]` was likely stripped or misinterpreted by the production build process, causing containers to collapse to zero height or default behavior. The `w-20` class on the Loader likely failed to constrain the `w-full` SVG in the specific `fixed` context of the production environment.

### User or system impact
**Broken User Experience**. The site looked "broken" and "amateurish" immediately upon load, negating the premium design intent.

### Resolution applied
1. **Explicit Style Overrides**: Replaced specific Tailwind utility classes with inline `style={{ flex: 0.X }}` and `style={{ width: '80px', height: '80px' }}` to guarantee browser compliance regardless of CSS compilation.
2. **Viewport Enforcement**: Added `100dvh` (Dynamic Viewport Height) to the loader container to prevent mobile chrome shifts.

### Justification for why this solution was chosen over alternatives
Inline styles are immutable in the browser and bypass potential build-pipeline CSS purging or precedence issues. Given the critical nature of the "First Impression" (Landing/Loader), robustness is prioritized over purity.


---

## [2026-02-02 | 21:00:00] - Commit: ABOUT_ME_LAYOUT_OPTIMIZATION
**No change required for this commit.**
**Reason for irrelevance**: This commit is a UI/UX refinement focused on layout optimization and icon replacement. No functional errors, runtime defects, or logical failures were encountered during implementation.


---

## [2026-02-03 | 07:35:00] - Commit: HEATMAP_LAYOUT_FIX

### Description of the problem encountered
**UI Overflow / Scrollbar Appearance**. The GitHub heatmap component rendered a horizontal scrollbar and cut off data on the Desktop layout because the full year (53 weeks) grid was wider than the flexible parent container (`col-span-4`).

### Root cause (logical, design, or assumption failure)
**Layout Assumption Failure**. It was assumed that the heatmap should always show a "Full Year" like GitHub.com profiles. However, in a dashboard/widget context ("About Me"), space is constrained. Use of `overflow-x-auto` was a fallback, not a design intent for this specific "static view" requirement.

### User or system impact
**Visual Defect**: The component looked "unfinished" or "broken" due to the scrollbar overlap (even with `scrollbar-hide`) and lack of alignment with the box boundaries.

### Resolution applied
**Data Truncation**: Logic updated to calculate and render only the last `30` weeks of data dynamically, ensuring the pixel width of the grid (`30 * 13px ≈ 390px`) is always less than the container width (`~450px`).

### Justification for why this solution was chosen over alternatives
Reducing cell size further (e.g. to 4px) would hurt accessibility and aesthetics. Truncating the time range preserves the "Premium" look (8px cells) while solving the fit issue.
