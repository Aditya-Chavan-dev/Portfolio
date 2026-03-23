@echo off
echo Committing changes in split format...

echo 1. Committing Build Fix...
git add src/lib/projectMetadata.ts
git commit -m "[Issue] Fix projectMetadata type mismatch that blocked build"

echo 2. Committing Hub Section Changes...
git add src/hub/content.json src/hub/QuickAccessCard.tsx
git commit -m "[Feature] Update Hub item 'About' to 'Certifications' with Award icon"

echo 3. Committing Dead Code Cleanup...
git add -A src/quick-access/about/
git add src/shared/seed.ts src/shared/firestore.service.ts
git commit -m "[Issue] Remove old dead code and references for the About section"

echo 4. Committing Projects Navigation Updates...
git add src/quick-access/projects/Projects.tsx
git commit -m "[Feature] Update Projects Navigation to use dedicated routes"

echo 5. Committing Skills Upgrades...
git add src/quick-access/skills/
git commit -m "[Feature] Upgrade Skills Section layout and interactive categories"

echo 6. Committing Experience Card Updates...
git add src/quick-access/experience/
git commit -m "[Feature] Enhance Experience Card layout with absolute transparent offsets"

echo 7. Committing Theme System Improvements...
git add src/shared/ThemeProvider.tsx src/shared/useTheme.ts src/shared/SectionNav.tsx src/App.tsx src/landing-page/LandingPage.tsx
git commit -m "[Feature] Global Dark/Light Theme floating toggle integration"

echo 8. Committing Firestore Resilience Updates...
git add src/shared/firebase.ts
git commit -m "[Issue] Maintain offline state resilience in Firestore providers"

echo 9. Committing Certifications Section...
git add src/quick-access/certifications/
git commit -m "[Feature] Add Certifications section and components"

echo 10. Committing Task Workflows...
git add tasks/
git commit -m "Cleanup task workflows and plans"

echo Split Commits Complete.
