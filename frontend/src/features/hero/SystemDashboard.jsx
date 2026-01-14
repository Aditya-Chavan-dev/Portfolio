import React from 'react';
import ConnectionTester from '../system/ConnectionTester';

/**
 * FIRST PRINCIPLE: Progressive Disclosure
 * The System Dashboard reveals the technical underpinnings after the initial Hook.
 */
function SystemDashboard() {
    return (
        <div className="system-viewport scroll-fade-in" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '1rem' }}>Core Architecture Status</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                    This interface verifies the real-time connectivity between the distributed components of this portfolio stack.
                </p>
            </header>

            <ConnectionTester />

            <footer style={{ marginTop: '6rem', pt: '2rem', borderTop: '1px solid #222', textAlign: 'center', opacity: 0.5, fontSize: '13px' }}>
                Built with extreme discipline &middot; Dec 2025
            </footer>
        </div>
    );
}

export default SystemDashboard;
