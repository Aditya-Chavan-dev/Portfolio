# Firebase Configuration

## Setup
1. Ensure `firebase-tools` is installed (`npm i -g firebase-tools`).
2. Login: `firebase login`.
3. Select project: `firebase use --add`.

## Deployment
- Deploy everything: `firebase deploy` (Run from this dir or root if configured)
- Deploy only hosting: `firebase deploy --only hosting` (Make sure frontend is built first)
