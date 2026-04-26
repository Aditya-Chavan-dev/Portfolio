import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WelcomeDialogueProps {
  readonly lines: string[]
  readonly highlightIndex?: number[]
  readonly skip: boolean
  readonly onComplete: () => void
}

/**
 * DialogueLine: Handles the cinematic "Soft Blur" reveal for a single line.
 */
const DialogueLine = memo(({ 
  text, 
  isHighlighted, 
  isLineFinished, // Renamed from isCompleted to avoid any global naming conflicts
  lineIdx,
  skip,
  onLineComplete 
}: {
  text: string
  isHighlighted: boolean
  isLineFinished: boolean
  lineIdx: number
  skip: boolean
  onLineComplete: (idx: number) => void
}) => {
  // Move variants inside to ensure perfect scoping of skip/lineIdx
  const containerVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: skip ? 0.005 : 0.04, // Snappier stagger (0.08 -> 0.04)
        delayChildren: lineIdx === 0 ? 0.4 : 0.1, // Reduced initial delay (0.6 -> 0.4)
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  }

  const charVariants = {
    hidden: { 
      opacity: 0, 
      filter: 'blur(8px)',
      y: 2,
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  if (!text || text.trim() === '') return <div className="h-6" />

  return (
    <motion.div
      variants={containerVariants}
      initial={isLineFinished ? "visible" : "hidden"}
      animate="visible"
      onAnimationComplete={() => {
        if (onLineComplete) onLineComplete(lineIdx)
      }}
      className="mb-1 md:mb-2 overflow-visible relative z-10"
      style={{ transform: 'translateZ(0)' }}
    >
      <p 
        className={`
          leading-[1.15] font-display tracking-tight transition-colors duration-1000
          ${isHighlighted 
            ? 'text-theme-accent font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl' 
            : 'text-theme-primary/50 font-normal text-sm sm:text-base md:text-lg'}
        `}
        style={{ 
          textShadow: isHighlighted 
            ? '0 0 40px rgba(var(--accent-rgb), 0.2), 0 0 80px rgba(var(--accent-rgb), 0.05)' 
            : 'none' 
        }}
      >
        <AnimatePresence mode="wait">
          {isLineFinished ? (
            <motion.span
              key="static"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: skip ? 0.3 : 0.8, ease: "easeOut" }}
            >
              {text}
            </motion.span>
          ) : (
            <motion.span
              key="typing"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {text.split('').map((char, charIdx) => (
                <motion.span
                  key={`${lineIdx}-${charIdx}`}
                  variants={charVariants}
                  className="inline-block will-change-[transform,opacity,filter]"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
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
  const isAllComplete = useRef(false)

  // Handle skip
  useEffect(() => {
    if (skip && !isAllComplete.current) {
      isAllComplete.current = true
      setCurrentLine(lines.length)
      onComplete()
    }
  }, [skip, lines.length, onComplete])

  // Sequential triggers
  const handleLineComplete = (index: number) => {
    if (skip || isAllComplete.current) return
    if (index === currentLine && index < lines.length - 1) {
      setCurrentLine(prev => prev + 1)
    } else if (index === lines.length - 1) {
      isAllComplete.current = true
      onComplete()
    }
  }

  // Handle empty lines
  useEffect(() => {
    if (skip || isAllComplete.current) return
    const text = lines[currentLine]
    if (text?.trim() === '') {
      const t = setTimeout(() => {
        if (currentLine < lines.length - 1) {
          setCurrentLine(prev => prev + 1)
        } else {
          isAllComplete.current = true
          onComplete()
        }
      }, 400)
      return () => clearTimeout(t)
    }
  }, [currentLine, lines, skip, onComplete])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 sm:px-12 overflow-hidden py-20">
      <div className="w-full text-center max-w-[1000px] mx-auto flex flex-col gap-2 md:gap-4 max-h-[70vh] justify-center">
        {lines.map((text, lineIdx) => {
          if (lineIdx > currentLine && !skip) return null
          const isHighlighted = highlightIndex?.includes(lineIdx) ?? false
          return (
            <DialogueLine
              key={`line-${lineIdx}`}
              text={text}
              lineIdx={lineIdx}
              isHighlighted={isHighlighted}
              isLineFinished={skip || lineIdx < currentLine || isAllComplete.current}
              skip={skip}
              onLineComplete={handleLineComplete}
            />
          )
        })}
      </div>
    </div>
  )
}


