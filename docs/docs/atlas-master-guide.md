---
sidebar_position: 1
title: ATLAS Master Guide
description: The comprehensive technical and design manual for the ATLAS System.
---

# ATLAS: System Master Guide

> "We moved the burden from the Brain to the Pocket."

## 1. System Overview
**ATLAS** is not just a portfolio; it is a high-performance system designed to solve specific operational inefficiencies. It is built as a **Monorepo** ensuring a unified development lifecyle for all components.

### Architecture
The system is composed of three primary pillars:
*   **Frontend:** A high-velocity `React + Vite` application, deployed to **Firebase Hosting**.
*   **Backend:** A robust `Node.js + Express` API, handling business logic and deployed to **Render**.
*   **Infrastructure:** `Firebase` handles Authentication, Database, and Hosting configuration.

---

## 2. The User Experience
ATLAS is designed with a specific "Entry Ritual" to shift the user's mindset from passive browsing to active engagement.

### The Entry Gate
When a recruiter or user first arrives, they do not see a generic landing page. They are presented with the **System Entry Gate**.

**The Design:**
*   **Visuals:** Full-screen, minimal interface. No scroll. Neutral, distraction-free background.
*   **Interaction:** A single, centered note and a primary Call-to-Action button.
*   **Purpose:** To create an intentional *pause*. It forces the user to acknowledge they are entering a live system, distinguishing the experience from static websites.

---

## 3. Flagship Feature: The Cognitive Load Assassin
This feature addresses the critical failure point in legacy site management: **The Memory Game.**

### The Problem (The Legacy Way)
The Managing Director previously carried the mental burden of tracking **10+ construction sites daily**.
*   **Mental Fatigue:** Constantly remembering "Did I call Site A? Did Site B report?"
*   **Data Loss:** If a call was forgotten, the attendance data was lost forever.
*   **Fraud Risk:** Reliance on "He-said-she-said" unverified claims.

### The Solution (The ATLAS Way)
We implemented a system logic that eliminates the need for memory.
1.  **One-Tap Action:** The site manager opens the app and taps "Mark In".
2.  **Server Lock:** Validated by an immutable server timestamp. No fakes allowed.
3.  **Instant Feedback:** A success card appears immediately, reducing anxiety.

### The Impact
:::tip Engineering Win
**We shifted the cognitive load from the User to the System.**
The system eliminates invalid input. The employee simply taps, and the server locks the truth. Zero cognitive load, zero fraud, and absolute peace of mind.
:::

---

## 4. Technical Structure
The project is organized for scalability.

| Directory | Purpose | Stack |
| :--- | :--- | :--- |
| `frontend/` | The User Interface | React, Vite, Tailwind |
| `backend/` | API & Logic | Node.js, Express |
| `firebase/` | Config & Rules | Firestore Rules |
| `docs/` | Documentation | Docusaurus |

