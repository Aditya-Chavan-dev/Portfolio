## Context Summary — HUB Redesign

**Tier:** 3

**What already exists relevant to this task:**
- `src/hub/Hub.tsx` acts as a dispatcher using `useIsMobile()`.
- `Hub.desktop.tsx` and `Hub.mobile.tsx` exist but contain the old bento-grid/cinematic hybrid layouts.
- `index.css` has some custom variables but lacks explicit definitions for `ethereal-glass` and `starstruck-bg-glow` as seen in our design experiments.

**Dependencies and affected areas:**
- `src/hub/Hub.tsx` → Entry point for the Hub page.
- `src/hub/Hub.desktop.tsx` → Desktop view.
- `src/hub/Hub.mobile.tsx` → Mobile view.
- `src/index.css` → Global design system tokens.
- `src/admin/EditableText.tsx` & `ImageUpload.tsx` → Content editing logic used in the hub.

**Spec vs Reality gaps found:**
- The current implementation claims to be "Cinematic" but uses old bento-grid proportions that don't match the new "Command Center" visual requirements.
- Viewport locking is attempted but often fails due to overflow; needs stricter CSS containment.

**Hidden config files relevant to this task:**
- `tailwind.config.js` → Controls theme colors (accent, bg-base).

**Existing partial implementations found:**
- `Hub.tsx` already implements the "Dynamic Serving" logic asked by the user, so no changes needed there. Focus will be on the layout files.

**Key constraints or risks identified:**
- Ensuring the entire UI fits in exactly 100vh across different screen resolutions.
- Replicating the "Gold Nebula" effect purely with CSS and SVG filters.
- Maintaining editing functionality (`EditableText`) while doing a complete layout swap.
