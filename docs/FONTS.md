# Font System Documentation

This document outlines the font families, sources, and usage patterns within the portfolio project.

## Primary Font Families

| Role | Font Family | Source | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Serif / Display** | `Syne` | [Google Fonts](https://fonts.google.com/specimen/Syne) | `--font-serif` |
| **Sans / Body** | `DM Sans` | [Google Fonts](https://fonts.google.com/specimen/DM+Sans) | `--font-sans` |
| **Quotes / Accent** | `Playfair Display` | [Google Fonts](https://fonts.google.com/specimen/Playfair+Display) | `--font-quote` |
| **Monospace** | `JetBrains Mono` / `Fira Code` | System Fallback* | `--font-mono` |

> [!NOTE]
> `Inter` is also defined as the base font for the `<body>` but is currently relying on system fallback.

---

## Font Sources (External)

The following fonts are imported via `@import` in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
```

### Weights & Styles
- **Syne**: 400, 500, 700, 800
- **DM Sans**: 300, 400, 500 (Italic: 300)
- **Playfair Display**: 400, 500 (Italic: 400)

---

## Tailwind CSS Theme Configuration (v4)

Defined in `@theme` block in `src/index.css`:

```css
@theme {
  --font-sans: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
  --font-serif: 'Syne', 'Helvetica Neue', Arial, sans-serif;
  --font-quote: 'Playfair Display', serif;
}
```

---

## Usage Patterns

### Global Base (`body`)
```css
body {
  font-family: 'Inter', system-ui, sans-serif;
}
```

### Headings (`h1`, `h2`, `h3`, `h4`)
```css
h1, h2, h3, h4 {
  font-family: var(--font-serif);
  @apply tracking-tighter;
}
```

### Utility Classes
- **`.mono-label`**: Uses `var(--font-mono)` (`JetBrains Mono`, `Fira Code`).

---

## Identified Discrepancies
> [!WARNING]
> While `Inter`, `JetBrains Mono`, and `Fira Code` are referenced in the CSS, they are **not** explicitly imported from a CDN or provided as local assets in the `public/fonts` directory. They currently rely on being installed on the user's local system or falling back to generic `sans-serif`/`monospace`.
