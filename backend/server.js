const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { admin, db } = require('./firebase');

// Load env vars from root .env if not in production (Render handles env vars via dashboard)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '../.env' });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://portfolio0110.web.app', 'https://portfolio0110.firebaseapp.com']
        : 'http://localhost:5173' // Vite dev port
}));
app.use(express.json());

// Routes
const testRoutes = require('./routes/test');
app.use('/api/test', testRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Portfolio Backend is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
