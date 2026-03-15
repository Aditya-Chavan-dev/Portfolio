import { useState, useEffect } from 'react';

export const useKonami = (callback: () => void) => {
  const [_input, setInput] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const onKeyDown = (e: KeyboardEvent) => {
      setInput((prev) => {
        const newInput = [...prev, e.key];
        
        if (e.key !== konamiCode[prev.length]) {
          return [];
        }

        if (newInput.length === konamiCode.length) {
          callback();
          return [];
        }

        clearTimeout(timeout);
        timeout = setTimeout(() => setInput([]), 1500);

        return newInput;
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(timeout);
    };
  }, [callback]);
};
