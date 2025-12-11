import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center p-8">
          <div className="glass-panel p-8 max-w-md text-center">
            <h2 className="font-title text-2xl text-orange-600 mb-4">
              Something went wrong
            </h2>
            <p className="text-stone-400 mb-6">
              The archives have encountered a disturbance.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-orange-900/50 text-orange-100 border border-orange-800 hover:bg-orange-900 transition-colors font-title tracking-wider"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;