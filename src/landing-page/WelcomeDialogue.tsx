import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useEditMode } from '@/admin/EditModeContext'
import EditableText from '@/admin/EditableText'

interface WelcomeDialogueProps {
  readonly lines: string[]
  readonly skip: boolean
  readonly highlightIndex?: number | number[] | null
  readonly onComplete: () => void
}

type WelcomeState = 'READY' | 'TYPING_NAME' | 'PAUSE_NAME' | 'TYPING_LINE' | 'PAUSE_LINE' | 'PAUSE_BATMAN' | 'COMPLETE' | 'PROMPT' | 'EXITING';

export function WelcomeDialogue({
  lines,
  skip,
  highlightIndex,
  onComplete,
}: WelcomeDialogueProps) {
  const { mode } = useEditMode()
  const [state, setState] = useState<WelcomeState>('READY')
  const [currentLine, setCurrentLine] = useState(0)
  const [currentLineText, setCurrentLineText] = useState('')
  const [currentContent, setCurrentContent] = useState({ lines, highlightIndex })
  const completedRef = useRef(false)

  // Buffer live Firestore updates safely only at pauses
  useEffect(() => {
    if (state === 'READY' || state === 'COMPLETE' || state === 'PROMPT') {
      setCurrentContent({ lines, highlightIndex })
    }
  }, [lines, highlightIndex, state])

  // Skip behaviour triggers
  useEffect(() => {
    const forceSkip = skip
    if (forceSkip && !completedRef.current && state !== 'COMPLETE' && state !== 'PROMPT') {
      completedRef.current = true
      setState('COMPLETE')
      onComplete()
    }
  }, [skip, state, onComplete])

  // Core State Machine Typewriter Controller
  useEffect(() => {
    const forceSkip = skip
    if (forceSkip || state === 'COMPLETE' || state === 'PROMPT' || state === 'EXITING') return

    if (state === 'READY') {
      const t = setTimeout(() => setState('TYPING_LINE'), 400)
      return () => clearTimeout(t)
    }

    if (state === 'TYPING_LINE') {
      const lineText = currentContent.lines[currentLine] || ''
      if (lineText.trim() === '') {
        setState('PAUSE_LINE') // skip typing Empty paragraph buffers
        return
      }

      const isBatman = Array.isArray(currentContent.highlightIndex) 
        ? currentContent.highlightIndex.includes(currentLine) 
        : currentLine === currentContent.highlightIndex

      if (currentLineText.length < lineText.length) {
        const t = setTimeout(() => {
          setCurrentLineText(p => p + lineText[currentLineText.length])
        }, 20)
        return () => clearTimeout(t)
      } else {
        if (currentLine === currentContent.lines.length - 1) {
          if (!completedRef.current) {
            completedRef.current = true
            setState('COMPLETE')
            onComplete()
          }
        } else {
          setState(isBatman ? 'PAUSE_BATMAN' : 'PAUSE_LINE')
        }
      }
    }

    if (state === 'PAUSE_LINE') {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentLineText('')
        setState('TYPING_LINE')
      }, 100)
      return () => clearTimeout(t)
    }

    if (state === 'PAUSE_BATMAN') {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentLineText('')
        setState('TYPING_LINE')
      }, 400)
      return () => clearTimeout(t)
    }

  }, [state, currentLineText, currentLine, currentContent, skip, mode, onComplete])



  return (
    <div 
      className="flex flex-col items-center justify-start w-full my-auto"
      style={{
        '--gap-paragraph': '8px',
        '--gap-batman': '12px',
        '--gap-closing': '16px',
        '--gap-name': '16px',
      } as React.CSSProperties}
    >


      <div className="w-full text-center max-w-[640px] mx-auto px-[24px] md:px-[48px] box-border">
        {currentContent.lines.map((text, i) => {
          const isBatmanLine = typeof currentContent.highlightIndex === 'number'
            ? (i === currentContent.highlightIndex || i === currentContent.highlightIndex + 1)
            : Array.isArray(currentContent.highlightIndex)
              ? currentContent.highlightIndex.includes(i)
              : false;

          const isMuted = text.includes('(They all say passionate.)')

          let colorClass = 'text-theme-primary'
          if (isBatmanLine) colorClass = 'text-amber-600 dark:text-amber-400'
          else if (isMuted) colorClass = 'text-theme-muted'

          if (text.trim() === '') {
            return <div key={i} className="h-0" />
          }

          const isNewParagraph = i > 0 && currentContent.lines[i - 1].trim() === ''
          let marginTop = '0px'
          if (isNewParagraph) {
            if (isBatmanLine) marginTop = 'var(--gap-batman)'
            else if (i >= currentContent.lines.length - 2) marginTop = 'var(--gap-closing)'
            else marginTop = 'var(--gap-paragraph)'
          }

          const isCompleted = skip || 
            state === 'COMPLETE' || 
            state === 'PROMPT' || 
            i < currentLine ||
            (i === currentLine && (state === 'PAUSE_LINE' || state === 'PAUSE_BATMAN'))
          const isTyping = !skip && state === 'TYPING_LINE' && i === currentLine
          const isActive = isTyping || (i === currentLine && (state === 'PAUSE_LINE' || state === 'PAUSE_BATMAN'));
          
          // V4: All lines visible once typed/typing
          const isVisible = isCompleted || isTyping;

          return (
            <motion.div
              key={i}
              initial={skip ? { opacity: 0, scale: 0.98, filter: 'blur(10px)' } : { opacity: 0, x: -10, filter: 'blur(5px)', height: 0 }}
              animate={{ 
                opacity: isVisible ? (isActive ? 1 : 0.85) : 0, 
                x: isVisible ? 0 : -5,
                scale: isVisible ? (isActive ? (isBatmanLine ? 1.02 : 1) : 0.98) : 0.95,
                filter: isVisible ? 'blur(0px)' : 'blur(8px)',
                height: isVisible ? 'auto' : 0,
                marginBottom: isVisible ? (isBatmanLine ? 14 : 8) : 0
              }}
              transition={{ 
                duration: isBatmanLine ? 1.2 : 0.6, 
                ease: [0.22, 1, 0.36, 1],
                height: { duration: 0.4 }
              }}
              className={`flex flex-col items-center transition-all duration-1000 ${!isVisible ? 'pointer-events-none overflow-hidden' : ''}`}
              style={{ marginTop }}
            >
              <div className="relative group">
                {/* Ethereal Glow effect for high-impact lines - V2 Refined */}
                {isBatmanLine && isVisible && isActive && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    className="absolute inset-x-[-100px] inset-y-[-60px] bg-[radial-gradient(circle,rgba(245,158,11,0.4)_0%,transparent_70%)] -z-10 blur-2xl"
                  />
                )}
                
                <p
                  className={`tracking-[0.05em] leading-[1.3] ${colorClass} text-center transition-all duration-1000
                    ${isBatmanLine 
                      ? 'text-[18px] md:text-[26px] font-black italic tracking-[0.08em] drop-shadow-[0_0_25px_rgba(245,158,11,0.2)]' 
                      : isMuted 
                        ? 'text-[10px] font-mono opacity-30 italic uppercase tracking-[0.2em]' 
                        : 'text-[13px] md:text-[18px] font-serif font-bold tracking-[0.04em]'
                    }`}
                >
                  {isCompleted ? (
                    <EditableText id={`welcome.dialogue.${i}`} value={text} />
                  ) : (
                    <>
                      {text.split('').map((char, index) => {
                        const isVisible = index < currentLineText.length;
                        return (
                          <span key={index} className={isVisible ? 'opacity-100' : 'opacity-0'}>
                            {char}
                            {isTyping && index === currentLineText.length - 1 && (
                              <motion.span 
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="ml-0.5 text-amber-500 inline-block"
                              >
                                ▋
                              </motion.span>
                            )}
                          </span>
                        )
                      })}
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

