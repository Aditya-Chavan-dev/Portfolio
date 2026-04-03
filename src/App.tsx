import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LandingPage } from '@/pages/LandingPage'
import { Hub } from '@/pages/Hub'
import { Projects } from '@/pages/Projects'
import { Experience } from '@/pages/Experience'
import { TechStack } from '@/pages/TechStack'
import { Certifications } from '@/pages/Certifications'
import { About } from '@/pages/About'
import { ComingSoon } from '@/pages/ComingSoon'
import { DetailLayout } from '@/layouts/DetailLayout'

export default function App() {
  const location = useLocation()

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-bg-base transition-colors duration-500 grain-overlay">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hub />} />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/hub" element={<Hub />} />
          
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
        </Routes>
      </AnimatePresence>
    </div>
  )
}
