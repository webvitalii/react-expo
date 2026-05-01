/** Shared fallback components for TanStack Router pending / error states. */
import type { ReactNode } from 'react';
import { useRouter, type ErrorComponentProps } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { useIsDevMode } from '@/state/devMode/devModeStore';

interface PendingFallbackProps {
  /** Page title, rendered only when `withLayout` is set. */
  title?: ReactNode;
  /** Wrap in PageLayout. Use for routes without a parent layout route. */
  withLayout?: boolean;
}

/** Route pending component used as the router default and for per-route overrides. */
export const PendingFallback = ({ title, withLayout }: PendingFallbackProps) => {
  const body = <Loading />;
  return withLayout ? <PageLayout title={title}>{body}</PageLayout> : body;
};

interface ErrorFallbackProps extends ErrorComponentProps {
  /** Page title, rendered only when `withLayout` is set. */
  title?: ReactNode;
  /** Wrap in PageLayout. Use for routes without a parent layout route. */
  withLayout?: boolean;
}

/**
 * Route error component. Renders a "Try again" button that resets the error
 * boundary and invalidates the router so the failed loader re-runs. In
 * development the original error stack is shown to aid debugging.
 */
export const ErrorFallback = ({ error, reset, title, withLayout }: ErrorFallbackProps) => {
  const router = useRouter();
  const devModeOn = useIsDevMode();
  const showDetails = import.meta.env.DEV || devModeOn;
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
  const stack = error instanceof Error ? error.stack : undefined;

  const handleRetry = () => {
    reset();
    void router.invalidate();
  };

  const body = (
    <div className="space-y-3">
      <p className="text-destructive">Error: {message}</p>
      {showDetails && stack && (
        <pre className="text-left text-xs bg-muted p-3 rounded-md overflow-auto max-h-48">
          {stack}
        </pre>
      )}
      <Button size="sm" onClick={handleRetry}>
        Try again
      </Button>
    </div>
  );

  return withLayout ? <PageLayout title={title}>{body}</PageLayout> : body;
};
