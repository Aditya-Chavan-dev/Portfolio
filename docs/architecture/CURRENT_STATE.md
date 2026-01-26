# Current State Architecture

> **Date**: 2026-01-26
> **Project**: Portfolio (Aditya Chavan)

## 1. Application Overview
The portfolio is a Single Page Application (SPA) built with **React (+Vite)**, utilizing a custom "Phase" system for navigation instead of standard routing. It employs a "Cinematic" entry flow.

### Core Metrics (Estimated Baseline)
*   **Performance**: Unknown (To be measured).
*   **Bundle Size**: Large (due to `Three.js` potential usage in `TechNexus` and heavy animations).
*   **Tech Stack**: React 18, Tailwind CSS, Framer Motion, Firebase (Hosting/Firestore).

## 2. Route & Component Inventory

### "Virtual" Routes (Phase-based)
Managed in `App.jsx` state:
1.  **Entry (`PHASE_ENTRY`)**: `EntryGate.jsx` - Biometric/Hacking style lock screen.
2.  **Handshake (`PHASE_HANDSHAKE`)**: `CinematicIntro.jsx` - Video/Animation intro.
3.  **Hub (`PHASE_HUB`)**: `JourneyHub.jsx` - Main navigation center.
4.  **Story (`PHASE_STORY`)**: Placeholder for immersive mode.
5.  **Dashboard (`PHASE_DASHBOARD`)**: `HeroDashboard.jsx` - GitHub metrics visualization.
6.  **Projects (`PHASE_PROJECTS`)**: `ProjectsView.jsx` - Repository list with `TechNexus` overlay.

### Key Components
*   `LiveNavbar`: Responsive navigation bar (Top).
*   `TacticalHUD`: Heads-up display elements.
*   `SafeZone`: Error boundary/Layout wrapper.
*   `TechNexus`: High-complexity overlay for tech stack visualization.

## 3. Integrations & Dependencies
*   **Firebase**:
    *   Hosting: Static Assets.
    *   Firestore: Database (via rules in `database.rules.json`).
    *   Auth: Referenced in `firebase.js`.
*   **GitHub API**: `services/github.js` - Fetches User & Repo data.
*   **Fonts**: `Hitmarker` (Custom), Google Fonts interaction via CSP.
*   **Backend**: Existing `backend/` folder (Express server?) - *Note: Migration target for Cloud Functions.*

## 4. Current Configuration
*   **CSP**: Strict Content-Security-Policy in `index.html`.
*   **Meta**: Open Graph tags present (Title, Description, Image).
*   **Service Worker**: explicitly unregistered in `index.html`.
