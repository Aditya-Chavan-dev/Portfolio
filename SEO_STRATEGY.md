# SEO & Social Strategy: Live Digital Portfolio

This document defines the approach to achieve a 100/100 Lighthouse score and high-fidelity social sharing.

## 🎯 1. Meta Tag Strategy
- **Standard**: Unique Title and Description for every page (Hub, Journey slides, Project details).
- **Robots**: `index, follow` for all public pages.

## 🖼️ 2. Dynamic OpenGraph Cards
- **Goal**: High-fidelity social preview cards that reflect the live state.
- **Implementation**:
    - **Base Image**: A sleek, dark-themed background with branding.
    - **Dynamic Overlay**: For each project, overlay the title, tech stack, and a "Live Interaction" badge.
    - **Tooling**: Likely an Edge Function or a server-side canvas renderer (Satori/Resvg).

## 🏷️ 3. Schema Markup (JSON-LD)
- **Person**: Structured data for professional identity (Name, JobTitle, Socials).
- **Project**: For each case study (Name, Description, URL, Image, TechStack).
- **FAQ**: For the FAQ section to get rich snippets in search results.

## ♿ 4. Accessibility & Performance (SEO Impact)
- **Image Alt Tags**: Mandatory descriptive text for all images.
- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<footer>`, and heading hierarchy (h1 -> h6).
- **Canonical URLs**: Ensure single source of truth for all pages.
