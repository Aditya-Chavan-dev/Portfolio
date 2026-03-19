# Stack Constraint — Standing Instruction

## This applies to every task in this codebase, without exception.

---

## The Approved Stack

This project runs exclusively on the following stack. Every line of code written must fit within it.

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| 3D / WebGL | Three.js |
| Database | Firebase Firestore (Spark plan) |
| Presence tracking | Firebase Realtime Database (Spark plan) |
| Auth | Firebase Authentication — Google Sign-In only |
| File storage | Firebase Storage (Spark plan) |
| Hosting | Firebase Hosting (Spark plan) |
| Email | EmailJS — client-side, free tier (200 emails/month) |
| Secret answer hashing | Web Crypto API (SHA-256) — browser-native, no library |
| Push notifications | Deferred to v2 — in-app indicators only for v1 |
| Scheduled tasks | Client-side on dashboard open — no background jobs |

---

## What Is Permanently Banned

The following are NOT part of this project under any circumstances.

### Banned infrastructure
- Any Node.js server (Express, Fastify, Koa, Hapi, or any other framework)
- Render, Railway, Fly.io, Heroku, or any server hosting platform
- Vercel serverless functions, Netlify functions, or any serverless compute outside Firebase
- Supabase, PlanetScale, Neon, or any database other than Firebase Firestore + RTDB
- Any Docker container, Dockerfile, or docker-compose file
- Any CI/CD pipeline that deploys a backend service

### Banned Firebase features (require Blaze plan)
- Firebase Cloud Functions (`functions/` directory)
- Firebase Cloud Scheduler
- Firebase Extensions that require Cloud Functions
- Any import from `firebase-functions`
- Any use of the Firebase Admin SDK from a server context

### Banned email solutions
- Nodemailer, SendGrid, Mailgun, Postmark, Resend, or any server-side email service

### Banned for secret answer hashing
- bcrypt, argon2, scrypt, or any server-side hashing library
- Use Web Crypto API only: `crypto.subtle.digest('SHA-256', data)`
