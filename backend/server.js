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

/**
 * FIRST PRINCIPLE: Security & CORS (Cross-Origin Resource Sharing)
 * Browsers block requests between different domains by default.
 * We must explicitly allow our Frontend URL to communicate with this Backend.
 */
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://portfolio0110.web.app', 'https://portfolio0110.firebaseapp.com']
        : 'http://localhost:5173' // Default Vite development port
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

app.use('/api/test', testRoutes); // General connectivity test
app.use('/api/ping', pingRoutes); // Silent wake-up endpoint

/**
 * Root Endpoint: Simple health check for the API.
 */
app.get('/', (req, res) => {
    res.send('Portfolio Backend is Running');
});

// Start the server and listen for incoming traffic
app.listen(PORT, () => {
    console.log(`[SERVER] Running on port ${PORT}`);
    console.log(`[SERVER] Mode: ${process.env.NODE_ENV || 'development'}`);
});

