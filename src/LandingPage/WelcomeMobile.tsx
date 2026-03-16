import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import content from './content/dialogue.json';
import styles from './WelcomeMobile.module.css';

const CHAR_DELAY = 45;
const LINE_PAUSE = 300;
const CTA_DELAY = 600;
const SKIP_WINDOW = 600;     // ms window for double-tap skip (tighter than desktop)
const FADE_DURATION = 500;

export const WelcomeMobile: React.FC = () => {
  const navigate = useNavigate();

  // --- State ---
  const [lineTexts, setLineTexts] = useState<string[]>(() =>
    content.dialogue.map(() => '')
  );
  const [activeLine, setActiveLine] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [skipHintVisible, setSkipHintVisible] = useState(true);

  // --- Refs ---
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charIndexRef = useRef(0);
  const activeLineRef = useRef(0);
  const mountedRef = useRef(true);
  const animDoneRef = useRef(false);
  const skipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipCountRef = useRef(0);
  const navigatingRef = useRef(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    animDoneRef.current = animDone;
  }, [animDone]);

  useEffect(() => {
    activeLineRef.current = activeLine;
  }, [activeLine]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
    };
  }, []);

  // --- Complete all lines instantly (skip) ---
  const completeAll = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!mountedRef.current) return;

    setLineTexts(content.dialogue.map((line: string) => line));
    setActiveLine(-1);
    setAnimDone(true);
    setSkipHintVisible(false);
    animDoneRef.current = true;

    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) setCtaVisible(true);
    }, CTA_DELAY);
  }, []);

  // --- Typewriter engine ---
  const typeNextChar = useCallback(() => {
    if (!mountedRef.current) return;

    const lineIdx = activeLineRef.current;
    const fullLine = content.dialogue[lineIdx];

    if (charIndexRef.current < fullLine.length) {
      const nextChar = charIndexRef.current + 1;
      charIndexRef.current = nextChar;

      setLineTexts(prev => {
        const updated = [...prev];
        updated[lineIdx] = fullLine.slice(0, nextChar);
        return updated;
      });

      timeoutRef.current = setTimeout(typeNextChar, CHAR_DELAY);
    } else if (lineIdx < content.dialogue.length - 1) {
      timeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        charIndexRef.current = 0;
        const nextLine = lineIdx + 1;
        activeLineRef.current = nextLine;
        setActiveLine(nextLine);
        timeoutRef.current = setTimeout(typeNextChar, CHAR_DELAY);
      }, LINE_PAUSE);
    } else {
      completeAll();
    }
  }, [completeAll]);

  // --- Start typewriter on mount ---
  useEffect(() => {
    timeoutRef.current = setTimeout(typeNextChar, CHAR_DELAY);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typeNextChar]);

  // --- Navigate to /hub with fade-out ---
  const navigateToHub = useCallback(() => {
    if (navigatingRef.current || !animDoneRef.current) return;
    navigatingRef.current = true;

    if (pageRef.current) {
      pageRef.current.classList.add(styles.fadeOut);
    }
    setTimeout(() => navigate('/hub'), FADE_DURATION);
  }, [navigate]);

  // --- Touch handler: double-tap skip + tap continue ---
  const handleTap = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    // Ignore if the tap was on the theme toggle (stopPropagation handles most,
    // but this is a safety check for event delegation)
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    if (!animDoneRef.current) {
      // Double-tap to skip
      skipCountRef.current += 1;
      if (skipCountRef.current >= 2) {
        completeAll();
        skipCountRef.current = 0;
        if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
        return;
      }
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
      skipTimerRef.current = setTimeout(() => {
        skipCountRef.current = 0;
      }, SKIP_WINDOW);
      return;
    }

    // Tap to continue after animation done
    navigateToHub();
  }, [completeAll, navigateToHub]);

  return (
    <div
      ref={pageRef}
      className={styles.page}
      onClick={handleTap}
      onTouchEnd={handleTap}
    >
      {/* Row 1 — Toggle top-right, then name+role */}
      <header className={styles.header}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleWrap}>
            <ThemeToggle />
          </div>
        </div>
        <h1 className={styles.name}>{content.name}</h1>
        <p className={styles.role}>{content.role}</p>
      </header>

      {/* Row 2 — Dialogue centre */}
      <section className={styles.dialogueSection} aria-live="polite">
        {content.dialogue.map((_line: string, i: number) => (
          <p key={i} className={styles.dialogueLine}>
            {lineTexts[i]}
            {activeLine === i && (
              <span className={styles.cursor}>▋</span>
            )}
          </p>
        ))}
      </section>

      {/* Row 3 — CTA + skip hint */}
      <footer className={styles.footer}>
        <span className={`${styles.cta} ${ctaVisible ? styles.ctaVisible : ''}`}>
          {content.cta.mobile}
          {ctaVisible && <span className={styles.ctaCursor}> ▋</span>}
        </span>
        <span className={`${styles.skipHint} ${!skipHintVisible ? styles.skipHintHidden : ''}`}>
          {content.skip_hint.mobile}
        </span>
      </footer>
    </div>
  );
};
