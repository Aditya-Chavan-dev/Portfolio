import DOMPurify from 'dompurify';

/**
 * SANITIZATION UTILITY
 * Gold Standard #27: The "Hazmat Suit"
 * 
 * Cleans user input to prevent XSS (Cross-Site Scripting) attacks.
 * Even if a hacker inputs <script>alert('hack')</script>, this utility
 * converts it to harmless text.
 */

export const sanitize = {
    /**
     * Cleans a string of HTML tags and dangerous scripts.
     * @param {string} dirtyInput 
     * @returns {string} Clean text
     */
    text: (dirtyInput) => {
        if (typeof dirtyInput !== 'string') return dirtyInput;
        return DOMPurify.sanitize(dirtyInput, { ALLOWED_TAGS: [] }); // Strip ALL tags
    },

    /**
     * Cleans HTML content but allows safe formatting (b, i, p).
     * Use this for "Rich Text" features.
     * @param {string} dirtyHtml 
     * @returns {string} Safe HTML
     */
    html: (dirtyHtml) => {
        if (typeof dirtyHtml !== 'string') return dirtyHtml;
        return DOMPurify.sanitize(dirtyHtml, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
            ALLOWED_ATTR: ['href', 'target', 'rel']
        });
    },

    /**
     * Recursively sanitizes a JSON object.
     * @param {Object} obj 
     * @returns {Object} Clean object
     */
    object: (obj) => {
        if (typeof obj !== 'object' || obj === null) return obj;

        if (Array.isArray(obj)) {
            return obj.map(item => sanitize.object(item));
        }

        const cleanObj = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (typeof value === 'string') {
                    cleanObj[key] = sanitize.text(value);
                } else if (typeof value === 'object') {
                    cleanObj[key] = sanitize.object(value);
                } else {
                    cleanObj[key] = value;
                }
            }
        }
        return cleanObj;
    }
};
