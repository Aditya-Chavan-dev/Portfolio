# Dynamic Serving Implementation Roadmap

> **Target Architecture**: Firebase Hosting + Cloud Functions (Middleware) + React
> **Total Duration**: ~16 Weeks
> **Status**: PLANNING (v3 - Optimized for Debugging/Style Isolation)

## Phase 0: Foundation (Weeks 1-2)
**Goal:** Risk-free infrastructure setup and baseline measurement.

### 0.1 Current State Audit
*   [ ] **Inventory**: Map all 25+ application routes and 50+ components.
*   [ ] **Baselines**: Record Mobile vs. Desktop Lighthouse scores.
*   [ ] **Integrations**: Document 3rd-party scripts (Analytics, Chat, Maps).
*   [ ] **Artifact**: Create `docs/architecture/CURRENT_STATE.md`.

### 0.2 Dev Environment & Config
*   [ ] **Firebase**: Init `functions`. Configure `firebase.json` rewrites.
*   [ ] **Emulators**: Ensure local `firebase emulators:start` runs Hosting + Functions.
*   [ ] **Dependencies**: Install `ua-parser-js`.

### 0.3 Robust Detection Logic (Crucial)
*   [ ] **Utility**: Create `src/utils/deviceDetection.js`.
*   [ ] **Bot Handling**: Explicitly detect crawlers (Googlebot, Twitterbot, LinkedInBot). **Strategy**: Always serve "Desktop" (High-Res) to bots to ensure OG Metadata is rich.
*   [ ] **Tablet Handling**: Treat iPad (Desktop UA) as "Desktop" layout, but add a `isTouchEligible` flag for client-side CSS adjustments.
*   [ ] **Test Suite**: 100+ UAs (include "Request Desktop Site" variations, in-app browsers, bots).

---

## Phase 1: Homepage Migration (Weeks 3-4)
**Goal:** Production Proof-of-Concept with STRICT style separation.

### 1.1 Architecture & Style Isolation
*   [ ] **Entry Point**: Refactor `main.jsx` using `window.IS_MOBILE` server flag.
*   [ ] **Directory Structure (Strict Separation)**:
    ```
    src/
    ├── desktop/
    │   ├── components/      # Desktop-only components
    │   ├── styles/          # Desktop-only CSS (e.g., desktop-home.css)
    │   └── HomePage.jsx
    ├── mobile/
    │   ├── components/      # Mobile-only components
    │   ├── styles/          # Mobile-only CSS (e.g., mobile-home.css)
    │   └── HomePage.jsx
    └── shared/
        ├── tokens/          # CONSTANTS ONLY (colors, fonts, spacing)
        │   └── design-system.css # CSS Variables (--primary-color, --font-xl)
        └── utils/           # Shared logic
    ```
    *   **Rule**: `mobile/` components can NEVER import from `desktop/` styles, and vice-versa.
    *   **Reasoning**: "Split styling code to 2 parts... completely separate to easier the debugging" (User Request).

### 1.2 Development
*   [ ] **Mobile View**: Independent CSS. Optimized for touch targets (44px+). No hover states.
*   [ ] **Desktop View**: Independent CSS. Complex animations, cursor interactions.
*   [ ] **Shared tokens**: Ensure brand consistency (Color hex codes, Font families) via CSS Variables, but layout logic is 100% specific to each platform.

### 1.3 Canary Deployment
*   [ ] **Feature Flag**: Traffic splitting (5% start).
*   [ ] **Verification**:
    *   `Vary: User-Agent` header check.
    *   **Style Isolation Check**: Verify Mobile build does not load `desktop-home.css`.
*   [ ] **Rollout**: 5% -> 25% -> 50% -> 100%.

---

## Phase 2: Core Pages Migration (Weeks 5-8)
**Goal:** SEO-critical pages (About, Projects).

*   **Workflow**: Analysis -> Dev -> Test -> Deploy.
*   **Edge Case**: "Request Desktop Site" from Mobile.
    *   **Test**: Manually verify that requesting desktop site actually serves the Desktop DOM.
    *   **UX**: Ensure the Desktop view is *usable* (scrollable) on a tiny phone screen.

---

## Phase 3: Interactive Features (Weeks 9-12)
**Goal:** Complex stateful logic.

*   **Auth State**: Ensure HTTP-only cookies work across both views.
*   **Deep Linking**: If a user clicks a link to `/projects/dashboard` from an email on mobile, ensure they get the Mobile Dashboard.

---

## Phase 4: Optimization (Weeks 13-15)
**Goal:** Performance & Refinement.

*   [ ] **Code Splitting**: Verify `MobileApp` chunk does NOT contain Desktop dependencies (Three.js).
*   [ ] **Server-Side Meta**: Ensure the specific Mobile HTML shell includes proper OG tags.

---

## Phase 5: Future-Proofing (Week 16+)
**Goal:** Standardize.

*   [ ] **CLI**: Generators for new pages.
*   [ ] **Docs**: Updated `CONTRIBUTING.md`.

---

## Risk Mitigation & Edge Cases

| Risk | Mitigation Strategy | Rollback |
| :--- | :--- | :--- |
| **Social Bot Cloaking** | **Strict Rule**: If `isBot` -> Serve Desktop HTML. | Revert detection logic. |
| **"Request Desktop Site"** | Respect UA string change. | N/A |
| **iPad Input Issues** | Detect `maxTouchPoints` on client-side. | Remove `.touch-device` logic. |
| **hydrate Error** | Root logic depends ONLY on `window.IS_MOBILE`. | Revert to Client-Side Rendering. |

## Success Metrics

*   **Mobile FCP**: < 1.0s
*   **Social Share**: Twitter/LinkedIn Card Validator passes.
*   **Debug/Maintenance**: Zero cross-platform CSS regressions reported by dev team.
