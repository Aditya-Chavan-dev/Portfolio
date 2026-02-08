/**
 * Safe Storage Utility
 * 
 * Comprehensive error-handling wrapper around localStorage that prevents crashes
 * in Safari Private Mode, when quota is exceeded, and with corrupted data.
 */

import { logger } from './logger';

/**
 * Result type for storage operations
 */
export interface StorageResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}

/**
 * Safe wrapper around localStorage with comprehensive error handling
 * 
 * Handles:
 * - Safari Private Mode (throws SecurityError)
 * - Quota exceeded (throws QuotaExceededError)
 * - Disabled storage (throws SecurityError)
 * - Corrupted data (JSON parse errors)
 */
export const safeLocalStorage = {
    /**
     * Safely retrieve item from localStorage
     * 
     * @param key - Storage key
     * @returns Result object with success flag and data/error
     * 
     * @example
     * const result = safeLocalStorage.getItem<string>('user_id');
     * if (result.success) {
     *     console.log('User ID:', result.data);
     * } else {
     *     console.warn('Failed to get user ID:', result.error);
     * }
     */
    getItem: <T = string>(key: string): StorageResult<T> => {
        try {
            const item = localStorage.getItem(key);

            if (item === null) {
                return { success: false, error: 'Item not found' };
            }

            // Try to parse as JSON, fallback to raw string
            try {
                const parsed = JSON.parse(item) as T;
                return { success: true, data: parsed };
            } catch {
                // Not JSON, return as string
                return { success: true, data: item as unknown as T };
            }
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            logger.warn(`[safeStorage] Failed to get item "${key}":`, errorMsg);

            return {
                success: false,
                error: errorMsg
            };
        }
    },

    /**
     * Safely store item in localStorage
     * 
     * @param key - Storage key
     * @param value - Value to store (will be JSON.stringify'd if not a string)
     * @returns Result object with success flag
     * 
     * @example
     * const result = safeLocalStorage.setItem('preferences', { theme: 'dark' });
     * if (!result.success) {
     *     console.warn('Failed to save preferences:', result.error);
     * }
     */
    setItem: (key: string, value: unknown): StorageResult<void> => {
        try {
            const stringValue = typeof value === 'string'
                ? value
                : JSON.stringify(value);

            localStorage.setItem(key, stringValue);
            return { success: true };
        } catch (error) {
            let errorMsg = 'Unknown error';
            let userFriendlyMsg = 'Failed to save data';

            if (error instanceof DOMException) {
                if (error.name === 'QuotaExceededError') {
                    errorMsg = 'Storage quota exceeded';
                    userFriendlyMsg = 'Storage full. Please clear browser data.';
                } else if (error.name === 'SecurityError') {
                    errorMsg = 'Storage access denied (Private Mode?)';
                    userFriendlyMsg = 'Storage unavailable (Private browsing mode?)';
                }
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }

            logger.warn(`[safeStorage] Failed to set item "${key}":`, errorMsg);

            return {
                success: false,
                error: userFriendlyMsg
            };
        }
    },

    /**
     * Safely remove item from localStorage
     * 
     * @param key - Storage key to remove
     * @returns Result object with success flag
     */
    removeItem: (key: string): StorageResult<void> => {
        try {
            localStorage.removeItem(key);
            return { success: true };
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            logger.warn(`[safeStorage] Failed to remove item "${key}":`, errorMsg);

            return {
                success: false,
                error: errorMsg
            };
        }
    },

    /**
     * Check if localStorage is available
     * 
     * @returns true if localStorage can be used, false otherwise
     * 
     * @example
     * if (safeLocalStorage.isAvailable()) {
     *     // Use localStorage
     * } else {
     *     // Fallback to in-memory storage or cookies
     * }
     */
    isAvailable: (): boolean => {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Clear all items from localStorage
     * 
     * @returns Result object with success flag
     */
    clear: (): StorageResult<void> => {
        try {
            localStorage.clear();
            return { success: true };
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            logger.warn('[safeStorage] Failed to clear storage:', errorMsg);

            return {
                success: false,
                error: errorMsg
            };
        }
    }
};

/**
 * Convenience function to get item with default value
 * 
 * @param key - Storage key
 * @param defaultValue - Default value if item not found or error occurs
 * @returns Retrieved value or default
 * 
 * @example
 * const theme = getItemOrDefault('theme', 'light');
 */
export function getItemOrDefault<T>(key: string, defaultValue: T): T {
    const result = safeLocalStorage.getItem<T>(key);
    return result.success && result.data !== undefined ? result.data : defaultValue;
}
