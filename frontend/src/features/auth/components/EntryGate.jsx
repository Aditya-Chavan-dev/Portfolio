import React, { useState } from 'react';
import './Entry.css';

/**
 * EntryGate Component
 * The initial barrier that establishes the "System" narrative.
 * 
 * @param {function} onEnter - Callback function to trigger the transition to the main app
 */
const EntryGate = ({ onEnter }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleEnterClick = () => {
        setIsExiting(true);
        // Add a slight delay for the button animation before triggering parent handler
        setTimeout(() => {
            onEnter();
        }, 300);
    };

    return (
        <div className={`entry-gate-root ${isExiting ? 'fade-out' : ''}`}>
            <div className="entry-content">
                <div className="entry-note">
                    <p>This is not a static portfolio.</p>
                    <p>It is a <span className="entry-strong">live, instrumented system</span>.</p>
                    <p>You are interacting with it in real-time.</p>
                </div>

                <div className="entry-cta-container">
                    <button className="entry-btn" onClick={handleEnterClick}>
                        Enter the System
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EntryGate;
