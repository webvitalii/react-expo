import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import Navbar from '@/components/Navbar';
import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from '@/components/NotFound';

export interface RouterContext {
  queryClient: QueryClient;
}

const RootComponent = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <section className="container mx-auto p-6">
      <Navbar />
      <Outlet />
    </section>
    <Toaster richColors />
    {import.meta.env.DEV && (
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'Tanstack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
          formDevtoolsPlugin(),
        ]}
      />
    )}
  </ThemeProvider>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  // pendingComponent intentionally omitted: the root has no loader, so it never
  // fires here. Router-level defaultPendingComponent handles child routes.
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});
