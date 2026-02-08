import { describe, it, expect } from 'vitest';
import { extractOwnerFromGithubUrl, extractRepoFromGithubUrl, isValidGithubRepoUrl } from '../githubHelpers';

describe('githubHelpers', () => {
    describe('extractOwnerFromGithubUrl', () => {
        it('extracts owner from valid GitHub URLs', () => {
            expect(extractOwnerFromGithubUrl('https://github.com/facebook/react')).toBe('facebook');
            expect(extractOwnerFromGithubUrl('https://github.com/torvalds/linux')).toBe('torvalds');
            expect(extractOwnerFromGithubUrl('https://github.com/microsoft/vscode')).toBe('microsoft');
        });

        it('handles URLs with trailing slashes', () => {
            expect(extractOwnerFromGithubUrl('https://github.com/facebook/react/')).toBe('facebook');
            expect(extractOwnerFromGithubUrl('https://github.com/facebook/react///')).toBe('facebook');
        });

        it('handles organization names with hyphens', () => {
            expect(extractOwnerFromGithubUrl('https://github.com/google-research/bert')).toBe('google-research');
            expect(extractOwnerFromGithubUrl('https://github.com/my-org-123/repo')).toBe('my-org-123');
        });

        it('returns null for malformed URLs (too few segments)', () => {
            expect(extractOwnerFromGithubUrl('https://github.com/owner')).toBeNull();
            expect(extractOwnerFromGithubUrl('https://github.com/')).toBeNull();
            expect(extractOwnerFromGithubUrl('https://github.com')).toBeNull();
        });

        it('returns null for non-GitHub URLs', () => {
            expect(extractOwnerFromGithubUrl('https://gitlab.com/owner/repo')).toBeNull();
            expect(extractOwnerFromGithubUrl('https://bitbucket.org/owner/repo')).toBeNull();
            expect(extractOwnerFromGithubUrl('https://example.com/owner/repo')).toBeNull();
        });

        it('returns null for invalid owner formats', () => {
            // Path traversal attempt
            expect(extractOwnerFromGithubUrl('https://github.com/../repo')).toBeNull();

            // Invalid characters
            expect(extractOwnerFromGithubUrl('https://github.com/invalid@name/repo')).toBeNull();
            expect(extractOwnerFromGithubUrl('https://github.com/invalid name/repo')).toBeNull();
            expect(extractOwnerFromGithubUrl('https://github.com/invalid.name/repo')).toBeNull();

            // Starts or ends with hyphen (invalid GitHub username)
            expect(extractOwnerFromGithubUrl('https://github.com/-invalid/repo')).toBeNull();
            expect(extractOwnerFromGithubUrl('https://github.com/invalid-/repo')).toBeNull();
        });

        it('returns null for completely invalid URLs', () => {
            expect(extractOwnerFromGithubUrl('not a url')).toBeNull();
            expect(extractOwnerFromGithubUrl('')).toBeNull();
            expect(extractOwnerFromGithubUrl('http://')).toBeNull();
        });

        it('handles URLs with query parameters and fragments', () => {
            expect(extractOwnerFromGithubUrl('https://github.com/facebook/react?tab=readme')).toBe('facebook');
            expect(extractOwnerFromGithubUrl('https://github.com/facebook/react#installation')).toBe('facebook');
        });
    });

    describe('extractRepoFromGithubUrl', () => {
        it('extracts repository name from valid GitHub URLs', () => {
            expect(extractRepoFromGithubUrl('https://github.com/facebook/react')).toBe('react');
            expect(extractRepoFromGithubUrl('https://github.com/torvalds/linux')).toBe('linux');
        });

        it('handles repository names with dots and underscores', () => {
            expect(extractRepoFromGithubUrl('https://github.com/owner/my.repo')).toBe('my.repo');
            expect(extractRepoFromGithubUrl('https://github.com/owner/my_repo')).toBe('my_repo');
            expect(extractRepoFromGithubUrl('https://github.com/owner/my-repo-2.0')).toBe('my-repo-2.0');
        });

        it('returns null for invalid URLs', () => {
            expect(extractRepoFromGithubUrl('https://github.com/owner')).toBeNull();
            expect(extractRepoFromGithubUrl('https://gitlab.com/owner/repo')).toBeNull();
        });

        it('returns null for invalid repository name formats', () => {
            // Spaces not allowed
            expect(extractRepoFromGithubUrl('https://github.com/owner/invalid repo')).toBeNull();

            // Special characters not allowed (except . _ -)
            expect(extractRepoFromGithubUrl('https://github.com/owner/invalid@repo')).toBeNull();
            expect(extractRepoFromGithubUrl('https://github.com/owner/invalid!repo')).toBeNull();
        });
    });

    describe('isValidGithubRepoUrl', () => {
        it('returns true for valid GitHub repository URLs', () => {
            expect(isValidGithubRepoUrl('https://github.com/facebook/react')).toBe(true);
            expect(isValidGithubRepoUrl('https://github.com/microsoft/vscode')).toBe(true);
        });

        it('returns false for invalid URLs', () => {
            expect(isValidGithubRepoUrl('https://github.com/owner')).toBe(false);
            expect(isValidGithubRepoUrl('https://gitlab.com/owner/repo')).toBe(false);
            expect(isValidGithubRepoUrl('not a url')).toBe(false);
            expect(isValidGithubRepoUrl('')).toBe(false);
        });
    });

    // Edge case: Very long URLs
    describe('edge cases', () => {
        it('handles maximum length GitHub usernames (39 chars)', () => {
            const maxLengthUser = 'a'.repeat(38) + 'b'; // 39 chars, valid
            const url = `https://github.com/${maxLengthUser}/repo`;
            expect(extractOwnerFromGithubUrl(url)).toBe(maxLengthUser);
        });

        it('rejects usernames that are too long (40+ chars)', () => {
            const tooLongUser = 'a'.repeat(40); // 40 chars, invalid
            const url = `https://github.com/${tooLongUser}/repo`;
            expect(extractOwnerFromGithubUrl(url)).toBeNull();
        });

        it('handles single character usernames', () => {
            expect(extractOwnerFromGithubUrl('https://github.com/a/repo')).toBe('a');
        });

        it('handles deep paths (should still extract owner correctly)', () => {
            // GitHub URLs like /owner/repo/issues/123
            expect(extractOwnerFromGithubUrl('https://github.com/facebook/react/issues/123')).toBe('facebook');
        });
    });
});
