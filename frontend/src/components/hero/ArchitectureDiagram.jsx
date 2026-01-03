import React from 'react';
import './ArchitectureDiagram.css';

const ArchitectureDiagram = () => {
    return (
        <div className="architecture-wrapper">
            <div className="pipeline-container">

                {/* 1. START STAGE */}
                <div className="stage-column">
                    <div className="stage-title">Start</div>
                    <div className="glass-card card-square">
                        <div className="well-inset">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="50" height="50" className="icon-img" alt="VS Code" />
                        </div>
                    </div>
                    <div className="label-main">Local IDE</div>
                </div>

                {/* CONNECTOR: START -> CONTROL (PUSH ARROW) */}
                <div className="connector-gap" style={{ height: '130px', width: '80px' }}>
                    <svg width="80" height="40" viewBox="0 0 80 40" style={{ overflow: 'visible' }}>
                        <defs>
                            <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
                            </linearGradient>
                        </defs>
                        {/* Arrow Container */}
                        <path d="M0,12 L50,12 L50,2 L75,20 L50,38 L50,28 L0,28 Z" fill="url(#arrowGrad)" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.5" />
                        {/* Internal Chevron Animation */}
                        <path d="M10,12 L20,20 L10,28" fill="none" stroke="#fff" strokeWidth="2" strokeOpacity="0.5">
                            <animate attributeName="d" values="M10,12 L20,20 L10,28; M40,12 L50,20 L40,28" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
                        </path>
                    </svg>
                    <div style={{ position: 'absolute', bottom: '30px', color: '#22d3ee', fontSize: '11px', fontWeight: '700', textShadow: '0 0 5px rgba(34,211,238,0.5)' }}>Push</div>
                </div>

                {/* 2. CONTROL STAGE */}
                <div className="stage-column">
                    <div className="stage-title">Control</div>
                    <div className="glass-card card-square">
                        <div className="well-float">
                            {/* Glow behind logo */}
                            <div style={{ position: 'absolute', width: '40px', height: '40px', background: '#38bdf8', filter: 'blur(20px)', opacity: '0.3' }}></div>
                            <img src="https://cdn.simpleicons.org/github/ffffff" width="55" height="55" className="icon-img" alt="GitHub" />
                        </div>
                    </div>
                    <div className="label-main">GitHub</div>
                </div>

                {/* CONNECTOR: CONTROL -> BUILD (SPLIT) */}
                <div className="connector-gap-wide" style={{ width: '50px' }}>
                    <svg width="50" height="260" viewBox="0 0 50 260">
                        {/* Top Path */}
                        <path d="M0,130 L20,130 Q35,130 35,115 L35,60 Q35,45 50,45" className="path-glow" strokeOpacity="0.6" />
                        {/* Bottom Path */}
                        <path d="M0,130 L20,130 Q35,130 35,145 L35,200 Q35,215 50,215" className="path-glow" strokeOpacity="0.6" />
                        {/* Moving Particles */}
                        <circle r="2" fill="#fff"><animateMotion dur="2s" repeatCount="indefinite" path="M0,130 L20,130 Q35,130 35,115 L35,60 Q35,45 50,45" /></circle>
                        <circle r="2" fill="#fff"><animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M0,130 L20,130 Q35,130 35,145 L35,200 Q35,215 50,215" /></circle>
                    </svg>
                </div>

                {/* 3. BUILD STAGE */}
                <div className="stage-column">
                    <div className="stage-title">Build</div>
                    <div className="build-group">
                        {/* Backend API */}
                        <div className="stage-column" style={{ marginTop: '0' }}>
                            <div className="glass-card card-wide">
                                {/* Render */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src="https://cdn.simpleicons.org/render/46E3B7" width="45" height="45" className="icon-img" alt="Render" />
                                    <span style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '6px', fontWeight: '600' }}>Render</span>
                                </div>
                                {/* Node */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className="well-inset" style={{ width: '48px', height: '48px', borderRadius: '12px' }}>
                                        <img src="https://cdn.simpleicons.org/nodedotjs/339933" width="28" height="28" className="icon-img" alt="Node.js" />
                                    </div>
                                    <span style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '6px', fontWeight: '600' }}>Node.js</span>
                                </div>
                            </div>
                            <div className="label-main">Backend API</div>
                        </div>

                        {/* Frontend CDN */}
                        <div className="stage-column" style={{ marginTop: '0' }}>
                            <div className="glass-card card-wide">
                                {/* Firebase/Hosting Combined Ref */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <img src="https://cdn.simpleicons.org/firebase/FFCA28" width="14" height="14" alt="Firebase" />
                                        <span style={{ fontSize: '11px', color: '#fff', fontWeight: '600' }}>Firebase</span>
                                    </div>
                                    <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src="https://cdn.simpleicons.org/firebase/FFCA28" width="32" height="32" className="icon-img" alt="Hosting" />
                                        <span style={{ fontSize: '9px', color: '#cbd5e1', marginTop: '2px' }}>Hosting</span>
                                    </div>
                                </div>
                                {/* React */}
                                <div style={{ position: 'relative', width: '50px', height: '50px', background: 'rgba(56,189,248,0.1)', borderRadius: '50%', border: '1px solid rgba(56,189,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="https://cdn.simpleicons.org/react/61DAFB" width="28" height="28" className="icon-img" style={{ animation: 'spin 10s linear infinite' }} alt="React" />
                                </div>
                            </div>
                            <div className="label-main">Frontend CDN</div>
                        </div>
                    </div>
                </div>

                {/* CONNECTOR: BUILD -> SYNC (MERGE) */}
                <div className="connector-gap-wide" style={{ width: '50px' }}>
                    {/* Deployment Labels attached to line positions */}
                    <div className="label-deploy" style={{ top: '50px', left: '5px' }}>Deployment</div>
                    <div className="label-deploy" style={{ bottom: '50px', left: '5px' }}>Deployment</div>

                    <svg width="50" height="260" viewBox="0 0 50 260">
                        {/* Top Merge */}
                        <path d="M0,45 L15,45 Q30,45 30,60 L30,115 Q30,130 40,130 L50,130" className="path-glow" strokeOpacity="0.6" />
                        {/* Bottom Merge */}
                        <path d="M0,215 L15,215 Q30,215 30,200 L30,145 Q30,130 40,130 L50,130" className="path-glow" strokeOpacity="0.6" />
                        {/* Particles */}
                        <circle r="2" fill="#fff"><animateMotion dur="2s" repeatCount="indefinite" path="M0,45 L15,45 Q30,45 30,60 L30,115 Q30,130 40,130 L50,130" /></circle>
                        <circle r="2" fill="#fff"><animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M0,215 L15,215 Q30,215 30,200 L30,145 Q30,130 40,130 L50,130" /></circle>
                    </svg>
                </div>

                {/* 4. SYNC STAGE */}
                <div className="stage-column">
                    <div className="stage-title">Sync</div>
                    <div className="glass-card card-square">
                        {/* Database SVG */}
                        <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                            <svg width="70" height="70" viewBox="0 0 70 70">
                                <defs>
                                    <linearGradient id="dbCyl" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#2563eb" /><stop offset="0.5" stopColor="#60a5fa" /><stop offset="1" stopColor="#2563eb" /></linearGradient>
                                    <linearGradient id="dbTop" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#bfdbfe" /><stop offset="1" stopColor="#60a5fa" /></linearGradient>
                                </defs>
                                {/* 4-Stack Cluster */}
                                {/* Back Left */}
                                <path d="M5,10 L5,45 Q15,52 25,45 L25,10" fill="url(#dbCyl)" />
                                <ellipse cx="15" cy="10" rx="10" ry="4" fill="url(#dbTop)" />
                                {/* Back Right */}
                                <path d="M40,10 L40,45 Q50,52 60,45 L60,10" fill="url(#dbCyl)" />
                                <ellipse cx="50" cy="10" rx="10" ry="4" fill="url(#dbTop)" />
                                {/* Front Left */}
                                <path d="M5,35 L5,60 Q15,67 25,60 L25,35" fill="url(#dbCyl)" />
                                <ellipse cx="15" cy="35" rx="10" ry="4" fill="url(#dbTop)" />
                                {/* Front Right */}
                                <path d="M40,35 L40,60 Q50,67 60,60 L60,35" fill="url(#dbCyl)" />
                                <ellipse cx="50" cy="35" rx="10" ry="4" fill="url(#dbTop)" />
                                {/* Blue Rings */}
                                <path d="M5,25 Q15,32 25,25" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
                                <path d="M40,25 Q50,32 60,25" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.8" />
                            </svg>
                            {/* Badge */}
                            <div style={{ position: 'absolute', top: '20px', left: '20px', width: '30px', height: '30px', background: '#1e293b', borderRadius: '50%', border: '2px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
                                <img src="https://cdn.simpleicons.org/firebase/FFCA28" width="16" height="16" alt="Firebase Badge" />
                            </div>
                        </div>
                    </div>
                    <div className="label-main">Realtime Database</div>
                </div>

                {/* CONNECTOR: SYNC -> END (HEARTBEAT) */}
                <div className="connector-gap" style={{ width: '70px' }}>
                    <svg width="70" height="50" viewBox="0 0 70 50">
                        <defs>
                            <filter id="glowPulse"><feGaussianBlur stdDeviation="1.5" floodColor="#22d3ee" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                        </defs>
                        {/* Pulse Path */}
                        <path d="M0,25 L10,25 L20,10 L30,40 L40,5 L50,45 L60,25 L70,25"
                            stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinejoin="round" filter="url(#glowPulse)">
                            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
                        </path>
                    </svg>
                    <div style={{ position: 'absolute', bottom: '30px', color: '#22d3ee', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>Live Sync</div>
                </div>

                {/* 5. END STAGE */}
                <div className="stage-column">
                    <div className="stage-title">End</div>
                    <div className="glass-card card-square">
                        <div className="well-inset" style={{ overflow: 'hidden', position: 'relative' }}>
                            {/* UI Wireframe */}
                            <svg width="80" height="80" viewBox="0 0 80 80">
                                {/* Desktop */}
                                <rect x="5" y="15" width="60" height="45" rx="3" fill="#475569" stroke="#64748b" />
                                <rect x="7" y="17" width="56" height="41" rx="1" fill="#f1f5f9" />
                                <rect x="10" y="20" width="50" height="15" rx="1" fill="#cbd5e1" />
                                <rect x="10" y="38" width="22" height="15" rx="1" fill="#cbd5e1" opacity="0.6" />
                                {/* Mobile Overlay */}
                                <g transform="translate(48,30)" filter="drop-shadow(-2px 2px 4px rgba(0,0,0,0.5))">
                                    <rect x="0" y="0" width="20" height="35" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                                    <rect x="2" y="2" width="16" height="31" rx="1" fill="#f8fafc" />
                                    <rect x="4" y="5" width="12" height="8" rx="1" fill="#94a3b8" />
                                    <rect x="4" y="16" width="12" height="3" rx="1" fill="#cbd5e1" />
                                    <rect x="4" y="21" width="12" height="3" rx="1" fill="#cbd5e1" />
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="label-main">User Interface</div>
                </div>

            </div>
        </div>
    );
};

export default ArchitectureDiagram;
