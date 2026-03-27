# System Specification: Admin Health & Monitoring OS

This document outlines the architecture, implementation strategy, and data flow for the 7 core modules of the Portfolio Admin Command Center.

---

## 1. Live Performance (The Pulse)
**Description**: Real-time monitoring of application responsiveness and API reliability.
*   **Metrics**: API Latency (GitHub/Firestore), Success/Error Rates, First Contentful Paint (FCP) for visitors.
*   **Implementation**:
    *   **Instrumentation**: Wrap all Firestore and GitHub API calls in a `MetricsOrchestrator` service.
    *   **Precision**: Capture `Request Sent` vs `First Byte Received` to isolate network latency from server processing time.
    *   **Data Flow**: Latency metrics are buffered and sent to `live/metrics/performance` every 60 seconds.
    *   **UI**: Real-time line charts (using Recharts) showing response times over the last hour.

---

## 2. Security & Compliance (The Shield)
**Description**: Enforcement of zero-trust protocols and data integrity audits.
*   **Metrics**: App Check attestation success %, Auth session age, CORS header verification, Rate-limit hits.
*   **Implementation**:
    *   **App Check Monitor**: Query the Firebase App Check API to fetch the ratio of "Verified" vs "Unverified" (blocked) requests.
    *   **Integrity Guard**: A nightly Cloud Function (or manual trigger) that validates 100% of Firestore documents against Zod schemas. Any drift is flagged in a "Compliance Report."
    *   **Auth Session Log**: Track active admin UIDs and their login locations (masked IP).

---

## 3. Traffic & Engagement (The Hive)
**Description**: Deep visitor analytics and interaction heatmaps.
*   **Metrics**: Active visitors, top entry pages, project-click distribution, session depth.
*   **Implementation**:
    *   **Hybrid Presence (SSoT)**: Use a Firestore-based `presence` collection as the source of truth for "Live Now" to bypass GA4 ad-blocker limitations.
    *   **GA4 Integration**: Use the Analytics Data API for historical trends and deep demography.
    *   **Event Tracking**: Custom events for "Project Click" and "Journey Start" sent via Firebase Analytics.
    *   **Heatmap Approximation**: Track `onClick` coordinates on the Hub grid.

---

## 4. Infra & Resources (The Engine)
**Description**: Deep-level monitoring of serverless infrastructure health.
*   **Metrics**: Firestore CPU utilization, Disk usage, Query execution latency (Server-side).
*   **Implementation**:
    *   **Secure Proxy Function**: Frontend calls a restricted Cloud Function that uses a Service Account to pull metrics from GCP Monitoring (never expose GCP keys to client).
    *   **Resource Snapshots**: Periodic polling of database size and index counts.

---

## 5. Time Machine (Snapshots & Rollback)
**Description**: Full state versioning and atomic recovery for all CMS content.
*   **Mechanism**: Revision-based snapshots.
*   **Implementation**:
    *   **Snapshot Collection**: A dedicated Firestore collection `snapshots/`. Each "Deploy" pushes the state of `live/` into a versioned doc: `{ timestamp, author, hash, payload }`.
    *   **Atomic Restore**: Use Firestore Transaction Batches to ensure multi-collection restores are "all-or-nothing."
    *   **Preview Mode**: Boot up a dashboard instance using snapshot data in-memory (read-only).

---

## 6. Firebase Usage Monitor (The Budget)
**Description**: Real-time tracking of Spark/Blaze plan consumption.
*   **Metrics**: Firestore Reads/Writes today, Hosting Bandwidth (GB), Function Invoke count.
*   **Implementation**:
    *   **Aggregator Service**: A Cloud Function that summarizes metrics from GCP Billing and Firestore Usage APIs.
    *   **Data Transparency**: Explicitly display a "GCP 4-hour delay" warning in the UI for billing accuracy.
    *   **Budgeting UI**: Progress bars for Spark Plan limits (Reads/Writes/Bandwidth).

---

## 7. Automated Spell Check & Asset Quality (The Editor)
**Description**: Automated quality assurance for content and media.
*   **Features**: Typo detection, Asset size warnings, Alt-text verification.
*   **Implementation**:
    *   **Text Processing**: Use a lightweight browser library or an API (like LanguageTool) to scan all text fields in the SSoT layer during "Draft" state.
    *   **Asset Inspector**: Check the `FileMetadata` of images in Firebase Storage. Any image >500KB or lacking a `description` field is flagged with an "⚠️ Optimization Required" warning in the admin panel.

---

**Next Steps**: 
1. Initialize the `AdminControlBar` to include the Health Status.
2. Build the `SnapshotService` as the foundation for the Time Machine.
3. Integrate Google Cloud Monitoring API keys into the project environment.
