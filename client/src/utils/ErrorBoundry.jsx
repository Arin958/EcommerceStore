// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 p-4 border border-red-300 rounded bg-red-50">
          Something went wrong with PayPal. Please try again or choose another payment method.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;