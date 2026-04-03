import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitch() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(newTheme);
    root.setAttribute('data-theme', newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[100] p-3 rounded-full bg-bg-elevated border border-border-default shadow-lg opacity-40 hover:opacity-100 transition-opacity duration-base focus:opacity-100"
      aria-label="Toggle theme"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      whileHover={{ scale: 1.05, opacity: 1 }}
    >
      <div className="relative w-6 h-6">
        <motion.div
          animate={{
            x: theme === 'dark' ? 0 : 4,
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.5,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.8,
            ease: [0.34, 1.56, 0.64, 1] // Easing-entry ONLY here
          }}
          className="absolute inset-0 flex items-center justify-center text-accent"
        >
          <Moon size={20} fill="currentColor" />
        </motion.div>
        
        <motion.div
          animate={{
            x: theme === 'light' ? 0 : -4,
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.5,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.8,
            ease: [0.34, 1.56, 0.64, 1] // Easing-entry ONLY here
          }}
          className="absolute inset-0 flex items-center justify-center text-accent"
        >
          <Sun size={20} fill="currentColor" />
        </motion.div>
      </div>
    </motion.button>
  );
}
