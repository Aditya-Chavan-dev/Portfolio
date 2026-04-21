import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LandingPage } from '@/pages/LandingPage'
import Hub from '@/hub/Hub'
import { Projects } from '@/pages/Projects'
import { Experience } from '@/pages/Experience'
import { TechStack } from '@/pages/TechStack'
import { Certifications } from '@/pages/Certifications'
import { About } from '@/pages/About'
import { ComingSoon } from '@/pages/ComingSoon'
import { DetailLayout } from '@/layouts/DetailLayout'
import { AuthProvider } from '@/admin/AuthProvider'
import { ProtectedRoute } from '@/common/shared/ProtectedRoute'

// Lazy loaded Admin modules
const AdminLogin = lazy(() => import('@/admin/AdminLogin'))
const AdminPanel = lazy(() => import('@/admin/AdminPanel'))
const ImmersiveJourney = lazy(() => import('@/immersive-journey/ImmersiveJourney'))

// Admin Loading fallback
const AdminFallback = () => (
  <div className="min-h-[100dvh] w-full flex items-center justify-center bg-bg-base">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-theme-muted font-mono animate-pulse">Initializing OS…</p>
    </div>
  </div>
)

export default function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <div className="min-h-[100dvh] w-full overflow-x-hidden bg-bg-base transition-colors duration-500">
        <AnimatePresence mode="wait">
          <Suspense fallback={<AdminFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/journey" element={<ImmersiveJourney />} />
              
              {/* Detail Views wrapped in DetailLayout */}
              <Route path="/hub/projects" element={
                <DetailLayout title="Projects">
                  <Projects />
                </DetailLayout>
              } />
              <Route path="/hub/experience" element={
                <DetailLayout title="Experience">
                  <Experience />
                </DetailLayout>
              } />
              <Route path="/hub/stack" element={
                <DetailLayout title="Tech Stack">
                  <TechStack />
                </DetailLayout>
              } />
              <Route path="/hub/certifications" element={
                <DetailLayout title="Certifications">
                  <Certifications />
                </DetailLayout>
              } />
              <Route path="/hub/about" element={
                <DetailLayout title="About">
                  <About />
                </DetailLayout>
              } />
              
              <Route path="/coming-soon" element={<ComingSoon />} />

              {/* God Mode — Hidden Routes */}
              <Route path="/amgl-3-10" element={<AdminLogin />} />
              <Route 
                path="/amgl-panel" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
    </AuthProvider>
  )
}
