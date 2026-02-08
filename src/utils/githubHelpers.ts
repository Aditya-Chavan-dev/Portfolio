/**
 * GitHub URL Helper Utilities
 * 
 * Safe URL parsing and validation for GitHub repositories.
 * Prevents crashes from malformed URLs or unexpected formats.
 */

import { logger } from './logger';

/**
 * Safely extracts the owner (username/organization) from a GitHub repository URL
 * 
 * @param url - Full GitHub repository URL (e.g., https://github.com/facebook/react)
 * @returns Owner name if valid, null if parsing fails
 * 
 * @example
 * extractOwnerFromGithubUrl('https://github.com/facebook/react') // Returns: 'facebook'
 * extractOwnerFromGithubUrl('https://github.com/owner') // Returns: null (invalid structure)
 * extractOwnerFromGithubUrl('https://gitlab.com/owner/repo') // Returns: null (not GitHub)
 */
export function extractOwnerFromGithubUrl(url: string): string | null {
    try {
        // Use URL API for proper parsing (handles encoding, malformed URLs, etc.)
        const urlObj = new URL(url);

        // Validate it's a GitHub URL
        if (!urlObj.hostname.includes('github.com')) {
            logger.error(`[githubHelpers] Invalid GitHub URL hostname: ${urlObj.hostname}`);
            return null;
        }

        // Extract path segments (e.g., "/facebook/react" -> ["facebook", "react"])
        const pathParts = urlObj.pathname.split('/').filter(Boolean);

        // GitHub URLs must have at least [owner, repo]
        if (pathParts.length < 2) {
            logger.error(`[githubHelpers] Invalid GitHub URL structure (expected /owner/repo): ${url}`);
            return null;
        }

        const owner = pathParts[0];

        // Validate owner format (alphanumeric, hyphens, max 39 chars)
        if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(owner)) {
            logger.error(`[githubHelpers] Invalid GitHub username format: ${owner}`);
            return null;
        }

        return owner;
    } catch (error) {
        logger.error(`[githubHelpers] Failed to parse GitHub URL: ${url}`, error);
        return null;
    }
}

/**
 * Safely extracts the repository name from a GitHub repository URL
 * 
 * @param url - Full GitHub repository URL
 * @returns Repository name if valid, null if parsing fails
 * 
 * @example
 * extractRepoFromGithubUrl('https://github.com/facebook/react') // Returns: 'react'
 * extractRepoFromGithubUrl('https://github.com/owner') // Returns: null (invalid)
 */
export function extractRepoFromGithubUrl(url: string): string | null {
    try {
        const urlObj = new URL(url);

        if (!urlObj.hostname.includes('github.com')) {
            logger.error(`[githubHelpers] Invalid GitHub URL hostname: ${urlObj.hostname}`);
            return null;
        }

        const pathParts = urlObj.pathname.split('/').filter(Boolean);

        if (pathParts.length < 2) {
            logger.error(`[githubHelpers] Invalid GitHub URL structure (expected /owner/repo): ${url}`);
            return null;
        }

        // Repo name is second segment
        const repo = pathParts[1];

        // Validate repo name format (alphanumeric, dots, underscores, hyphens)
        if (!/^[a-zA-Z0-9._-]+$/.test(repo)) {
            logger.error(`[githubHelpers] Invalid repository name format: ${repo}`);
            return null;
        }

        return repo;
    } catch (error) {
        logger.error(`[githubHelpers] Failed to parse repository from URL: ${url}`, error);
        return null;
    }
}

/**
 * Validates if a given URL is a valid GitHub repository URL
 * 
 * @param url - URL to validate
 * @returns true if valid GitHub repo URL, false otherwise
 */
export function isValidGithubRepoUrl(url: string): boolean {
    const owner = extractOwnerFromGithubUrl(url);
    const repo = extractRepoFromGithubUrl(url);
    return owner !== null && repo !== null;
}
