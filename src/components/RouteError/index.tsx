import type { ErrorComponentProps } from '@tanstack/react-router';
import { Link, useRouter } from '@tanstack/react-router';
import { Button, buttonVariants } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import { useIsDevMode } from '@/state/devMode/devModeStore';

const RouteError = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();
  const devModeOn = useIsDevMode();
  const showDetails = import.meta.env.DEV || devModeOn;
  const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
  const stack = error instanceof Error ? error.stack : undefined;

  const handleRetry = () => {
    reset();
    void router.invalidate();
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">{message}</p>

        {showDetails && stack && (
          <pre className="text-left text-xs bg-muted p-4 rounded-md overflow-auto max-h-64">
            {stack}
          </pre>
        )}

        <div className="flex gap-3 justify-center pt-2">
          <Button onClick={handleRetry}>Try again</Button>
          <Link to="/" className={buttonVariants({ variant: 'outline' })}>
            Go home
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default RouteError;
