# Security Credentials Rotation Guide

This guide covers rotating both the **Client-Side API Key** and the **Server-Side Service Account Key**.

## 🛡️ 1. Client-Side API Key Rotation
*Rotates the key used by your frontend (React App) to talk to Firebase.*

### Step 1: Create New Key
1. Go to **Google Cloud Console** > [Credentials](https://console.cloud.google.com/apis/credentials).
2. Select your project (`portfolio0110`).
3. Click **+ CREATE CREDENTIALS** > **API key**.
4. Copy the new key.

### Step 2: Restrict New Key (Critical)
1. Click the new key name to edit settings.
2. **Application restrictions**: Select **HTTP referrers (web sites)**.
   - Add: `localhost:3000`
   - Add: `https://portfolio0110.web.app` (and any other custom domains)
3. **API restrictions**: Select **Restrict key** and allow:
   - Firebase Installation API
   - Token Service API
   - Identity Toolkit API
   - Firebase Realtime Database API
   - Firebase Management API
4. Save.

### Step 3: Update Environment
1. Update `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_new_key_paste_here
   ```
2. Redeploy your application.

### Step 4: Delete Old Key
1. Once deployed and verified, return to [Credentials](https://console.cloud.google.com/apis/credentials).
2. Delete the old unsecured key.

---

## 🔑 2. Service Account Private Key Rotation
*Rotates the "Admin" key file (`serviceAccountKey.json`). This gives full super-admin access to your project.*

**IMPORTANT**: The service account key is now stored **outside the repository** for security.

**Current Location**: `G:\secure-keys\serviceAccountKey.json`

### Why Store Outside Repository?
- ✅ Prevents accidental commits
- ✅ Reduces security risks
- ✅ Follows security best practices
- ✅ Keeps sensitive credentials separate from code

### Step 1: Generate New Key
1. Go to **Firebase Console** > **Project Settings** (Gear Icon) > **Service accounts**.
2. Click **Generate new private key**.
3. Confirm by clicking **Generate key**.
4. A `.json` file will download automatically.

### Step 2: Replace Local File
1. Rename the downloaded file to `serviceAccountKey.json`.
2. Move it to the secure location: `G:\secure-keys\serviceAccountKey.json`.
3. **Verify**: The file should NOT be in the repository directory.
4. **Double Check**: Ensure `serviceAccountKey.json` is listed in your `.gitignore` file.

### Step 3: Revoke Old Key (Delete)
*Note: Firebase Console doesn't explicitly "list" old keys to delete in the UI easily, but generating a new one doesn't automatically invalidate the old one unless you delete the specific key ID from the associated Google Cloud Service Account.*

1. Go to **Google Cloud Console** > [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
2. Find the service account (usually `firebase-adminsdk-xxxxx@portfolio0110.iam.gserviceaccount.com`).
3. Click on the email address of the service account.
4. Go to the **Keys** tab.
5. Identify the **old** key (look at the "Created" date).
6. Click the trash icon 🗑️ to **Delete** the old key.

---

## 🔍 3. Sanity Check Security Rules
*Ensure your database isn't publicly writable.*

1. Go to **Firebase Console** > **Realtime Database** > **Rules**.
2. Ensure rules are not just `".read": true, ".write": true`.
3. They should be restricted to authenticated users or specific logical paths.
