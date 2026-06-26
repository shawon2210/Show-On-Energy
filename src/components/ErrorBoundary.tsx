import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught error:', error.message, errorInfo.componentStack);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="h-14 w-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
            <AlertTriangle className="w-7 h-7 text-rose-400" />
          </div>
          <h3 className="font-display text-lg font-black text-white uppercase tracking-wide mb-2">
            SYSTEM MALFUNCTION
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
            A critical render error was detected. The module has been isolated to prevent cascade failure.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 rounded-xl bg-white hover:bg-lime-400 text-black px-6 py-3 text-xs font-black tracking-widest uppercase transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>REBOOT MODULE</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
