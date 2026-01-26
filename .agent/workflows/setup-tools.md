---
description: Automatically setup CodeRabbit, Dependabot, and Docusaurus for a project
---

# Global Tool Setup Workflow

This workflow installs:
1.  **.coderabbit.yaml**: For AI Code Reviews.
2.  **.github/dependabot.yml**: For automated security updates.
3.  **docs/**: A scaffolded Docusaurus site.

## 1. CodeRabbit Setup
Creates the configuration file in the root.

```yaml
# .coderabbit.yaml
language: "en-US"
early_access: false
reviews:
  profile: "chill"
  request_changes_workflow: false
  high_level_summary: true
  auto_review:
    enabled: true
    ignore_title_keywords:
      - "WIP"
      - "DO NOT MERGE"
    drafts: false
  tools:
    ast-grep:
      enabled: true
    fbinfer:
      enabled: true
    biolint:
      enabled: true
chat:
  auto_reply: true
```

## 2. Dependabot Setup
Creates the GitHub Action in `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

## 3. Docusaurus Setup
Run this manually to install the docs engine.

```bash
npx create-docusaurus@latest docs classic --typescript --yes
```
