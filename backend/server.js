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

app.use('/api/test', testRoutes); // General connectivity test
app.use('/api/ping', pingRoutes); // Silent wake-up endpoint
app.use('/api/github', githubRoutes); // Github Stats

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

