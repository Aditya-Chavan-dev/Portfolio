# ── 15-Split GitHub Push ──────────────────────────────────────────────────────
# Run from repo root: .\push-splits-15.ps1
# ─────────────────────────────────────────────────────────────────────────────

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

# Reset any existing staging
git reset HEAD .

# 1. Root Config
git add package.json vite.config.ts tsconfig.json .firebaserc firebase.json firestore.rules
Commit-Push "chore(config): update root config and build files [1/15]"

# 2. Entry & Styles
git add src/main.tsx src/App.tsx src/index.css
Commit-Push "feat(app): update main entry and global styles [2/15]"

# 3. Shared Types
git add src/common/types/
Commit-Push "feat(types): update shared type definitions [3/15]"

# 4. Shared Libs (Metrics, Firebase, ProjectMetadata)
git add src/common/lib/firebase.ts src/common/lib/metrics.ts src/common/lib/projectMetadata.ts
Commit-Push "feat(lib): update core services and metrics [4/15]"

# 5. Firestore Service & Shared Components
git add src/common/shared/firestore.service.ts src/common/shared/ErrorBoundary.tsx
Commit-Push "feat(shared): update firestore service and add error boundary [5/15]"

# 6. Config & Fallbacks
git add src/common/config/
Commit-Push "feat(config): implement fallback content system [6/15]"

# 7. Hooks (Data/Projects)
git add src/common/hooks/useAdminProjects.ts src/common/hooks/useFeaturedProjects.ts src/common/hooks/useProjects.ts
Commit-Push "feat(hooks): update project-related data hooks [7/15]"

# 8. Hooks (UI/Features)
git add src/common/hooks/useCertifications.ts src/common/hooks/useExperience.ts src/common/hooks/useTechStack.ts
Commit-Push "feat(hooks): update feature-specific content hooks [8/15]"

# 9. Landing Page
git add src/landing-page/
Commit-Push "feat(landing): update landing page components and content logic [9/15]"

# 10. Hub Base (Core views)
git add src/hub/Hub.tsx src/hub/Hub.desktop.tsx src/hub/Hub.mobile.tsx src/hub/useHubContent.ts
Commit-Push "feat(hub): update core Hub layout and content fetching [10/15]"

# 11. Testimonials System (All layers)
git add src/testimonial/ src/hub/TestimonialsSlider.tsx src/hub/useTestimonials.ts src/pages/TestimonialGallery.tsx src/admin/AdminTestimonialsTab.tsx
Commit-Push "feat(testimonials): implement full testimonial lifecycle and display [11/15]"

# 12. Main Feature Pages
git add src/pages/Projects.tsx src/pages/TechStack.tsx
Commit-Push "feat(pages): update Projects and TechStack pages [12/15]"

# 13. Admin Layout & Base
git add src/admin/AdminPanel.tsx src/admin/BudgetPanel.tsx src/admin/EditableText.tsx
Commit-Push "feat(admin): update Admin Panel structure and common components [13/15]"

# 14. Admin Services & Deploy
git add src/admin/DeployModal.tsx src/admin/MetricsOrchestrator.ts src/admin/SnapshotService.ts
Commit-Push "feat(admin): implement snapshot services and deployment logic [14/15]"

# 15. Final Cleanup & Orphans
git add -A
Commit-Push "chore: perform final cleanup and sync remaining files [15/15]"

Write-Host "`n✅ All 15 splits pushed to GitHub successfully!" -ForegroundColor Green
