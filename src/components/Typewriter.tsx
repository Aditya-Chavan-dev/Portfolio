import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, delay = 0, className = '', onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setIsDone(true);
          if (onComplete) onComplete();
        }
      }, 60); // Typewriter speed
    };

    timeout = setTimeout(startTyping, delay);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isDone && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block ml-1 w-[2px] h-[1em] bg-accent align-middle"
        />
      )}
    </span>
  );
}
