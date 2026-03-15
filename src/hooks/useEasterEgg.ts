import { useState, useCallback, useRef } from 'react';

export const useEasterEgg = (targetCount: number, callback: () => void, windowMs: number = 1800) => {
  const [_count, setCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const trigger = useCallback(() => {
    setCount((prev) => {
      const nextCount = prev + 1;
      
      if (nextCount >= targetCount) {
        callback();
        return 0;
      }

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCount(0);
      }, windowMs);

      return nextCount;
    });
  }, [targetCount, callback, windowMs]);

  return trigger;
};
