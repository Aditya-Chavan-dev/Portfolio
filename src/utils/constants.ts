
export const CACHE_KEY_PROJECTS = 'github_projects_v2';
export const CACHE_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours

/**
 * Responsive breakpoints matching Tailwind CSS standards
 * @see https://tailwindcss.com/docs/responsive-design
 */
export const BREAKPOINTS = {
    /** Below this width = mobile device (matches Tailwind 'md' breakpoint) */
    MOBILE_MAX: 768,

    /** Below this width = tablet device (matches Tailwind 'lg' breakpoint) */
    TABLET_MAX: 1024,

    /** Above this width = desktop device (matches Tailwind 'xl' breakpoint) */
    DESKTOP_MIN: 1280,
} as const;
