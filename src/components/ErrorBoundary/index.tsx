import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { isDevModeEnabled } from '@/state/devMode/devModeStore';

interface FallbackRenderProps {
  error: Error;
  reset: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (props: FallbackRenderProps) => ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  /**
   * When any value in this array changes between renders, the boundary
   * automatically clears its error state. Useful for resetting on route
   * or query-key changes.
   */
  resetKeys?: ReadonlyArray<unknown>;
}

interface ErrorBoundaryState {
  error: Error | null;
}

const initialState: ErrorBoundaryState = { error: null };

const areArraysShallowEqual = (a: ReadonlyArray<unknown>, b: ReadonlyArray<unknown>) =>
  a.length === b.length && a.every((value, index) => Object.is(value, b[index]));

const DefaultFallback = ({ error, reset }: FallbackRenderProps) => (
  <div role="alert" className="max-w-2xl mx-auto py-12 text-center space-y-4">
    <h1 className="text-3xl font-bold">Something went wrong</h1>
    <p className="text-muted-foreground">{error.message}</p>

    {(import.meta.env.DEV || isDevModeEnabled()) && error.stack && (
      <pre className="text-left text-xs bg-muted p-4 rounded-md overflow-auto max-h-64">
        {error.stack}
      </pre>
    )}

    <div className="flex gap-3 justify-center pt-2">
      <Button onClick={reset}>Try again</Button>
    </div>
  </div>
);

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = initialState;

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.error === null) return;

    const { resetKeys } = this.props;
    const prevKeys = prevProps.resetKeys;

    if (resetKeys && prevKeys && !areArraysShallowEqual(prevKeys, resetKeys)) {
      this.reset();
    }
  }

  reset = (): void => {
    this.setState(initialState);
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error !== null) {
      const render = this.props.fallback ?? DefaultFallback;
      return render({ error, reset: this.reset });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
