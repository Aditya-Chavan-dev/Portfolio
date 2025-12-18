const express = require('express');
const router = express.Router();

// GET /api/ping
// Used for pre-emptive wake-up from sleep mode
router.get('/', (req, res) => {
    res.json({ status: 'online', timestamp: new Date().toISOString() });
});

module.exports = router;
