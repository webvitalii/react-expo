import type { ReactNode } from 'react';
import type { ErrorComponentProps } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';
import Loading from '@/components/Loading';

/**
 * Minimal pending component (no PageLayout shell). Used as the router-level
 * default; applies to any route nested under a parent layout route.
 */
export const PendingInline = () => <Loading />;

/**
 * Minimal error component (no PageLayout shell). Used as the router-level
 * default; applies to any route nested under a parent layout route.
 */
export const ErrorInline = ({ error }: ErrorComponentProps) => {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
  return <div className="text-destructive">Error: {message}</div>;
};

/**
 * Route-level pending component that renders a full PageLayout shell (including
 * Navbar + PageTitle) around the Loading spinner. Use for routes that do NOT
 * have a parent layout route providing the shell (i.e. direct children of __root).
 */
export const pendingWithLayout = (title: ReactNode) => {
  const Pending = () => (
    <PageLayout title={title}>
      <Loading />
    </PageLayout>
  );
  return Pending;
};

/**
 * Route-level error component that renders within a full PageLayout shell.
 * Use for routes that do NOT have a parent layout route providing the shell.
 */
export const errorWithLayout = (title: ReactNode) => {
  const ErrorWithLayout = ({ error }: ErrorComponentProps) => {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return (
      <PageLayout title={title}>
        <div className="text-destructive">Error: {message}</div>
      </PageLayout>
    );
  };
  return ErrorWithLayout;
};
