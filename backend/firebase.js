const admin = require('firebase-admin');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '../.env' });
}

let serviceAccount;

try {
    // Try parsing the JSON string from env var first (Best for Render)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY.startsWith('{')) {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        } else {
            // Fallback to file path (Local dev)
            serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        }
    } else {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is missing. Database features may not work.');
    }
} catch (error) {
    console.error('Error loading Firebase Service Account:', error);
}

if (!admin.apps.length && serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}-default-rtdb.asia-southeast1.firebasedatabase.app` // Regional Endpoint
    });
} else if (!admin.apps.length) {
    // Fallback for cases where we might rely on default Google credentials (e.g. GCP)
    admin.initializeApp();
}

const db = admin.database();
const firestore = admin.firestore();

module.exports = { admin, db, firestore };
