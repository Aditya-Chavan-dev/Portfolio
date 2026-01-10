import React, { useState } from 'react';
import { Activity, Database, Globe, Server, Cpu, Play } from 'lucide-react';
import config from '@src/portfolio.config';

const SystemHealth = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const runDiagnostics = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${config.apiBaseUrl}/api/system/health`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Diagnostic Failed');

            // Artificial delay to make it feel cooler
            await new Promise(r => setTimeout(r, 800));
            setData(json);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-black/40 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Activity className="text-cyan-400" />
                    <h2 className="text-xl font-bold tracking-widest text-white/90">SYSTEM DIAGNOSTICS</h2>
                </div>
                {!loading && (
                    <button
                        onClick={runDiagnostics}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all rounded font-bold tracking-wider text-xs"
                    >
                        <Play size={14} />
                        RUN FULL SCAN
                    </button>
                )}
            </div>

            {loading && (
                <div className="py-12 flex flex-col items-center gap-4 text-cyan-500/50 animate-pulse">
                    <div className="w-16 h-16 border-4 border-t-cyan-500 border-white/10 rounded-full animate-spin" />
                    <span className="font-mono text-xs tracking-widest">ANALYZING SYSTEM INTEGRITY...</span>
                </div>
            )}

            {!loading && error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-500 font-mono text-sm rounded">
                    DIAGNOSTIC FAILURE: {error}
                </div>
            )}

            {!loading && data && (
                <div className="space-y-4">
                    {/* Status Header */}
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded">
                        <span className="text-sm text-white/60">OVERALL STATUS</span>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${data.checks.database.status === 'operational' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`} />
                            <span className="font-mono font-bold text-white">
                                {data.checks.database.status === 'operational' ? 'OPERATIONAL' : 'CRITICAL FAILURE'}
                            </span>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Database */}
                        <div className="p-4 bg-black/60 border border-white/10 rounded flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider">
                                <Database size={14} />
                                <span>Data Vault</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={data.checks.database.status === 'operational' ? 'text-green-400' : 'text-red-400'}>
                                    {data.checks.database.status.toUpperCase()}
                                </span>
                                <span className="font-mono text-xs text-white/40">{data.checks.database.latency}ms</span>
                            </div>
                        </div>

                        {/* Network */}
                        <div className="p-4 bg-black/60 border border-white/10 rounded flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider">
                                <Globe size={14} />
                                <span>Uplink</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className={data.checks.network.status === 'operational' ? 'text-green-400' : 'text-red-400'}>
                                    {data.checks.network.status.toUpperCase()}
                                </span>
                                <span className="font-mono text-xs text-white/40">{data.checks.network.latency}ms</span>
                            </div>
                        </div>

                        {/* Memory */}
                        <div className="p-4 bg-black/60 border border-white/10 rounded flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider">
                                <Cpu size={14} />
                                <span>Memory (RSS)</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-cyan-400">STABLE</span>
                                <span className="font-mono text-xs text-white/40">{(data.memory.rss / 1024 / 1024).toFixed(1)} MB</span>
                            </div>
                        </div>

                        {/* Uptime */}
                        <div className="p-4 bg-black/60 border border-white/10 rounded flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider">
                                <Server size={14} />
                                <span>Uptime</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-cyan-400">ONLINE</span>
                                <span className="font-mono text-xs text-white/40">{(data.uptime / 60).toFixed(0)}m</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-[10px] font-mono text-white/20 text-center uppercase tracking-widest mt-4">
                        Scan Completed at {new Date(data.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemHealth;
