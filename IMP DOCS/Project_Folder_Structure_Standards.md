# Project Folder Structure & Organization Standards

## 🔴 CRITICAL: FLAT STRUCTURE - NO SUBFOLDERS

**IMPORTANT:** Within each section folder (landing-page/, hub/, immersive-journey/, quick-access/*/), ALL files must be placed directly in that folder with **NO subfolders**. 

```
✅ CORRECT: src/landing-page/Hero.tsx
❌ WRONG:   src/landing-page/components/Hero.tsx
```

This keeps the structure simple and prevents confusion. Every file lives directly in its section folder.

---

## 🏗️ CRITICAL RULE: ALL CODE LIVES IN `src/`

**ABSOLUTE REQUIREMENT:** Every single line of code, every component, every utility, every type, every style file MUST be inside the `src/` folder. **NO EXCEPTIONS.**

```
❌ NEVER place code outside src/
✅ ALWAYS place code inside src/
```

If you find yourself creating a file outside `src/`, **STOP IMMEDIATELY** - you are violating the core organizational principle.

---

## 📁 Mandatory Folder Structure

```
src/
├── landing-page/           # Landing Page (First page user sees)
│   ├── LandingPage.tsx     # Main component (renders appropriate version)
│   ├── LandingPage.mobile.tsx    # Mobile-specific layout (OPTIONAL)
│   ├── LandingPage.desktop.tsx   # Desktop-specific layout (OPTIONAL)
│   └── [other files as needed - components, utils, types, styles, etc.]
│
├── hub/                    # Hub Page (Central navigation hub)
│   ├── Hub.tsx             # Main component
│   ├── Hub.mobile.tsx      # Mobile-specific layout (OPTIONAL)
│   ├── Hub.desktop.tsx     # Desktop-specific layout (OPTIONAL)
│   └── [other files as needed]
│
├── immersive-journey/      # Immersive Journey (Complete journey experience)
│   ├── ImmersiveJourney.tsx      # Main component
│   ├── ImmersiveJourney.mobile.tsx    # Mobile-specific layout (OPTIONAL)
│   ├── ImmersiveJourney.desktop.tsx   # Desktop-specific layout (OPTIONAL)
│   └── [other files as needed]
│
├── quick-access/           # Quick Access Section (4 subsections)
│   ├── projects/           # Projects Section
│   │   ├── Projects.tsx    # Main component
│   │   ├── Projects.mobile.tsx    # Mobile-specific layout (OPTIONAL)
│   │   ├── Projects.desktop.tsx   # Desktop-specific layout (OPTIONAL)
│   │   └── [other files as needed]
│   │
│   ├── experience/         # Experience Section
│   │   ├── Experience.tsx  # Main component
│   │   ├── Experience.mobile.tsx    # Mobile-specific layout (OPTIONAL)
│   │   ├── Experience.desktop.tsx   # Desktop-specific layout (OPTIONAL)
│   │   └── [other files as needed]
│   │
│   ├── contact/            # Contact Section
│   │   ├── Contact.tsx     # Main component
│   │   ├── Contact.mobile.tsx    # Mobile-specific layout (OPTIONAL)
│   │   ├── Contact.desktop.tsx   # Desktop-specific layout (OPTIONAL)
│   │   └── [other files as needed]
│   │
│   ├── skills/             # Skills Section
│   │   ├── Skills.tsx      # Main component
│   │   ├── Skills.mobile.tsx    # Mobile-specific layout (OPTIONAL)
│   │   ├── Skills.desktop.tsx   # Desktop-specific layout (OPTIONAL)
│   │   └── [other files as needed]
│   │
│   └── [QuickAccess.tsx if needed for routing]
│
├── shared/                 # Shared code across multiple sections
│   └── [shared utilities, components, hooks, types, styles, etc.]
│
├── App.tsx                 # Root app component
└── index.tsx               # App entry point
```

### 📱 Mobile vs Desktop Serving Pattern

**CRITICAL:** Content is the SAME for mobile and desktop. Only layout/styling differs.

**Pattern for Dynamic Serving:**

Each section's main component (e.g., `Projects.tsx`) is responsible for:
1. Detecting device type (mobile vs desktop)
2. Rendering the appropriate layout component
3. Passing the SAME content data to both layouts

**Example Structure:**
```typescript
// Projects.tsx - Main component (device detection & routing)
export const Projects = () => {
  const isMobile = useDeviceDetection(); // or useMediaQuery
  const content = useProjectsContent();  // Fetches from Firestore
  
  return isMobile 
    ? <ProjectsMobile content={content} />
    : <ProjectsDesktop content={content} />;
};

// Projects.mobile.tsx - Mobile layout
export const ProjectsMobile = ({ content }) => {
  // Render content in mobile-optimized layout
};

// Projects.desktop.tsx - Desktop layout  
export const ProjectsDesktop = ({ content }) => {
  // Render content in desktop-optimized layout
};
```

**Note:** The `.mobile.tsx` and `.desktop.tsx` files are OPTIONAL. Create them only when layouts differ significantly. For simple responsive CSS, keep everything in the main component.

---

## 🎯 Application Flow Structure

### User Journey
```
1. Landing Page (src/landing-page/)
   ↓
2. Hub (src/hub/)
   ↓
   ├─→ Immersive Journey (src/immersive-journey/)
   │
   └─→ Quick Access
       ├─→ Projects (src/quick-access/projects/)
       ├─→ Experience (src/quick-access/experience/)
       ├─→ Contact (src/quick-access/contact/)
       └─→ Skills (src/quick-access/skills/)
```

---

## 📋 File Placement Rules

### Rule 1: Page Isolation - Flat Structure
**Each page/section owns ALL its code in a flat folder structure.**

✅ **DO:**
```
src/landing-page/
  LandingPage.tsx          ← Main component
  Hero.tsx                 ← Hero component
  CTA.tsx                  ← CTA component
  animations.ts            ← Animation utilities
  types.ts                 ← Type definitions
  styles.css               ← Styles
```

❌ **DON'T:**
```
src/landing-page/
  components/Hero.tsx      ← WRONG! No subfolders
  utils/animations.ts      ← WRONG! No subfolders
  styles/landing.css       ← WRONG! No subfolders
```

❌ **ALSO DON'T:**
```
src/components/LandingHero.tsx     ← WRONG! Not in landing-page folder
src/utils/landingAnimations.ts    ← WRONG! Not in landing-page folder
```

### Rule 2: No Code Leakage
**Nothing related to a specific page/section should exist outside its folder.**

If you're building a feature for **Projects**, ALL files go directly in `src/quick-access/projects/` with no subfolders:
- Components → `src/quick-access/projects/ProjectCard.tsx`
- Styles → `src/quick-access/projects/styles.css`
- Types → `src/quick-access/projects/types.ts`
- Utilities → `src/quick-access/projects/utils.ts`

### Rule 3: Shared Code Exception
**Only use `src/shared/` when code is used by 2+ different sections. Keep files flat here too.**

✅ **DO use shared/ when:**
- A button component is used in Hub, Projects, AND Experience → `src/shared/Button.tsx`
- A utility function is needed by Landing Page AND Immersive Journey → `src/shared/animations.ts`
- A type is shared between Contact AND Skills → `src/shared/types.ts`

❌ **DON'T use shared/ when:**
- Code is only used in one section (keep it in that section's folder)
- You "might need it later" (YAGNI - You Aren't Gonna Need It)

### Rule 4: No Subfolders Within Sections
**Keep it simple - all files live directly in the section folder.**

❌ **NEVER create subfolders like:**
- `src/landing-page/components/` 
- `src/hub/styles/`
- `src/quick-access/projects/utils/`

✅ **ALWAYS keep files flat:**
- `src/landing-page/Hero.tsx`
- `src/hub/styles.css`
- `src/quick-access/projects/filterUtils.ts`

### Rule 5: Main Component Naming
**Each section folder must have a main component file matching the section:**

- `src/landing-page/LandingPage.tsx` ✅
- `src/hub/Hub.tsx` ✅
- `src/immersive-journey/ImmersiveJourney.tsx` ✅
- `src/quick-access/projects/Projects.tsx` ✅
- `src/quick-access/experience/Experience.tsx` ✅
- `src/quick-access/contact/Contact.tsx` ✅
- `src/quick-access/skills/Skills.tsx` ✅

---

## 🚨 Enforcement Rules

### Before Creating ANY File, Ask:

1. **Is this code?** → It MUST go in `src/`
2. **Which page/section is this for?** → Put it in that section's folder
3. **Is this component/util/type used ONLY in this section?** → Keep it in the section folder
4. **Is this shared by 2+ sections?** → Only then use `src/shared/`
5. **What type of file is this?** → Put it in the appropriate subfolder (components/, utils/, types/, etc.)

### Decision Tree for File Placement

```
New file to create
    │
    ├─ Is it code? 
    │   ├─ NO → Config files, docs, etc. can go in root
    │   └─ YES → Continue ↓
    │
    ├─ Which section is it for?
    │   ├─ Landing Page → src/landing-page/FileName.tsx
    │   ├─ Hub → src/hub/FileName.tsx
    │   ├─ Immersive Journey → src/immersive-journey/FileName.tsx
    │   ├─ Projects → src/quick-access/projects/FileName.tsx
    │   ├─ Experience → src/quick-access/experience/FileName.tsx
    │   ├─ Contact → src/quick-access/contact/FileName.tsx
    │   ├─ Skills → src/quick-access/skills/FileName.tsx
    │   └─ Multiple sections → src/shared/FileName.tsx
    │
    └─ Place file directly in the section folder (no subfolders!)
```

---

## ✅ Valid Examples

### Example 1: Building Project Card Component
```
Feature: Project card to display individual projects
Section: Projects (Quick Access)

Correct placement:
✅ src/quick-access/projects/ProjectCard.tsx
✅ src/quick-access/projects/projectStyles.css
✅ src/quick-access/projects/types.ts
```

### Example 2: Building Landing Page with Mobile/Desktop Layouts
```
Feature: Hero section with different layouts for mobile and desktop
Section: Landing Page

Correct placement:
✅ src/landing-page/LandingPage.tsx (main component, handles device detection)
✅ src/landing-page/LandingPage.mobile.tsx (mobile-specific layout)
✅ src/landing-page/LandingPage.desktop.tsx (desktop-specific layout)
✅ src/landing-page/heroAnimations.ts
✅ src/landing-page/types.ts
```

### Example 3: Building Shared Button Component
```
Feature: Primary button used in Hub, Projects, and Contact
Section: Multiple (shared)

Correct placement:
✅ src/shared/Button.tsx
✅ src/shared/buttonStyles.css
✅ src/shared/buttonTypes.ts
```

### Example 4: Building Content Management Hook
```
Feature: Hook to fetch and manage content from Firestore for admin editing
Section: Multiple (shared)

Correct placement:
✅ src/shared/useContent.ts
✅ src/shared/firestoreClient.ts
✅ src/shared/contentTypes.ts
```

---

## ❌ Invalid Examples (What NOT to Do)

### ❌ Example 1: Code Outside src/
```
WRONG:
components/ProjectCard.tsx        ← Code outside src/
utils/animations.ts               ← Code outside src/
styles/global.css                 ← Code outside src/

CORRECT:
src/quick-access/projects/ProjectCard.tsx
src/immersive-journey/animations.ts
src/shared/global.css
```

### ❌ Example 2: Creating Subfolders
```
WRONG:
src/landing-page/components/Hero.tsx     ← No subfolders allowed!
src/hub/styles/navigation.css            ← No subfolders allowed!
src/quick-access/projects/utils/filter.ts ← No subfolders allowed!

CORRECT:
src/landing-page/Hero.tsx
src/hub/navigation.css
src/quick-access/projects/filter.ts
```

### ❌ Example 3: Mixed Section Code
```
WRONG:
src/components/LandingHero.tsx           ← Not in landing-page folder
src/components/HubNavigation.tsx         ← Not in hub folder
src/components/ProjectCard.tsx           ← Not in quick-access/projects folder

CORRECT:
src/landing-page/Hero.tsx
src/hub/Navigation.tsx
src/quick-access/projects/ProjectCard.tsx
```

### ❌ Example 4: Premature Sharing
```
WRONG:
src/shared/ProjectCard.tsx    ← Only used in Projects section!

CORRECT:
src/quick-access/projects/ProjectCard.tsx
```

---

## 🔍 Self-Check Questions Before Creating Files

Before creating any file, answer these:

1. ✅ **Is this file inside `src/`?**
   - If NO → STOP, you're breaking the fundamental rule

2. ✅ **Is this for a specific section?**
   - If YES → Put it directly in that section's folder (no subfolders!)
   - If NO (truly shared) → Put it directly in `src/shared/` (no subfolders!)

3. ✅ **Am I creating subfolders?**
   - If YES → STOP, keep all files flat in the section folder
   - If NO → Good, continue

4. ✅ **Am I duplicating code?**
   - If similar code exists in another section → Consider moving to `src/shared/`
   - If code is section-specific → Keep it in the section

5. ✅ **Will this make sense 6 months from now?**
   - Can someone find this file easily?
   - Is the location obvious based on what it does?

---

## 🎯 Quick Reference Commands

### Creating a New Landing Page Component
```bash
# Correct
src/landing-page/NewComponent.tsx
src/landing-page/newComponent.css

# Wrong
src/landing-page/components/NewComponent.tsx  ❌ (no subfolders!)
src/components/NewLandingComponent.tsx        ❌ (wrong location)
components/Landing/NewComponent.tsx           ❌ (outside src/)
```

### Creating a New Project Feature
```bash
# Correct
src/quick-access/projects/ProjectGallery.tsx
src/quick-access/projects/galleryTypes.ts
src/quick-access/projects/filterProjects.ts

# Wrong
src/quick-access/projects/components/ProjectGallery.tsx  ❌ (no subfolders!)
src/projects/ProjectGallery.tsx                          ❌ (wrong location)
src/quick-access/ProjectGallery.tsx                      ❌ (not in projects/)
```

### Creating Shared Code
```bash
# Correct (used by Hub AND Projects)
src/shared/Card.tsx
src/shared/useAnimation.ts

# Wrong
src/shared/components/Card.tsx           ❌ (no subfolders!)
src/shared/ProjectCard.tsx               ❌ (only used in projects/)
src/shared/hooks/useAnimation.ts         ❌ (no subfolders!)
```

---

## 🔐 Mandatory Compliance

### When Building ANY Feature:

**BEFORE writing code:**
1. ✅ Identify which section this feature belongs to
2. ✅ Determine the correct folder path within `src/`
3. ✅ Verify NO subfolders will be created - all files go directly in the section folder
4. ✅ Verify the path follows the structure rules

**WHILE writing code:**
1. ✅ Keep ALL related files directly in the same section folder (flat structure)
2. ✅ NO subfolders like components/, styles/, utils/, etc.
3. ✅ Only move to `src/shared/` when truly needed by multiple sections
4. ✅ Keep `src/shared/` flat too - no subfolders there either

**AFTER writing code:**
1. ✅ Verify no code exists outside `src/`
2. ✅ Verify all files are in correct section folders
3. ✅ Verify NO subfolders were created anywhere
4. ✅ Verify no unnecessary duplication across sections

---

## 🚨 Violation Protocol

If you catch yourself violating these rules:

```
⚠️ FOLDER STRUCTURE VIOLATION DETECTED

I was about to create:
❌ src/landing-page/components/Hero.tsx

This violates the rule: No subfolders within section folders - keep all files flat.

CORRECTED:
✅ src/landing-page/Hero.tsx

Reason: All files should be placed directly in the section folder with no 
subfolders like components/, styles/, utils/, etc.
```

---

## 💾 Remember This Forever

**This is the ONLY folder structure for this project. It will NEVER change.**

Every feature you build from now until the end of time follows this structure:
- Landing Page → `src/landing-page/`
- Hub → `src/hub/`
- Immersive Journey → `src/immersive-journey/`
- Projects → `src/quick-access/projects/`
- Experience → `src/quick-access/experience/`
- Contact → `src/quick-access/contact/`
- Skills → `src/quick-access/skills/`
- Shared → `src/shared/` (only when truly shared)

**No exceptions. No special cases. No "just this once."**

---

## 📝 Summary Checklist

Before marking any code complete, verify:

- [ ] All code is inside `src/` folder
- [ ] Files are in correct section folders
- [ ] NO subfolders created (files are flat within each section)
- [ ] No code leakage between sections
- [ ] Shared code is actually shared (used by 2+ sections)
- [ ] Main component files are named correctly
- [ ] Structure matches the mandatory folder structure
- [ ] `src/shared/` is also flat (no subfolders there either)

**If all boxes are checked ✅ → Good to go!**

**If any box is unchecked ❌ → Fix before proceeding!**
