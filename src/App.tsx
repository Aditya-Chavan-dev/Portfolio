import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/shared/ThemeProvider'
import { ProtectedRoute } from '@/shared/ProtectedRoute'

import LandingPage      from '@/landing-page/LandingPage'
import Hub              from '@/hub/Hub'
import ImmersiveJourney from '@/immersive-journey/ImmersiveJourney'
import Projects         from '@/quick-access/projects/Projects'
import Skills           from '@/quick-access/skills/Skills'
import Experience       from '@/quick-access/experience/Experience'
import About            from '@/quick-access/about/About'
import Testimonial      from '@/testimonial/Testimonial'
import NotFound         from '@/not-found/NotFound'
import AdminLogin       from '@/admin/AdminLogin'
import AdminPanel       from '@/admin/AdminPanel'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* ── Public routes ─────────────────────────────────── */}
          <Route path="/"           element={<LandingPage />}      />
          <Route path="/hub"        element={<Hub />}              />
          <Route path="/journey"    element={<ImmersiveJourney />} />
          <Route path="/projects"   element={<Projects />}         />
          <Route path="/skills"     element={<Skills />}           />
          <Route path="/experience" element={<Experience />}       />
          <Route path="/about"      element={<About />}            />
          <Route path="/testimonial" element={<Testimonial />}     />
          <Route path="/404"        element={<NotFound />}         />

          {/* ── Admin routes — covert, never linked publicly ─── */}
          <Route path="/amgl-3-10"  element={<AdminLogin />} />
          <Route path="/amgl-panel" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />

          {/* ── Catch-all — always /404, never / ─────────────── */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}
