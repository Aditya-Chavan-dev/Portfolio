import { useState } from 'react';
import { LandingPage } from './LandingPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // In the future this toggles the "dark" class on document.documentElement
  // For now we just maintain the state.

  return (
    <div 
      className={`min-h-screen bg-obsidian text-white font-body selection:bg-gold/30 selection:text-gold ${isDarkMode ? 'dark' : ''}`}
      onClick={() => setIsDarkMode(!isDarkMode)} // placeholder toggle
    >
      <LandingPage />
    </div>
  );
}

export default App;
