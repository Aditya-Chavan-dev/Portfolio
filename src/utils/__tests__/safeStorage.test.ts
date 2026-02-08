import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { safeLocalStorage, getItemOrDefault } from '../safeStorage';

describe('safeStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('isAvailable', () => {
        it('returns true when localStorage works', () => {
            expect(safeLocalStorage.isAvailable()).toBe(true);
        });
    });

    describe('setItem and getItem', () => {
        it('stores and retrieves string values', () => {
            const setResult = safeLocalStorage.setItem('test', 'value');
            expect(setResult.success).toBe(true);

            const getResult = safeLocalStorage.getItem<string>('test');
            expect(getResult.success).toBe(true);
            expect(getResult.data).toBe('value');
        });

        it('stores and retrieves object values', () => {
            const obj = { foo: 'bar', num: 42, nested: { key: 'value' } };
            const setResult = safeLocalStorage.setItem('testObj', obj);
            expect(setResult.success).toBe(true);

            const getResult = safeLocalStorage.getItem<typeof obj>('testObj');
            expect(getResult.success).toBe(true);
            expect(getResult.data).toEqual(obj);
        });

        it('stores and retrieves array values', () => {
            const arr = [1, 2, 3, 4, 5];
            safeLocalStorage.setItem('testArr', arr);

            const result = safeLocalStorage.getItem<number[]>('testArr');
            expect(result.success).toBe(true);
            expect(result.data).toEqual(arr);
        });

        it('stores and retrieves boolean values', () => {
            safeLocalStorage.setItem('testBool', true);

            const result = safeLocalStorage.getItem<boolean>('testBool');
            expect(result.success).toBe(true);
            expect(result.data).toBe(true);
        });

        it('stores and retrieves number values', () => {
            safeLocalStorage.setItem('testNum', 42);

            const result = safeLocalStorage.getItem<number>('testNum');
            expect(result.success).toBe(true);
            expect(result.data).toBe(42);
        });

        it('returns success:false for non-existent keys', () => {
            const result = safeLocalStorage.getItem('nonexistent');
            expect(result.success).toBe(false);
            expect(result.error).toBe('Item not found');
            expect(result.data).toBeUndefined();
        });

        it('handles empty string keys', () => {
            safeLocalStorage.setItem('', 'value');
            const result = safeLocalStorage.getItem('');
            expect(result.success).toBe(true);
            expect(result.data).toBe('value');
        });
    });

    describe('removeItem', () => {
        it('removes stored items', () => {
            safeLocalStorage.setItem('toRemove', 'value');
            const removeResult = safeLocalStorage.removeItem('toRemove');
            expect(removeResult.success).toBe(true);

            const getResult = safeLocalStorage.getItem('toRemove');
            expect(getResult.success).toBe(false);
            expect(getResult.error).toBe('Item not found');
        });

        it('succeeds even when removing non-existent item', () => {
            const result = safeLocalStorage.removeItem('nonexistent');
            expect(result.success).toBe(true);
        });
    });

    describe('clear', () => {
        it('clears all stored items', () => {
            safeLocalStorage.setItem('item1', 'value1');
            safeLocalStorage.setItem('item2', 'value2');
            safeLocalStorage.setItem('item3', 'value3');

            const clearResult = safeLocalStorage.clear();
            expect(clearResult.success).toBe(true);

            expect(safeLocalStorage.getItem('item1').success).toBe(false);
            expect(safeLocalStorage.getItem('item2').success).toBe(false);
            expect(safeLocalStorage.getItem('item3').success).toBe(false);
        });
    });

    describe('getItemOrDefault', () => {
        it('returns value when item exists', () => {
            safeLocalStorage.setItem('theme', 'dark');
            const result = getItemOrDefault('theme', 'light');
            expect(result).toBe('dark');
        });

        it('returns default when item does not exist', () => {
            const result = getItemOrDefault('theme', 'light');
            expect(result).toBe('light');
        });

        it('returns default when item is corrupted', () => {
            // Manually set corrupted JSON
            localStorage.setItem('corrupted', '{invalid json}');
            const result = getItemOrDefault<string>('corrupted', 'defaultValue');
            expect(result).toBe('defaultValue');
        });

        it('works with complex default values', () => {
            const defaultObj = { theme: 'light', fontSize: 16 };
            const result = getItemOrDefault('settings', defaultObj);
            expect(result).toEqual(defaultObj);
        });
    });

    describe('edge cases', () => {
        it('handles null values', () => {
            safeLocalStorage.setItem('nullTest', null);
            const result = safeLocalStorage.getItem('nullTest');
            expect(result.success).toBe(true);
            expect(result.data).toBeNull();
        });

        it('handles undefined values by converting to null', () => {
            safeLocalStorage.setItem('undefinedTest', undefined);
            const result = safeLocalStorage.getItem('undefinedTest');
            expect(result.success).toBe(true);
            expect(result.data).toBeNull();
        });

        it('handles very long strings', () => {
            const longString = 'a'.repeat(10000);
            safeLocalStorage.setItem('longString', longString);
            const result = safeLocalStorage.getItem<string>('longString');
            expect(result.success).toBe(true);
            expect(result.data).toBe(longString);
        });

        it('handles special characters in keys', () => {
            const specialChars = '!@#$%^&*()_+-={}[]|:";\'<>?,./';
            safeLocalStorage.setItem(specialChars, 'value');
            const result = safeLocalStorage.getItem(specialChars);
            expect(result.success).toBe(true);
            expect(result.data).toBe('value');
        });

        it('handles special characters in values', () => {
            const specialValue = '!@#$%^&*()_+-={}[]|:";\'<>?,./\n\t\r';
            safeLocalStorage.setItem('special', specialValue);
            const result = safeLocalStorage.getItem<string>('special');
            expect(result.success).toBe(true);
            expect(result.data).toBe(specialValue);
        });

        it('handles unicode characters', () => {
            const unicode = '你好世界 🌍🚀🎉';
            safeLocalStorage.setItem('unicode', unicode);
            const result = safeLocalStorage.getItem<string>('unicode');
            expect(result.success).toBe(true);
            expect(result.data).toBe(unicode);
        });
    });

    describe('complex object handling', () => {
        it('handles nested objects', () => {
            const complex = {
                user: {
                    id: 123,
                    name: 'John',
                    settings: {
                        theme: 'dark',
                        notifications: true
                    }
                },
                timestamps: [1234567890, 9876543210]
            };

            safeLocalStorage.setItem('complex', complex);
            const result = safeLocalStorage.getItem<typeof complex>('complex');
            expect(result.success).toBe(true);
            expect(result.data).toEqual(complex);
        });

        it('handles arrays of objects', () => {
            const users = [
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
                { id: 3, name: 'Charlie' }
            ];

            safeLocalStorage.setItem('users', users);
            const result = safeLocalStorage.getItem<typeof users>('users');
            expect(result.success).toBe(true);
            expect(result.data).toEqual(users);
        });
    });

    describe('cache use cases', () => {
        it('handles typical cache structure with timestamp', () => {
            const cache = {
                data: { foo: 'bar', items: [1, 2, 3] },
                timestamp: Date.now()
            };

            safeLocalStorage.setItem('cache', cache);
            const result = safeLocalStorage.getItem<typeof cache>('cache');

            expect(result.success).toBe(true);
            expect(result.data?.data).toEqual(cache.data);
            expect(result.data?.timestamp).toBe(cache.timestamp);
        });

        it('validates cache expiration pattern', () => {
            const CACHE_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours
            const cache = {
                data: 'test data',
                timestamp: Date.now() - (3 * 60 * 60 * 1000) // 3 hours ago
            };

            safeLocalStorage.setItem('cache', cache);
            const result = safeLocalStorage.getItem<typeof cache>('cache');

            expect(result.success).toBe(true);

            // Check if expired
            const isExpired = result.data && (Date.now() - result.data.timestamp > CACHE_TIMEOUT);
            expect(isExpired).toBe(true);
        });
    });
});
