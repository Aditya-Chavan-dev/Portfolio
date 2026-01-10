import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Cpu, Clock, Globe, Signal } from 'lucide-react';

const TacticalHUD = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
            {/* Global Scanlines Overlay */}
            <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none" />

            {/* Mobile Corner Indicators (Minimalist) */}
            <div className="absolute top-[85px] left-4 md:hidden flex items-center gap-2 opacity-30">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">Live</span>
            </div>
        </div>
    );
};

export default TacticalHUD;
