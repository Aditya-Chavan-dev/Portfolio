import React, { useState, useEffect } from 'react';

/**
 * FIRST PRINCIPLE: Deliberate Experience
 * This page uses extreme restraint to command attention.
 * Typography and background matrix provide depth without distraction.
 */
function HookPage({ onEnter }) {
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTyped(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hook-viewport">
      <div className="matrix-bg" />

      <style>{`
        .hook-viewport {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          background-color: var(--bg-primary);
          overflow: hidden;
          position: relative;
        }

        .hook-container {
          max-width: 850px;
          text-align: center;
          z-index: 10;
        }

        .hook-title {
          font-size: clamp(36px, 6vw, 54px);
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 4rem;
          color: var(--text-primary);
        }

        .hook-body {
          font-size: 20px;
          font-weight: 400;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 5rem;
          text-align: center;
        }

        .hook-body p {
          margin-bottom: 2.5rem;
        }

        .hook-body strong {
            color: var(--text-primary);
            font-weight: 500;
        }

        .accent-word {
          color: var(--accent);
          position: relative;
        }

        .status-circles {
          display: flex;
          gap: 1.5rem;
          margin-top: 1.5rem;
          justify-content: center;
          align-items: center;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #333;
        }

        .circle.active {
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
        }

        .circle.pulsing {
          background: var(--accent);
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; box-shadow: 0 0 15px var(--accent); }
          100% { opacity: 0.4; }
        }

        .hook-footer-line {
          position: absolute;
          bottom: 3.5rem;
          width: 100%;
          text-align: center;
        }

        .footer-text {
          font-size: 13px;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
      `}</style>

      <div className="hook-container">
        <h1 className="hook-title fade-in">
          Most portfolios are meant to be scrolled.<br />
          {typed ? (
            <span className="accent-word typing-text">This one is meant to be examined.</span>
          ) : (
            <span style={{ opacity: 0 }}>This one is meant to be examined.</span>
          )}
        </h1>

        <div className="hook-body fade-in" style={{ animationDelay: '400ms' }}>
          <p>
            I know you’re short on time, so I built this as a <strong>working system</strong>—not a highlight reel. Every decision here is deliberate: trade-offs weighed, edge cases anticipated, and failure paths understood before they could surface.
          </p>
          <p>
            I don’t build to look impressive. I build so things don’t break quietly, fail loudly, or surprise teams later. Clean structure, predictable behavior, and choices that scale when requirements change.
          </p>
          <p>
            Spend a few minutes <strong className="accent-word">dissecting</strong> how I reason under constraints.
          </p>
        </div>

        <div className="fade-in" style={{ animationDelay: '1000ms' }}>
          <button onClick={onEnter} className="cta-button pulse">
            &darr; ENTER THE SYSTEM
          </button>
        </div>
      </div>

      <div className="scroll-indicator fade-in" style={{ animationDelay: '1500ms' }}></div>

      <div className="hook-footer-line fade-in" style={{ animationDelay: '1800ms' }}>
        <p className="footer-text">Live system &middot; Full-stack &middot; Production-ready &middot; Zero downtime</p>
        <div className="status-circles">
          <div className="status-item"><div className="circle active pulsing" /> Frontend</div>
          <div className="status-item"><div className="circle active" /> Backend</div>
          <div className="status-item"><div className="circle active" /> Database</div>
          <div className="status-item" style={{ marginLeft: '1rem', color: 'var(--accent)', opacity: 0.8 }}>0 Bugs detected</div>
        </div>
      </div>
    </div>
  );
}

export default HookPage;
