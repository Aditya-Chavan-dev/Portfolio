import { useState } from 'react';
import { HookRenderer } from '@/features/interactive-hook/ui/HookRenderer';
import { LandingPage } from '@/pages/LandingPage/ui/LandingPage';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/App.css';

function App() {
  const [phase, setPhase] = useState<'hook' | 'hub'>('hook');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50">
      <AnimatePresence mode="wait">
        {phase === 'hook' ? (
          <motion.div
            key="hook"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <HookRenderer onComplete={() => setPhase('hub')} />
          </motion.div>
        ) : (
          <motion.div
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-screen"
          >
            <LandingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
