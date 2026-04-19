import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { queryClient } from '@/lib/queryClient';
import { PendingInline, ErrorInline } from '@/lib/routeHelpers';

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  // Let React Query own data freshness; router only handles route-level staleness.
  defaultPreloadStaleTime: 0,
  // Loading / error UI for any route that doesn't override. Inline because most
  // routes are nested under a parent layout route that provides the shell.
  // Routes without a parent layout (e.g. /table) override these with their own
  // full-shell versions via pendingWithLayout / errorWithLayout.
  defaultPendingComponent: PendingInline,
  defaultErrorComponent: ErrorInline,
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
