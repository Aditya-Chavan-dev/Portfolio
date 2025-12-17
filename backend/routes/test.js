const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

// GET /api/test
router.get('/', async (req, res) => {
    console.log('GET /api/test called');

    let dbStatus = 'unknown';
    let dbMessage = null;

    try {
        // Simple write/read test to Firebase RTDB
        const testRef = db.ref('test/message');
        await testRef.set({
            content: 'Hello from Backend!',
            timestamp: Date.now()
        });

        const snapshot = await testRef.once('value');
        dbMessage = snapshot.val();
        dbStatus = 'connected';
    } catch (error) {
        console.error('Firebase Error:', error);
        dbStatus = 'error';
        dbMessage = error.message;
    }

    res.json({
        status: 'success',
        message: 'Backend, frontend, and database are connected!',
        backend_time: new Date().toISOString(),
        database_status: dbStatus,
        database_data: dbMessage
    });
});

module.exports = router;
