const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5000', // Matches Firebase Emulator default
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'Mobile Safari',
            use: {
                ...devices['iPhone 12'],
                // Explicitly set UA to ensure our detection logic sees it as Mobile
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
            },
            testMatch: /.*mobile.spec.js/,
        },
        {
            name: 'Desktop Chrome',
            use: {
                ...devices['Desktop Chrome'],
                // Explicitly set Desktop UA
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
            testMatch: /.*desktop.spec.js/,
        },
        {
            name: 'Googlebot Mobile',
            use: {
                userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                viewport: { width: 375, height: 812 },
            },
            testMatch: /.*bot.spec.js/,
        }
    ],
});
