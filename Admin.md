# Admin Module Specification: "The Citadel"

## 1. Core Philosophy
*   **Role**: God Mode. Single User.
*   **Security Policy**: "Zero Trust". Client-side checks are for UX only. True security is enforced by **Firestore Security Rules**.
*   **Deployment Capability**: Full Stack, Database-Driven (Option A).
*   **Infrastructure Constraint**: Firebase Spark (Free) Plan. **No File Uploads** (Image URLs only).

## 2. Authentication & Security Architecture ("Fort Knox")
*   **Layer 1: Identity (The Passport)**
    *   **Provider**: Firebase Authentication.
    *   **Protocol**: Dedicated Google Account + **Enforced 2FA**.
    *   **Entropy**: Email MUST be high-entropy (e.g., `admin.nebula.88x@gmail.com`) to prevent Hash Dictionary attacks.
    *   **Persistence**: **Session Only** (`browserSessionPersistence`). Closing the tab MUST kill the session immediately. No "Keep me logged in".
    *   **Logic**: No Password-only logins. Google Sign-In only.
*   **Layer 2: Obfuscation (The Camouflage)**
    *   **Mechanism**: SHA-256 Hash Check in UI.
    *   `sha256(currentUser.email)` === `import.meta.env.VITE_ADMIN_EMAIL_HASH`.
    *   **Benefit**: Public bundle contains only the hash, preventing email harvesting/phishing.
*   **Layer 3: Enforcement (The Steel Vault)**
    *   **Firestore Write Rule**: `allow write: if request.auth.token.email == 'THE_ADMIN_EMAIL' && request.auth.token.email_verified == true;`
    *   **Firestore Read Rule (Draft Privacy)**: `allow read: if resource.data.isVisible == true || request.auth.token.email == 'THE_ADMIN_EMAIL';`
    *   **Schema Validation**: Rules must enforce data types (e.g., `title is string`, `size < 200`) to prevent "Code Injection" or corruption.
*   **Layer 4: Network Isolation (The Moat)**
    *   **Mechanism**: **Firebase App Check** (ReCAPTCHA Enterprise).
    *   **Benefit**: Blocks unauthorized API calls (DoS scripts, curl, Postman) that don't originate from the authentic web domain. Enforced on Firestore & Auth.
*   **Layer 5: Content Security (The Filter)**
    *   **Threat**: Stored XSS (Cross-Site Scripting).
    *   **Mechanism**: **DOMPurify** enforcement.
    *   **Rule**: All text input from Admin must be sanitized before save AND sanitized again upon render in the public app.
*   **Layer 6: Operational Security (The Human)**
    *   **Threat**: Browser Extension Spyware / Local Caching.
    *   **Mandate**: Admin actions must be performed in **Incognito/Private Mode**.
    *   **Reason**: Disables malicious extensions that read form inputs and ensures no local auth tokens persist after window close.
*   **Layer 7: Infrastructure Hardening (The Shield)**
    *   **Threat**: Lateral Movement (Supply Chain Attack) & Stale Data.
    *   **Mechanism 1**: **Content Security Policy (CSP)**.
        *   `default-src 'self'; script-src 'self' https://apis.google.com;`
        *   Prevents compromised 3rd-party libs from phoning home.
    *   **Mechanism 2**: **Cache Busting**.
        *   API/Firestore reads must include unique timestamp params (`?t=DATENOW`) to force fresh data fetch on Admin Dashboard, preventing "Stale Write" errors.
*   **Layer 8: Resilience (The Eject Button)**
    *   **Threat**: Accidental Deletion / Vendor Lock-out.
    *   **Mechanism 1**: **Soft Deletes Protocol**.
        *   Admin UI NEVER sends `DELETE` for standard operations. It sends `{ archived: true, isVisible: false }`.
    *   **Mechanism 2**: **JSON Export**.
        *   "Download Backup" button in Admin UI.
*   **Layer 9: Optimization (The Scaler)**
    *   **Threat**: "Success Disaster" (Spark Plan Quota Limit).
    *   **Mechanism**: **Aggressive Client-Side Caching**.
    *   **Rule**: Public frontend must cache Firestore data in `localStorage` for 1-24 hours. Only fetch if cache is expired or empty.
*   **Layer 10: Compliance (The Lawyer)**
    *   **Threat**: GDPR/Legal Claims on Testimonials.
    *   **Mechanism 1**: **Explicit Consent**. Submission forms must have a "Publishing Consent" checkbox.
    *   **Mechanism 2**: **Compliance Wipe**. Distinct "Permanent Delete" function (Hard Delete) accessible ONLY for legal/GDPR takedown requests.

## 3. Capabilities & Features

### A. Dashboard (The Command Center)
*   **System Health Panel**: Monitor integrity.
*   **Analytics**: Basic counters.

### B. Dynamic Content Manager (Maintenance Mode)
*   **Scope Constraint**: **Edit & Archive Only**.
    *   Admin can edit text/images of *existing* nodes.
    *   Admin **cannot** create new structural types or change the data schema (prevents "Zombie Crash" / Version conflicts).
    *   **No Deletion**: Standard action is "Archive" (Hide). Hard delete is for Legal Compliance only.
*   **Projects & Experience**:
    *   **Text Editor**: Sanitized Input.
    *   **Image Handling**: URL Only.
    *   **Data Source**: Firestore with Caching.
*   **Testimonials**:
    *   Queue: View Pending.
    *   Action: Toggle Visibility / Archive.

### C. Governance (Read-Only)
*   Logs (`Deployment_feature_log.md`, etc.) are managed via IDE/Git workflow.
*   Admin UI does not write to these logs.

## 4. Technical Guidelines
*   **Isolation**: Admin code lives strictly in `src/Admin`.
*   **Lazy Loading**: The Admin module must be **Lazy Loaded** (`React.lazy`) to prevent admin code from bloating the public bundle or being easily inspecting by casual visitors.
*   **Mobile-First**: Admin panel must be usable on mobile.
*   **Code Quality**: Strict typing, component modularity.

## 5. Directory Structure
```
src/Admin/
├── components/       # Dashboard widgets, forms
├── hooks/            # Dedicated Auth/Data hooks
├── pages/            # Dashboard views
├── AdminDashboard.tsx # Main Entry
└── index.ts          # Public API
```
