const UAParser = require("ua-parser-js");

/**
 * Detects device type from User-Agent string.
 * @param {string} userAgent - The User-Agent string.
 * @returns {object} { isMobile: boolean, isTablet: boolean, isBot: boolean, deviceType: string }
 */
function detectDevice(userAgent) {
    if (!userAgent) {
        return { isMobile: false, isTablet: false, isBot: false, deviceType: "desktop" };
    }

    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const os = parser.getOS();
    const uaLower = userAgent.toLowerCase();

    // 1. BOT DETECTION (CRITICAL)
    // Always serve Desktop to bots to ensure rich OG metadata
    const botPatterns = [
        "googlebot", "twitterbot", "facebookexternalhit", "linkedinbot",
        "slackbot-linkexpanding", "discordbot", "bingbot", "yandexbot",
        "pinterest", "whatsapp"
    ];

    const isBot = botPatterns.some(pattern => uaLower.includes(pattern));
    if (isBot) {
        return { isMobile: false, isTablet: false, isBot: true, deviceType: "bot" };
    }

    // 2. TABLET DETECTION
    // iPadOS 13+ "Request Desktop Site" sends Macintosh UA but we can't detect touch server-side easily.
    // Strategy: Treat as Desktop by default, rely on client-side 'isTouchEligible' for hover fix.
    // Standard Tablets (Android Tablet, old iPads) will verify as 'tablet'.
    const isTablet = device.type === "tablet" || (device.type === undefined && (os.name === 'iOS' || os.name === 'Android') && uaLower.includes('ipad'));

    if (isTablet) {
        return { isMobile: false, isTablet: true, isBot: false, deviceType: "tablet" };
    }

    // 3. MOBILE DETECTION
    // "Request Desktop Site" removes the "Mobile" token.
    // We strictly require the "Mobile" token to classify as mobile view,
    // even if the hardware is detected as a phone (e.g. Samsung S9).
    const isMobile = uaLower.includes('mobile');

    return {
        isMobile: !!isMobile,
        isTablet: false,
        isBot: false,
        deviceType: isMobile ? "mobile" : "desktop"
    };
}

module.exports = { detectDevice };
