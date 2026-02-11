# Technology Stack

**Analysis Date:** 2026-02-10

## Languages

**Primary:**
- TypeScript 5.9.3 - All application and component code
- JavaScript (ES2020) - Configuration files

**Secondary:**
- CSS - Tailwind v4 configuration and custom styles
- Markdown - Documentation

## Runtime

**Environment:**
- Node.js (via Vite dev server)
- Browser (ES2020 target)

**Package Manager:**
- npm (implied by `package.json`)
- Lockfile: `package-lock.json` (expected but not verified)

## Frameworks

**Core:**
- React 19.2.0 - UI library with strict mode enabled
- Vite 7.2.4 - Build tool and dev server
- Tailwind CSS v4.1.18 - Utility-first CSS framework via `@tailwindcss/vite`

**Animation:**
- Framer Motion 12.29.2 - Advanced animation library for transitions and layout animations

**Testing:**
- Vitest 4.0.18 - Unit test framework with JSdom environment
- Testing Library (React 16.3.2, Jest-DOM 6.9.1, User-Event 14.6.1) - Component testing utilities

**Build/Dev:**
- TypeScript Compiler 5.9.3 - Type checking (`tsc -b`)
- Vite 7.2.4 - Fast HMR, code splitting, production bundling
- ESLint 9.39.1 - Code linting with React hooks and TypeScript plugins

## Key Dependencies

**Critical:**
- `firebase` 12.8.0 - Firebase backend services (Realtime Database integration)
- `framer-motion` 12.29.2 - All page transitions and component animations
- `react` 19.2.0 - Core UI framework
- `react-dom` 19.2.0 - DOM rendering

**Infrastructure:**
- `lucide-react` 0.563.0 - Icon library
- `simple-icons` 16.7.0 - Brand icon collection
- `web-vitals` 5.1.0 - Performance monitoring

**Dev/Quality:**
- `husky` 9.1.7 - Git hooks for pre-commit checks
- `lint-staged` 16.2.7 - Run linters on staged files
- `@vitest/ui` 4.0.18 - Interactive test UI
- `typescript-eslint` 8.46.4 - ESLint TypeScript integration

## Configuration

**Environment:**
- Vite environment variable system (`import.meta.env`)
- Required Firebase config via `VITE_FIREBASE_*` variables
- Validation enforced in `src/services/firebase.ts`
- `.env` file required (not committed, see `.env.example`)

**Build:**
- `vite.config.ts` - Vite configuration with React plugin, Tailwind plugin, path aliases
- `tsconfig.json` - Project references to `tsconfig.app.json` and `tsconfig.node.json`
- `eslint.config.js` - Flat config with TypeScript, React hooks, React refresh plugins
- `vitest.config.ts` - Test environment and coverage configuration

## Platform Requirements

**Development:**
- Node.js (version not specified, likely v18+)
- npm or compatible package manager
- Port 3000 (strict port mode enabled)

**Production:**
- Static hosting (Vite builds to `dist/`)
- Firebase Realtime Database access required
- Environment variables must be available at build time (Vite inlines them)
- Source maps enabled for debugging

---

*Stack analysis: 2026-02-10*
