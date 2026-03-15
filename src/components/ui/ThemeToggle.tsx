export const ThemeToggle = () => {
  return (
    <button
      className="fixed top-6 right-6 md:top-16 md:right-16 w-8 h-8 rounded-full border border-border flex items-center justify-center text-[10px] bg-transparent hover:bg-bg-hover hover:-translate-y-px transition-all duration-150 z-50 text-accent font-mono"
      aria-label="Toggle theme"
    >
      {/* Visual toggle per standard: ☾ / ☀ character in accent color inside toggle knob */}
      ☾
    </button>
  );
};
