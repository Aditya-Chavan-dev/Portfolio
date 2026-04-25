import welcome from './fallbacks/welcome.json';
import hub from './fallbacks/hub.json';
import quickAccess from './fallbacks/quick-access.json';
import testimonial from './fallbacks/testimonial.json';
import notFound from './fallbacks/not-found.json';

/**
 * ─── Central Fallback Hub ────────────────────────────────────────────────
 * All feature hooks and the Admin Deploy pipeline should import fallbacks
 * from this unified map to ensure architectural consistency.
 */
export const FALLBACK_MAP: Record<string, any> = {
  welcome,
  hub,
  testimonial,
  'not-found': notFound,
  
  // Legacy/Special mappings
  projects: quickAccess,
  skills: { items: [] },
  experience: { items: [] },
  certifications: { items: [] },
};

// Export individual fallbacks for convenient direct import in hooks
export {
  welcome as welcomeFallback,
  hub as hubFallback,
  testimonial as testimonialFallback,
  notFound as notFoundFallback,
  quickAccess as projectsFallback
};
