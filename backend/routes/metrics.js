const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

// PHASE 1 SECURITY PATCH: In-Memory Cache
// Prevents "Bill Shock" by limiting DB reads to 1 per 60 seconds (globally).
let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 60 * 1000;

// Helper: Sanitize Data (The DTO)
const sanitizeMetrics = (sourcesVal, pathsVal) => {
    const safeSources = sourcesVal || {};
    const safePaths = pathsVal || {};

    return {
        visitorStats: {
            linkedin: Number(safeSources.linkedin) || 0,
            resume: Number(safeSources.resume) || 0,
            anonymous: Number(safeSources.anonymous) || 0,
            immersive: Number(safePaths.immersive) || 0,
            quickAccess: Number(safePaths.quick) || 0
        },
        timestamp: Date.now()
    };
};

/**
 * @route   GET /api/metrics/stats
 * @desc    Fetch global visitor stats (Cached 60s)
 */
router.get('/stats', async (req, res) => {
    try {
        const now = Date.now();

        // 1. SECURITY: Check Cache (Stop the spam)
        if (cache.data && (now - cache.timestamp < CACHE_TTL)) {
            // Serve from memory (Free & Fast)
            res.set('X-Source', 'Cache');
            return res.json(cache.data);
        }

        // 2. Fetch Truth (Only if cache is stale)
        const sourcesRef = db.ref('sources');
        const pathsRef = db.ref('paths');

        const [sourcesSnap, pathsSnap] = await Promise.all([
            sourcesRef.once('value'),
            pathsRef.once('value')
        ]);

        const cleanData = sanitizeMetrics(sourcesSnap.val(), pathsSnap.val());

        // 3. Update Cache
        cache = { data: cleanData, timestamp: now };

        res.set('X-Source', 'Live');
        res.set('Cache-Control', 'public, max-age=60');
        res.json(cleanData);

    } catch (error) {
        console.error('[METRICS] Critical Read Error:', error);
        // Fail Safe: Don't crash, don't leak stack trace
        res.status(500).json({ error: "System Busy" });
    }
});

/**
 * PHASE 2: THE LOGIC (Atomic Writes & Filters)
 * @route   POST /api/metrics/track
 * @desc    Securely increment a counter (Atomic + Human Check)
 */
router.post('/track', async (req, res) => {
    try {
        const { type, field } = req.body; // e.g., type='paths', field='immersive'
        const userAgent = req.get('User-Agent') || '';

        // 1. SECURITY: Bot Filter (The "Humanity Check")
        const isBot = /bot|crawl|spider|media|lighthouse/i.test(userAgent);
        if (isBot) return res.status(200).json({ status: 'ignored_bot' });

        // Phase 4: IP Rate Limiting (The Spam Shield)
        // Limits: 10 votes per IP per hour.
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const now = Date.now();

        if (!global.rateLimit) global.rateLimit = {};
        const userLimit = global.rateLimit[ip] || { count: 0, reset: now + 3600000 };

        if (now > userLimit.reset) {
            userLimit.count = 0;
            userLimit.reset = now + 3600000;
        }

        if (userLimit.count >= 10) {
            console.warn(`[METRICS] Rate Limit Exceeded: ${ip}`);
            return res.status(429).json({ error: "Too many requests" });
        }

        userLimit.count++;
        global.rateLimit[ip] = userLimit;

        // 2. VALIDATION: Allowlist (No arbitrary writes)
        const ALLOWED_UPDATES = {
            'sources': ['linkedin', 'resume', 'anonymous'],
            'paths': ['immersive', 'quick']
        };

        if (!ALLOWED_UPDATES[type] || !ALLOWED_UPDATES[type].includes(field)) {
            return res.status(400).json({ error: "Invalid metric target" });
        }

        // 3. ATOMICITY: The Transaction (Race Condition Solver)
        // Instead of "Read -> Add 1 -> Write" (which fails if 2 people do it at once),
        // we use a Transaction: "Increment whatever is there".
        const ref = db.ref(`${type}/${field}`);

        await ref.transaction((currentValue) => {
            return (currentValue || 0) + 1;
        });

        // 4. INVALIDATE CACHE
        // We just changed the truth, so our cache is now a lie.
        // Clear it so the next Read gets the fresh count.
        cache = { data: null, timestamp: 0 };

        res.json({ success: true, field_updated: field });

    } catch (error) {
        console.error('[METRICS] Write Error:', error);
        res.status(500).json({ error: "Update failed" });
    }
});

module.exports = router;
