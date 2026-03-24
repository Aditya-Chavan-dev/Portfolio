import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/shared/firebase'

type AuditEvent =
  | 'login_success'
  | 'logout_manual'
  | 'session_auto_expired'

/**
 * Write an entry to the Firestore auditLog collection.
 * Fire-and-forget — errors are logged but never block the UI.
 */
export async function writeAuditLog(
  event: AuditEvent,
  details: Record<string, unknown> = {}
): Promise<void> {
  try {
    await addDoc(collection(db, 'auditLog'), {
      event,
      timestamp: serverTimestamp(),
      details,
    })
  } catch (err) {
    console.error('Failed to write audit log:', err)
  }
}
