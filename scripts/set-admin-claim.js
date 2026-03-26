import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import 'dotenv/config'; // Load .env into process.env

/**
 * Tactical Service Script: Set Admin Custom Claim
 * 
 * Usage: 
 * 1. Download service-account.json and place in /scripts
 * 2. Add `ADMIN_UID=your_uid_here` to your .env file
 * 3. Run: npm run admin:set-claim
 */

// 1. Resolve Service Account Path
const POSSIBLE_PATHS = [
  path.resolve(process.cwd(), 'service-account.json'),
  path.resolve(process.cwd(), 'scripts', 'service-account.json'),
  path.resolve(process.cwd(), 'scripts', 'serviceAccountKey.json'),
  path.resolve(process.cwd(), 'serviceAccountKey.json')
];

let serviceAccountPath = POSSIBLE_PATHS.find(p => existsSync(p));

if (!serviceAccountPath) {
  console.error('\x1b[31mError: service account key not found.\x1b[0m');
  console.log('Ensure it is named service-account.json or serviceAccountKey.json in root or /scripts.');
  process.exit(1);
}

// 2. Resolve UID (from arg or .env)
let UID = process.argv[2] || process.env.ADMIN_UID;

if (!UID) {
  console.error('\x1b[31mError: Missing UID.\x1b[0m');
  console.log('Add ADMIN_UID to your .env file or provide it as a command line argument.');
  process.exit(1);
}

try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  console.log(`Setting admin claim for UID: ${UID.substring(0, 5)}... (masked for privacy)`);

  admin.auth().setCustomUserClaims(UID, { admin: true })
    .then(() => {
      console.log('\x1b[32mSuccessfully set admin claim!\x1b[0m');
      console.log('Action: Sign out and sign back in to the Portfolio for the claim to activate.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\x1b[31mError setting admin claim:\x1b[0m', error.message);
      process.exit(1);
    });
} catch (err) {
  console.error('\x1b[31mExecution failed:\x1b[0m', err.message);
  process.exit(1);
}
