/**
 * Shared constants for session management, routing, and cache settings.
 */

export const SESSION_KEYS = {
  HAS_SEEN_WELCOME:   'has_seen_welcome',
  ADMIN_EDIT_SESSION: 'admin_edit_session',
  VISIT_RECORDED:     'visit_recorded',
} as const

export const ADMIN_ROUTES = {
  LOGIN: '/amgl-3-10',
  PANEL: '/amgl-panel',
} as const

export const GITHUB_CONFIG = {
  CACHE_TTL_HOURS: 6,
  API_BASE: 'https://api.github.com',
} as const



