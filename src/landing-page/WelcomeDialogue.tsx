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
        }, 35)
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
      }, 200)
      return () => clearTimeout(t)
    }

    if (state === 'PAUSE_BATMAN') {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentLineText('')
        setState('TYPING_LINE')
      }, 800)
      return () => clearTimeout(t)
    }

  }, [state, currentLineText, currentLine, currentContent, skip, mode, onComplete])



  return (
    <div 
      className="flex flex-col items-center justify-center w-full"
      style={{
        '--gap-paragraph': '28px',
        '--gap-batman': '36px',
        '--gap-closing': '48px',
        '--gap-name': '48px',
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

          let colorClass = 'text-[#FFFFFF]'
          if (isBatmanLine) colorClass = 'text-[#FFFF00]'
          else if (isMuted) colorClass = 'text-[#555555]'

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

          if (!isCompleted && !isTyping) return null // Absolutely prevents layout stacking of future placeholders

          return (
            <motion.p
              key={i}
              initial={skip ? { opacity: 0, y: 8, filter: 'blur(3px)' } : undefined}
              animate={skip ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
              transition={skip ? { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 } : undefined}
              className={`text-[13px] md:text-[18px] font-serif tracking-[0.02em] leading-[1.8] font-bold ${colorClass} text-center`}
              style={{ marginTop }}
            >
              {isCompleted ? (
                <EditableText id={`welcome.dialogue.${i}`} value={text} />
              ) : (
                <>
                  {isTyping && currentLineText.length === 0 && (
                    <span className="text-[#555555] inline-block">▋</span>
                  )}
                  {text.split('').map((char, index) => {
                    const isVisible = index < currentLineText.length;
                    return (
                      <span key={index} className={isVisible ? 'opacity-100' : 'opacity-0'}>
                        {char}
                        {isTyping && index === currentLineText.length - 1 && (
                          <span className="ml-0.5 text-[#555555] inline-block">▋</span>
                        )}
                      </span>
                    )
                  })}
                </>
              )}
            </motion.p>
          )
        })}
      </div>
    </div>
  )
}

