import { useState, useEffect, useRef, useCallback } from 'react'

interface WelcomeDialogueProps {
  readonly lines:     string[]
  readonly charDelay?: number
  readonly linePause?: number
  readonly skip:      boolean
  readonly onComplete: () => void
}

const CURSOR = '▋' as const

export function WelcomeDialogue({
  lines,
  charDelay = 45,
  linePause = 300,
  skip,
  onComplete,
}: WelcomeDialogueProps) {
  const [displayed,      setDisplayed     ] = useState<string[]>(() => skip ? lines : [])
  const [currentLine,    setCurrentLine   ] = useState(() => skip ? lines.length : 0)
  const [currentChar,    setCurrentChar   ] = useState(0)
  const [cursorVisible,  setCursorVisible ] = useState(true)
  const [isDone,         setIsDone        ] = useState(skip)
  const isDoneRef = useRef(skip)

  const handleComplete = useCallback(() => {
    if (isDoneRef.current) return
    isDoneRef.current = true
    setIsDone(true)
    onComplete()
  }, [onComplete])

  // Skip → jump to complete state immediately
  useEffect(() => {
    if (!skip || isDoneRef.current) return
    setDisplayed(lines)
    setCurrentLine(lines.length)
    handleComplete()
  }, [skip, lines, handleComplete])

  // Typewriter — runs only when not skipping
  useEffect(() => {
    if (isDoneRef.current || skip) return

    if (currentLine >= lines.length) {
      handleComplete()
      return
    }

    const line = lines[currentLine]

    if (currentChar < line.length) {
      const id = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev]
          next[currentLine] = (next[currentLine] ?? '') + line[currentChar]
          return next
        })
        setCurrentChar((c) => c + 1)
      }, charDelay)
      return () => clearTimeout(id)
    }

    // Line complete — pause then advance
    const id = setTimeout(() => {
      setCurrentLine((l) => l + 1)
      setCurrentChar(0)
    }, linePause)
    return () => clearTimeout(id)
  }, [currentLine, currentChar, lines, charDelay, linePause, skip, handleComplete])

  // Cursor blink — stops when animation is done (via isDone state)
  useEffect(() => {
    if (isDone) return
    const id = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(id)
  }, [isDone])

  return (
    <div className="space-y-1" aria-live="polite" aria-atomic="false">
      {displayed.map((line, i) => (
        <p
          key={i}
          className="text-2xl text-gray-800 dark:text-gray-200 leading-relaxed"
        >
          {line}
          {i === currentLine && !isDone && cursorVisible && (
            <span aria-hidden="true">{CURSOR}</span>
          )}
        </p>
      ))}
    </div>
  )
}
