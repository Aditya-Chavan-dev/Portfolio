const { detectDevice } = require('./deviceDetection');

describe('Device Detection Logic', () => {

    describe('Mobile Devices', () => {
        const mobileUAs = [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1', // iPhone
            'Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36', // Samsung Galaxy
            'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36', // Pixel 5
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/100.0.4896.77 Mobile/15E148 Safari/604.1', // Chrome on iOS
        ];

        test.each(mobileUAs)('should detect %s as Mobile', (ua) => {
            const result = detectDevice(ua);
            expect(result.isMobile).toBe(true);
            expect(result.isBot).toBe(false);
            expect(result.deviceType).toBe('mobile');
        });
    });

    describe('Desktop Devices', () => {
        const desktopUAs = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Windows Chrome
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15', // Mac Safari
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36', // Linux Chrome
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36', // Mac Chrome
        ];

        test.each(desktopUAs)('should detect %s as Desktop', (ua) => {
            const result = detectDevice(ua);
            expect(result.isMobile).toBe(false);
            expect(result.isBot).toBe(false);
            expect(result.deviceType).toBe('desktop');
        });
    });

    describe('Bots & Crawlers (Should be treated as Desktop or Special)', () => {
        const botUAs = [
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
            'Twitterbot/1.0',
            'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)',
            'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        ];

        test.each(botUAs)('should detect %s as Bot', (ua) => {
            const result = detectDevice(ua);
            expect(result.isBot).toBe(true);
            expect(result.isMobile).toBe(false); // Bots get Desktop
        });
    });

    describe('Tablets (Edge Cases)', () => {
        const tabletUAs = [
            'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1', // iPad
            'Mozilla/5.0 (Linux; Android 8.0.0; SM-T550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36', // Samsung Galaxy Tab
        ];

        test.each(tabletUAs)('should detect %s as Tablet', (ua) => {
            const result = detectDevice(ua);
            expect(result.isTablet).toBe(true);
            expect(result.deviceType).toBe('tablet');
        });
    });

    describe('Request Desktop Site (Mobile mimicking Desktop)', () => {
        // When "Request Desktop Site" is on, UA removes "Mobile".
        // We expect these to be detected as DESKTOP, which is the correct behavior.
        const requestDesktopUAs = [
            'Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Safari/537.36', // Android without "Mobile"
        ];

        test.each(requestDesktopUAs)('should detect "Request Desktop Site" as Desktop', (ua) => {
            const result = detectDevice(ua);
            expect(result.isMobile).toBe(false);
            expect(result.deviceType).toBe('desktop');
        });
    });
});
