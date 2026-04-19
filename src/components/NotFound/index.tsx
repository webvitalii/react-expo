import { Link } from '@tanstack/react-router';
import { buttonVariants } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

const NotFound = () => {
  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">404</h1>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <div className="pt-2">
          <Link to="/" className={buttonVariants({ variant: 'default' })}>
            Go home
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
