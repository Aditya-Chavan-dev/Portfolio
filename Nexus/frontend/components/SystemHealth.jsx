import React, { useState } from 'react';
import { Activity, Database, Globe, Server, Cpu, Play, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import config from '@src/portfolio.config';
import { getLogHistory } from '../utils/ConsoleSpy';

const SystemHealth = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const generateReport = (healthData, logs) => {
        const timestamp = new Date().toISOString();
        const divider = "==================================================";

        let report = [
            divider,
            `NEXUS DIAGNOSTIC REPORT - ${timestamp}`,
            divider,
            "",
            "[SYSTEM STATUS]",
            `Platform: ${healthData?.system?.platform || 'N/A'}`,
            `Uptime: ${healthData?.uptime ? (healthData.uptime / 60).toFixed(0) + 'm' : 'N/A'}`,
            `RSS Memory: ${healthData?.memory?.rss ? (healthData.memory.rss / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'}`,
            "",
            "[CONNECTIVITY]",
            `Database: ${healthData?.checks?.database?.status.toUpperCase() || 'UNKNOWN'} (${healthData?.checks?.database?.latency || 0}ms)`,
            `Network:  ${healthData?.checks?.network?.status.toUpperCase() || 'UNKNOWN'} (${healthData?.checks?.network?.latency || 0}ms)`,
            "",
            "[FRONTEND LOGS]",
            ...logs,
            "",
            divider,
            "END OF REPORT"
        ].join('\n');

        return report;
    };

    const downloadReport = () => {
        if (!data) return;
        const logs = getLogHistory();
        const reportText = generateReport(data, logs);

        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nexus_diag_${new Date().getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const runDiagnostics = async () => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            // 1. Backend Probe
            const res = await fetch(`${config.apiBaseUrl}/api/system/health`);
            if (!res.ok) throw new Error(`Backend Probe Failed: ${res.status}`);

            const json = await res.json();

            // Artificial delay for "Scanning" feel
            await new Promise(r => setTimeout(r, 1000));

            setData(json);
        } catch (err) {
            console.error("DIAGNOSTIC CRASH:", err);
            setError(err.message);
            // Even if failed, we want to allow downloading logs
            setData({ failed: true, error: err.message });
        } finally {
            setLoading(false);
        }
    };

    const hardReset = async () => {
        if (!confirm("⚠️ NUCLEAR RESET ⚠️\n\nThis will wipe all data, unregister service workers, and force a hard reload.\n\nAre you sure?")) return;

        console.log("INITIATING NUCLEAR RESET...");

        // 1. Unregister SWs
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
                console.log("Unregistered SW:", registration);
            }
        }

        // 2. Clear Caches
        if ('caches' in window) {
            const keys = await caches.keys();
            for (const key of keys) {
                await caches.delete(key);
                console.log("Deleted Cache:", key);
            }
        }

        // 3. Clear Storage
        localStorage.clear();
        sessionStorage.clear();

        // 4. Force Reload
        window.location.reload(true);
    };

    return (
        <div className="w-full max-w-sm bg-black/40 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Activity className="text-cyan-400" size={20} />
                    <h2 className="text-sm font-bold tracking-widest text-white/90">SYSTEM HEALTH</h2>
                </div>
                {!loading && !data && (
                    <div className="flex gap-2">
                        <button
                            onClick={hardReset}
                            className="flex items-center gap-2 px-2 py-1 bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded font-bold tracking-wider text-[10px]"
                            title="Factory Reset PWA"
                        >
                            <AlertTriangle size={10} />
                            RESET
                        </button>
                        <button
                            onClick={runDiagnostics}
                            className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all rounded font-bold tracking-wider text-[10px]"
                        >
                            <Play size={10} />
                            SCAN
                        </button>
                    </div>
                )}
            </div>

            {loading && (
                <div className="py-12 flex flex-col items-center gap-4 text-cyan-500/50 animate-pulse">
                    <div className="w-12 h-12 border-2 border-t-cyan-500 border-white/10 rounded-full animate-spin" />
                    <span className="font-mono text-[10px] tracking-widest">PROBING INFRASTRUCTURE...</span>
                </div>
            )}

            {!loading && error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-500 font-mono text-xs rounded mb-4">
                    <div className="flex items-center gap-2 mb-2 font-bold">
                        <AlertTriangle size={14} />
                        CRITICAL ERROR
                    </div>
                    {error}
                </div>
            )}

            {!loading && data && !data.failed && (
                <div className="space-y-4">
                    {/* Status Header */}
                    <div className={`flex items-center justify-between p-3 border rounded ${data.checks.database.status === 'operational'
                        ? 'bg-green-900/10 border-green-500/20'
                        : 'bg-red-900/10 border-red-500/20'
                        }`}>
                        <span className="text-xs text-white/60">INTEGRITY STATUS</span>
                        <div className="flex items-center gap-2">
                            {data.checks.database.status === 'operational' ? (
                                <CheckCircle size={14} className="text-green-500" />
                            ) : (
                                <AlertTriangle size={14} className="text-red-500" />
                            )}
                            <span className={`font-mono font-bold text-xs ${data.checks.database.status === 'operational' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                {data.checks.database.status === 'operational' ? 'OPTIMAL' : 'COMPROMISED'}
                            </span>
                        </div>
                    </div>

                    {/* Simple List */}
                    <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between items-center text-white/50">
                            <span>Backend Uplink</span>
                            <span className="text-green-400">ESTABLISHED</span>
                        </div>
                        <div className="flex justify-between items-center text-white/50">
                            <span>Database Latency</span>
                            <span className={data.checks.database.latency < 500 ? 'text-green-400' : 'text-yellow-400'}>
                                {data.checks.database.latency}ms
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-white/50">
                            <span>Network Route</span>
                            <span className={data.checks.network.status === 'operational' ? 'text-green-400' : 'text-red-400'}>
                                {data.checks.network.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Always show download if data exists (even if failed) */}
            {!loading && (data || error) && (
                <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
                    <button
                        onClick={downloadReport}
                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all rounded text-[10px] tracking-wider flex items-center justify-center gap-2"
                    >
                        <Download size={12} />
                        DOWNLOAD LOGS
                    </button>
                    <button
                        onClick={runDiagnostics}
                        className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all rounded"
                    >
                        <Activity size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SystemHealth;
