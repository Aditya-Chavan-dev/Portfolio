import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import dialogueData from './WelcomeDialogue.json';

interface WelcomeProps {
  playAnimation: boolean;
  onEnter: () => void;
}

export const WelcomeMobile: React.FC<WelcomeProps> = ({ playAnimation, onEnter }) => {
  return (
    <div className="w-screen h-screen bg-bg-primary relative overflow-hidden flex flex-col px-6 pt-6">
      
      {/* Background Noise Texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-4"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      ></div>

      <ThemeToggle />

      {/* 24px edge padding mobile constraint handled by px-6 above */}
      <div className="z-10 mt-[10vh] w-full text-left flex-1 max-w-sm">
        
        <motion.div
           initial={playAnimation ? { opacity: 0, y: 16 } : false}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: playAnimation ? 0.2 : 0 }}
        >
            <h1 className="font-display font-light text-[36px] tracking-[-0.02em] leading-[1.05] text-text-heading mb-1">
              {dialogueData.name}
            </h1>
            <h2 className="font-display font-light text-[11px] tracking-[0.25em] uppercase text-text-secondary mb-10">
              {dialogueData.role}
            </h2>
        </motion.div>

        <motion.div 
           className="font-display font-light italic text-[18px] leading-[1.55] text-text-primary space-y-2 mb-10"
           initial={playAnimation ? { opacity: 0 } : false}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.2, ease: "easeOut", staggerChildren: 0.4, delayChildren: playAnimation ? 0.8 : 0 }}
        >
          {dialogueData.lines.map((line, index) => (
             <motion.p 
               key={index}
               initial={playAnimation ? { opacity: 0, y: 10 } : false}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             >
               {line}
             </motion.p>
          ))}
        </motion.div>

        <motion.div
           initial={playAnimation ? { opacity: 0, y: 10 } : false}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: playAnimation ? 1.2 : 0 }}
        >
            <Button variant="primary" onClick={onEnter}>
                {dialogueData.cta}
            </Button>
        </motion.div>
      </div>
    </div>
  );
};
