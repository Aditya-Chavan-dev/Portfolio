import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // In the future this toggles the "dark" class on document.documentElement
  // For now we just maintain the state.

  return (
    <div 
      className={`min-h-screen bg-obsidian text-white font-body selection:bg-gold/30 selection:text-gold ${isDarkMode ? 'dark' : ''}`}
      onClick={() => setIsDarkMode(!isDarkMode)} // placeholder toggle
    >
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Placeholder for the Landing Page that will be assembled next */}
        <h1 className="text-4xl font-heading text-gold Glow">Setup Complete</h1>
        <p className="mt-4 text-center text-gray-400">Project configuration and foundation is scaffolded successfully.</p>
      </main>
    </div>
  );
}

export default App;
