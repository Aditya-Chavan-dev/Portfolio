import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050506] flex items-center justify-center p-6 font-sans">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] nebula-glow-gold opacity-10" />
          </div>

          <div className="relative z-10 max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 text-center space-y-6 shadow-2xl">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                <AlertTriangle size={32} />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white tracking-tight uppercase font-syne">
                System Anomaly
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed font-mono">
                A critical rendering failure has been detected in the Starstruck core. 
                The current view has been isolated to prevent cascade.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="p-4 bg-black/40 rounded-xl text-left overflow-auto max-h-32 scrollbar-hide">
                <code className="text-[10px] text-red-400 font-mono">
                  {this.state.error?.toString()}
                </code>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 w-full h-12 bg-accent-gold rounded-full text-bg-base text-xs font-bold tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all uppercase"
              >
                <RotateCcw size={14} />
                Reboot System
              </button>
              
              <button
                onClick={() => window.location.href = '/hub'}
                className="flex items-center justify-center gap-2 w-full h-12 bg-white/5 rounded-full text-white text-xs font-bold tracking-widest hover:bg-white/10 transition-all uppercase"
              >
                <Home size={14} />
                Emergency Hub
              </button>
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="text-[9px] font-mono text-gray-600 tracking-[0.4em] uppercase">
                Error Code: 0x80041001-CORE
              </span>
            </div>
          </div>
        </div>
      );
    }

    return this.children;
  }
}
