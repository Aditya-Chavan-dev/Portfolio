import { motion } from 'framer-motion'

/**
 * WarpTransition: An explosive, directional zoom effect
 * that triggers when the user "breaks through" to the Hub.
 */
export const WarpTransition = ({ onComplete }: { onComplete?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9999] pointer-events-none bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 1. Star Streaks (The Warp Drive) */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            scaleX: 0, 
            x: 0, 
            y: 0, 
            rotate: (360 / 40) * i 
          }}
          animate={{ 
            scaleX: [0, 15, 30],
            x: [0, (i % 2 === 0 ? 1000 : -1000)],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeIn",
            delay: Math.random() * 0.2 
          }}
          className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-accent-gold to-white origin-left"
        />
      ))}

      {/* 2. Central Flash */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 4], opacity: [0, 1, 1] }}
        transition={{ duration: 0.9, ease: "easeIn" }}
        className="w-96 h-96 bg-white rounded-full blur-[100px]"
      />

      {/* 3. Final Whiteout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 0.9, times: [0, 0.7, 1] }}
        className="absolute inset-0 bg-white"
      />
    </motion.div>
  )
}
