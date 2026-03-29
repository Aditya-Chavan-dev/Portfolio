import { useThemeContext } from '@/common/shared/ThemeProvider'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggle } = useThemeContext()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      className="group relative flex items-center justify-between w-16 h-8 p-1 rounded-full bg-theme-base/10 border border-theme-default/20 hover:border-amber-500/50 transition-all duration-300 overflow-hidden outline-none"
      aria-label={isDark ? 'Activate Light Mode' : 'Activate Dark Mode'}
    >
      {/* Moving Hub/Core */}
      <motion.div 
        layout
        className={`
          flex items-center justify-center w-6 h-6 rounded-full z-10 
          ${isDark ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]' : 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]'}
          transition-colors duration-500
        `}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {isDark ? (
              <Moon size={14} className="text-white" fill="white" />
            ) : (
              <Sun size={14} className="text-white" fill="white" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Background Labels */}
      <div className="absolute inset-x-3 flex justify-between items-center w-full pr-6 pointer-events-none">
         <Sun size={10} className={`text-amber-500 transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-0'}`} />
         <Moon size={10} className={`text-indigo-400 transition-opacity duration-500 ${!isDark ? 'opacity-20' : 'opacity-0'}`} />
      </div>

      {/* Glide Background */}
      <div className={`absolute inset-0 opacity-10 transition-colors duration-700 ${isDark ? 'bg-indigo-500' : 'bg-amber-400'}`} />
    </button>
  )
}



