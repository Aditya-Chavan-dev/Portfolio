import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { tracedWrite } from '@/common/lib/metrics'

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
    await tracedWrite(`firestore/auditLog/${event}`, () => 
      addDoc(collection(db, 'auditLog'), {
        event,
        timestamp: serverTimestamp(),
        details,
      })
    )
  } catch (err) {
    console.error('Failed to write audit log:', err)
  }
}



