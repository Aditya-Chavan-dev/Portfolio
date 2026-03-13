import { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'motion/react';
import Cursor from './Cursor';
import ThemeToggle from './ThemeToggle';
import styles from './LandingPage.module.css';

const lines = [
  "Hi, I'm Aditya Chavan.",
  "A Full Stack Developer who solves problems that happen to need code.",
  "",
  "I think fast, adapt to anything,",
  "and I never skip the foundation.",
  "",
  "Every project I've built has something in it —",
  "a detail, a decision, a small choice that didn't have to be made, but was.",
  "",
  "If you know good work,",
  "you'll know it when you see it."
];

export default function LandingPage() {
  const [renderedLines, setRenderedLines] = useState([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const TIMING = isMobile
    ? { CHAR: 28, LINE: 320, EMPTY: 480, START: 700 }
    : { CHAR: 38, LINE: 420, EMPTY: 600, START: 900 };

  const activeTimeouts = useRef(new Set());
  const activeIntervals = useRef(new Set());

  useEffect(() => {
    let unmounted = false;

    const mySetTimeout = (cb, ms) => {
      const id = setTimeout(() => {
        activeTimeouts.current.delete(id);
        if (!unmounted) cb();
      }, ms);
      activeTimeouts.current.add(id);
      return id;
    };

    const mySetInterval = (cb, ms) => {
      const id = setInterval(() => {
        if (!unmounted) cb();
      }, ms);
      activeIntervals.current.add(id);
      return id;
    };

    const typeLine = (lineIndex) => {
      if (lineIndex >= lines.length) {
        mySetTimeout(() => {
          setShowCursor(false);
          setTypingDone(true);
        }, 400);
        return;
      }

      const lineContent = lines[lineIndex];

      if (lineContent === "") {
        mySetTimeout(() => {
          setRenderedLines(prev => [...prev, ""]);
          typeLine(lineIndex + 1);
        }, TIMING.EMPTY);
        return;
      }

      let charIndex = 0;
      setCurrentLineText("");

      const intervalId = mySetInterval(() => {
        setCurrentLineText(lineContent.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex >= lineContent.length) {
          clearInterval(intervalId);
          activeIntervals.current.delete(intervalId);

          mySetTimeout(() => {
            setRenderedLines(prev => [...prev, lineContent]);
            setCurrentLineText("");
            typeLine(lineIndex + 1);
          }, TIMING.LINE);
        }
      }, TIMING.CHAR);
    };

    mySetTimeout(() => {
      typeLine(0);
    }, TIMING.START);

    return () => {
      unmounted = true;
      activeTimeouts.current.forEach(clearTimeout);
      activeIntervals.current.forEach(clearInterval);
      activeTimeouts.current.clear();
      activeIntervals.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!typingDone) return;
    let transitioning = false;

    const trigger = () => {
      if (transitioning) return;
      transitioning = true;
      animate(document.body, { opacity: 0 }, { duration: 1.1, ease: 'easeInOut' })
        .then(() => { window.location.href = './portfolio' });
    };

    const handleKey = (e) => {
      const ignored = ['Shift','Control','Alt','Meta','Tab','CapsLock'];
      if (ignored.includes(e.key)) return;
      trigger();
    };

    if (isMobile) {
      document.addEventListener('touchstart', trigger);
    } else {
      document.addEventListener('keydown', handleKey);
    }

    return () => {
      document.removeEventListener('touchstart', trigger);
      document.removeEventListener('keydown', handleKey);
    };
  }, [typingDone, isMobile]);

  return (
    <div className={styles.container}>
      <ThemeToggle />
      <main className={styles.dialogue} role="main" aria-live="polite">
        {renderedLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        {currentLineText && (
          <p>{currentLineText}{showCursor && <Cursor />}</p>
        )}
        {!currentLineText && showCursor && <p><Cursor /></p>}
      </main>
      {typingDone && (
        <motion.p
          className={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
        >
          {isMobile ? 'tap anywhere to continue' : 'press any key to continue'}
        </motion.p>
      )}
    </div>
  );
}
