import { db } from '@/shared/firebase';
import { doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

let heartbeatTimer: any = null;

export async function startAdminSession(email: string) {
  if (heartbeatTimer) clearInterval(heartbeatTimer);

  const uid = email.replace(/[@.]/g, '_'); // Simplified UID for tracking if actual UID not handy
  const sessionRef = doc(db, 'admin_sessions', uid);

  await setDoc(sessionRef, {
    loginAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
    userAgent: navigator.userAgent,
    email
  });

  heartbeatTimer = setInterval(async () => {
    await setDoc(sessionRef, {
      lastSeen: serverTimestamp(),
    }, { merge: true });
  }, 5 * 60 * 1000);
}

export async function stopAdminSession() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}
