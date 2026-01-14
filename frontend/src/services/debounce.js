/**
 * DEBOUNCE UTILITY
 * Gold Standard #41: The "Shock Absorber"
 * 
 * Prevents a function from firing too often (e.g., onResize, onScroll).
 * It waits for the action to PAUSE for 'wait' ms before firing.
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
