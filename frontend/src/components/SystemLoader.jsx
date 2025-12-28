import React from 'react';

/**
 * SystemLoader Component
 * A minimal, system-like loading indicator.
 * avoiding "spinner" cliches in favor of a "pulse" or "boot" aesthetic.
 */
const SystemLoader = () => {
    return (
        <div className="system-loader-container">
            <div className="loader-content">
                <div className="pulse-bar"></div>
                <div className="loader-text">INITIALIZING SYSTEM TELEMETRY...</div>
            </div>

            <style>{`
                .system-loader-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }

                .loader-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .pulse-bar {
                    width: 60px;
                    height: 4px;
                    background: #333;
                    position: relative;
                    overflow: hidden;
                    border-radius: 2px;
                }

                .pulse-bar::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background: linear-gradient(90deg, transparent, #fff, transparent);
                    transform: translateX(-100%);
                    animation: shimmy 1.5s infinite;
                }

                .loader-text {
                    font-family: 'Inter', system-ui, sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    color: #666;
                    text-transform: uppercase;
                }

                @keyframes shimmy {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default SystemLoader;
