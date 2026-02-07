# 🎨 Portfolio - Aditya Chavan

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8-ffca28)](https://firebase.google.com/)

A premium, interactive portfolio showcasing projects, skills, and professional experience with stunning animations and a modern design system.

## ✨ Features

- 🎭 **Immersive Journey** - Interactive storytelling experience
- 🎨 **Premium Design** - Gold-accented dark theme with glassmorphism
- ⚡ **Blazing Fast** - Built with Vite for optimal performance
- 📱 **Fully Responsive** - Seamless experience across all devices
- 🔥 **Firebase Integration** - Real-time data and analytics
- 🎬 **Smooth Animations** - Powered by Framer Motion
- 🛡️ **Type-Safe** - Full TypeScript coverage
- 🎯 **Error Boundaries** - Graceful error handling with retry

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Firebase Account** (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aditya-Chavan-dev/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Firebase credentials in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Validate environment**
   ```bash
   npm run validate:env
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run scan:secrets` | Scan for hardcoded secrets |
| `npm run validate:env` | Validate .env against .env.example |

## 🏗️ Project Structure

```
Portfolio/
├── .github/              # GitHub Actions & Dependabot
├── public/               # Static assets
├── scripts/              # Build & utility scripts
│   ├── scan-secrets.js   # Security scanner
│   └── validate-env.js   # Environment validator
├── src/
│   ├── Admin/            # Admin dashboard
│   ├── Background/       # Animated backgrounds
│   ├── HeroSection/      # Landing hero section
│   ├── ImmersiveJourney/ # Interactive journey
│   ├── LandingPage/      # Entry page
│   ├── QuickNavigation/  # Main navigation sections
│   │   ├── AboutMe/      # About section
│   │   ├── Certifications/ # Certifications
│   │   ├── ProfessionalExperience/ # Work history
│   │   └── Project/      # Projects showcase
│   ├── components/       # Shared components
│   │   ├── ErrorBoundary.tsx
│   │   └── TransitionLoader.tsx
│   ├── data/             # Static data
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API & Firebase services
│   ├── shared/           # Shared utilities
│   ├── types/            # TypeScript types
│   ├── utils/            # Helper functions
│   ├── App.tsx           # Main app component
│   ├── index.css         # Global styles & design system
│   └── main.tsx          # Entry point
├── .env.example          # Environment template
├── .gitignore
├── firebase.json         # Firebase configuration
├── package.json
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎨 Design System

The portfolio uses a premium design system defined in `src/index.css`:

### Color Palette
- **Obsidian** (`#050505`) - Deep black background
- **Gold Glow** (`#FFD700`) - Primary accent
- **Gold Muted** (`#C5A000`) - Secondary accent
- **Surface** (`#121212`) - Card backgrounds

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter
- **Serif**: Georgia (for quotes)

### Utilities
- Glassmorphism panels
- Text glows
- Smooth animations
- Custom scrollbar hiding

## 🔥 Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Realtime Database** and **Firestore**
3. Set up **Security Rules** (see `database.rules.json`)
4. Add your Firebase config to `.env`

## 🛡️ Security

- **Secrets Scanner**: Automatically scans for hardcoded credentials
- **Pre-commit Hooks**: Runs linting and security checks before commits
- **Environment Validation**: Ensures all required env vars are set
- **Error Boundaries**: Catches React errors gracefully

## 🧪 Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Configured with React best practices
- **Husky**: Pre-commit hooks for quality gates
- **Lint-staged**: Only lint changed files

## 📱 Responsive Design

The portfolio is fully responsive with dedicated components for:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (< 768px)

## 🚢 Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Other Platforms

The build output in `dist/` can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Aditya Chavan**

- GitHub: [@Aditya-Chavan-dev](https://github.com/Aditya-Chavan-dev)
- Portfolio: [Your Live URL]

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Firebase](https://firebase.google.com/) for backend
- [Lucide Icons](https://lucide.dev/) for icons
- [Simple Icons](https://simpleicons.org/) for tech stack icons

---

**⭐ Star this repo if you find it helpful!**
