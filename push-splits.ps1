# ── 12-Split GitHub Push ──────────────────────────────────────────────────────
# Run from repo root: .\push-splits.ps1
# ─────────────────────────────────────────────────────────────────────────────

Set-StrictMode -Off
$ErrorActionPreference = "Stop"

function Commit-Push {
  param([string]$msg)
  $staged = git diff --cached --name-only
  if ($staged) {
    Write-Host "`n[GIT] Committing: $msg" -ForegroundColor Cyan
    git commit -m $msg
    Write-Host "[GIT] Pushing..." -ForegroundColor Yellow
    git push origin main
    Write-Host "[OK] Done: $msg" -ForegroundColor Green
  } else {
    Write-Host "[SKIP] Nothing staged for: $msg" -ForegroundColor DarkGray
  }
}

# Stage everything fresh
git add -A

# ── Split 1 — Config & Root Files ────────────────────────────────────────────
git reset HEAD -- .
git add package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts tailwind.config.js index.html firebase.json firestore.rules database.rules.json .firebaserc .env.example .gitignore
Commit-Push "chore(config): update root config and build files [1/12]"

# ── Split 2 — Entry Points ────────────────────────────────────────────────────
git add src/main.tsx src/App.tsx src/index.css
Commit-Push "feat(app): update main entry, App router, and global styles [2/12]"

# ── Split 3 — Common Types ────────────────────────────────────────────────────
git add src/common/types/
Commit-Push "feat(types): update shared type definitions [3/12]"

# ── Split 4 — Common Lib & Shared Services ────────────────────────────────────
git add src/common/lib/ src/common/shared/
Commit-Push "feat(lib): update firebase, metrics, and firestore service [4/12]"

# ── Split 5 — Common Hooks ────────────────────────────────────────────────────
git add src/common/hooks/
Commit-Push "feat(hooks): update all shared hooks (projects, stack, etc.) [5/12]"

# ── Split 6 — Landing Page ────────────────────────────────────────────────────
git add src/landing-page/
Commit-Push "feat(landing): update landing page components and content [6/12]"

# ── Split 7 — Hub ─────────────────────────────────────────────────────────────
git add src/hub/
Commit-Push "feat(hub): update Hub desktop, mobile, and types [7/12]"

# ── Split 8 — Pages ───────────────────────────────────────────────────────────
git add src/pages/
Commit-Push "feat(pages): update Projects, Experience, TechStack, Certifications, About [8/12]"

# ── Split 9 — Admin Panel ─────────────────────────────────────────────────────
git add src/admin/
Commit-Push "feat(admin): update AdminPanel, AdminProjectsTab, AdminStackTab, AuthProvider [9/12]"

# ── Split 10 — Quick Access & Layouts ────────────────────────────────────────
git add src/quick-access/ src/layouts/
Commit-Push "feat(ui): update quick-access pages and layout components [10/12]"

# ── Split 11 — Immersive Journey & Remaining src ─────────────────────────────
git add src/
Commit-Push "feat(journey): add immersive journey and remaining src files [11/12]"

# ── Split 12 — Docs, Scripts & Tasks ─────────────────────────────────────────
git add docs/ scripts/ tasks/ CHANGELOG.md PROJECT_RULES.md portfolio-system-doc.md
Commit-Push "docs: update docs, scripts, tasks, and changelog [12/12]"

Write-Host "`n✅ All 12 splits pushed to GitHub successfully!" -ForegroundColor Green
