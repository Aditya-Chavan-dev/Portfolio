---
name: Bootstrap Protocol
description: Automatically enforces the "Antigravity Standard" toolset (CodeRabbit, Dependabot, Docusaurus) on every project.
---

# Bootstrap Protocol

## Purpose
This skill ensures that every Antigravity project is equipped with the "Zero Cost" golden triangle of developer tools:
1.  **CodeRabbit** (AI Code Review)
2.  **Dependabot** (Security)
3.  **Docusaurus** (Documentation)

## Triggers
You should activate this skill when:
- You enter a new project directory.
- You are asked to "initialize" or "setup" a project.
- You notice any of the standard configuration files are missing.

## Instructions

### 1. Check for CodeRabbit
**Look for:** `.coderabbit.yaml` in the project root.
**If Missing:** Create it immediately with the standard "chill" profile configuration.

```yaml
language: "en-US"
reviews:
  profile: "chill"
  auto_review:
    enabled: true
chat:
  auto_reply: true
```

### 2. Check for Dependabot
**Look for:** `.github/dependabot.yml`.
**If Missing:** Create it with weekly updates for `npm` and `github-actions`.

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

### 3. Check for Docusaurus
**Look for:** `docs/` directory or `docusaurus.config.js`.
**If Missing:** initializing Docusaurus is heavy, so **ASK THE USER** for permission first, but strongly recommend it:
> "I notice this project lacks documentation. Shall I initialize the standard Docusaurus engine for you?"

## Verification
After ensuring these files exist, you may proceed with the user's primary request, knowing the environment is secure and intelligent.
