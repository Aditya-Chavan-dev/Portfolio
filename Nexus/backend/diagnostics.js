const express = require('express');
const router = express.Router();
const { db } = require('../../backend/firebase');
const os = require('os');
const dns = require('dns');

// Helper to check outbound internet access
const checkInternet = () => {
    return new Promise((resolve) => {
        const start = Date.now();
        dns.lookup('google.com', (err) => {
            if (err) resolve({ status: false, latency: 0 });
            else resolve({ status: true, latency: Date.now() - start });
        });
    });
};

router.get('/health', async (req, res) => {
    const health = {
        timestamp: Date.now(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        system: {
            platform: os.platform(),
            cpu: os.cpus().length,
            freemem: os.freemem(),
            totalmem: os.totalmem()
        },
        checks: {
            database: { status: 'unknown', latency: 0 },
            network: { status: 'unknown', latency: 0 }
        }
    };

    try {
        // 1. Database Check (Round Trip)
        const dbStart = Date.now();
        const testRef = db.ref('system/health_check_ping');
        await testRef.set(dbStart);
        await testRef.remove();
        health.checks.database = {
            status: 'operational',
            latency: Date.now() - dbStart
        };
    } catch (error) {
        health.checks.database = {
            status: 'failed',
            latency: 0,
            error: error.message
        };
    }

    try {
        // 2. Network Check
        const netCheck = await checkInternet();
        health.checks.network = {
            status: netCheck.status ? 'operational' : 'failed',
            latency: netCheck.latency
        };
    } catch (error) {
        health.checks.network = {
            status: 'failed',
            latency: 0,
            error: error.message
        };
    }

    // Overall Status
    const isHealthy =
        health.checks.database.status === 'operational' &&
        health.checks.network.status === 'operational';

    res.status(isHealthy ? 200 : 503).json(health);
});

module.exports = router;
