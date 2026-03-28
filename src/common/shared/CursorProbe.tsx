import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

export function CursorProbe() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for high-end feel
  const springConfig = { damping: 25, stiffness: 250 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, .interactive')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Outer Circle */}
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#F59E0B' : '#FFFFFF',
        }}
        className="absolute inset-0 border border-white/40 rounded-full"
      />
      
      {/* Center Dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-500 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: [1, 0.5, 1]
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />

      {/* Crosshair Lines */}
      <div className="absolute top-1/2 left-1/2 w-12 h-[1px] bg-white/10 -translate-x-1/2 -translate-y-1/2 scale-x-[0.3]" />
      <div className="absolute top-1/2 left-1/2 w-[1px] h-12 bg-white/10 -translate-x-1/2 -translate-y-1/2 scale-y-[0.3]" />

      {/* HUD Metadata */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 24 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 flex flex-col gap-1 whitespace-nowrap pointer-events-none"
          >
            <span className="mono-label !opacity-100 text-[8px] text-amber-500">TARGET_LOCKED</span>
            <div className="h-[1px] w-8 bg-amber-500/20" />
            <span className="text-[7px] text-white/40 font-mono">INTEL_RETR_0x04</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
