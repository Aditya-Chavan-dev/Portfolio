import React from 'react';
import Button from './Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * SAFEZONE (Error Boundary)
 * Gold Standard #6: The "Iron Dome"
 * 
 * Wraps features in a protective shell. If the feature crashes, 
 * this component catches the error and displays a tactical fallback 
 * instead of crashing the entire application.
 */
class SafeZone extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Gold Standard #36: Log the error to an error reporting service
        console.error("SafeZone Caught Error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        // Optional: Trigger a window reload or specific recovery logic
    };

    render() {
        if (this.state.hasError) {
            const { fallback, componentName = "System Module" } = this.props;

            // If a custom fallback is provided, use it
            if (fallback) return fallback;

            // Default "Tactical" Failure UI
            return (
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 border border-red-500/30 bg-red-950/10 rounded-xl text-center space-y-4 relative overflow-hidden backdrop-blur-sm">
                    {/* Background Noise/Scanline effect could go here */}

                    <div className="p-4 bg-red-500/10 rounded-full border border-red-500/50 animate-pulse">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>

                    <div className="space-y-2 max-w-md">
                        <h2 className="text-xl font-mono font-bold text-red-400 tracking-widest uppercase">
                            CRITICAL ERROR
                        </h2>
                        <p className="text-sm font-mono text-red-300/70">
                            {componentName} encountered a fatal exception.
                            Automatic recovery failed.
                        </p>
                    </div>

                    {/* Developer Details (Hidden in Prod usually, but good for Portfolio "Hacker" vibe) */}
                    {this.state.error && (
                        <div className="w-full text-left bg-black/50 p-4 rounded border border-red-900/50 text-[10px] font-mono text-red-400/50 overflow-auto max-h-32">
                            {this.state.error.toString()}
                        </div>
                    )}

                    <Button
                        variant="danger"
                        onClick={this.handleRetry}
                        icon={RefreshCw}
                    >
                        REINITIALIZE {componentName}
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default SafeZone;
