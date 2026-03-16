import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import content from './content/dialogue.json';
import styles from './WelcomeDesktop.module.css';

const CHAR_DELAY = 45;       // ms per character
const LINE_PAUSE = 300;      // ms pause between lines
const CTA_DELAY = 600;       // ms after animation completes before showing CTA
const SKIP_WINDOW = 800;     // ms window for double-Enter skip
const FADE_DURATION = 500;   // ms page fade-out before navigation

export const WelcomeDesktop: React.FC = () => {
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

  // Keep refs in sync with state
  useEffect(() => {
    animDoneRef.current = animDone;
  }, [animDone]);

  useEffect(() => {
    activeLineRef.current = activeLine;
  }, [activeLine]);

  // --- Unmount cleanup ---
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

    // Show CTA after delay
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
      // Type next character
      const nextChar = charIndexRef.current + 1;
      charIndexRef.current = nextChar;

      setLineTexts(prev => {
        const updated = [...prev];
        updated[lineIdx] = fullLine.slice(0, nextChar);
        return updated;
      });

      timeoutRef.current = setTimeout(typeNextChar, CHAR_DELAY);
    } else if (lineIdx < content.dialogue.length - 1) {
      // Line complete — pause then start next line
      timeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        charIndexRef.current = 0;
        const nextLine = lineIdx + 1;
        activeLineRef.current = nextLine;
        setActiveLine(nextLine);
        timeoutRef.current = setTimeout(typeNextChar, CHAR_DELAY);
      }, LINE_PAUSE);
    } else {
      // All lines complete
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

  // --- Keyboard handler: Enter×2 skip + any-key continue ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip via Enter×2 within SKIP_WINDOW
      if (e.key === 'Enter' && !animDoneRef.current) {
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

      // Any key to continue after animation done
      if (animDoneRef.current) {
        navigateToHub();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [completeAll, navigateToHub]);

  return (
    <div ref={pageRef} className={styles.page}>
      {/* Row 1 — Header: name+role left, toggle right */}
      <header className={styles.header}>
        <div className={styles.nameBlock}>
          <h1 className={styles.name}>{content.name}</h1>
          <p className={styles.role}>{content.role}</p>
        </div>
        <div className={styles.toggleWrap}>
          <ThemeToggle />
        </div>
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
          {content.cta.desktop}
          {ctaVisible && <span className={styles.ctaCursor}> ▋</span>}
        </span>
        <span className={`${styles.skipHint} ${!skipHintVisible ? styles.skipHintHidden : ''}`}>
          {content.skip_hint.desktop}
        </span>
      </footer>
    </div>
  );
};
