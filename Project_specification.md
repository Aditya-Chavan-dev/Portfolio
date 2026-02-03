# Project Specification: Live Digital Portfolio

This document defines the present-state functionality and behavior of the system.

## 🎯 1. System Capabilities
The system is a production-grade, real-time interactive portfolio. It consists of the following functional areas:

- **About Me**: Narrative section featuring professional summary and dynamic engagement metrics.
- **Projects**: Portfolio of technical case studies.
- **Professional Experience**: Interactive timeline and journey map.
- **Contact Hub**: Integrated communication gateway.
- **Engagement Layer**: FAQ and testimonial contribution portal.

## 🚀 2. Live Interaction & UX Behavior
The system exhibits real-time behaviors using the following logic:

- **Real-Time Counters**: Tracks total visits and concurrent active users.
- **Live Presence**: Displays a status indicator of current activity.
- **Interactive Hook**: 
    - Full-screen typewriter intro with blinking cursor.
    - Post-intro fade-in for primary and secondary calls to action.
- **Suggestive Navigation**: Contextual prompts (nudges) appear based on user scroll position and dwell time.

## 🗺️ 3. Navigation Architecture (User Flow)
Derived from the Master Workflow Diagram:
1.  **Entry** (`Link Clicked`) -> **Landing Page 1** (Cinematic Intro).
2.  **The Crossroads**: **Hero Section**.
    *   *Path A*: **Immersive Journey** <==> **Full Portfolio**. (Bi-directional).
    *   *Path B*: **Quick Navigation** (Hub).
        *   -> **Certifications**
        *   <==> **Experience**
        *   <==> **Projects**
        *   <==> **About Me**
    *   *Note*: "Double Arrow" implies explicit "Back" or "Exit" capability returning to the hub.

- **Frontend Architecture**: Flat Feature-Based Architecture (Consolidated Logic).
- **Environment**: 
    - React 19 (Vite).
    - Tailwind CSS v4.
    - TypeScript.
    - Typography: Inter (Google Fonts) with strict weight hierarchy.
- **Project Structure**:
    - `src/LandingPage/`: Unified entry for initial user experience (Desktop/Mobile).
    - `src/HeroSection/`: Main interface with "Immersive Journey" and "Quick Navigation" gateways.
    - `src/QuickNavigation/`: Modular repository for primary content pillars (About Me, Projects, Experience, Certifications).
    - `src/ImmersiveJourney/`: Independent narrative storytelling module with unique design and logic.
    - `src/Background/`: Real-time interactive canvas environments (Particle and Neural systems).
    - `src/Admin/`: Administration dashboard and internal tools.
- **Security Protocols**: 
    - Configuration managed via `import.meta.env` (Environment Variables).
    - Secrets removed from source code.
    - Root-level file exclusion (`.gitignore`) for sensitive configuration files.

## 📂 4. Functional Components

### A. Narrative & Experience
- **Experience Days Counter**: Logic to calculate and display duration since career inception.
- **Academic Records**: Display of degrees and achievements.
- **Landing Page Orchestrator**: A high-level gateway that performs binary device classification (Mobile vs Desktop) and serves distinct, isolated application bundles.
- **Split-Screen Layout Engine (Desktop)**: A realized two-column architecture that balances narrative density with quick-access navigation, eliminating negative space.
- **Neural Grid Environment**: A 60-node interactive canvas background that responds to mouse movement, creating a "living system" atmosphere.
- **Kinematic Layout Engine**: A physics-based animation system (Spring Physics) that manages fluid layout transitions without sub-pixel distortion, ensuring "breathing" UI adaptations.
- **Github Visualization Engine**: A specific sub-system within the "About Me" module that fetches, parses, and renders live contribution data from GitHub APIs. Includes a **Merged Stats Integration** within the User Profile, a custom-styled **Heatmap (52-week Responsive Grid)** ending on the current day, and an interactive **Tech Arsenal Marquee** with pause-on-hover/click capability.

### B. Project Showcase
- **Case Study Model**: Markdown-based rendering of technical narratives including feature lists and technical challenges.

### C. Feedback & Social Proof
- **Testimonial Portal**: User-facing interface for leaving endorsements.
- **FAQ System**: Interactive question-and-answer module.

## ⚡ 5. Performance Standards
- **Assets**: Image delivery via WebP/AVIF formats.
- **Layout**: CSS aspect-ratio stabilizers to prevent Cumulative Layout Shift (CLS).
- **Benchmarks**: Target of 100/100 across all Lighthouse metrics.

---
