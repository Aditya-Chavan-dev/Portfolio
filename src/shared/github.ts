const _rawUsername = import.meta.env.VITE_GITHUB_USERNAME ?? ''
if (!_rawUsername) {
  console.warn('[github] VITE_GITHUB_USERNAME is not set — GitHub features will be disabled.')
}
export const GITHUB_USERNAME = _rawUsername as string

const _parsedTTL = Number(import.meta.env.VITE_GITHUB_CACHE_TTL_HOURS)
export const GITHUB_CACHE_TTL_HOURS = Number.isNaN(_parsedTTL) ? 6 : _parsedTTL

export const GITHUB_API_BASE = 'https://api.github.com' as const
