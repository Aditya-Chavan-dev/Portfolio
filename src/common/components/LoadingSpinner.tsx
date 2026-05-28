import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  label?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ label = 'LOADING SYSTEM…', fullScreen = false }: LoadingSpinnerProps) {
  const containerClasses = fullScreen
    ? "min-h-screen bg-[#050507] flex items-center justify-center font-mono relative z-50"
    : "flex flex-col items-center justify-center py-20 opacity-60 font-mono"

  return (
    <div className={containerClasses} role="status" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-4">
        {/* Retro CRT Spinner */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-amber-500/10 border-t-amber-500"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
            className="absolute w-8 h-8 rounded-full border-2 border-dashed border-amber-500/20 border-t-amber-500/60"
          />
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        </div>
        
        {/* Terminal Loading Label */}
        <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.4em] animate-pulse">
          {label}
        </span>
      </div>
    </div>
  )
}
