import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { queryClient } from '@/lib/queryClient';
import { PendingFallback, ErrorFallback } from '@/lib/routeHelpers';

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // Let React Query own data freshness; router only handles route-level staleness.
  defaultPreloadStaleTime: 0,
  // Fallbacks for any route without its own pendingComponent / errorComponent.
  // Inline (no shell): child routes inherit the shell from a parent layout
  // route, and standalone routes simply show a spinner / error box until their
  // component renders.
  defaultPendingComponent: PendingFallback,
  defaultErrorComponent: ErrorFallback,
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
