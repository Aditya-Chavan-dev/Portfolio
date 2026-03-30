import { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'

interface WelcomeDialogueProps {
  readonly lines: string[]
  readonly highlightIndex?: number[]
  readonly skip: boolean
  readonly onComplete: () => void
}

// 1. Memoized Line Component for Massive Performance
const DialogueLine = memo(({ 
  text, 
  isHighlighted, 
  isCompleted, 
  isProjecting, 
  lineIdx,
  skip,
  onLineComplete 
}: {
  text: string
  isHighlighted: boolean
  isCompleted: boolean
  isProjecting: boolean
  lineIdx: number
  skip: boolean
  onLineComplete: (idx: number) => void
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: skip ? 0.001 : 0.06, // Elite cinematic character reveal
        delayChildren: lineIdx === 0 ? 0.5 : 0.1,
      }
    }
  }

  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: 5, 
      filter: 'blur(2px)', 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  }

  if (text.trim() === '') return <div className="h-6" />

  return (
    <motion.div
      variants={containerVariants}
      initial={isCompleted ? "visible" : "hidden"}
      animate="visible"
      onAnimationComplete={() => onLineComplete(lineIdx)}
      className="mb-3 overflow-visible"
      style={{ transform: 'translateZ(0)' }} // GPU Layer
    >
      <p 
        className={`
          leading-[1.5] font-serif tracking-tight transition-colors duration-700
          ${isHighlighted 
            ? 'text-theme-accent font-bold text-xl md:text-2xl lg:text-3xl' 
            : 'text-theme-primary text-lg md:text-xl lg:text-2xl'}
        `}
        style={{ 
          textShadow: isHighlighted 
            ? '0 0 30px rgba(var(--accent-rgb), 0.3), 0 0 60px rgba(var(--accent-rgb), 0.1)' 
            : 'none' 
        }}
      >
        {isCompleted ? (
          // STATIC: Simple text
          <span>{text}</span>
        ) : (
          // ANIMATED: Character-level reveal
          text.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={charVariants}
              className="inline-block will-change-[transform,opacity]"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))
        )}
        
        {/* Elite Pulsing Cursor */}
        {isProjecting && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="inline-block w-[2px] h-[1em] bg-theme-accent ml-1 translate-y-[0.15em]"
          />
        )}
      </p>
    </motion.div>
  )
})

DialogueLine.displayName = 'DialogueLine'

export function WelcomeDialogue({
  lines,
  highlightIndex,
  skip,
  onComplete,
}: WelcomeDialogueProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const completedRef = useRef(false)

  // Handle skip/complete
  useEffect(() => {
    if (skip && !completedRef.current) {
      completedRef.current = true
      setCurrentLine(lines.length)
      onComplete()
    }
  }, [skip, lines.length, onComplete])

  // Sequential line triggers
  const handleLineComplete = (index: number) => {
    if (skip || completedRef.current) return
    if (index === currentLine && index < lines.length - 1) {
      setCurrentLine(prev => prev + 1)
    } else if (index === lines.length - 1) {
      completedRef.current = true
      onComplete()
    }
  }

  // Handle empty lines (spacers) automatically
  useEffect(() => {
    if (skip || completedRef.current) return
    const text = lines[currentLine]
    if (text?.trim() === '') {
      const t = setTimeout(() => {
        if (currentLine < lines.length - 1) {
          setCurrentLine(prev => prev + 1)
        } else {
          completedRef.current = true
          onComplete()
        }
      }, 500)
      return () => clearTimeout(t)
    }
  }, [currentLine, lines, skip, onComplete])

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative z-10 px-12 overflow-hidden pt-[1vh]">
      <div className="w-full text-center max-w-[900px] mx-auto px-6">
        {lines.map((text, lineIdx) => {
          // Only show lines that have been reached
          if (lineIdx > currentLine && !skip) return null

          return (
            <DialogueLine
              key={lineIdx}
              text={text}
              lineIdx={lineIdx}
              isHighlighted={highlightIndex?.includes(lineIdx) ?? false}
              isCompleted={skip || lineIdx < currentLine || completedRef.current}
              isProjecting={!skip && lineIdx === currentLine && !completedRef.current}
              skip={skip}
              onLineComplete={handleLineComplete}
            />
          )
        })}
      </div>
    </div>
  )
}


