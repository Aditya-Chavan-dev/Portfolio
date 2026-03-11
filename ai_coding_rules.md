# AI Coding Rules: Efficiency & Effectiveness
*(Version: Integrated - Iteratively Updated)*

## 1. Core Principles
**"Simplicity First. No Laziness. Minimal Impact."**
*   **Aggressive Conciseness**: If a result can be attained by writing 20 lines of optimized code instead of 40-50 lines of complex logic, it MUST be written in the optimized way.
*   **KISS Principle (Keep It Simple Stupid)**: Prefer simple, obvious solutions over clever abstractions. If it's not immediately understandable, it's not simple.
*   **DRY (Don't Repeat Yourself)**: Repeated logic = repeated bugs. Extract reusable units.
*   **Demand Elegance**: For non-trivial changes, pause and ask: "Is there a more elegant way?" If a fix feels hacky, stop and re-implement.

---

## 2. Code Structure & Complexity
**"Clean code reduces the number of decision paths."**
*   **The "One Job" Rule**: A function should either coordinate logic or execute logic, NEVER both. Keep functions small and focused.
*   **Cyclomatic Complexity**: Flatten deep nesting. Hard limit of **2 levels** of indentation.
    *   **Favor Early Returns**: Guard against invalid states upfront to reduce indentation and cognitive load.
*   **Pattern Matching**: Prefer `switch`/`match` or object lookups over `if-else` chains.
*   **Composition Over Inheritance**: Use inheritance only for true "is-a" relationships. Favor composition to add behavior without tight coupling.

---

## 3. The Golden Standards (Syntax & Style)
*   **Avoid Magic Numbers**: Hard-coded literals hide intent. Extract them into named constants or enums.
*   **Meaningful Names**: Names should explain purpose, not implementation. If a variable needs a comment, the name is wrong.
*   **Avoid Long Parameter Lists**: Too many arguments are a code smell. Wrap related values into a single object or config.
*   **Comments**: **Comment Only When Necessary**. Good code explains *what*; comments should explain *why*. If comments describe the code, refactor the code.

---

## 4. Operational Protocols (The "AI Agent" Standard)
1.  **Plan Mode Default**: Enter plan mode for ANY non-trivial task. Write detailed specs upfront. **Planning before typing** saves debugging time.
2.  **Subagent Strategy**: Use subagents for research/parallel analysis. One task per subagent.
3.  **Self-Improvement Loop**: After ANY correction, update `tasks/lessons.md`. Ruthlessly iterate.
4.  **Verification Before Done**: Never mark complete without proof. Diff behavior. Run tests.
5.  **Autonomous Bug Fixing**: Just fix it. Point at logs/errors, then resolve.
6.  **Task Management**:
    *   **Writing Small Chunks**: Smaller code = fewer bugs = faster delivery.
    *   **Automating Repetitive Tasks**: Suggest scripts over manual steps every single time.
    *   **Commit Messages**: Write what changed and *why*. Commits are part of documentation.

---

## 5. System Design Trade-offs
**"Rule No.1: It’s all about tradeoffs."**
Evaluate these 15 points for every system design decision:

| Decision Point | Trade-off A | Trade-off B | Trigger |
| :--- | :--- | :--- | :--- |
| **Scaling** | Scalability | Performance | Growth vs. Speed |
| **Direction** | Vertical | Horizontal | Simplicity vs. Infinite Scale |
| **Network** | Latency | Throughput | Real-time vs. Volume |
| **Database** | SQL | NoSQL | ACID vs. Flexibility |
| **CAP** | Consistency | Availability | Accurate vs. Always Up |
| **State** | Strong Consistency | Eventual Consistency | Banking vs. Social |
| **Caching** | Read-Through | Write-Through | Read-Heavy vs. Write-Heavy |
| **Processing** | Batch | Stream | Periodic vs. Real-time |
| **Execution** | Synchronous | Asynchronous | Blocking vs. Non-blocking |
| **Arch State** | Stateful | Stateless | Session vs. REST |
| **Comms** | Long Polling | WebSockets | Notifications vs. Real-time Game |
| **Data Struct** | Normalization | Denormalization | Integrity vs. Read Speed |
| **Deploy** | Monolithic | Microservices | MVP vs. Enterprise Scale |
| **API** | REST | GraphQL | Standard vs. Efficient Fetching |
| **Transport** | TCP | UDP | Reliable vs. Fast |

---

## 6. REST API Design Standards
**"Consistent, Predictable, Resource-Oriented."**
*   **Resource Naming**: Use **Plural Nouns** for all resources (e.g., `/books`, `/users`). No verbs in URIs (e.g., Avoid `/getBooks`, `/createUser`). Use HTTP methods (`GET`, `POST`) to define action.
*   **JSON Only**: Always return `Content-Type: application/json`. Never return plain text.
*   **HTTP Status Codes**: Use precise codes to communicate state.
    *   `200 OK`: Success (GET, PUT, PATCH).
    *   `201 Created`: Resource created (POST).
    *   `202 Accepted`: Request accepted for processing (Async/Background).
    *   `204 No Content`: Successful deletion (DELETE).
    *   `400 Bad Request`: Client error/Validation failure.
    *   `401 Unauthorized`: Missing/Invalid authentication.
    *   `403 Forbidden`: Authenticated but permissions denied.
    *   `404 Not Found`: Resource does not exist.
    *   `500 Internal Server Error`: Server failure.
*   **Error Responses**: Return structured JSON errors, not HTML/Text.
    *   Format: `{ "error": "Summary", "detail": { "field": "Reason" } }`
    *   **Never return 200 OK for an error**.
*   **Filtering & Pagination**: Use query strings, not new endpoints.
    *   *Bad*: `/books/published`
    *   *Good*: `/books?published=true&page=2&limit=10`
*   **Flat Structure**: Avoid deep nesting. prefer query params for relations.
    *   *Bad*: `/authors/cagan/books`
    *   *Good*: `/books?author=cagan`
*   **Trailing Slashes**: Enforce a strict convention (no-slash preferred) and redirect gracefully if mismatched.

---

## 7. Error Handling Strategy
*   **Fail Fast, Fail Loud**: Do not suppress errors with empty catches. Return/throw immediately on invalid state.
*   **Validate Inputs**: Trust nothing. Validate function arguments and API responses at the boundary.
*   **Result Pattern**: Prefer explicit error returns/tuples or `Option`/`Result` types over unchecked exceptions where possible.

---

## 8. Technology Stack
*(To be defined in next step)*
