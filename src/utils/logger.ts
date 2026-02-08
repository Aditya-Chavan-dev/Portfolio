/**
 * Production-Safe Logger Utility
 * 
 * Provides logging functions that only output in development mode.
 * In production, all logs are suppressed to prevent information leakage.
 */

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

/**
 * Production-safe logger
 * 
 * Usage:
 * - logger.log('Debug info') - Only in development
 * - logger.error('Error occurred') - Only in development
 * - logger.warn('Warning') - Only in development
 * - logger.info('Info message') - Only in development
 */
export const logger = {
    /**
     * Log general information (development only)
     */
    log: (...args: unknown[]): void => {
        if (isDev) {
            console.log(...args);
        }
    },

    /**
     * Log error messages (development only)
     */
    error: (...args: unknown[]): void => {
        if (isDev) {
            console.error(...args);
        }
    },

    /**
     * Log warning messages (development only)
     */
    warn: (...args: unknown[]): void => {
        if (isDev) {
            console.warn(...args);
        }
    },

    /**
     * Log informational messages (development only)
     */
    info: (...args: unknown[]): void => {
        if (isDev) {
            console.info(...args);
        }
    },

    /**
     * Force log in production (use sparingly for critical errors)
     * Only use for errors that MUST be logged even in production
     */
    forceError: (...args: unknown[]): void => {
        console.error(...args);
    },

    /**
     * Check if we're in development mode
     */
    isDev: (): boolean => isDev,

    /**
     * Check if we're in production mode
     */
    isProd: (): boolean => isProd
};
