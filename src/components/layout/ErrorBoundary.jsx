import { Component } from "react";

// Catches render-time JS errors anywhere below it so one broken component doesn't blank the whole site
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-center px-6">
          <h1 className="text-3xl font-display text-maroon mb-3">Something went wrong</h1>
          <p className="text-ink/60 font-body mb-6 max-w-md">
            We hit an unexpected snag loading this page. Please refresh, or head back home.
          </p>
          <button className="btn-primary" onClick={() => (window.location.href = "/")}>
            Back to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
