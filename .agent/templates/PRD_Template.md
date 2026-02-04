---
title: "PRD: [Feature Name]"
status: Draft # Draft, In Review, Approved, Deprecated
author: [Your Name]
created_at: [Date]
---

# 1. Problem Statement
*What problem are we trying to solve? Why is this important? Be critical—does this actually add value?*

# 2. Goals & Non-Goals
### Goals
*   [ ] Specific Metric 1
*   [ ] Specific Metric 2

### Non-Goals
*   [ ] What are we explicitly NOT doing?

# 3. User Stories & Scope
| Actor | Action | Outcome | Priority |
|-------|--------|---------|----------|
| User  | clicks X | sees Y    | P0       |

# 4. Critical Analysis (Safety & Liability)
> **WARNING:** This section is mandatory. Do not skip.

### 4.1 Data Flow & Privacy
*   **What data is collected?**
*   **Where is it stored?**
*   **Is PII (Personally Identifiable Information) involved?**
*   *Liability Check: Use this space to document GDPR/CCPA implications.*

### 4.2 Failure Modes
*   **What happens if the API fails?**
*   **What happens if the user has no internet?**
*   **What is the worst-case scenario?**

### 4.3 Security Risks
*   **Attack Vectors:** (e.g., XSS, SQLi, IDOR)
*   **Mitigation Strategy:**

# 5. Technical Constraints & Trade-offs
*   *Constraint A:* (e.g., Mobile performance)
*   *Trade-off:* We will sacrifice X to get Y.

# 6. Quality & Verification (The "Anti-Rot" Layer)
> **Mandatory:** Prevent "garbage tests" and "overly clever code".

### 6.1 Testing Strategy
*   **Unit Tests:** What complex logic needs isolated testing?
*   **Integration Tests:** How do we verify the data flow?
*   **Manual Verification:** What *cannot* be automated?

### 6.2 Simplicity Check
*   *Is there a simpler way to do this?*
*   *Are we introducing new dependencies?*
*   *If AI (or a junior engineer) looks at this in 6 months, will they understand it?*

# 7. Success Metrics
*   How will we know if this failed?
