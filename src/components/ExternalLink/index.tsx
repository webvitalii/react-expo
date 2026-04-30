import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

const ExternalLink = ({ className, ...props }: ComponentProps<'a'>) => {
  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'text-primary underline underline-offset-4 decoration-1',
        'hover:decoration-2 hover:text-primary/90',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm',
        className,
      )}
      {...props}
    />
  );
};

export default ExternalLink;
