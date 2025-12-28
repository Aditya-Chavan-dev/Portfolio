import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Default to 'light' as per requirements, but check localStorage
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved) return saved;
        // Check system preference only on first visit (if no storage)
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light'; // Default
    });

    useEffect(() => {
        // Persist to localStorage
        localStorage.setItem('portfolio-theme', theme);
        // Apply to document element for CSS selectors
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
