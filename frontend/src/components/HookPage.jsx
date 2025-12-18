import React from 'react';

/**
 * FIRST PRINCIPLE: Deliberate Experience
 * This page uses extreme restraint to command attention.
 * Typography and whitespace are the primary design elements.
 */
function HookPage({ onEnter }) {
    return (
        <div className="hook-viewport">
            <style>{`
        .hook-viewport {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          background-color: var(--bg-primary);
        }

        .hook-container {
          max-width: 680px;
          text-align: center;
        }

        .hook-title {
          font-size: 38px;
          font-weight: 600;
          line-height: 1.25;
          margin-bottom: 2.5rem;
          color: var(--text-primary);
          animation-delay: 100ms;
        }

        .hook-body {
          font-size: 17px;
          font-weight: 400;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 3.5rem;
          animation-delay: 300ms;
        }

        .hook-body strong {
            color: var(--text-primary);
            font-weight: 500;
        }

        .hook-cta {
          display: block;
          font-size: 14px;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          animation-delay: 500ms;
          text-decoration: none;
        }

        .hook-footer {
          position: absolute;
          bottom: 2rem;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.02em;
          animation-delay: 700ms;
        }

        .accent-word {
          color: var(--accent);
        }
      `}</style>

            <div className="hook-container">
                <h1 className="hook-title fade-in">
                    Most portfolios are meant to be scrolled.<br />
                    <span className="accent-word">This one is meant to be examined.</span>
                </h1>

                <div className="hook-body fade-in">
                    <p>
                        I know you’re short on time, so I built this as a <strong>working system</strong>—not a highlight reel. Every decision here is deliberate: trade-offs weighed, edge cases anticipated, and failure paths understood before they could surface.
                    </p>
                    <p style={{ marginTop: '1.5rem' }}>
                        I don’t build to look impressive. I build so things don’t break quietly, fail loudly, or surprise teams later. Clean structure, predictable behavior, and choices that scale.
                    </p>
                    <p style={{ marginTop: '1.5rem' }}>
                        Spend a few minutes exploring and you’ll see how I reason under constraints. If that’s how your team expects engineers to think, this will be worth your attention.
                    </p>
                </div>

                <button onClick={onEnter} className="hook-cta fade-in">
                    &darr; Enter the system
                </button>
            </div>

            <div className="hook-footer fade-in">
                Live system &middot; Frontend &middot; Backend &middot; Database connected
            </div>
        </div>
    );
}

export default HookPage;
