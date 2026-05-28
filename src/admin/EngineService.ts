import { db } from '@/common/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { tracedCall } from './MetricsOrchestrator';

const OWNER = import.meta.env.VITE_GITHUB_USERNAME || 'Aditya-Chavan-dev';
const REPO = import.meta.env.VITE_GITHUB_REPO || 'Portfolio';

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

const FALLBACK_METRICS: EngineHealth = {
  score: 98,
  status: 'optimal',
  metrics: {
    velocity: 95,
    popularity: 42,
    debt: 0
  },
  details: {
    forks_count: 8,
    stargazers_count: 42,
    open_issues_count: 0
  }
};

/**
 * Reads cached GitHub metrics from the public Firestore live collection.
 * Completely shielded from client-side GitHub rate-limiting.
 */
export async function getEngineHealth(): Promise<EngineHealth> {
  try {
    const snap = await tracedCall('firestore/github_metrics/read', () =>
      getDoc(doc(db, 'live', 'github_metrics'))
    );

    if (snap.exists()) {
      const cached = snap.data();
      if (cached.data) {
        return cached.data as EngineHealth;
      }
    }
  } catch (err) {
    console.warn('[EngineService] Failed to read live github metrics, using static fallback:', err);
  }

  return FALLBACK_METRICS;
}

/**
 * Syncs the GitHub metrics from the live GitHub API into Firestore.
 * Executed manually by administrator to prevent rate limit spikes.
 */
export async function refreshEngineHealth(): Promise<EngineHealth> {
  const res = await tracedCall('github/repo_health_refresh', () =>
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}`).then(r => {
      if (!r.ok) throw new Error(`GitHub API returned status ${r.status}`);
      return r.json();
    })
  );

  const forks = res.forks_count || 0;
  const stars = res.stargazers_count || 0;
  const issues = res.open_issues_count || 0;

  // Dynamically calculate velocity based on recent commit activity
  let velocity = 85;
  try {
    const commitsRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=30`);
    if (commitsRes.ok) {
      const commits = await commitsRes.json();
      if (Array.isArray(commits)) {
        velocity = Math.min(100, Math.max(60, 60 + Math.round(commits.length * 1.33)));
      }
    }
  } catch (err) {
    console.warn('Failed to fetch recent commits for velocity mapping:', err);
  }

  const score = Math.min(100, Math.max(0, (stars * 5) + (forks * 10) - (issues * 2) + 50));
  const status = score > 80 ? 'optimal' : score > 50 ? 'stable' : 'degraded';

  const payload: EngineHealth = {
    score,
    status,
    metrics: { velocity, popularity: stars, debt: issues },
    details: {
      forks_count: forks,
      stargazers_count: stars,
      open_issues_count: issues
    }
  };

  await tracedCall('firestore/github_metrics/write', () =>
    setDoc(doc(db, 'live', 'github_metrics'), {
      data: payload,
      fetchedAt: new Date().toISOString()
    })
  );

  return payload;
}



