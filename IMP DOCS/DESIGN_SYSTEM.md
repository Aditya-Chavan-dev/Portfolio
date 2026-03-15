# Aditya Chavan Portfolio — Design System v1.0
> **Single Source of Truth.** Every color, size, spacing value, duration, and animation in this portfolio references a token defined in this document. No hardcoded hex values anywhere in the codebase. Ever.

**Stack:** React (Vite) · Tailwind CSS · Framer Motion · Three.js · Firebase  
**Fonts:** Cormorant Garamond (display) · JetBrains Mono (body/UI)  
**Theme:** Dark-first · Warm gold accent · Cream light mode  
**Token file location:** `src/styles/tokens.css`  
**Theme switch:** `[data-theme="light"]` on `<html>` element

---

## Table of Contents

1. [Design Tokens — Complete CSS](#1-design-tokens--complete-css)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing System](#4-spacing-system)
5. [Layout System](#5-layout-system)
6. [Responsive Structure](#6-responsive-structure)
7. [Borders, Radius & Dividers](#7-borders-radius--dividers)
8. [Shadows & Depth](#8-shadows--depth)
9. [Background System](#9-background-system)
10. [Iconography](#10-iconography)
11. [Imagery & Media](#11-imagery--media)
12. [Visual Density](#12-visual-density)
13. [Buttons](#13-buttons)
14. [Form Elements](#14-form-elements)
15. [Navigation Components](#15-navigation-components)
16. [Feedback Components](#16-feedback-components)
17. [Data Display Components](#17-data-display-components)
18. [Overlay Components](#18-overlay-components)
19. [Interaction States](#19-interaction-states)
20. [Motion & Micro-Interactions](#20-motion--micro-interactions)
21. [Accessibility](#21-accessibility)
22. [Responsive Rendering](#22-responsive-rendering)
23. [Font Performance](#23-font-performance)
24. [Image & Media Optimization](#24-image--media-optimization)
25. [CSS Architecture](#25-css-architecture)
26. [Theming System](#26-theming-system)
27. [Rendering Efficiency](#27-rendering-efficiency)
28. [Platform Consistency](#28-platform-consistency)
29. [Micro-Level Details](#29-micro-level-details)
30. [The 10 Laws](#30-the-10-laws)

---

## 1. Design Tokens — Complete CSS

Copy this entire block into `src/styles/tokens.css`. This file must be the **first import** in `main.tsx`.

```css
/* ── Aditya Chavan Portfolio — tokens.css v1.0 ── */
/* THE LAW: Every color, size, duration references a token. Never hardcode. */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=JetBrains+Mono:wght@300;400;500&display=swap');

:root {
  /* ── Fonts ── */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;

  /* ── Backgrounds (Dark Mode Default) ── */
  --color-bg-primary:     #0A0A0F;   /* Abyss — page bg */
  --color-bg-secondary:   #111118;   /* Ink — card surfaces */
  --color-bg-tertiary:    #16161E;   /* Dusk — inner card regions */
  --color-bg-hover:       #1C1C26;   /* Hover surface for interactive cards */

  /* ── Text — varied temperature, not all the same tone ── */
  --color-text-heading:   #F2F0FA;   /* 17.8:1 AAA — pg-title, hero, card titles */
  --color-text-primary:   #E8E6F0;   /* 16.8:1 AAA — subsec labels, hover targets */
  --color-text-secondary: #A8A4B8;   /*  7.1:1  AA — body copy, descriptions */
  --color-text-key:       #C4C0D8;   /* table first-col keys — soft violet */
  --color-text-value:     #9896A8;   /* table values, law descriptions */
  --color-text-muted:     #5C5970;   /* helper text, timestamps, skip hints */
  --color-text-ghost:     #282633;   /* decorative large text only — near-invisible */
  --color-text-code:      #B8D4B0;   /* token names, inline code — sage green */

  /* ── Accent — ONE color. Use sparingly. ── */
  --color-accent:         #C9A96E;   /* Tawny Gold — 6.3:1 AA */
  --color-accent-muted:   #8B6F42;   /* Burnished — hover state of accent */
  --color-accent-faint:   rgba(201,169,110,0.07);  /* tinted surface, hover bg */
  --color-accent-glow:    rgba(201,169,110,0.15);  /* primary button shadow */

  /* ── Borders ── */
  --color-border:         rgba(255,255,255,0.07);  /* card borders */
  --color-border-mid:     rgba(255,255,255,0.12);  /* hover borders */
  --color-border-accent:  rgba(201,169,110,0.25);  /* focused / active */
  --color-border-ghost:   rgba(255,255,255,0.04);  /* section dividers */
  --color-overlay:        rgba(10,10,15,0.85);     /* modal backdrop */

  /* ── Semantic ── */
  --color-success:  #3D9E5A;
  --color-warning:  #C07840;
  --color-error:    #C03838;
  --color-info:     #4488CC;

  /* ── Border Radius ── */
  --r-xs:   2px;     /* tags, tiny badges */
  --r-sm:   4px;     /* buttons, inputs, code snippets */
  --r-md:   8px;     /* secondary cards */
  --r-lg:   12px;    /* primary cards, modals */
  --r-xl:   16px;    /* bottom sheet top corners */
  --r-full: 9999px;  /* toggle knob, avatars, live dot */

  /* ── Spacing (4px base unit) ── */
  --sp-1:  4px;    /* inline icon gap, tight labels */
  --sp-2:  8px;    /* button vertical padding, tag gap */
  --sp-3:  12px;   /* card inner element gap */
  --sp-4:  16px;   /* card padding, form field gap */
  --sp-5:  20px;   /* nav item gap */
  --sp-6:  24px;   /* card padding comfortable, grid gap */
  --sp-8:  32px;   /* between components within section */
  --sp-10: 40px;   /* nav height, welcome block gap */
  --sp-12: 48px;   /* between subsections */
  --sp-16: 64px;   /* page edge padding desktop */
  --sp-20: 80px;   /* between major section components */
  --sp-24: 96px;   /* between sections */
  --sp-32: 128px;  /* section vertical padding */
  --sp-40: 160px;  /* hero breathing space */

  /* ── Shadows ── */
  --shadow-none:   none;
  --shadow-sm:     0 2px 8px rgba(0,0,0,0.15);       /* light mode card default */
  --shadow-md:     0 4px 16px rgba(0,0,0,0.20);      /* light mode card hover */
  --shadow-accent: 0 4px 20px rgba(201,169,110,0.20); /* primary btn hover ONLY */
  --shadow-modal:  0 24px 48px rgba(0,0,0,0.40);     /* modals, bottom sheets */
  --shadow-focus:  0 0 0 3px rgba(201,169,110,0.4);  /* focus ring alternative */
  --shadow-inner:  inset 0 1px 3px rgba(0,0,0,0.15); /* pressed button */

  /* ── Easing ── */
  --ease-expo: cubic-bezier(0.16,1,0.3,1);    /* elements entering — primary curve */
  --ease-back: cubic-bezier(0.34,1.56,0.64,1); /* tags, icon buttons — slight overshoot */
  --ease-std:  cubic-bezier(0.4,0,0.2,1);     /* page transitions, layout shifts */
  --ease-in:   cubic-bezier(0.4,0,1,1);       /* exit animations ONLY, never entry */

  /* ── Durations ── */
  --dur-instant:  80ms;    /* hover color shifts, icon swaps */
  --dur-fast:     150ms;   /* button press, border color, input focus */
  --dur-normal:   300ms;   /* card hover lift, underline grow, toast entry */
  --dur-enter:    500ms;   /* components entering viewport, modal entry */
  --dur-slow:     700ms;   /* page transitions, section heading reveal */
  --dur-dramatic: 1200ms;  /* welcome screen ONLY — never use elsewhere */
}

/* ── Light Mode Override ── */
/* Only color tokens change. All radius, spacing, motion tokens inherit from :root. */
[data-theme="light"] {
  --color-bg-primary:     #F5F2EC;
  --color-bg-secondary:   #EAE6DF;
  --color-bg-tertiary:    #DED9D0;
  --color-bg-hover:       #D2CCC2;

  --color-text-heading:   #06060A;   /* max contrast — page titles */
  --color-text-primary:   #0D0D0F;   /* 18.1:1 AAA — near-black */
  --color-text-secondary: #2C2B32;   /* 12.4:1 AAA — body text */
  --color-text-key:       #1A1820;   /* table keys — darkest */
  --color-text-value:     #3A3845;   /* table values */
  --color-text-muted:     #52505C;   /* helper, timestamps */
  --color-text-ghost:     #B8B4C0;   /* decorative only */
  --color-text-code:      #1E5C2E;   /* deep forest green */

  --color-accent:         #966030;   /* 5.2:1 AA — deeper amber on cream */
  --color-accent-muted:   #7A4C22;
  --color-accent-faint:   rgba(150,96,48,0.07);
  --color-accent-glow:    rgba(150,96,48,0.15);
  --color-border:         rgba(0,0,0,0.10);
  --color-border-mid:     rgba(0,0,0,0.18);
  --color-border-accent:  rgba(150,96,48,0.35);
  --color-border-ghost:   rgba(0,0,0,0.05);
  --color-overlay:        rgba(245,242,236,0.92);
  --color-success:  #1A6B35;
  --color-warning:  #8B4A10;
  --color-error:    #9B1C1C;
  --color-info:     #1A4E8C;
}

/* ── Global Number Rendering ── */
/* JetBrains Mono defaults to oldstyle figures (look like letters at small sizes).
   Force lining tabular numerals with slashed zero everywhere mono is used. */
body, .tbl td, .tbl th, .code pre,
.sp-val, .sp-tok, .zi-val, .zi-lbl {
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "lnum" 1, "tnum" 1, "zero" 1;
}

/* ── @keyframes ── */
@keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes shimmer     { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes float-anim  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes pulse-ring  { 0%{box-shadow:0 0 0 0 rgba(201,169,110,.5)} 70%{box-shadow:0 0 0 10px rgba(201,169,110,0)} 100%{box-shadow:0 0 0 0 rgba(201,169,110,0)} }
@keyframes bounce-in   { 0%{transform:scale(.5);opacity:0} 60%{transform:scale(1.1)} 80%{transform:scale(.95)} 100%{transform:scale(1);opacity:1} }
@keyframes spin-slow   { to{transform:rotate(360deg)} }
@keyframes spin-full   { to{transform:rotate(360deg)} }
@keyframes fade-up     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
@keyframes slide-in-r  { from{transform:translateX(110%)} to{transform:none} }
@keyframes prog-fill   { to{width:100%} }
```

---

## 2. Color System

### Dark Mode Palette

| Token | Hex | Name | Contrast | Usage |
|---|---|---|---|---|
| `--color-bg-primary` | `#0A0A0F` | Abyss | — | Page background |
| `--color-bg-secondary` | `#111118` | Ink | — | Card surfaces |
| `--color-bg-tertiary` | `#16161E` | Dusk | — | Inner card regions, code blocks |
| `--color-bg-hover` | `#1C1C26` | Hover | — | Interactive card hover state |
| `--color-text-heading` | `#F2F0FA` | Frost | 17.8:1 AAA | Page titles, hero name, card titles |
| `--color-text-primary` | `#E8E6F0` | Cool White | 16.8:1 AAA | Subsection labels, hover targets |
| `--color-text-secondary` | `#A8A4B8` | Lavender Slate | 7.1:1 AA | Body copy, descriptions |
| `--color-text-key` | `#C4C0D8` | Soft Violet | — | Table first-column keys |
| `--color-text-value` | `#9896A8` | Dim Slate | — | Table values, law text |
| `--color-text-muted` | `#5C5970` | Deep Slate | — | Helper text, timestamps, skip hints |
| `--color-text-ghost` | `#282633` | Ghost | — | Decorative large text only |
| `--color-text-code` | `#B8D4B0` | Sage Green | — | Token names, inline code |
| `--color-accent` | `#C9A96E` | Tawny Gold | 6.3:1 AA | THE one accent — see usage rules |
| `--color-accent-muted` | `#8B6F42` | Burnished | — | Hover state of accent elements |
| `--color-accent-faint` | `rgba(201,169,110,0.07)` | — | — | Tinted hover surfaces |
| `--color-success` | `#3D9E5A` | Sage | — | Form validation success |
| `--color-warning` | `#C07840` | Ochre | — | Near-limit warnings |
| `--color-error` | `#C03838` | Crimson | — | Form errors, failures |
| `--color-info` | `#4488CC` | Steel | — | Informational states |

### Light Mode Overrides

| Token | Dark Value | Light Value | Notes |
|---|---|---|---|
| `--color-bg-primary` | `#0A0A0F` | `#F5F2EC` | Warm cream |
| `--color-bg-secondary` | `#111118` | `#EAE6DF` | Linen |
| `--color-text-heading` | `#F2F0FA` | `#06060A` | Max contrast |
| `--color-text-secondary` | `#A8A4B8` | `#2C2B32` | 12.4:1 AAA |
| `--color-accent` | `#C9A96E` | `#966030` | Darker amber for cream bg |

### Accent Color Usage Rules

The accent `#C9A96E` (dark) / `#966030` (light) is used for **exactly**:
- Cursor blink in typewriter and forms (`caret-color`)
- Active nav dot and active nav link text
- Tag borders and tag text
- Primary button background
- Active underlines on links and nav
- Section counter text (`01 /` format)
- Hover borders on interactive elements
- Theme toggle knob (stays gold in both modes — the visual signature)
- The section divider center dot (only decorative element in portfolio)

**Never** use the accent for body text, backgrounds, or decoratively anywhere else.

### Depth System (Dark Mode)

Cards feel lifted without box-shadow because they sit on a lighter surface:

```
#0A0A0F (page)  →  #111118 (card)  →  #16161E (inner)  →  #1C1C26 (hover)
```

### Border Opacity Scale

| Token | Value | Usage |
|---|---|---|
| `--color-border-ghost` | `rgba(255,255,255,0.04)` | Section dividers, barely-there lines |
| `--color-border` | `rgba(255,255,255,0.07)` | Default card borders |
| `--color-border-mid` | `rgba(255,255,255,0.12)` | Hover state borders |
| `--color-border-accent` | `rgba(201,169,110,0.25)` | Focused / active borders |

---

## 3. Typography

### Font Families

| Role | Font | Fallback |
|---|---|---|
| Display / Heading | Cormorant Garamond | Georgia, "Times New Roman", serif |
| Body / UI / Mono | JetBrains Mono | "Courier New", monospace |

**Pairing philosophy:** Editorial serif meets developer mono. Communicates "I think about design AND I write code." Never use Inter, Space Grotesk, or Poppins.

### Font Weights in Use

| Weight | Usage |
|---|---|
| Cormorant 300 | All display text — name, dialogue, section headings, card titles |
| Cormorant 400 | Card titles needing more presence (project name on hub) |
| Cormorant 500 | Pull quotes, testimonial names |
| Cormorant 600 Italic | Single-word emphasis within dialogue lines |
| JetBrains 300 | All body copy, descriptions, CTA text, nav links |
| JetBrains 400 | UI labels, tags, section counters, form labels |
| JetBrains 500 | Avoided — sparingly for critical UI labels only |

### Type Scale (Responsive clamp values)

> **Rule:** `clamp(min, preferred, max)` — `min` is the mobile floor (sacred, never crossed). `preferred` is vw-based. `max` is the desktop ceiling.

| Element | Size | Font & Style |
|---|---|---|
| Hero Name | `clamp(36px, 6vw, 72px)` | Cormorant 300, tracking -0.02em |
| Hero Role | `clamp(11px, 1.4vw, 14px)` | Cormorant 300, tracking 0.25em, uppercase |
| Dialogue Lines | `clamp(18px, 3vw, 34px)` | Cormorant Italic 300, line-height 1.55 |
| Section Heading | `clamp(26px, 4.5vw, 54px)` | Cormorant 300, tracking -0.01em |
| Section Counter | `clamp(10px, 1vw, 11px)` | JetBrains 400, tracking 0.2em, uppercase, accent |
| Card Title | `clamp(18px, 2vw, 22px)` | Cormorant 400 |
| Card Subtitle | `clamp(11px, 1.2vw, 13px)` | JetBrains 300, color: text-secondary |
| Body / Description | `13px` (fixed) | JetBrains 300, line-height 1.8, max-width 540px |
| UI Tags / Badges | `9–10px` (fixed) | JetBrains 400, tracking 0.10em, uppercase |
| CTA Text | `12px` (fixed) | JetBrains 300, tracking 0.05em |
| Nav Links | `10px` (fixed) | JetBrains 400, tracking 0.12em, uppercase |
| Skip Hint | `10–11px` (fixed) | JetBrains 300, color: text-muted, tracking 0.05em |
| Form Labels | `11px` (fixed) | JetBrains 400, tracking 0.08em |
| Form Helper Text | `10px` (fixed) | JetBrains 300, color: text-muted |
| Tooltip | `10px` (fixed) | JetBrains 300, text-heading on bg-tertiary |
| Footer / Legal | `10px` (fixed) | JetBrains 300, color: text-muted |
| Journey Scene Number | `clamp(80px, 12vw, 140px)` | Cormorant 300, tracking -0.04em, opacity 0.08, ghost color |

### Line Height System

| Context | line-height |
|---|---|
| Display / Headings | 1.0 – 1.1 |
| Dialogue lines | 1.5 – 1.6 |
| Body copy | 1.8 |
| UI labels / tags | 1.0 – 1.2 |
| Form helper text | 1.6 |
| Testimonial body | 1.75 |

### Letter Spacing

| Context | Value |
|---|---|
| Hero name | -0.02em |
| Section headings | -0.01em |
| Role / subtitle | 0.25em |
| Nav links | 0.12em |
| Tags / labels | 0.10em |
| Section counters | 0.20em |
| CTA text | 0.05em |
| Button text | 0.10em |

### Text Rendering Rules

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga" 1, "calt" 1, "lnum" 1, "tnum" 1;
}
/* Cormorant ligatures: "liga" 1, "calt" 1 */
/* JetBrains slashed zero: "zero" 1 */
/* Lining tabular numerals everywhere mono is used: "lnum" 1, "tnum" 1 */
/* text-rendering: optimizeLegibility on headings ONLY — causes GPU thrash on body */
```

### Number Rendering

All numeric contexts use lining tabular numerals to prevent `1` from looking like `l` and `0` from looking like `O`:

```css
font-variant-numeric: lining-nums tabular-nums;
font-feature-settings: "lnum" 1, "tnum" 1, "zero" 1;
```

**Exception:** Large editorial stat numbers (52px Cormorant) — `font-variant-numeric: lining-nums` only. Tabular is unnecessary at display size.

### Emphasis Styles

| Style | Implementation |
|---|---|
| Inline accent underline | Span with `color: accent` + gradient underbar `linear-gradient(to bottom, transparent 58%, rgba(201,169,110,.2) 58%)` |
| Mono break in serif | `<code>` element with `font-family: mono`, accent color, accent-faint bg, border |
| Weight contrast | Cormorant 300 → 600 italic within same sentence |
| Large stat number | Cormorant 300 at 52px, accent color, lining-nums |
| Two-color split | Muted text → accent for the payoff word |

### Text Decoration & Selection

```css
/* Custom underlines — never browser default */
/* Underlines drawn via CSS ::after, width 0→100%, 300ms expo-out */

::selection {
  background: rgba(201,169,110,0.2); /* gold tint in both modes */
  color: inherit;
}

caret-color: var(--color-accent); /* on all inputs and textareas */

::placeholder {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-weight: 300;
  font-size: 12px;
}
```

### Text Alignment

- **All text is left-aligned.** Center alignment is never used.
- Exception: Journey scene numbers — decorative, `opacity: 0.08`, center in full viewport.
- Right-alignment only for numeric data inside tables.
- `word-spacing: 0` everywhere — JetBrains Mono has built-in correct spacing.
- `orphans: 2; widows: 2` on body copy paragraphs.
- `hyphens: auto` on testimonial body text **only**. Never on headings or UI text.

---

## 4. Spacing System

**Base unit: 4px.** Every spacing value is a multiple of 4. Nothing is arbitrary.

| Token | Value | Primary Usage |
|---|---|---|
| `--sp-1` | 4px | Inline icon gap, tight label spacing |
| `--sp-2` | 8px | Button vertical padding, tag gap |
| `--sp-3` | 12px | Card inner element gap |
| `--sp-4` | 16px | Card padding, form field gap, list item gap |
| `--sp-5` | 20px | Nav item gap |
| `--sp-6` | 24px | Card padding (comfortable), project card grid gap |
| `--sp-8` | 32px | Between components within a section |
| `--sp-10` | 40px | Nav height, welcome screen block gap |
| `--sp-12` | 48px | Between subsections |
| `--sp-16` | 64px | Page edge padding (desktop), welcome screen edges |
| `--sp-20` | 80px | Between major section components |
| `--sp-24` | 96px | Between sections |
| `--sp-32` | 128px | Section vertical padding (top and bottom) |
| `--sp-40` | 160px | Hero breathing space |

### Specific Component Spacing

| Context | Value |
|---|---|
| Welcome: name to role gap | 4px (`--sp-1`) |
| Welcome: role to dialogue gap | 40px (`--sp-10`) |
| Welcome: dialogue to CTA gap | 40px (`--sp-10`) |
| Welcome: edge padding desktop | 64px (`--sp-16`) from all edges |
| Welcome: edge padding mobile | 24px (`--sp-6`) from all edges |
| Nav height (desktop sticky) | 64px |
| Nav height (mobile bottom) | 56px + `env(safe-area-inset-bottom)` |
| Project card padding | 24px (`--sp-6`) |
| Project card grid gap | 24px (`--sp-6`) |
| Testimonial card padding | 20px (`--sp-5`) |
| Journey scene content padding | `clamp(32px, 5vw, 80px)` horizontal |
| Timeline icon size | 40px |
| Form field height | 44px (touch-safe minimum) |
| Form field gap | 16px (`--sp-4`) |

---

## 5. Layout System

### Container Rules

| Page / Component | Layout Rule |
|---|---|
| Page wrapper | `max-width: 1100px`, `mx-auto`, `px-16` (desktop), `px-6` (mobile) |
| Welcome screen | Full viewport `100vw × 100vh`. Content top-left: 64px desktop, 24px mobile padding |
| Hub page | `max-width: 1100px`. Two-column desktop (left 60%, right 40%). Single column mobile. |
| Section pages | `max-width: 900px`. Single column. Always left-aligned. |
| Journey scenes | Full viewport. Content centered vertically (only exception to left-align — cinematic) |
| Project detail modal | `max-width: 680px`, centered overlay. Mobile: full-screen bottom sheet. |
| Testimonial page | `max-width: 560px`. Single column, left-aligned. |
| Admin panel | `max-width: 1200px`. Sidebar + main content. |
| 404 page | Full viewport, content centered vertically, left-aligned horizontally. |

### Grid & Flexbox Patterns

| Component | Pattern |
|---|---|
| Hub Quick Access cards | `grid-template-columns: repeat(2, 1fr)` · gap 16px · Mobile: `1fr` |
| Project cards grid | `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` · gap 24px · Mobile: `1fr` |
| Skills grid | `grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))` · gap 12px |
| Nav links | Flexbox row · gap 32px (desktop) · gap 0 (mobile bottom nav) |
| Timeline entries | `grid-template-columns: 40px 1fr` · top-aligned |
| Testimonial strip (desktop) | Single column flex · CSS animation scrolls upward · `overflow: hidden` |
| Testimonial strip (mobile) | Horizontal flex · CSS animation scrolls rightward · `overflow: hidden` |
| Stat panels | Flexbox row · wrap · gap 32px · dividers between |

### Layout Rules

- All text is left-aligned. Center alignment is never used. The portfolio is a document, not a banner.
- Negative space is structural — sections breathe. Crowding is a quality-signal failure.
- Body text max-width: 540px. Wide open space on sides is intentional.
- Cards per row: max 2 for project cards, max 2 for Quick Access. Never 3+.
- Sticky elements: sticky nav only. No sticky cards, no sticky panels.

---

## 6. Responsive Structure

### Breakpoints

| Label | Range | Key Changes |
|---|---|---|
| xs — Mobile | < 480px | Single column, 24px edge padding, bottom nav, welcome at 24px |
| sm — Mobile L | 480–767px | Hub cards 2-col starts, most mobile rules |
| md — Tablet | 768–1023px | Some two-column layouts, sticky top nav begins |
| lg — Desktop | 1024–1279px | Full two-column hub, sticky top nav, modals not sheets |
| xl — Wide | 1280–1535px | Max-width containers center content |
| 2xl — Ultra-wide | ≥ 1536px | Content stays at max-width, backgrounds stretch |

### Mobile vs Desktop Differences

| Element | Desktop | Mobile |
|---|---|---|
| Hub layout | Two columns (left 60%, right 40%) | Single column. Testimonials below cards. |
| Section nav | Sticky top nav bar (64px) | Fixed bottom nav bar with icons (56px) |
| Back to Hub | Button in sticky top nav, left | Back arrow in top-left header bar |
| Project detail | Centered modal overlay | Full-screen bottom sheet |
| Journey nav | Next button + scene dots | Next + left/right swipe + dots |
| Journey Exit | Text button top area | Icon button (×) top-right |
| Confirmation modal | Centered card modal | Bottom sheet modal |
| Testimonial scroll | Vertical, upward, pauses on hover | Horizontal, rightward, pauses on touchstart |
| Welcome padding | 64px from all edges | 24px from all edges |
| Touch targets | — | min 44×44px on all interactive elements |

---

## 7. Borders, Radius & Dividers

### Border Width Scale

| Token | Value | Usage |
|---|---|---|
| `--border-width-hairline` | 1px | All card borders, input outlines, dividers |
| `--border-width-thin` | 2px | Hover state borders, active nav underline |
| `--border-width-medium` | 4px | Focus rings (accessibility), active section indicator |
| `--border-width-thick` | 8px | Timeline vertical line (mobile, left edge of entry) |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--r-xs` | 2px | Tags, tiny badges |
| `--r-sm` | 4px | Buttons, form inputs, code snippets |
| `--r-md` | 8px | Cards (secondary surface) |
| `--r-lg` | 12px | Cards (primary), modals, tooltips |
| `--r-xl` | 16px | Bottom sheet top corners |
| `--r-full` | 9999px | Toggle knob, avatar circles, live indicator dot |

### Focus Ring

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
/* Never use outline: none without a replacement.
   Only on :focus-visible, not :focus — prevents ring on mouse click. */
```

### Section Divider

The only decorative element permitted in the portfolio:

```html
<div style="display:flex;align-items:center;gap:14px;margin:28px 0">
  <div style="flex:1;height:1px;background:var(--color-border)"></div>
  <div style="width:4px;height:4px;background:var(--color-accent);border-radius:9999px"></div>
  <div style="flex:1;height:1px;background:var(--color-border)"></div>
</div>
```

---

## 8. Shadows & Depth

| Token | Value | Usage |
|---|---|---|
| `--shadow-none` | `none` | Default for all cards in dark mode |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.15)` | Light mode card default |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.20)` | Light mode card hover |
| `--shadow-accent` | `0 4px 20px rgba(201,169,110,0.20)` | Primary button hover **only** |
| `--shadow-modal` | `0 24px 48px rgba(0,0,0,0.40)` | Modals, bottom sheets |
| `--shadow-inner` | `inset 0 1px 3px rgba(0,0,0,0.15)` | Pressed button state |

**Rules:**
- Dark mode: cards have **no box-shadow**. Depth comes from bg surface layering.
- Light mode: cards use `shadow-sm`. On hover, elevates to `shadow-md`.
- `shadow-accent` is used **only** for primary button hover. Never on cards.

---

## 9. Background System

| Context | Rule |
|---|---|
| Page backgrounds | Solid `var(--color-bg-primary)` only. **No gradients. Ever.** |
| Card backgrounds | `var(--color-bg-secondary)`. Never transparent. |
| Inner card regions | `var(--color-bg-tertiary)` |
| Hover state surface | `var(--color-bg-hover)`. Only on interactive cards. |
| Welcome screen texture | SVG noise overlay, `opacity: 0.04`. Film grain effect. Not visible at a glance. |
| Journey scenes | Solid `bg-primary`. No background images. Elements via absolute positioning. |
| Modal backdrop | `var(--color-overlay)` |
| Sticky nav backdrop | `var(--color-bg-primary)` at 95% opacity + `backdrop-filter: blur(8px)` on scroll |
| Code blocks | `var(--color-bg-tertiary)`, `border: 1px solid var(--color-border)` |
| Toast notifications | `var(--color-bg-secondary)` + `border-left: 3px solid semantic-color` |

> `backdrop-filter: blur(8px)` is used **only** on the sticky nav when scrolled. Not on cards. Not on modals. Always include `-webkit-backdrop-filter` prefix for Safari.

---

## 10. Iconography

| Property | Spec |
|---|---|
| Icon library | Lucide React — stroke-based, 1.5px stroke width |
| Icon style | Outline **only**. Never filled icons. |
| Nav icons (mobile) | 20px · text-muted default · accent color on active |
| Button icons (inline) | 14px · gap: 6px from text |
| Standalone icon buttons | 16–18px · centered in 36×36px container |
| Journey controls | 20px · text-secondary |
| Form icons (input) | 14px · text-muted · `position: absolute right-12px` vertically centered |
| Status icons (toasts) | 14px · semantic color matching status |
| Admin panel icons | 16px · text-secondary default · accent on active |
| Theme toggle icon | `☾` / `☀` character (not SVG). 10px. Inside toggle knob. |
| Section counter | Pure typography, no icon. Format: `01 /` in JetBrains 400, accent color. |
| Icon color inheritance | Inherits from parent by default. Override only for semantic meaning. |

---

## 11. Imagery & Media

| Context | Rule |
|---|---|
| Profile photo | Circular · 80px mobile / 96px desktop · `border: 2px solid accent-faint` · `object-fit: cover` · `loading="eager"` |
| Project screenshots | 16:9 aspect ratio · `border-radius: --r-md` · `object-fit: cover` · Lazy-loaded · WebP, max 150KB |
| Journey scenes | **No images.** Pure typography + decorative CSS only. |
| Company logos (timeline) | 32px height · `object-fit: contain` · `filter: grayscale(0.3) opacity(0.7)` · Full color on hover, 300ms |
| OG / social image | Static 1200×630px · Generated at build time · Never loaded at runtime |
| Image placeholder | `var(--color-bg-tertiary)` + shimmer animation · **Never a broken image icon** |
| Lazy loading | `loading="lazy"` on all below-fold images · `loading="eager"` on profile photo only |
| Aspect ratio | `aspect-ratio` CSS property always. Never `padding-top` hacks. Prevents CLS. |
| Format | WebP for all images · PNG fallback via `<picture>` element |
| CDN | Firebase Storage CDN for all images |
| Resume PDF | Direct download link from Firebase Storage · `target="_blank"` · Never inline iframe |

---

## 12. Visual Density

Single density mode: **Comfortable**. No toggle. Permanently calibrated.

| Context | Rule |
|---|---|
| Body text max-width | 540px. Wide space on sides is intentional. |
| Cards per row (desktop) | Max 2 for project cards, max 2 for Quick Access. Never 3+. |
| Section breathing space | 96–128px vertical padding per section. |
| Journey scenes | Single thought per scene. Never more than 3 lines of text. |
| Skills | Tags in wrap container. Dense grid desktop, wrapping list mobile. Never bullet list. |
| Testimonial cards | Never pack multiple in a fixed-height container. |

---

## 13. Buttons

### Primary Button

```css
.btn-primary {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--color-bg-primary);
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--r-sm);  /* 4px */
  padding: 10px 20px;
  cursor: pointer;
  transition:
    background var(--dur-fast) var(--ease-std),
    border-color var(--dur-fast),
    transform 120ms var(--ease-back),
    box-shadow var(--dur-fast);
}
.btn-primary:hover {
  background: var(--color-accent-muted);
  border-color: var(--color-accent-muted);
  transform: translateY(-1px);
  box-shadow: var(--shadow-accent);
}
.btn-primary:active {
  transform: scale(0.97) translateY(0);
  box-shadow: none;
  /* 80ms — feels like a physical press */
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
.btn-primary:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}
```

> **Usage rule:** Maximum **ONE** per visual section. Scarcity is its power.  
> **Pages used:** Welcome "Enter", Project cards "View Project", Journey final scene CTA.

### Secondary Button

```css
.btn-secondary {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  padding: 10px 20px;
  cursor: pointer;
  transition:
    color var(--dur-fast),
    border-color var(--dur-normal),
    background var(--dur-fast),
    transform 120ms var(--ease-back);
}
.btn-secondary:hover {
  color: var(--color-accent);
  border-color: var(--color-border-accent);
  background: var(--color-accent-faint);
  transform: translateY(-1px);
}
.btn-secondary:active { transform: scale(0.97) translateY(0); }
```

> **Usage:** GitHub links, Live Demo, Download Resume, "Leave a Testimonial".

### Ghost Button

```css
.btn-ghost {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  padding: 8px 0;
  gap: 6px;
  cursor: pointer;
  position: relative;
  transition: color var(--dur-fast), gap var(--dur-normal) var(--ease-expo);
}
.btn-ghost::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 1px;
  background: var(--color-accent);
  transition: width var(--dur-normal) var(--ease-expo);
}
.btn-ghost:hover {
  color: var(--color-text-primary);
  gap: 10px; /* label-to-arrow gap widens */
}
.btn-ghost:hover::after { width: 100%; } /* underline draws left-to-right */
```

> **Usage:** "Skip intro →", "See all projects →", "Read more →".

### Icon Button

```css
.btn-icon {
  width: 36px; height: 36px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    background var(--dur-fast),
    border-color var(--dur-fast),
    transform 150ms var(--ease-back),  /* slight overshoot — feels alive */
    color var(--dur-fast);
}
.btn-icon:hover {
  background: var(--color-accent-faint);
  border-color: var(--color-border-accent);
  transform: scale(1.08);
  color: var(--color-accent);
}
.btn-icon:active { transform: scale(0.94); }
```

### Destructive Button (Admin Panel Only)

```css
/* Never used in public portfolio */
.btn-destructive {
  color: var(--color-error);
  background: transparent;
  border: 1px solid rgba(160,32,32,0.3);
  /* hover: background rgba(160,32,32,0.08), border: error color */
}
```

### Button Loading State

- Replace text with 14px spinner (CSS border animation, accent color, 700ms linear)
- Keep button dimensions identical during loading
- `cursor: wait`
- `pointer-events: none`

---

## 14. Form Elements

### Text Input

```css
.input {
  height: 44px;  /* touch-safe minimum */
  width: 100%;
  padding: 0 12px;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 300;
  color: var(--color-text-heading);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  outline: none;
  caret-color: var(--color-accent); /* gold cursor */
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "lnum" 1, "tnum" 1, "zero" 1;
  transition: border-color var(--dur-fast);
}
.input:hover  { border-color: var(--color-border-mid); }
.input:focus  {
  border-color: var(--color-border-accent);
  outline: 2px solid var(--color-accent);
  outline-offset: -1px;
}
.input.error  { border-color: var(--color-error); }
.input.success{ border-color: var(--color-success); }
.input:disabled { opacity: 0.35; cursor: not-allowed; background: var(--color-bg-tertiary); }

::placeholder {
  color: var(--color-text-muted);
  font-size: 12px;
}
```

### Textarea

- `min-height: 120px` · `resize: vertical` only
- All other styles identical to text input
- Character counter: `n / 300` — text-muted, turns warning at 250+, error at 300

### Checkbox

```css
/* Custom 18×18px — never browser default */
.checkbox {
  width: 18px; height: 18px;
  border-radius: var(--r-xs);
  border: 1px solid var(--color-border-mid);
  background: var(--color-bg-secondary);
}
.checkbox.checked {
  background: var(--color-accent);
  border-color: var(--color-accent);
  /* checkmark: ✓ character, color: bg-primary, opacity 0→1, 150ms */
}
```

### Form Labels & Validation

| Element | Style |
|---|---|
| Label font | JetBrains 400, 11px, tracking 0.08em, color: text-secondary |
| Label position | Above input, margin-bottom: 6px |
| Required marker | `*` in accent color, margin-left: 2px |
| Helper text | JetBrains 300, 10px, text-muted, margin-top: 4px |
| Error message | JetBrains 300, 10px, error color, `✕` prefix, `aria-describedby` |
| Success message | JetBrains 300, 10px, success color, `✓` prefix |

---

## 15. Navigation Components

### Sticky Top Nav (Desktop — Section Pages Only)

```css
.sticky-nav {
  height: 64px;
  background: rgba(10,10,15,0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border-ghost);
  /* Border and blur appear at scrollY > 10px via JS class toggle */
}
```

| Property | Value |
|---|---|
| Height | 64px |
| Left element | `← Hub` ghost button. **Always** `navigate('/hub')` — **never** `navigate(-1)` |
| Center links | JetBrains 400, 10px, tracking 0.12em, uppercase · gap 32px |
| Active link | Accent color + 2px accent underline offset 4px + 3×3px accent dot below |
| Right element | Theme toggle icon button |
| Pages shown | `/projects`, `/skills`, `/experience`, `/about` **ONLY** |
| Never shown on | `/`, `/hub`, `/journey`, `/testimonial`, `/404` |

### Fixed Bottom Nav (Mobile)

| Property | Value |
|---|---|
| Height | 56px + `env(safe-area-inset-bottom)` |
| Background | `var(--color-bg-secondary)` + `border-top: 1px solid var(--color-border)` |
| Items | 4 icons + labels: Work, Skills, Experience, About |
| Icon size | 20px (Lucide) |
| Label | JetBrains 400, 9px, below icon, gap: 2px |
| Active state | Icon + label: accent color. No underline. |
| Back to Hub | Separate top-left header bar (36px height). NOT inside bottom nav. |
| touch-action | `manipulation` — removes 300ms tap delay on iOS |

### Journey Navigation

| Property | Value |
|---|---|
| Progress bar | 2px height, full width, accent fill, linear ease, fills over exactly 6s, snaps to 0% on scene change |
| Scene dots | 8px circles · Past: filled accent-muted · Current: filled accent, scale(1.3) · Future: border-only, non-interactive |
| Scene counter | JetBrains 300, 10px, text-muted. `1 / 8` format |
| Auto-advance | 6 second timer · pauses on hover/touch · resumes after 2s |
| Exit button | "Exit Journey" ghost button · triggers confirmation modal |

---

## 16. Feedback Components

### Toast Notifications

```css
.toast {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-success); /* or error/warning/info */
  border-radius: var(--r-sm);
  padding: 13px 16px;
  width: 320px; /* mobile: calc(100vw - 32px) */
}
/* Entry: translateX(110%) → 0, 300ms ease-expo */
/* Exit: translateX(0) → translateX(110%), 250ms ease-in, then remove from DOM */
```

| Property | Value |
|---|---|
| Position | Top-right desktop · top-center mobile · `z-index: 9999` |
| Auto-dismiss | 4000ms · pauses on hover |
| Max stack | 3 simultaneously · 4th pushes 1st out |
| Title font | JetBrains 400, 11px, text-heading |
| Body font | JetBrains 300, 10px, text-muted |
| Close button | Icon button `×` top-right |

### Skeleton Loaders

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-tertiary) 25%,
    var(--color-bg-hover) 50%,
    var(--color-bg-tertiary) 75%
  );
  background-size: 400px 100%;
  animation: shimmer 1.5s linear infinite;
  border-radius: var(--r-sm); /* match element being loaded */
}
```

### Loading Spinners

```css
.spinner {
  width: 16px; height: 16px; /* sm: 12px, lg: 24px */
  border: 2px solid var(--color-border-mid);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin-full 700ms linear infinite;
}
```

- 12px — inline in buttons
- 16px — standalone spinner
- 24px — page-level loading

### Empty States

| Component | Spec |
|---|---|
| Testimonials (no approved) | Dashed `border: 1px dashed var(--color-border-mid)` · centered · JetBrains 300 12px · text-muted |
| Projects | Never shown — seeded with real projects at launch |
| Admin pending list | `"All caught up."` · JetBrains 300, 12px, text-muted, centered |

### Live Visitor Count

```css
.live-dot {
  width: 6px; height: 6px; /* NOT 8px — keep subtle */
  background: var(--color-success);
  border-radius: 50%;
  animation: pulse-ring 1.5s ease-out infinite;
}
/* Label: JetBrains 300, 10px, text-muted. "n viewing now" */
/* Data source: Firebase RTDB presence system (not Firestore) */
/* Position: Hub page, below profile section */
```

---

## 17. Data Display Components

### Project Cards

```css
.project-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--r-md);
  padding: 24px;
  cursor: pointer;
  transition:
    transform var(--dur-normal) var(--ease-expo),
    border-color var(--dur-fast),
    background var(--dur-fast);
}
.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-accent);
  background: var(--color-bg-tertiary);
  /* color async: 250ms, lift: 300ms — slight async feels natural */
}
```

| Property | Value |
|---|---|
| Title | Cormorant 400, `clamp(18px, 2vw, 22px)`, text-heading |
| Description | JetBrains 300, 12px, text-secondary, line-height 1.7, max 3 lines |
| Tags | JetBrains 400, 9px, uppercase, tracking 0.10em · bg: accent-faint · border: border-accent · color: accent · r-xs |
| On click | Opens project detail overlay — **NO route change** |

### Testimonial Cards

| Property | Value |
|---|---|
| Name | Cormorant 400, 16px, text-heading |
| Role/relationship | JetBrains 300, 10px, text-muted, italic |
| Message | JetBrains 300, 12px, text-secondary, line-height 1.7, max 3 lines (`-webkit-line-clamp: 3`), expand on click |
| Quote mark | Cormorant 300, 48px, accent, `opacity: 0.25`, absolute top-left |
| Date | JetBrains 300, 10px, text-muted |
| Auto-scroll (desktop) | `translateY(-100%)`, 20s linear infinite, pauses on hover |
| Auto-scroll (mobile) | `translateX(-100%)`, 20s linear infinite, pauses on touchstart |

### Timeline Entries

```css
.timeline-entry {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 16px;
}
/* Connector line: 1px dashed, border-ghost, bottom of icon to top of next icon */
```

| Property | Value |
|---|---|
| Icon | 40px circle, bg-secondary, border, company logo 32px `grayscale(0.3)` |
| Company name | Cormorant 400, 18px, text-heading |
| Role | JetBrains 400, 10px, accent, uppercase, tracking 0.10em |
| Duration | JetBrains 300, 10px, text-muted, lining-nums |
| Description | JetBrains 300, 12px, text-secondary, line-height 1.8, max-width 540px |
| Entry animation | `opacity 0→1`, `translateX(-16px→0)`, 600ms expo-out |

### Skills Display

| Property | Value |
|---|---|
| Layout | Flex wrap. Each skill is a tag. Tags never truncate — container wraps. |
| Category label | JetBrains 400, 10px, text-muted, uppercase, tracking 0.15em |
| Tag hover | border → accent, bg → accent-faint, 150ms |
| Entry animation | Each tag stagger: 40ms delay per tag, bounce-in via ease-back |

### Stat Panels

```css
.stat-number {
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 300;
  color: var(--color-accent);
  line-height: 1;
  font-variant-numeric: lining-nums; /* tabular not needed at 52px */
}
/* Count-up: 0 → final value, 1200ms ease-out cubic, on scroll reveal */
/* Divider: 1px solid border-ghost between stats */
```

---

## 18. Overlay Components

### Project Detail Modal

| Property | Desktop | Mobile |
|---|---|---|
| Container | `max-width: 680px`, `max-height: 80vh`, centered overlay | Full-screen bottom sheet, `max-height: 90vh` |
| Border-radius | `--r-lg` all corners | `--r-xl` top corners only |
| Entry | `opacity 0→1` + `scale(0.96→1)`, 300ms expo | `translateY(100%→0)`, 400ms expo |
| Exit | `opacity 1→0` + `scale(1→0.96)`, 200ms ease-in | `translateY(0→100%)`, 300ms ease-in |
| Close triggers | × button, backdrop click, Escape key | × button, drag-down, backdrop touch |
| Route change | **NONE** — opens in-place on `/projects` | Same |
| Body scroll | `overflow: hidden` on body while modal open | Same |

### Journey Exit Confirmation Modal

| Property | Value |
|---|---|
| Title | `"Leave the journey?"` — Cormorant 300, 22px |
| Buttons | `"Continue watching"` (secondary) + `"Yes, exit"` (ghost) |
| Trigger | "Exit Journey" button OR browser back (`useBlocker`) |
| Cannot be skipped | `useBlocker` intercepts ALL navigation away from `/journey`, including mobile back gesture |

### Tooltip

```css
.tooltip {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border);
  border-radius: var(--r-sm);
  padding: 6px 10px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-heading);
  /* Arrow: 4px CSS triangle, matches tooltip bg */
  /* Entry: opacity 0→1 + translateY(-4px→0), 200ms ease-out */
  /* Show delay: 400ms — prevents flash on quick passes */
}
```

---

## 19. Interaction States

| State | Visual Treatment | Duration |
|---|---|---|
| `hover` | Color shift, optional `translateY(-1 to -3px)`, border brightens | 150–200ms, ease-std |
| `focus` | `outline: 2px solid accent`, `outline-offset: 3px`. Only on `:focus-visible` | Instant |
| `active` | `scale(0.96–0.97)` + `translateY(0)` — physical press feel | 80ms, ease-std |
| `disabled` | `opacity: 0.35`, `cursor: not-allowed`, `pointer-events: none`, no hover | Instant |
| `selected` | `bg-accent-faint`, `border-accent`, `text-accent` — active nav state | 150ms |
| `loading` | Spinner replaces text, `cursor: wait`, `pointer-events: none`, same dimensions | Instant |
| `error` | `border-color: error`, helper text in error color, `✕` prefix | 150ms |
| `success` | `border-color: success`, helper text in success color, `✓` prefix | 150ms |

### Z-Index Scale

| Value | Layer |
|---|---|
| 0 | Base (cards, content) |
| 1 | Card hover state |
| 100 | Sticky nav bar |
| 500 | Tooltips |
| 1000 | Modal backdrop |
| 1001 | Modal / bottom sheet content |
| 9999 | Toast notifications |

---

## 20. Motion & Micro-Interactions

### Easing Curves

| Token | Value | When to Use |
|---|---|---|
| `--ease-expo` | `cubic-bezier(0.16,1,0.3,1)` | Elements entering — **primary curve**. Fast start, soft land. |
| `--ease-back` | `cubic-bezier(0.34,1.56,0.64,1)` | Tags, icon buttons — slight overshoot = alive. |
| `--ease-std` | `cubic-bezier(0.4,0,0.2,1)` | Page transitions, layout shifts. |
| `--ease-in` | `cubic-bezier(0.4,0,1,1)` | Exit animations **only**. Never for entry. |
| `linear` | `linear` | Typewriter cursor, progress bars, shimmer. Mechanical only. |

### Duration Tokens

| Token | Value | Used For |
|---|---|---|
| `--dur-instant` | 80ms | Hover color shifts, icon color swaps |
| `--dur-fast` | 150ms | Button press, border color, input focus ring |
| `--dur-normal` | 300ms | Card hover lift, underline grow, toast entry |
| `--dur-enter` | 500ms | Components entering viewport, modal entry |
| `--dur-slow` | 700ms | Page transitions, section heading reveal |
| `--dur-dramatic` | 1200ms | Welcome screen **only**. Never elsewhere. |

### Scroll Reveal — Universal Entry Pattern

Applied to **every** component entering the viewport. No exceptions.

```js
// Framer Motion
initial:    { opacity: 0, y: 24 }
animate:    { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
viewport:   { once: true, margin: "-80px" }

// Stagger for lists (project cards, skills, timeline)
transition: { delay: index * 0.08 }  // 80ms per child
```

> - `y: 24px` — not 48 (too long), not 8 (too subtle). Calibrated.
> - `once: true` — never re-animates on scroll up. Signals maturity.
> - `margin: "-80px"` — triggers 80px before fully visible. Feels natural.

### Section Heading Appear

```js
// Three elements stagger:
// eyebrow (0ms) → heading (100ms) → subtext (200ms)
// Each: opacity 0→1 + translateY(16px→0), 600ms expo-out
```

### Typewriter Animation (Welcome Screen)

| Property | Value |
|---|---|
| Character reveal | 45ms per character |
| Line pause | 300ms between lines |
| Typing cursor | Block `▋`, blinks at 530ms (`step-end`) |
| CTA appearance | `opacity 0→1`, 400ms ease-out, 600ms delay after last character |
| CTA cursor | Blinks at 800ms — slower heartbeat rhythm |
| Skip (desktop) | Enter × 2 within 800ms → instant complete state |
| Skip (mobile) | Double tap within 600ms → instant complete state |

### Theme Toggle Animation

| Property | Value |
|---|---|
| Knob travel | `translateX(0→28px)`, 380ms expo-out |
| Track background | `bg-tertiary → #E8E4DC` (light), 400ms ease-std |
| Icon swap | Cross-fade at midpoint of knob travel, 200ms |
| Knob color | `#C9A96E → #966030` (stays gold — the visual signature) |
| Page theme | CSS var swap on `[data-theme="light"]` on `<html>`, body transitions 400ms |
| FOUC prevention | Inline `<script>` in `<head>` reads `localStorage` before first paint |

### Page Transitions

```js
// Framer Motion AnimatePresence, mode="wait"
// Exit:  opacity 1→0 + translateY(0→-16px), 300ms ease-in
// Enter: opacity 0→1 + translateY(16px→0), 500ms expo-out
// mode="wait" ensures exit completes before enter starts
```

### Complete Micro-Interaction Inventory

| Element | Interaction |
|---|---|
| Nav link hover | `color: text-muted → text-primary`, 80ms |
| Nav active underline | `width: 0→100%` from left, 300ms expo-out, on route change |
| Ghost button hover | `gap: 6→10px` + underline draws left-to-right, 300ms expo |
| Primary button hover | `translateY(-1px)` + accent glow shadow, 200ms ease-std |
| Icon button hover | `scale(1.08)` via ease-back (overshoot), 150ms |
| Card hover lift | `translateY(-3px)` + `border-accent` (250ms) + `bg-tertiary` (250ms) + lift (300ms) |
| Tag hover | `border → accent`, `bg → rgba(.13)`, 150ms |
| Testimonial expand | `max-height: auto`, 400ms ease-std, on click |
| Testimonial auto-scroll | CSS `translateY(-100%)`, 20s linear infinite, pauses on hover |
| Stats count-up | `0 → value`, 1200ms ease-out cubic, on scroll reveal |
| Company logo | `filter: grayscale(30%→0%)`, `opacity: 0.7→1`, 300ms, hover |
| Progress bar fill | `width: 0→100%`, linear, exactly 6s |
| Scene dot active | `scale(1→1.3)`, 200ms ease-back |
| Live dot pulse | `box-shadow 0→8px` rgba(success), 1.5s infinite |
| Character counter | `text-muted → warning` at 250 chars, `→ error` at 300, 150ms |
| Form submit success | Form `opacity 0`, success message fades in, 400ms |
| Toast entry | `translateX(110%→0)`, 300ms expo |
| Toast exit | `translateX(0→110%)`, 250ms ease-in, then remove from DOM |
| Modal backdrop | `opacity: 0→1`, 300ms ease-std |
| Bottom sheet entry | `translateY(100%→0)`, 400ms expo |
| Page transition exit | `opacity 1→0` + `translateY(0→-16px)`, 300ms ease-in |
| Page transition enter | `opacity 0→1` + `translateY(16px→0)`, 500ms expo |
| Theme toggle knob | `translateX(0→28px)`, 380ms expo · Track bg: 400ms std · Icon: 200ms crossfade |

---

## 21. Accessibility

| Concern | Implementation |
|---|---|
| Color contrast | All text combinations pass WCAG AA. Primary/heading combinations pass AAA. |
| Focus management | `:focus-visible` used everywhere. `outline: 2px solid accent`, `offset: 3px`. Never `outline: none` alone. |
| Keyboard navigation | All interactive elements reachable via Tab. Modals trap focus (`focus-trap-react`). Escape closes modals. |
| ARIA — icon buttons | `aria-label` on every icon button |
| ARIA — toggle | `aria-pressed` on theme toggle, updates on toggle |
| ARIA — decorative | `aria-hidden="true"` on noise texture, scene numbers, quote marks, decorative dots |
| ARIA — loading | Skeleton loaders: `role="status"` `aria-label="Loading content"` |
| Semantic HTML | `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<button>` — never `<div onclick>` |
| Form accessibility | All inputs have associated `<label>` via `htmlFor`/`id`. Errors linked via `aria-describedby`. |
| Touch targets | All interactive elements: minimum 44×44px. Bottom nav items: full 56px height. |
| Live regions | Toasts: `aria-live="polite"`. Error messages: `aria-live="assertive"`. |
| Image alt text | Profile: `alt="Aditya Chavan"`. Screenshots: descriptive. Logos: `alt="{Company} logo"`. |
| Skip link | `<a href="#main-content" class="skip-link">` — visible on focus, hidden otherwise. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` sets all durations to `0.01ms`. Typewriter instant. Journey auto-advances off. |

---

## 22. Responsive Rendering

| Concern | Rule |
|---|---|
| Strategy | Mobile-first CSS. Base styles target mobile. Larger breakpoints add overrides via `min-width`. |
| Tailwind breakpoints | `sm: 480px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px` |
| Fluid typography | `clamp()` for all display text. JetBrains sizes fixed in px. |
| Hub layout switch | `flex-col` (mobile) → `flex-row` (lg). Left 60%, right 40%. |
| Nav switch | Fixed bottom nav (mobile) → Sticky top nav (lg). |
| Project grid | `grid-cols-1` (mobile) → `grid-cols-2` (md). Never 3 columns. |
| Hub cards | `grid-cols-1` (xs) → `grid-cols-2` (sm). |
| Overflow prevention | `html: overflow-x: hidden`. All containers: max-width or padding containment. |
| Font size floors | clamp() min values never crossed. Every font legible on smallest screen. |

---

## 23. Font Performance

| Concern | Rule |
|---|---|
| Preconnect | `<link rel="preconnect" href="https://fonts.googleapis.com">` AND `gstatic` in `<head>` |
| font-display | `font-display: swap` — prevents invisible text. Shows Georgia fallback, swaps when ready. |
| Variable fonts | NOT used — static instances only. Reduces complexity. |
| Weights loaded | Cormorant: 300, 400, 500, 600italic only. JetBrains: 300, 400 only. Zero unused weights. |
| Display fallback | `Georgia, "Times New Roman", serif` — similar metrics to Cormorant, minimizes CLS on swap |
| Mono fallback | `"Courier New", monospace` |

---

## 24. Image & Media Optimization

| Concern | Rule |
|---|---|
| Format | WebP for all images. PNG fallback via `<picture>` element. |
| Compression | Profile: max 80KB. Project screenshots: max 150KB. Use Squoosh at build time. |
| Lazy loading | `loading="lazy"` all images except profile photo (`loading="eager"`). |
| Aspect ratio | `aspect-ratio` CSS property always. Never `padding-top` hacks. CLS target: 0. |
| CDN | All images served from Firebase Storage CDN. |
| Resume PDF | Direct download from Firebase Storage. `target="_blank"`. Never inline iframe. |
| Retina | Profile: 1× and 2× `srcset`. Project screenshots: single source, CSS `max-width` contained. |
| No video | No video in v1. Journey scenes are pure HTML/CSS/JS. |

---

## 25. CSS Architecture

| Concern | Rule |
|---|---|
| Framework | Tailwind CSS 3.x. Utility-first. No BEM, CSS Modules, or styled-components. |
| Token file | `src/styles/tokens.css` — imported **first** in `main.tsx` |
| Tailwind config | `tailwind.config.js` extends theme with all tokens mapped to Tailwind utilities |
| Inline styles | Tailwind utility classes only. No `style={{}}` except dynamic values (e.g., stagger delay from array index) |
| Global styles | `src/styles/global.css` — font imports, CSS resets, `::selection`, scrollbar, `caret-color`, `scrollbar-gutter` |
| Animations | Framer Motion for scroll/page JS animations. CSS `@keyframes` for pure CSS loops (shimmer, pulse, blink, spin) |
| Dark mode | `[data-theme="light"]` on `<html>`. Tailwind `darkMode: "class"` **disabled** — using custom data attribute. |
| Purge | Tailwind content paths include all component files. Target: < 15KB gzipped CSS. |
| CSS import order | `tokens.css` → `global.css` → Tailwind base → Tailwind components → Tailwind utilities |

### tokens.css Structure

| Section | Contents |
|---|---|
| `@import` | Google Fonts — the very first line |
| `:root` | ALL `--color-*`, `--font-*`, `--r-*`, `--sp-*`, `--shadow-*`, `--ease-*`, `--dur-*` tokens |
| `[data-theme="light"]` | Color token overrides only. All other tokens inherit. |
| `@keyframes` | `blink`, `shimmer`, `float-anim`, `pulse-ring`, `bounce-in`, `spin-slow`, `spin-full`, `fade-up`, `slide-in-r`, `prog-fill` |

---

## 26. Theming System

| Concern | Implementation |
|---|---|
| Storage | `localStorage` key `"theme"`. Persists across sessions. |
| First visit | Read `prefers-color-scheme`. Set `[data-theme]` on `<html>` accordingly. |
| Toggle | Flip `[data-theme]` attribute on `<html>`. Update `localStorage`. No page reload. |
| Transition | `body { transition: background-color 400ms ease-std, color 400ms ease-std; }` |
| FOUC prevention | Inline `<script>` in `<head>` reads `localStorage["theme"]` and sets `data-theme` **before** first paint |
| Admin panel | Separate `localStorage` key `"admin-theme"`. Independent of public site. |
| Knob color | Stays gold (`#C9A96E` dark / `#966030` light) — the visual signature across both modes |

### FOUC Prevention Script

```html
<!-- Place in <head> BEFORE any CSS link tags -->
<script>
  (function() {
    const t = localStorage.getItem('theme');
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else if (!t && window.matchMedia('(prefers-color-scheme: light)').matches)
      document.documentElement.setAttribute('data-theme', 'light');
  })();
</script>
```

---

## 27. Rendering Efficiency

| Concern | Rule |
|---|---|
| GPU animations | Animate **only** `transform` and `opacity`. **Never** `width`, `height`, `margin`, `padding`, `top`, `left`. |
| will-change | Added only on elements actively animating. Removed after animation. Not a blanket property. |
| Layout stability | CLS target: 0. Via: `aspect-ratio` on images, `min-height` on sections, no dynamic content insertion above fold. |
| Framer Motion | `LazyMotion` with `domAnimation` features — ~85% smaller bundle vs full motion import. |
| Three.js | Lazy-loaded only when Hub page mounts. `renderer.dispose()` on unmount. Canvas removed from DOM. |
| Firebase listeners | All `onSnapshot` unsubscribed in `useEffect` cleanup. No memory leaks. |
| Code splitting | `React.lazy` + `Suspense` on: Journey page, Admin panel, Project modal. |
| CSS bundle | Tailwind purge eliminates unused. Target: < 15KB gzipped. |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` sets all durations to `0.01ms`. |
| Lighthouse targets | Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90. FCP < 1.5s on 4G. |

---

## 28. Platform Consistency

| Concern | Rule |
|---|---|
| Browsers | Chrome 100+, Safari 15+, Firefox 100+, Edge 100+. No IE11. |
| Mobile browsers | Chrome Android, Safari iOS 14+. Tested at 375px and 390px. |
| Retina | 1× and 2× image `srcset`. Borders in px (not sub-pixel). |
| Safari backdrop-filter | `-webkit-backdrop-filter: blur(8px)` alongside standard `backdrop-filter` |
| Safari sticky | `position: -webkit-sticky` alongside `position: sticky` |
| Custom scrollbar (webkit) | `width: 4px`, transparent track, `var(--color-border-mid)` thumb, `border-radius: full` |
| Custom scrollbar (Firefox) | `scrollbar-width: thin; scrollbar-color: var(--color-border-mid) transparent` |
| Scrollbar gutter | `scrollbar-gutter: stable` on body — prevents layout shift when scrollbar appears |
| Safe area insets | Bottom nav: `padding-bottom: env(safe-area-inset-bottom)` — supports Dynamic Island |
| `-webkit-tap-highlight` | `-webkit-tap-highlight-color: transparent` on all interactive elements — removes iOS grey tap flash |
| iOS input zoom | All inputs: font-size minimum 16px on iOS to prevent auto-zoom on focus |
| Print styles | Not implemented in v1. |

---

## 29. Micro-Level Details

Every single one of these is implemented. None are "TBD".

| Detail | Specification |
|---|---|
| `cursor` styles | `pointer` on buttons/links · `not-allowed` on disabled · `wait` during loading · `text` on inputs · `default` on body |
| Text selection | `::selection { background: rgba(201,169,110,0.2); color: inherit; }` — gold tint, both modes |
| Scrollbar | Webkit: 4px, transparent track, accent-muted thumb, radius-full · Firefox: `thin` variant |
| `caret-color` | `var(--color-accent)` on ALL inputs and textareas — the cursor blinks in gold |
| Link styling | No browser default blue. All links explicitly styled. External: `target="_blank" rel="noopener noreferrer"` |
| List markers | `list-style: none; padding: 0; margin: 0` on all lists. No bullets in public UI. |
| Admin table headers | `position: sticky; top: 0; background: var(--color-bg-secondary); z-index: 10` |
| Admin table row hover | `background: var(--color-bg-hover)`, 100ms transition |
| Tooltip arrows | 4px CSS triangle via `border` trick. Color matches tooltip bg exactly. |
| Loading placeholders | Shimmer skeletons only — never "Loading..." text for content areas |
| Disabled opacity | `opacity: 0.35` — not 0.5 (too subtle), not 0.25 (too invisible) |
| Sticky nav shadow | `box-shadow: 0 4px 16px rgba(0,0,0,0.12)` appears via JS class at `scrollY > 10px` |
| Backdrop blur | ONLY on sticky nav. Never on cards or modals. Always include `-webkit-` prefix. |
| Overflow | `html: overflow-x: hidden` · Body during modal: `overflow: hidden` · Text: `overflow-wrap: break-word` |
| Focus outline | `outline: 2px solid var(--color-accent), outline-offset: 3px` on `:focus-visible`. Never `:focus` alone. |
| `touch-action` | `manipulation` on all buttons — removes 300ms tap delay on iOS without disabling pinch-zoom |
| `user-select` | `none` on buttons, nav, UI chrome · `text` on body copy and form inputs |
| `-webkit-tap-highlight-color` | `transparent` on interactive elements — removes grey iOS tap flash |
| iOS input zoom | All inputs: min 16px font-size on iOS to prevent auto-zoom. Restore smaller size after blur if needed. |
| Smooth scroll | `scroll-behavior: smooth` on `html` · `scroll-padding-top: 80px` (accounts for sticky nav) |
| `word-spacing` | `0` everywhere — JetBrains Mono has correct built-in spacing |
| `orphans` / `widows` | `orphans: 2; widows: 2` on body copy paragraphs |
| `hyphens` | `hyphens: auto` on testimonial body text **only**. Never on headings, labels, UI text. |
| Font smoothing | `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale` on `body`. Global, never per-component. |
| `box-sizing` | `*, *::before, *::after { box-sizing: border-box }` — included in Tailwind preflight |
| `pointer-events` | `none` on decorative elements (noise texture, ghost text, scene numbers, quote marks) |
| Body theme transition | `transition: background-color 400ms ease-std, color 400ms ease-std` **only** — not a global transition |
| `scrollbar-gutter` | `stable` on body — page does not jump width when scrollbar appears |
| FOUC script | Inline `<script>` in `<head>` reads `localStorage` before CSS renders |
| External link security | All `target="_blank"` links: `rel="noopener noreferrer"` without exception |
| Form submit | `onSubmit` with `e.preventDefault()`. Never rely on HTML form submission. |

---

## 30. The 10 Laws

These rules override everything. If any decision conflicts with these, these win.

1. **Every color, size, spacing and duration references a token. Never a hardcoded value.**
2. **The accent color appears sparingly. If it is everywhere, it means nothing.**
3. **Everything is left-aligned. Center alignment is generic.**
4. **Negative space is structural. Filling space is a design failure.**
5. **Dark mode is the primary experience. Light mode is equally polished.**
6. **Font sizes never drop below the clamp minimum. The mobile floor is sacred.**
7. **Animations use only `transform` and `opacity`. Never animate layout properties.**
8. **`once: true` — elements animate in once, never on scroll-up. Maturity signals.**
9. **One primary button per visual section. Its scarcity is its power.**
10. **All interactive elements have all five states: rest, hover, active, focus, disabled.**

---

## Quick Reference — Token Cheat Sheet

```
BACKGROUNDS (dark)       BACKGROUNDS (light)
─────────────────────    ─────────────────────
bg-primary   #0A0A0F     bg-primary   #F5F2EC
bg-secondary #111118     bg-secondary #EAE6DF
bg-tertiary  #16161E     bg-tertiary  #DED9D0
bg-hover     #1C1C26     bg-hover     #D2CCC2

TEXT (dark)                    TEXT (light)
─────────────────────────────  ─────────────────────────────
text-heading  #F2F0FA (17.8:1) text-heading  #06060A (max)
text-primary  #E8E6F0 (16.8:1) text-primary  #0D0D0F (18.1:1)
text-secondary#A8A4B8 ( 7.1:1) text-secondary#2C2B32 (12.4:1)
text-key      #C4C0D8          text-key      #1A1820
text-value    #9896A8          text-value    #3A3845
text-muted    #5C5970          text-muted    #52505C
text-ghost    #282633          text-ghost    #B8B4C0
text-code     #B8D4B0          text-code     #1E5C2E

ACCENT (dark)   #C9A96E   ACCENT (light)  #966030
ACCENT-MUTED    #8B6F42   ACCENT-MUTED    #7A4C22

RADIUS            SPACING               DURATIONS
──────────────    ────────────────────  ─────────────────────
r-xs    2px       sp-1   4px            instant  80ms
r-sm    4px       sp-2   8px            fast     150ms
r-md    8px       sp-3   12px           normal   300ms
r-lg    12px      sp-4   16px           enter    500ms
r-xl    16px      sp-6   24px           slow     700ms
r-full  9999px    sp-10  40px           dramatic 1200ms
                  sp-16  64px
                  sp-24  96px
                  sp-32  128px

EASING
───────────────────────────────────────────────────────
ease-expo  cubic-bezier(0.16,1,0.3,1)   → entries (primary)
ease-back  cubic-bezier(0.34,1.56,0.64,1) → tags, icon btns
ease-std   cubic-bezier(0.4,0,0.2,1)    → transitions
ease-in    cubic-bezier(0.4,0,1,1)      → exits only
```

---

*Aditya Chavan Portfolio — Design System v1.0*  
*Last updated: 2026-03-15*  
*Stack: React (Vite) · Tailwind CSS · Framer Motion · Three.js · Firebase*
