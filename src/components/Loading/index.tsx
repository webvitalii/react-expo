import { Spinner } from '@/components/ui/spinner';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loading = ({ message = 'Loading...', size = 'md' }: LoadingProps) => {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <Spinner className={sizeClasses[size]} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export default Loading;
