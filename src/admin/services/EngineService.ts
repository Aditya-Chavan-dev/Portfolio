import { db } from '@/shared/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { tracedCall } from './MetricsOrchestrator';

const OWNER = 'Aditya-Chavan-dev';
const REPO = 'Portfolio';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export interface EngineHealth {
  score: number;
  status: 'optimal' | 'stable' | 'degraded';
  metrics: {
    velocity: number;
    popularity: number;
    debt: number;
  };
  details: any;
}

/**
 * Calculates repository health based on GitHub signals.
 */
export async function getEngineHealth(): Promise<EngineHealth> {
  const cacheDoc = await tracedCall('firestore/engine_cache', () =>
    getDoc(doc(db, 'admin_metrics', 'github'))
  );

  if (cacheDoc.exists()) {
    const cached = cacheDoc.data();
    if (Date.now() - cached.fetchedAt?.toMillis() < CACHE_TTL) {
      return cached.data;
    }
  }

  // Fetch from GitHub API (Renamed from original implementation for clarity)
  const res = await tracedCall('github/repo_health', () =>
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}`).then(r => r.json())
  );

  // Simplified vitality scoring
  const forks = res.forks_count || 0;
  const stars = res.stargazers_count || 0;
  const issues = res.open_issues_count || 0;

  const score = Math.min(100, (stars * 5) + (forks * 10) - (issues * 2));
  const status = score > 80 ? 'optimal' : score > 50 ? 'stable' : 'degraded';

  const payload: EngineHealth = {
    score,
    status,
    metrics: { velocity: 85, popularity: stars, debt: issues },
    details: res
  };

  await setDoc(doc(db, 'admin_metrics', 'github'), {
    data: payload,
    fetchedAt: serverTimestamp(),
  });

  return payload;
}
