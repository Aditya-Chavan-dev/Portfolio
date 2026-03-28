import { db } from '@/common/lib/firebase';
import { collection, getDocs, doc, setDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { tracedCall, tracedWrite } from './MetricsOrchestrator';

export interface Snapshot {
  id: string;
  timestamp: any;
  data: Record<string, any>;
  label: string;
}

/**
 * Creates a Point-in-Time (PIT) snapshot of the adminConfig collection.
 */
export async function createSnapshot(label: string = 'Manual Backup') {
  return tracedWrite(`snapshot/create/${label}`, async () => {
    // 1. Fetch all documents in adminConfig
    const configCol = collection(db, 'adminConfig');
    const snap = await getDocs(configCol);
    
    const configData: Record<string, any> = {};
    snap.forEach(doc => {
      configData[doc.id] = doc.data();
    });

    // 2. Write to snapshots collection
    const snapshotId = `pit-${Date.now()}`;
    const snapshotRef = doc(db, 'admin_snapshots', snapshotId);
    
    await setDoc(snapshotRef, {
      id: snapshotId,
      label,
      timestamp: serverTimestamp(),
      data: configData
    });

    return snapshotId;
  });
}

/**
 * Retrieves recent snapshots for the timeline.
 */
export async function getRecentSnapshots(max: number = 20): Promise<Snapshot[]> {
  return tracedCall('snapshot/list', async () => {
    const q = query(
      collection(db, 'admin_snapshots'),
      orderBy('timestamp', 'desc'),
      limit(max)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Snapshot);
  });
}

/**
 * Restores a snapshot by overwriting adminConfig documents.
 */
export async function restoreSnapshot(snapshotId: string) {
  return tracedWrite(`snapshot/restore/${snapshotId}`, async () => {
    const snapshotRef = doc(db, 'admin_snapshots', snapshotId);
    const snap = await (await import('firebase/firestore')).getDoc(snapshotRef);
    
    if (!snap.exists()) throw new Error('Snapshot not found');
    
    const { data: configData } = snap.data();
    
    // Batch updates (non-atomic for simplicity)
    const promises = Object.entries(configData).map(([docId, data]) => {
      return setDoc(doc(db, 'adminConfig', docId), data as any);
    });
    
    await Promise.all(promises);
    return true;
  });
}



