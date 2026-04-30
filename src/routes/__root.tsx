import { lazy, Suspense } from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import RouteError from '@/components/RouteError';
import NotFound from '@/components/NotFound';

export interface RouterContext {
  queryClient: QueryClient;
}

const Devtools = import.meta.env.DEV ? lazy(() => import('@/components/Devtools')) : () => null;

const RootComponent = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <section className="container mx-auto p-6">
      <Navbar />
      <Outlet />
    </section>
    <Toaster richColors />
    {import.meta.env.DEV && (
      <Suspense fallback={null}>
        <Devtools />
      </Suspense>
    )}
  </ThemeProvider>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  // pendingComponent intentionally omitted: the root has no loader, so it never
  // fires here. Router-level defaultPendingComponent handles child routes.
  errorComponent: RouteError,
  notFoundComponent: NotFound,
});
