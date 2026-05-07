import type { ReactNode } from 'react';
import PageTitle from '@/components/PageTitle';

interface PageLayoutProps {
  children: ReactNode;
  title?: ReactNode;
}

/**
 * Page wrapper that renders an optional title and children.
 *
 * Navbar + container padding are provided by the root route (see `__root.tsx`)
 * so they remain visible during route chunk loading and on every page.
 */
const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <>
      {title !== undefined && <PageTitle>{title}</PageTitle>}
      {children}
    </>
  );
};

export default PageLayout;
