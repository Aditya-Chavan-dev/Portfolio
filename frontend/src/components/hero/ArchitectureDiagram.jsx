import React from 'react';
import './ArchitectureDiagram.css';

const ArchitectureDiagram = () => {
    return (
        <div className="architecture-diagram-container">

            {/* 1. START */}
            <div className="node-container-lg">
                <div className="label-top">Start</div>
                <div className="glass-shell">
                    <div className="inner-well-vscode">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
                            className="vscode-icon" alt="VS Code" />
                    </div>
                </div>
                <div className="label-bot">Local IDE</div>
            </div>

            {/* 2. ARROW */}
            <div className="arrow-wrapper">
                <svg width="60" height="40" viewBox="0 0 60 40" style={{ overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="speedGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
                        </linearGradient>
                        <filter id="arrowGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Centered Arrow Path (Start 0, End 60, Center Y = 20) */}
                    <path d="M 0,20 L 40,20 L 40,5 L 60,20 L 40,35 L 40,20 L 0,20" fill="none" stroke="#22d3ee" strokeWidth="2"
                        strokeOpacity="0.8" filter="url(#arrowGlow)" />
                    <g clipPath="url(#arrowClip2)">
                        <clipPath id="arrowClip2">
                            <path d="M 0,20 L 40,20 L 40,5 L 60,20 L 40,35 L 40,20 L 0,20" />
                        </clipPath>
                        <path d="M 0,20 L 40,20 L 40,5 L 60,20 L 40,35 L 40,20 L 0,20" fill="url(#speedGrad)" opacity="0.3" />
                        <rect x="-60" y="0" width="80" height="40" fill="#a5f3fc" opacity="0.0">
                            {/* Abstract dash animation */}
                            <animate attributeName="x" from="-60" to="60" dur="0.8s" repeatCount="indefinite" />
                        </rect>
                        <path d="M 0,20 L 60,20" stroke="#fff" strokeWidth="1" strokeDasharray="10 20">
                            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.5s" repeatCount="indefinite" />
                        </path>
                    </g>
                </svg>
                <div className="label-push" style={{ bottom: '-20px' }}>Push</div>
            </div>

            {/* 3. CONTROL */}
            <div className="node-container">
                <div className="label-top">Control</div>
                <div className="glass-shell">
                    <div className="inner-well-github">
                        <div className="github-glow-spot"></div>
                        <svg className="github-icon" viewBox="0 0 24 24">
                            <path
                                d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </div>
                </div>
                <div className="label-bot">GitHub</div>
            </div>

            {/* 4. SPLIT LINES */}
            <div className="branch-lines">
                {/* SVG Height 310 to match build stack. Center is 155.
                    Targets: 
                    Top: Center of top card. 
                         Gap is 30. Top card is 140. Center is 155 - 15 - 70 = 70.
                    Bottom: Center of bot card.
                         Center is 155 + 15 + 70 = 240.
                    Input: Center of Middle (Control) = 155.
                 */}
                <svg width="40" height="310" viewBox="0 0 40 310" style={{ overflow: 'visible' }}>
                    <defs>
                        <filter id="branchGlow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <g stroke="#22d3ee" strokeWidth="2" fill="none" filter="url(#branchGlow)" strokeLinecap="round">
                        {/* Start at 0,155 */}
                        <path d="M 0,155 L 10,155" />
                        {/* Split to Top (70) */}
                        <path d="M 10,155 Q 25,155 25,140 L 25,85 Q 25,70 40,70" />
                        {/* Split to Bottom (240) */}
                        <path d="M 10,155 Q 25,155 25,170 L 25,225 Q 25,240 40,240" />
                    </g>
                    {/* Animated Dots */}
                    <circle r="2" fill="#fff"><animateMotion dur="2s" repeatCount="indefinite" path="M 0,155 L 10,155 Q 25,155 25,140 L 25,85 Q 25,70 40,70" /></circle>
                    <circle r="2" fill="#fff"><animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M 0,155 L 10,155 Q 25,155 25,170 L 25,225 Q 25,240 40,240" /></circle>
                </svg>
            </div>

            {/* 5. BUILD COLUMN */}
            <div className="build-column">
                <div className="node-container">
                    <div className="label-top">Build</div>
                    <div className="glass-shell-wide">
                        <div className="layout-backend">
                            <div className="group-render"><img src="https://cdn.simpleicons.org/render/46E3B7"
                                className="icon-render-svg" alt="Render" /><span className="mini-label">Render</span></div>
                            <div className="group-node">
                                <div className="inner-well-small"><img src="https://cdn.simpleicons.org/nodedotjs/339933"
                                    className="icon-node-svg" alt="Node.js" /></div><span className="mini-label">Node.js</span>
                            </div>
                        </div>
                    </div>
                    <div className="label-bot" style={{ bottom: '-25px' }}>Backend API</div>
                </div>
                <div className="node-container">
                    <div className="glass-shell-wide">
                        <div className="layout-frontend">
                            <div className="fe-header"><img src="https://cdn.simpleicons.org/firebase/FFCA28"
                                className="icon-firebase-sm" alt="Firebase" /><span className="text-firebase">Firebase</span></div>
                            <div className="fe-hosting"><img src="https://cdn.simpleicons.org/firebase/FFCA28"
                                className="icon-hosting-lg" alt="Hosting" /><span className="text-hosting">Hosting</span></div>
                            <div className="fe-react-bubble"><img src="https://cdn.simpleicons.org/react/61DAFB" className="icon-react"
                                alt="React" /></div>
                        </div>
                    </div>
                    <div className="label-bot" style={{ bottom: '-25px' }}>Frontend CDN</div>
                </div>
            </div>

            {/* 6. MERGE LINES (WITH DEPLOYMENT TEXT) */}
            <div className="merge-lines">
                {/* Deployment Labels */}
                <span className="deployment-label" style={{ top: '55px', left: '5px' }}>Deployment</span>
                <span className="deployment-label" style={{ bottom: '55px', left: '5px' }}>Deployment</span>

                <svg width="40" height="310" viewBox="0 0 40 310" style={{ overflow: 'visible' }}>
                    <g stroke="#22d3ee" strokeWidth="2" fill="none" filter="url(#branchGlow)" strokeLinecap="round">
                        {/* Top Merge (70 to 155) */}
                        <path d="M 0,70 L 15,70 Q 30,70 30,85 L 30,140 Q 30,155 40,155" />
                        {/* Bottom Merge (240 to 155) */}
                        <path d="M 0,240 L 15,240 Q 30,240 30,225 L 30,170 Q 30,155 40,155" />
                    </g>
                    <circle r="2" fill="#fff" filter="drop-shadow(0 0 5px #fff)">
                        <animateMotion dur="2.5s" repeatCount="indefinite"
                            path="M 0,70 L 15,70 Q 30,70 30,85 L 30,140 Q 30,155 40,155" />
                    </circle>
                    <circle r="2" fill="#fff" filter="drop-shadow(0 0 5px #fff)">
                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.8s"
                            path="M 0,240 L 15,240 Q 30,240 30,225 L 30,170 Q 30,155 40,155" />
                    </circle>
                </svg>
            </div>

            {/* 7. SYNC */}
            <div className="node-container">
                <div className="label-top">Sync</div>
                <div className="glass-shell">
                    <div className="db-container">
                        <svg width="120" height="110" viewBox="0 0 120 110" style={{ position: 'absolute', overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="rayGrad" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                                <filter id="softRayBlur">
                                    <feGaussianBlur stdDeviation="4" />
                                </filter>
                                <linearGradient id="dbBody" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#1e40af" />
                                    <stop offset="50%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#1e40af" />
                                </linearGradient>
                                <linearGradient id="dbTop" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#bfdbfe" />
                                    <stop offset="100%" stopColor="#60a5fa" />
                                </linearGradient>
                                <filter id="neonRing" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="1" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00f2ff" />
                                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f2ff" />
                                </filter>
                            </defs>
                            <rect x="25" y="-20" width="4" height="140" fill="url(#rayGrad)" filter="url(#softRayBlur)"
                                opacity="0.6" />
                            <rect x="58" y="-30" width="6" height="160" fill="url(#rayGrad)" filter="url(#softRayBlur)"
                                opacity="0.8" />
                            <rect x="92" y="-20" width="4" height="140" fill="url(#rayGrad)" filter="url(#softRayBlur)"
                                opacity="0.6" />
                            <g transform="translate(20, 15)">
                                <path d="M0,8 L0,55 Q20,63 40,55 L40,8" fill="url(#dbBody)" opacity="0.9" />
                                <ellipse cx="20" cy="8" rx="20" ry="7" fill="url(#dbTop)" />
                                <path d="M0,22 Q20,29 40,22" stroke="#60a5fa" strokeWidth="1.5" fill="none"
                                    filter="url(#neonRing)" opacity="0.8" />
                                <path d="M0,40 Q20,47 40,40" stroke="#60a5fa" strokeWidth="1.5" fill="none"
                                    filter="url(#neonRing)" opacity="0.8" />
                            </g>
                            <g transform="translate(60, 15)">
                                <path d="M0,8 L0,55 Q20,63 40,55 L40,8" fill="url(#dbBody)" opacity="0.9" />
                                <ellipse cx="20" cy="8" rx="20" ry="7" fill="url(#dbTop)" />
                                <path d="M0,22 Q20,29 40,22" stroke="#60a5fa" strokeWidth="1.5" fill="none"
                                    filter="url(#neonRing)" opacity="0.8" />
                                <path d="M0,40 Q20,47 40,40" stroke="#60a5fa" strokeWidth="1.5" fill="none"
                                    filter="url(#neonRing)" opacity="0.8" />
                            </g>
                            <g transform="translate(20, 45)">
                                <path d="M0,8 L0,50 Q20,58 40,50 L40,8" fill="url(#dbBody)" />
                                <ellipse cx="20" cy="8" rx="20" ry="7" fill="url(#dbTop)" />
                                <path d="M0,28 Q20,35 40,28" stroke="#ffffff" strokeWidth="2" fill="none"
                                    filter="url(#neonRing)" opacity="1" />
                            </g>
                            <g transform="translate(60, 45)">
                                <path d="M0,8 L0,50 Q20,58 40,50 L40,8" fill="url(#dbBody)" />
                                <ellipse cx="20" cy="8" rx="20" ry="7" fill="url(#dbTop)" />
                                <path d="M0,28 Q20,35 40,28" stroke="#ffffff" strokeWidth="2" fill="none"
                                    filter="url(#neonRing)" opacity="1" />
                            </g>
                        </svg>
                        <div className="db-badge-overlay"><img src="https://cdn.simpleicons.org/firebase/FFCA28"
                            style={{ width: '32px', height: '32px' }} alt="Firebase" />
                            <div className="badge-lock"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#1e293b"
                                strokeWidth="4">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg></div>
                        </div>
                    </div>
                </div>
                <div className="label-bot">Realtime<br />Database</div>
            </div>

            {/* 8. LIVE SYNC HEARTBEAT */}
            <div className="heartbeat-wrapper">
                <svg width="80" height="60" viewBox="0 0 80 60" style={{ overflow: 'visible' }}>
                    <defs>
                        <filter id="heartGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path d="M 0,30 L 10,30 L 20,10 L 30,50 L 40,5 L 50,55 L 60,30 L 80,30" stroke="rgba(34, 211, 238, 0.2)"
                        strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 0,30 L 10,30 L 20,10 L 30,50 L 40,5 L 50,55 L 60,30 L 80,30" stroke="#22d3ee" strokeWidth="2"
                        fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#heartGlow)"
                        strokeDasharray="200" strokeDashoffset="200">
                        <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                    </path>
                </svg>
                <div className="label-livesync" style={{ bottom: '-20px' }}>Live Sync</div>
            </div>

            {/* 9. END NODE (UI) */}
            <div className="node-container-lg">
                <div className="label-top">End</div>
                <div className="glass-shell">
                    <div className="inner-well-ui">
                        <svg className="ui-scene-svg" viewBox="0 0 100 90">
                            <defs>
                                <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#e2e8f0" />
                                    <stop offset="100%" stopColor="#cbd5e1" />
                                </linearGradient>
                                <linearGradient id="contentGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#94a3b8" />
                                    <stop offset="100%" stopColor="#64748b" />
                                </linearGradient>
                                <filter id="shadowMobile">
                                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.5)" />
                                </filter>
                            </defs>
                            {/* DESKTOP WINDOW */}
                            <g transform="translate(5, 10)">
                                <rect x="0" y="0" width="80" height="60" rx="3" fill="#334155" stroke="#475569"
                                    strokeWidth="1" />
                                <rect x="1" y="1" width="78" height="8" rx="2" fill="#1e293b" />
                                <circle cx="5" cy="5" r="1.5" fill="#ef4444" />
                                <circle cx="9" cy="5" r="1.5" fill="#f59e0b" />
                                <circle cx="13" cy="5" r="1.5" fill="#22c55e" />
                                <rect x="4" y="13" width="72" height="53" rx="1" fill="#f1f5f9" opacity="0.9" />
                                <rect x="8" y="17" width="64" height="20" rx="2" fill="url(#contentGrad)" opacity="0.4" />
                                <rect x="8" y="41" width="30" height="20" rx="2" fill="url(#contentGrad)" opacity="0.4" />
                                <rect x="42" y="41" width="30" height="20" rx="2" fill="url(#contentGrad)" opacity="0.4" />
                            </g>
                            {/* MOBILE PHONE */}
                            <g transform="translate(65, 30)" filter="url(#shadowMobile)">
                                <rect x="0" y="0" width="26" height="50" rx="4" fill="#0f172a" stroke="#64748b"
                                    strokeWidth="1.5" />
                                <path d="M 8,2 L 18,2" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                                <rect x="2" y="5" width="22" height="40" fill="#f1f5f9" opacity="0.9" />
                                <rect x="4" y="8" width="18" height="12" rx="2" fill="url(#contentGrad)" opacity="0.6" />
                                <rect x="4" y="24" width="18" height="3" rx="1" fill="#94a3b8" />
                                <rect x="4" y="30" width="18" height="3" rx="1" fill="#94a3b8" />
                                <rect x="8" y="46" width="10" height="1.5" rx="1" fill="#ffffff" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="label-bot">User Interface</div>
            </div>

        </div>
    );
};

export default ArchitectureDiagram;
