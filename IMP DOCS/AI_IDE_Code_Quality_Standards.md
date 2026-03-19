# AI IDE Code Quality Standards

*Comprehensive Guidelines for Full-Stack Web Application Development*

## Executive Summary

This document defines the mandatory code quality standards for
AI-assisted development in full-stack web applications using
TypeScript/JavaScript (React/Next.js, Node.js/Express). Every line of
code generated must adhere to these standards without exception.

**Core Philosophy:**

-   All quality dimensions are equally important: maintainability,
    performance, security, and testability

-   Simplicity over complexity - every change must be as simple as
    possible

-   Minimal impact - touch only what is necessary, avoid introducing
    bugs

-   Zero tolerance for over-engineering simple solutions

-   Preserve working code - never break existing functionality

## 1. Critical Anti-Patterns: What AI Must Never Do

These behaviors are strictly forbidden and will result in immediate
rejection of the code:

### 1.1 Over-Engineering

-   Never add unnecessary abstractions *- keep it simple unless
    complexity is justified*

-   Never create unused utility functions *- only create what is
    immediately needed*

-   Never perform premature optimization *- optimize only when there''s
    a proven bottleneck*

-   Never over-comment obvious code *- self-documenting code is
    preferred*

-   Never use complex patterns for simple tasks *- choose the simplest
    solution that works*

### 1.2 Breaking Existing Code

-   Never modify working functions without reason *- if it works, leave
    it alone*

-   Never remove existing error handling *- preserve all try-catch
    blocks and validation*

-   Never change API contracts *- maintain backward compatibility*

-   Never refactor unrelated code *- stay focused on the task at hand*

-   Never remove edge case handling *- preserve all validation and
    boundary checks*

### 1.3 Poor Error Handling

-   Never create silent failures *- no empty catch blocks*

-   Never use generic error messages *- provide specific, actionable
    error information*

-   Never omit user-facing error feedback *- users must know when
    something fails*

-   Never skip validation errors *- validate all inputs before
    processing*

-   Never swallow important errors *- log critical errors and propagate
    appropriately*

### 1.4 Inconsistent Patterns

-   Never use inconsistent naming conventions *- follow existing project
    patterns*

-   Never mix architectural patterns *- use the pattern already
    established in the codebase*

-   Never duplicate logic across files *- DRY principle must be
    followed*

-   Never create unclear file/folder structure *- follow established
    organization patterns*

-   Never mix concerns in a single file *- maintain separation of
    concerns*

### 1.5 Documentation Issues

-   Never write verbose comments explaining obvious code *- code should
    be self-documenting*

-   Never omit WHY explanations for complex logic *- explain the
    reasoning, not the what*

-   Never skip examples for complex logic *- provide usage examples
    where helpful*

-   Never leave documentation outdated after code changes *- update docs
    with code*

-   Never skip edge case documentation *- document known limitations and
    edge behaviors*

2\. Mandatory Code Quality Standards

### 2.1 TypeScript Standards

**Type Safety (Critical):**

-   No ''any'' types - use proper type definitions or ''unknown'' with
    type guards

-   Handle null/undefined explicitly - use optional chaining and nullish
    coalescing

-   Use enums or union types instead of magic strings

-   Type all function signatures with parameter and return types

-   Fix TypeScript strict mode errors incrementally - do not force
    strict mode if it breaks the build

### 2.2 Comprehensive Error Handling

**Every Operation Must:**

-   Wrap risky operations in try-catch blocks

-   Provide specific error messages that explain what went wrong and how
    to fix it

-   Show user-facing error feedback in the UI (toast, modal, inline
    message)

-   Validate all inputs before processing

-   Log errors appropriately (console.error for development, logging
    service for production)

-   Never leave empty catch blocks - at minimum, log the error

### 2.3 Performance Standards

**React/Frontend:**

-   Prevent unnecessary re-renders - use React.memo, useMemo,
    useCallback appropriately

-   Avoid blocking operations on main thread - use Web Workers for heavy
    computation

-   Keep bundle sizes small - use code splitting and lazy loading

-   Prevent memory leaks - clean up subscriptions, timers, and event
    listeners

**Backend/Database:**

-   Avoid N+1 queries - use proper joins or data loader patterns

-   Index database columns used in WHERE, ORDER BY, and JOIN clauses

-   Use pagination for large data sets

-   Implement caching where appropriate

### 2.4 Security Standards (Non-Negotiable)

-   **Prevent SQL injection - use parameterized queries or ORM methods,
    never string concatenation**

-   **Prevent XSS - sanitize all user inputs before rendering, use
    proper escaping**

-   **Never expose secrets/API keys - use environment variables, never
    hardcode**

