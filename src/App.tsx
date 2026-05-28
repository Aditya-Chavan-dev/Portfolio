import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from '@/landing-page/LandingPage'
import Hub from '@/hub/Hub'
import { Projects } from '@/pages/Projects'
import { Experience } from '@/pages/Experience'
import Testimonial from './testimonial/Testimonial'
import TestimonialGallery from './pages/TestimonialGallery'
import { TechStack } from '@/pages/TechStack'
import { Certifications } from '@/pages/Certifications'
import { About } from '@/pages/About'
import { ComingSoon } from '@/pages/ComingSoon'
import { DetailLayout } from '@/layouts/DetailLayout'
import { AuthProvider } from '@/admin/AuthProvider'
import { EditModeProvider } from '@/admin/EditModeContext'
import AdminToolbar from '@/admin/AdminToolbar'
import { ProtectedRoute } from '@/common/shared/ProtectedRoute'
import NotFound from '@/not-found/NotFound'

// Lazy loaded Admin modules
const AdminLogin = lazy(() => import('@/admin/AdminLogin'))
const AdminPanel = lazy(() => import('@/admin/AdminPanel'))
const ImmersiveJourney = lazy(() => import('@/immersive-journey/ImmersiveJourney'))

const AdminFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-bg-base text-white font-mono text-[10px] uppercase tracking-[0.4em]">
    Initializing Core...
  </div>
)

export default function App() {
  const location = useLocation()

  return (
    <EditModeProvider>
      <AuthProvider>
        <AdminToolbar />
        <div className="min-h-screen w-full bg-bg-base">
          <Suspense fallback={<AdminFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hub" element={<Hub />} />
              <Route path="/journey" element={<ImmersiveJourney />} />
              
              <Route path="/hub/projects" element={<DetailLayout title="Projects"><Projects /></DetailLayout>} />
              <Route path="/hub/experience" element={<DetailLayout title="Experience"><Experience /></DetailLayout>} />
              <Route path="/hub/stack" element={<DetailLayout title="Tech Stack"><TechStack /></DetailLayout>} />
              <Route path="/hub/certifications" element={<DetailLayout title="Certifications"><Certifications /></DetailLayout>} />
              <Route path="/hub/about" element={<DetailLayout title="About"><About /></DetailLayout>} />
              
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/hub/testimonials" element={<TestimonialGallery />} />
              <Route path="/coming-soon" element={<ComingSoon />} />

              <Route path="/amgl-3-10" element={<AdminLogin />} />
              <Route 
                path="/amgl-panel" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </EditModeProvider>
  )
}
