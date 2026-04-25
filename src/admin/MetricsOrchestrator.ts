import { db } from '@/common/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface BufferEntry {
  label: string;
  latency: number;
  status: 'ok' | 'error';
  ts: number;
  type?: string;
  data?: unknown;
}

interface RateLimitEntry {
  label: string;
  ts: number;
  code: number | string;
}

const buffer: BufferEntry[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const rateLimitHits: RateLimitEntry[] = [];

/**
 * Traced Call Wrapper
 * Wraps any promise-based function (Firestore read, GitHub API) to track latency and success.
 */
export async function tracedCall<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const t0 = performance.now();
  try {
    const result = await fn();
    const latency = Math.round(performance.now() - t0);
    pushToBuffer({ label, latency, status: 'ok', ts: Date.now() });
    incrementLocalCounter('reads');
    return result;
  } catch (e: any) {
    const latency = Math.round(performance.now() - t0);
    pushToBuffer({ label, latency, status: 'error', ts: Date.now() });
    
    // Track rate limits specifically
    if (e?.code === 'resource-exhausted' || e?.status === 429) {
      logRateLimit(label, e?.status || 429);
    }
    throw e;
  }
}

/**
 * Traced Write Wrapper
 * Used to track write counts for the local budget monitor.
 */
export function tracedWrite<T>(label: string, fn: () => T): T {
  incrementLocalCounter('writes');
  pushToBuffer({ label, latency: 0, status: 'ok', ts: Date.now() });
  return fn();
}

/**
 * Analytics Buffer Logic
 */
function pushToBuffer(entry: BufferEntry) {
  buffer.push(entry);
  if (!flushTimer) {
    // Flush metrics every 60 seconds to save writes
    flushTimer = setTimeout(flushBuffer, 60_000);
  }
}

async function flushBuffer() {
  flushTimer = null;
  if (!buffer.length) return;
  
  const payload = [...buffer];
  buffer.length = 0;
  
  try {
    await setDoc(doc(db, 'admin_metrics', 'performance'), {
      calls: payload.slice(-200), // maintain sliding window of last 200 calls
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (_) {
    // Silent fail — health monitoring must never break the main landing page
  }
}

async function logRateLimit(label: string, code: number | string) {
  try {
    const ref = doc(db, 'admin_metrics', 'ratelimits');
    rateLimitHits.push({ label, ts: Date.now(), code });
    await setDoc(ref, {
      hits: rateLimitHits.slice(-50),
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (_) {}
}

/**
 * Local Storage Usage Counters
 * Provides "Zero-Cost" approximate tracking for Firebase Spark limits.
 */
export function incrementLocalCounter(type: 'reads' | 'writes' | 'deletes') {
  const today = new Date().toDateString();
  const raw = localStorage.getItem('admin_usage');
  let stored = raw ? JSON.parse(raw) : { date: today, reads: 0, writes: 0, deletes: 0 };
  
  if (stored.date !== today) {
    stored = { date: today, reads: 0, writes: 0, deletes: 0 };
  }
  
  stored[type] = (stored[type] || 0) + 1;
  localStorage.setItem('admin_usage', JSON.stringify(stored));
}

/**
 * Manual metric logging (e.g. for Web Vitals or Clicks)
 */
export function logMetric(type: string, data: Record<string, unknown>, status: 'ok' | 'error' = 'ok') {
  const entry: BufferEntry = {
    label: typeof data === 'string' ? data : ((data['target'] as string) || type),
    latency: (data['latency'] as number) || 0,
    status,
    ts: Date.now(),
    type,
    data,
  };
  pushToBuffer(entry);
}

export function getLocalCounters() {
  const today = new Date().toDateString();
  const raw = localStorage.getItem('admin_usage');
  const stored = raw ? JSON.parse(raw) : { date: today, reads: 0, writes: 0, deletes: 0 };
  
  if (stored.date !== today) return { reads: 0, writes: 0, deletes: 0 };
  return stored;
}



