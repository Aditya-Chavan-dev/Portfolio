// ─────────────────────────────────────────────────────────────────────────────
// FIRESTORE SEED SCRIPT (Admin SDK)
// Run:    node scripts/seedFirestore.js
// Effect: Writes all portfolio content to Firestore live/{section} documents
//
// ⚠️  Requires scripts/serviceAccountKey.json (download from Firebase Console)
// ⚠️  This file MUST be in .gitignore — NEVER commit service account keys
// ⚠️  Running this script overwrites existing live/ documents
// ─────────────────────────────────────────────────────────────────────────────

const admin = require('firebase-admin');
const path = require('path');

// Load service account key
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
} catch {
  console.error('❌ Service account key not found at scripts/serviceAccountKey.json');
  console.error('   Download it from: Firebase Console → Project Settings → Service Accounts → Generate New Private Key');
  console.error('   Save as: scripts/serviceAccountKey.json');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ─── Data ────────────────────────────────────────────────────────────────────

const hubData = {
  ownerName: 'Aditya Chavan',
  ownerRole: 'Developer',
  ownerQuote: "Building systems that don't ask for permission.",
  ownerPhotoUrl: '',
  journeyButtonLabel: 'Immersive Journey →',
  journeyButtonSubtext: 'Coming soon',
  quickAccessLabel: 'Quick Access',
  quickAccessItems: [
    { title: 'Projects', description: "What I've built", route: '/projects', icon: 'Folder' },
    { title: 'Skills', description: 'What I work with', route: '/skills', icon: 'Diamond' },
    { title: 'Experience', description: "Where I've worked", route: '/experience', icon: 'Briefcase' },
    { title: 'Certifications', description: 'What I have achieved', route: '/certifications', icon: 'Award' },
  ],
  testimonialsLabel: 'Testimonials',
  testimonialsEmptyState: 'Testimonials will appear here once approved',
  leaveTestimonialLabel: 'Leave a testimonial →',
};

const skillsData = {
  pageTitle: 'Skills',
  pageSubtitle: 'What I work with',
  emptyState: 'Skills will appear here.',
  categories: [
    {
      name: 'Frontend',
      items: [
        { id: 'skill-1', name: 'React', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', iconSource: 'devicons' },
        { id: 'skill-2', name: 'TypeScript', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', iconSource: 'devicons' },
        { id: 'skill-3', name: 'Tailwind CSS', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', iconSource: 'devicons' },
        { id: 'skill-4', name: 'Next.js', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', iconSource: 'devicons' },
      ],
    },
    {
      name: 'Backend',
      items: [
        { id: 'skill-5', name: 'Node.js', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', iconSource: 'devicons' },
        { id: 'skill-6', name: 'Python', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', iconSource: 'devicons' },
      ],
    },
    {
      name: 'Database & Cloud',
      items: [
        { id: 'skill-7', name: 'PostgreSQL', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', iconSource: 'devicons' },
        { id: 'skill-8', name: 'Firebase', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', iconSource: 'devicons' },
        { id: 'skill-9', name: 'Docker', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', iconSource: 'devicons' },
      ],
    },
    {
      name: 'Tools',
      items: [
        { id: 'skill-10', name: 'Git', level: 'Advanced', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', iconSource: 'devicons' },
        { id: 'skill-11', name: 'Figma', level: 'Intermediate', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', iconSource: 'devicons' },
      ],
    },
  ],
};

const experienceData = {
  pageTitle: 'Experience',
  pageSubtitle: "Where I've worked",
  emptyState: 'Experience will appear here.',
  items: [
    {
      id: 'internship_01',
      company: 'Tech Innovations Inc.',
      role: 'Software Engineering Intern',
      duration: 'Jun 2024 – Sep 2024 · 4 months',
      description: 'Collaborated with the core engine team on performance tuning and bug fixes.',
      bulletPoints: [
        'Built dynamic absolute triggering modules using React frameworks.',
        'Optimized database indexing improving retrieval speeds by 40%.',
        'Participated in agile sprints reviewing PR logs transparently.',
      ],
      tags: ['React', 'TypeScript', 'Node.js', 'Firebase'],
      archived: false,
    },
    {
      id: 'freelance_01',
      company: 'Freelance Client / Fintech',
      role: 'Full Stack Developer',
      duration: 'Sep 2024 – Present · 6 months',
      description: 'Developed dynamic dashboard mechanics catering custom analytics triggers.',
      bulletPoints: [
        'Architected secure responsive dashboard layouts absolute breakpoints frames.',
        'Integrated custom charting modules feeding live WebSockets endpoints loops.',
        'Created fallback triggers guaranteeing uptime failsafe mechanics securely.',
      ],
      tags: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'Socket.io'],
      archived: false,
    },
  ],
};

const certificationsData = {
  pageTitle: 'Certifications',
  pageSubtitle: 'Verified courses and achievements',
  items: [
    {
      id: 'cert_01',
      name: 'Advanced React & Next.js',
      issuer: 'Udemi Academy',
      date: 'Jan 2026',
      description: 'Comprehensive course covering advanced state management with Redux, Server-Side Rendering (SSR), and performance optimization techniques for large scale applications absolute node triggers.',
      tags: ['React', 'Next.js', 'Redux', 'SSR'],
      imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://example.com/verify/cert_01',
      archived: false,
    },
    {
      id: 'cert_02',
      name: 'Full Stack Cloud Development',
      issuer: 'Coursera / IBM',
      date: 'Nov 2025',
      description: 'Architecting cloud-native microservices on AWS/Google Cloud. Integrated secure JWT and OAuth workflows absolute triggers.',
      tags: ['AWS', 'Node.js', 'Docker', 'Microservices'],
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://example.com/verify/cert_02',
      archived: false,
    },
  ],
};

const contactData = {
  heading: 'Get in Touch',
  intro: "Have a project in mind or just want to connect? I'd love to hear from you.",
};

// ─── Seed Function ───────────────────────────────────────────────────────────

async function seed() {
  console.log('Starting Firestore seed (Admin SDK)...\n');

  const pages = {
    hub: hubData,
    skills: skillsData,
    experience: experienceData,
    certifications: certificationsData,
    contact: contactData,
  };

  for (const [page, content] of Object.entries(pages)) {
    await db.collection('live').doc(page).set(content);
    console.log(`  ✅ Written: live/${page}`);
  }

  console.log('\nSeed complete.');
  console.log('Firestore live/ documents are now the source of truth.');
  console.log('Do not run this script again unless intentionally resetting content.\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