-   **Always sanitize inputs - validate and sanitize all user-provided
    data**

-   **Implement secure authentication - use industry-standard auth
    libraries**

### 2.5 Testing Requirements

**Tests are ALWAYS required for new features. No exceptions.**

-   Write unit tests for business logic and utility functions

-   Write integration tests for API endpoints

-   Test edge cases and error conditions

-   Ensure tests are maintainable and not brittle

-   Run tests before marking code complete

### 2.6 UX & Edge Case Handling

**Every UI Must Handle:**

-   Loading states for async operations (spinners, skeletons, progress
    indicators)

-   Empty states for no data scenarios (helpful messaging,
    call-to-action)

-   Error boundaries for React components (graceful failure)

-   Graceful degradation when features fail

-   Accessibility considerations (keyboard navigation, screen readers,
    ARIA labels)

3\. Dependency Management

### 3.1 Adding Dependencies

-   Check if an existing solution exists in the codebase before adding
    new dependencies

-   Justify every new dependency - explain why it''s needed

-   Avoid heavy libraries for simple tasks - prefer lightweight
    alternatives or native implementations

-   Check for version conflicts before installing

-   Verify no known security vulnerabilities in the dependency

### 3.2 External APIs

Policy: Avoid external APIs unless absolutely necessary. When they are
needed:

-   Document why the API is required

-   Implement proper error handling for API failures

-   Add rate limiting and retry logic

-   Secure API keys in environment variables

4\. Change Management Principles

### 4.1 Planning Requirements

**When to Plan:**

-   Execute immediately for simple, well-defined tasks

-   MUST create and present a plan first for complex tasks (3+ steps,
    architectural decisions, or unclear scope)

-   Wait for approval before implementing complex changes

### 4.2 Modification Principles

**When modifying existing code, AI MUST:**

-   Touch only necessary files - minimize scope of changes

-   Preserve all existing behavior unless explicitly asked to change it

-   Maintain backward compatibility

-   Keep changes atomic and focused on a single concern

-   Provide clear before/after comparison

### 4.3 Ambiguity Resolution

When requirements are ambiguous, AI must STOP and ask for clarification.
Never make assumptions.

5\. Code Style & Formatting

**Guiding Principle: Prioritize readability over consistency**

-   Write code that is easy to read and understand

-   Use descriptive variable and function names

-   Keep functions small and focused (single responsibility)

-   Use consistent indentation (2 or 4 spaces)

-   Format code for human comprehension first

6\. Git & Commit Standards

**AI Must:**

-   Write clear, descriptive commit messages explaining what and why

-   Keep commits atomic and logical (one concern per commit)

-   Never commit broken code

-   Run linters before committing

-   Follow conventional commit format when applicable

7\. Quality Verification Process

**Before marking any code complete, AI MUST:**

1.  Self-verify the code meets all standards

## 2.  Run all tests and ensure they pass

## 3.  Demonstrate the code working (show output, screenshots, or live
    demo)

## 4.  Show clear before/after comparison for modifications

## 5.  If a quality standard is violated, auto-fix and explain the issue

*Standard Question: ''Would a staff engineer approve this?''*

8\. Standard Violation Protocol

If AI detects it is violating a quality standard during implementation:

## 6.  Immediately stop the current approach

## 7.  Auto-fix the violation

## 8.  Explain what standard was being violated

## 9.  Explain how it was corrected

## 10. Continue with the corrected approach

9\. Technology Stack-Specific Guidelines

### 9.1 React/Next.js Frontend

-   Use functional components with hooks

-   Implement proper error boundaries

-   Use React.lazy for code splitting

-   Optimize re-renders with memo/useMemo/useCallback

-   Handle loading and error states in components

-   Ensure accessibility (semantic HTML, ARIA labels)

### 9.2 Node.js/Express Backend

-   Use async/await for asynchronous operations

-   Implement proper middleware for validation and error handling

-   Use environment variables for configuration

-   Implement request validation and sanitization

-   Follow RESTful API design principles

-   Add proper logging for debugging and monitoring

10\. Summary: The Gold Standard

Every line of code generated by AI must be:

-   **Simple - as simple as possible, never over-engineered**

-   **Safe - preserving all existing behavior and error handling**

-   **Secure - preventing all common vulnerabilities**

-   **Performant - avoiding common performance pitfalls**

-   **Tested - with comprehensive tests for new features**

-   **Documented - with clear WHY explanations where needed**

-   **Consistent - following existing patterns and conventions**

-   **User-friendly - handling all edge cases and providing feedback**

-   **Verified - proven to work before being marked complete**

**These standards are non-negotiable. Every violation must be auto-fixed
immediately.**

*Document Version: 1.0*

*Last Updated: March 2026*
