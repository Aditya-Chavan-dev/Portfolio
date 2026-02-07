import { Component, type ReactNode, type ErrorInfo } from 'react';

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
    /** Child components to render */
    children: ReactNode;
    /** Optional custom fallback UI */
    fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
    /** Whether an error has been caught */
    hasError: boolean;
    /** The error that was caught, if any */
    error: Error | null;
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire application.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log to console in development only
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
        // In production, you could send to error tracking service like Sentry
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex-center bg-obsidian px-6">
                    <div className="max-w-md w-full glass-panel p-8 rounded-lg text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex-center">
                                <svg
                                    className="w-8 h-8 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-2">
                                Something went wrong
                            </h2>
                            <p className="text-secondary mb-4">
                                We encountered an unexpected error. Please try again.
                            </p>
                            {import.meta.env.DEV && this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-sm text-gold-glow mb-2">
                                        Error Details (Dev Only)
                                    </summary>
                                    <pre className="text-xs text-red-400 bg-black/40 p-3 rounded overflow-auto max-h-40">
                                        {this.state.error.toString()}
                                    </pre>
                                </details>
                            )}
                        </div>
                        <button
                            onClick={this.handleReset}
                            className="w-full py-3 px-6 bg-gold-glow text-black font-medium rounded-lg hover:bg-gold-muted transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
