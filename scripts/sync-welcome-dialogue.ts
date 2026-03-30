import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

// 1. Resolve Paths
const serviceAccountPath = path.resolve(process.cwd(), 'dump/scripts/serviceAccountKey.json');
const contentPath = path.resolve(process.cwd(), 'src/landing-page/content.json');

async function syncDialogue() {
  try {
    // 2. Load Data
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    const content = JSON.parse(readFileSync(contentPath, 'utf8'));

    // 3. Initialize Admin
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }

    const db = admin.firestore();
    const docRef = db.collection('live').doc('welcome');

    console.log('Pushing new Starstruck dialogue to Firestore...');

    // 4. Update Document
    await docRef.set({
      dialogue: content.dialogue,
      highlightIndex: content.highlightIndex,
      ctaDesktop: content.ctaDesktop,
      ctaMobile: content.ctaMobile,
      skipHintDesktop: content.skipHintDesktop,
      skipHintMobile: content.skipHintMobile,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log('\x1b[32mSuccessfully synced dialogue to Firestore!\x1b[0m');
    process.exit(0);
  } catch (err: any) {
    console.error('\x1b[31mExecution failed:\x1b[0m', err.message);
    process.exit(1);
  }
}

syncDialogue();
