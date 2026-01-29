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

## ⚙️ 3. Technical Implementation State
The system is currently implemented with the following architecture:

- **Frontend Environment**: 
    - React 19 (Vite) with Feature-Sliced Design (FSD) layering.
    - Tailwind CSS v4 for styling.
    - TypeScript for type safety.
- **Log Layers**:
    - `app/`: Global providers and entry point.
    - `pages/`: Route-level composition.
    - `widgets/`: Complex UI modules.
    - `features/`: Isolated business logic.
    - `entities/`: Domain data models.
    - `shared/`: Generic utilities and UI primitives.
- **State Management**: Zustand (Client state) and TanStack Query (Server state).
- **Security Protocols**: 
    - Environment-variable based secret management.
    - Root-level file exclusion (`.gitignore`) for sensitive configuration files.

## 📂 4. Functional Components

### A. Narrative & Experience
- **Experience Days Counter**: Logic to calculate and display duration since career inception.
- **Academic Records**: Display of degrees and achievements.

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
