```javascript
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Github, Cloud, Flame, Database, Laptop, Smartphone, ArrowRight } from 'lucide-react';

// Animation variants
const pulseVariant = {
  active: { scale: 1.1, filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))", transition: { duration: 0.5 } },
  inactive: { scale: 1, filter: "drop-shadow(0 0 0px rgba(0,0,0,0))", transition: { duration: 0.5 } }
};

const pathVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 0.4,
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

const ArchitectureNode = ({ icon: Icon, label, isActive, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    variants={pulseVariant}
    animate={isActive ? "active" : "inactive"}
    className={`
      relative flex flex - col items - center justify - center p - 6
bg - gradient - to - br from - gray - 900 to - gray - 800 
      border border - gray - 700 rounded - 2xl
w - 32 h - 32 md: w - 40 md: h - 40 z - 10
      ${ isActive ? 'border-blue-400/50 shadow-lg shadow-blue-500/10' : 'border-gray-800' }
`}
  >
    <div className={`p - 3 rounded - full bg - gray - 950 / 50 mb - 3 ${ isActive ? 'text-blue-400' : 'text-gray-400' } `}>
      <Icon size={32} strokeWidth={1.5} />
    </div>
    <span className={`text - xs md: text - sm font - medium tracking - wide ${ isActive ? 'text-white' : 'text-gray-500' } `}>
      {label}
    </span>
  </motion.div>
);

const ConnectionLine = ({ d, isActive }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
    {/* Base line */}
    <motion.path 
      d={d} 
      stroke="#374151" 
      strokeWidth="2" 
      fill="none" 
      variants={pathVariant}
      initial="hidden"
      whileInView="visible"
    />
    
    {/* Active pulse */}
    {isActive && (
      <motion.path
        d={d}
        stroke="url(#gradient-pulse)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0.1, 0.4, 0.1], 
          pathOffset: [0, 1, 1],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 0.5
        }}
      />
    )}
    <defs>
      <linearGradient id="gradient-pulse" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
        <stop offset="50%" stopColor="#60A5FA" stopOpacity="1" />
        <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const PortfolioArchitecture = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress into active steps (0-5)
  const activeStep = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 2, 3, 4, 5]);
  const currentStepIndex = Math.min(Math.floor(activeStep.get() || 0), 5); // Fallback logic is tricky with hooks, handled in render

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black text-white">
      {/* Sticky Container for the Diagram */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black">
        
        {/* The Diagram Container */}
        <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center scale-[0.6] md:scale-90 lg:scale-100 transition-transform duration-500">
          
          {/* SVG Layer for Connections */}
          {/* We define fixed coordinates for simplicity in this tailored grid */}
          <div className="absolute inset-0 z-0">
             {/* 1. IDE -> GitHub */}
             <ConnectionLine d="M 180 300 L 350 300" isActive={true} />
             
             {/* 2. GitHub -> Split (Top & Bottom) */}
             <ConnectionLine d="M 510 300 C 560 300, 560 200, 610 200" isActive={true} /> {/* To Render */}
             <ConnectionLine d="M 510 300 C 560 300, 560 400, 610 400" isActive={true} /> {/* To Firebase */}
             
             {/* 3. Split -> DB (Merge) */}
             <ConnectionLine d="M 770 200 C 820 200, 820 300, 870 300" isActive={true} /> {/* From Render */}
             <ConnectionLine d="M 770 400 C 820 400, 820 300, 870 300" isActive={true} /> {/* From Firebase */}
             
             {/* 4. DB -> User */}
             <ConnectionLine d="M 1030 300 L 1150 300" isActive={true} />
          </div>

          {/* Nodes Layer - Absolute Positioning based on the SVG coordinates approx */}
          {/* Note: Centering nodes around the points. 160px width node -> center offset 80 */}

          {/* 1. Local IDE */}
          <div className="absolute left-[20px] top-[220px]">
             <ArchitectureNode icon={Code2} label="Local IDE" isActive={true} delay={0.1} />
          </div>

          {/* 2. GitHub (Repo) */}
          <div className="absolute left-[350px] top-[220px]">
             <ArchitectureNode icon={Github} label="GitHub Repo" isActive={true} delay={0.2} />
          </div>

          {/* 3a. Render (Backend) */}
          <div className="absolute left-[610px] top-[120px]">
             <ArchitectureNode icon={Cloud} label="Backend API" isActive={true} delay={0.3} />
          </div>

          {/* 3b. Firebase (Frontend) */}
          <div className="absolute left-[610px] top-[320px]">
             <ArchitectureNode icon={Flame} label="Frontend CDN" isActive={true} delay={0.3} />
          </div>

          {/* 4. Database */}
          <div className="absolute left-[870px] top-[220px]">
             <ArchitectureNode icon={Database} label="Realtime DB" isActive={true} delay={0.4} />
          </div>

          {/* 5. User */}
          <div className="absolute left-[1150px] top-[220px]">
             <ArchitectureNode icon={Laptop} label="Client User" isActive={true} delay={0.5} />
          </div>

        </div>
        
        {/* Scrollytelling Text Overlay - Absolute positioned at bottom or side */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
            <motion.div 
               style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
               className="bg-black/80 backdrop-blur border border-gray-800 px-6 py-3 rounded-full text-sm text-gray-400"
            >
               Scroll to explore the architecture
            </motion.div>
        </div>
      </div>

       {/* Invisible Spacers to drive the scroll */}
       <div className="relative z-10">
          <div className="h-screen flex items-end pb-32 justify-center pl-12"><div className="bg-gray-900/90 p-6 rounded-xl border border-gray-800 max-w-sm"><h3 className="text-blue-400 font-bold mb-2">1. The Origin</h3><p className="text-gray-400 text-sm">Development begins in the local IDE (VS Code). Code is written, tested, and staged for commit.</p></div></div>
          <div className="h-screen flex items-end pb-32 justify-center pl-12"><div className="bg-gray-900/90 p-6 rounded-xl border border-gray-800 max-w-sm"><h3 className="text-purple-400 font-bold mb-2">2. Version Control</h3><p className="text-gray-400 text-sm">Code is pushed to GitHub. This triggers the automated CI/CD pipelines immediately.</p></div></div>
          <div className="h-screen flex items-end pb-32 justify-center pl-12"><div className="bg-gray-900/90 p-6 rounded-xl border border-gray-800 max-w-sm"><h3 className="text-green-400 font-bold mb-2">3. Parallel Build</h3><p className="text-gray-400 text-sm">The pipeline splits: Render builds the Node.js backend while Firebase deploys the React frontend.</p></div></div>
          <div className="h-screen flex items-end pb-32 justify-center pl-12"><div className="bg-gray-900/90 p-6 rounded-xl border border-gray-800 max-w-sm"><h3 className="text-orange-400 font-bold mb-2">4. Live Sync</h3><p className="text-gray-400 text-sm">Both ends connect to the Realtime Database, establishing a privileged live-sync channel.</p></div></div>
       </div>

    </section>
  );
};

export default PortfolioArchitecture;
```
