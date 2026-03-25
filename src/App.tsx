import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from '@/shared/ThemeProvider'
import { ProtectedRoute } from '@/shared/ProtectedRoute'
import { FloatingThemeToggle } from '@/shared/FloatingThemeToggle'
import BottomDock from '@/admin/BottomDock'
import { usePresence } from '@/hooks/usePresence'
import { useRecordVisit } from '@/hooks/useRecordVisit'

import LandingPage      from '@/landing-page/LandingPage'
import Hub              from '@/hub/Hub'
import ImmersiveJourney from '@/immersive-journey/ImmersiveJourney'
import Projects         from '@/quick-access/projects/Projects'
import Skills           from '@/quick-access/skills/Skills'
import Experience       from '@/quick-access/experience/Experience'
import Certifications   from '@/quick-access/certifications/Certifications'
import ProjectDetail    from '@/quick-access/projects/ProjectDetail'
import Testimonial      from '@/testimonial/Testimonial'
import NotFound         from '@/not-found/NotFound'
import AdminLogin       from '@/admin/AdminLogin'
import AdminPanel       from '@/admin/AdminPanel'

function PageTransition({ children }: { readonly children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  )
}

/** Runs visitor tracking hooks on public routes only */
function PublicTracker() {
  // Hooks must always be called — but they no-op internally when conditions are wrong
  usePresence()
  useRecordVisit()

  return null
}

export default function App() {
  const location = useLocation()
  const isWelcomeScreen = location.pathname === '/'

  return (
    <ThemeProvider>
      {!isWelcomeScreen && <FloatingThemeToggle />}
      <BottomDock />
      <PublicTracker />
      <div>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ── Public routes ─────────────────────────────────── */}
            <Route path="/"           element={<PageTransition><LandingPage /></PageTransition>}      />
            <Route path="/hub"        element={<PageTransition><Hub /></PageTransition>}              />
            <Route path="/journey"    element={<PageTransition><ImmersiveJourney /></PageTransition>} />
            <Route path="/projects"   element={<PageTransition><Projects /></PageTransition>}         />
            <Route path="/projects/:projectId" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/skills"     element={<PageTransition><Skills /></PageTransition>}           />
            <Route path="/experience" element={<PageTransition><Experience /></PageTransition>}       />
            <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
            <Route path="/testimonial" element={<PageTransition><Testimonial /></PageTransition>}     />
            <Route path="/404"        element={<PageTransition><NotFound /></PageTransition>}         />

            {/* ── Admin routes ─────────────────────────────────── */}
            <Route path="/amgl-3-10"  element={<PageTransition><AdminLogin /></PageTransition>} />
            <Route path="/amgl-panel" element={
              <PageTransition>
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              </PageTransition>
            } />

            {/* ── Catch-all ────────────────────────────────────── */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
