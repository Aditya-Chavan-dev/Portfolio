/**
 * ConsoleSpy.js
 * 
 * Intercepts console.error and console.warn to store them in memory.
 * This allows us to export a "Crash Report" for debugging.
 */

const LOG_HISTORY = [];
const MAX_LOGS = 50;

// Store original methods to prevent infinite loops
const originalError = console.error;
const originalWarn = console.warn;

export const initConsoleSpy = () => {
    if (console._isSpied) return; // Prevent double wrapping

    console.error = (...args) => {
        const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
        LOG_HISTORY.push(`[ERROR] ${new Date().toISOString()}: ${message}`);
        if (LOG_HISTORY.length > MAX_LOGS) LOG_HISTORY.shift();
        originalError.apply(console, args);
    };

    console.warn = (...args) => {
        const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
        LOG_HISTORY.push(`[WARN]  ${new Date().toISOString()}: ${message}`);
        if (LOG_HISTORY.length > MAX_LOGS) LOG_HISTORY.shift();
        originalWarn.apply(console, args);
    };

    console.log("[SPY] Console interception active.");
    console._isSpied = true;
};

export const getLogHistory = () => {
    return [...LOG_HISTORY];
};

export const clearLogHistory = () => {
    LOG_HISTORY.length = 0;
};
