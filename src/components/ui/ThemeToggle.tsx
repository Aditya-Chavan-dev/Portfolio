import { useState, useEffect, useLayoutEffect, useCallback } from 'react';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme toggle with localStorage persistence.
 * Init chain: localStorage → prefers-color-scheme → 'dark'
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });

  // Apply theme to DOM before paint to prevent flash
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = useCallback((e: React.MouseEvent) => {
    // Prevent click from bubbling to page-level navigation handlers
    e.stopPropagation();
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      className={className}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: '1px solid var(--color-border)',
        borderRadius: '50%',
        color: 'var(--color-accent)',
        fontSize: '16px',
        cursor: 'pointer',
        zIndex: 50,
        transition: 'color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {isDark ? '☽' : '☀'}
    </button>
  );
};
