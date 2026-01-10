const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { admin, db } = require('./firebase');

/**
 * FIRST PRINCIPLE: Environment Configuration
 * Separation of configuration from code.
 * Local development uses .env file; Production (Render) uses Dashboard Variables.
 */
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '../.env' });
}

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    'https://portfolio0110.web.app',
    'https://portfolio0110.firebaseapp.com',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl) or allowed origins
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

/**
 * FIRST PRINCIPLE: Data Parsing
 * Middleware to translate incoming JSON strings into JavaScript objects.
 */
app.use(express.json());

/**
 * FIRST PRINCIPLE: Modular Routing
 * Keeping the main server file clean by delegating route logic to separate files.
 */
const testRoutes = require('./routes/test');
const pingRoutes = require('./routes/ping');
const githubRoutes = require('./routes/github');

const metricsRoutes = require('./routes/metrics');
const systemRoutes = require('./system/diagnostics');

app.use('/api/test', testRoutes); // General connectivity test
app.use('/api/ping', pingRoutes); // Silent wake-up endpoint
app.use('/api/github', githubRoutes); // Github Stats
app.use('/api/metrics', metricsRoutes); // SSOT Metrics
app.use('/api/system', systemRoutes); // Isolated System Core

/**
 * STARTUP HEALTH CHECK (Pillar 7)
 * Goal: Fail Fast.
 * If we can't talk to the "Vault" (Firebase), we shouldn't pretend to be online.
 */
const verifyConnection = async () => {
    try {
        await db.ref('.info/connected').once('value');
        console.log("✅ [HEALTH] Connected to Truth Vault (Firebase)");
    } catch (error) {
        console.error("❌ [CRITICAL] VITAL CONNECTION FAILED");
        console.error("The backend cannot reach the database. Check FIREBASE_SERVICE_ACCOUNT.");
        // In production, you might want to process.exit(1) here, 
        // but for resilience, we'll keep running to serve cached data if possible.
    }
};

/**
 * Root Endpoint: Simple health check for the API.
 */
app.get('/', (req, res) => {
    res.send('Portfolio Backend is Running');
});

// Start the server and listen for incoming traffic
app.listen(PORT, async () => {
    console.log(`[SERVER] Running on port ${PORT}`);
    console.log(`[SERVER] Mode: ${process.env.NODE_ENV || 'development'}`);
    await verifyConnection();
});

