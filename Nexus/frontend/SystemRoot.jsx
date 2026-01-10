import React, { useState, useEffect } from 'react';
import { LogOut, Download } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@src/services/firebase';
import MetricGrid from './components/MetricGrid';
import SystemHealth from './components/SystemHealth';
import { initConsoleSpy } from './utils/ConsoleSpy';

const SystemRoot = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showInstallHelp, setShowInstallHelp] = useState(false);
    const [view, setView] = useState('dashboard'); // 'dashboard' | 'health'

    useEffect(() => {
        // Init Spy
        initConsoleSpy();

        // 1. Check if already installed
        const mq = window.matchMedia('(display-mode: standalone)');
        setIsStandalone(mq.matches);
        const changeHandler = (e) => setIsStandalone(e.matches);
        mq.addEventListener('change', changeHandler);

        // 2. Capture install prompt
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            mq.removeEventListener('change', changeHandler);
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            setShowInstallHelp(true);
            return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div className="h-screen w-full bg-[#050505] text-white font-mono flex flex-col relative overflow-hidden">
            {/* Install Help Modal */}
            {showInstallHelp && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-zinc-900 border border-white/10 p-6 rounded max-w-sm w-full relative">
                        <button
                            onClick={() => setShowInstallHelp(false)}
                            className="absolute top-2 right-2 text-white/50 hover:text-white"
                        >
                            <LogOut size={16} className="rotate-45" />
                        </button>
                        <h3 className="text-cyan-400 font-bold tracking-widest mb-4">MANUAL INSTALLATION</h3>
                        <p className="text-xs text-white/70 mb-4 leading-relaxed">
                            The automated installer is unavailable (possibly already installed or on iOS/Restricted Browser).
                        </p>
                        <ol className="text-xs text-white/60 space-y-2 list-decimal pl-4 mb-4">
                            <li>Tap your browser's <strong>Menu</strong> (⋮ or Share)</li>
                            <li>Select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong></li>
                            <li>Launch from device home screen</li>
                        </ol>
                        <div className="p-2 bg-black/50 rounded border border-white/5 text-[10px] text-white/30 text-center">
                            SYSTEM STATUS: {isStandalone ? 'NATIVE_APP_LINKED' : 'BROWSER_UPLINK'}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 z-40">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isStandalone ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-green-500 animate-pulse'}`} />
                    <span className="text-sm font-bold tracking-widest text-white/80">
                        {isStandalone ? 'NEXUS PRO' : 'SYSTEM ROOT'}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setView(view === 'dashboard' ? 'health' : 'dashboard')}
                        className={`text-xs px-2 py-1 rounded transition-colors ${view === 'health' ? 'text-cyan-400 bg-cyan-900/20' : 'text-white/40 hover:text-white'}`}
                    >
                        {view === 'dashboard' ? 'DIAGNOSTICS' : 'DASHBOARD'}
                    </button>

                    {!isStandalone && (
                        <button
                            onClick={handleInstall}
                            className={`flex items-center gap-2 text-xs transition-colors border px-3 py-1 rounded 
                                ${deferredPrompt
                                    ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 hover:text-cyan-300'
                                    : 'text-white/40 border-white/10 hover:text-white/60'
                                }`}
                        >
                            <Download size={14} />
                            {deferredPrompt ? 'INSTALL APP' : 'INSTALL HELP'}
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={14} />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex flex-col items-center justify-start relative p-6 z-0 overflow-y-auto w-full pt-12">
                {view === 'dashboard' ? (
                    <>
                        <MetricGrid />
                        <div className="mt-8 text-[10px] text-green-500/40 font-mono animate-pulse">
                            BUILD: v5.0 (NUCLEAR)
                        </div>
                    </>
                ) : (
                    <SystemHealth />
                )}
            </main>
        </div>
    );
};

export default SystemRoot;
