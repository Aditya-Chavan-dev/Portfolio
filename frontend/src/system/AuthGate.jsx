import React, { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, googleProvider, db } from '../services/firebase';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

const AuthGate = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Check or Claim Ownership
                const ownerRef = ref(db, 'system/owner');
                try {
                    const snapshot = await get(ownerRef);
                    if (snapshot.exists()) {
                        const ownerEmail = snapshot.val();
                        if (ownerEmail === currentUser.email) {
                            setUser(currentUser);
                            setError(null);
                        } else {
                            await signOut(auth);
                            setError(`ACCESS DENIED: LOCKED TO OWNER (${ownerEmail})`);
                        }
                    } else {
                        // First Claim
                        await set(ownerRef, currentUser.email);
                        setUser(currentUser);
                        setError(null);
                        console.log("SYSTEM OWNER CLAIMED:", currentUser.email);
                    }
                } catch (err) {
                    console.error("Ownership Check Failed", err);
                    setError("SYSTEM ERROR: CANNOT VERIFY IDENTITY");
                    await signOut(auth);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithPopup(auth, googleProvider);
            // creating listener handles the rest
        } catch (err) {
            console.error(err);
            setError("AUTHENTICATION FAILED");
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center font-mono text-cyan-500">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <Shield size={48} />
                    <span>ESTABLISHING SECURE CONNECTION...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="h-screen w-full bg-black flex flex-col items-center justify-center font-mono relative overflow-hidden text-cyan-400">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

                <div className="z-10 border border-cyan-500/30 bg-black/90 p-12 rounded-lg max-w-md w-full text-center shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                    <div className="mb-8 flex justify-center">
                        <div className="p-4 border-2 border-cyan-500 rounded-full">
                            <Lock size={40} className="text-cyan-400" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold tracking-[0.2em] mb-2 text-white">RESTRICTED AREA</h1>
                    <p className="text-xs text-white/50 mb-8 tracking-widest">AUTHORIZED PERSONNEL ONLY</p>

                    {error && (
                        <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 text-red-500 text-xs flex items-center justify-center gap-2">
                            <AlertTriangle size={14} />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleLogin}
                        className="w-full py-4 bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all font-bold tracking-wider uppercase flex items-center justify-center gap-2 group"
                    >
                        <span>Initiate Handshake</span>
                    </button>

                    <div className="mt-6 text-[10px] text-white/20">
                        SYSTEM TERMINAL v3.2
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGate;
