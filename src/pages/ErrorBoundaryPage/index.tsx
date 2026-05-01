import PageLayout from '@/components/PageLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import TriggerErrorButton from '@/components/TriggerErrorButton';
import { isDevModeEnabled } from '@/state/devMode/devModeStore';

const ErrorBoundaryPage = () => {
  return (
    <PageLayout title="ErrorBoundary demo">
      <p className="text-sm text-muted-foreground max-w-2xl">
        This page demonstrates the custom <code>ErrorBoundary</code> component at{' '}
        <code>src/components/ErrorBoundary/index.tsx</code>. Each red button below throws a
        render-time error on click. Because React boundaries only catch errors thrown during render
        — not inside event handlers — <code>TriggerErrorButton</code> sets state and throws on the
        next render.
      </p>
      <p className="text-sm text-muted-foreground max-w-2xl mt-2">
        All fallbacks on this page hide the raw stack trace in production. Toggle the <b>Dev</b>{' '}
        button in the navbar (bug icon) to reveal stacks in any build — the flag is stored in{' '}
        <code>localStorage</code> via <code>devModeStore</code>, so it persists across reloads. In{' '}
        <code>vite dev</code> the stack is always visible regardless of the toggle.
      </p>

      <h3 className="mt-8 text-lg font-semibold">Boundary tree</h3>
      <p className="text-sm text-muted-foreground max-w-2xl">
        Three nested boundaries exist in this app. An error bubbles up until the <b>closest</b>{' '}
        boundary catches it — siblings of the failing subtree are untouched, which is why the navbar
        survives most failures.
      </p>
      <pre className="mt-3 text-xs bg-muted p-4 rounded-md overflow-auto leading-relaxed">
        {`<React.StrictMode>
  <QueryClientProvider>
    [ErrorBoundary]  ← main.tsx (top-level safety net)
      <App>
        <RouterProvider>

          [Root-route boundary → RouteError]  ← __root.tsx errorComponent
            <RootComponent>
              <Navbar />               ← if this throws → caught by Root-route boundary

              [Per-route boundary → ErrorFallback]  ← router.tsx defaultErrorComponent
                <Outlet>
                  <ErrorBoundaryPage>

                    [Scoped ErrorBoundary]   ← section 1
                      <TriggerErrorButton /> ← throws → caught by Scoped boundary

                    <TriggerErrorButton />   ← section 2
                                              throws → caught by Per-route boundary

                  </ErrorBoundaryPage>
                </Outlet>

            </RootComponent>

        </RouterProvider>
      </App>

      <TriggerErrorButton />  ← section 3 (floating button in main.tsx)
                                 throws → caught by top-level ErrorBoundary

    </ErrorBoundary>
  </QueryClientProvider>
</React.StrictMode>`}
      </pre>
      <ul className="mt-3 text-sm text-muted-foreground list-disc pl-5 space-y-1 max-w-2xl">
        <li>
          <b>Section 1</b> — throw is caught by the <b>scoped</b> <code>ErrorBoundary</code>. Rest
          of the page is untouched.
        </li>
        <li>
          <b>Section 2</b> — throw escapes the scoped boundary and is caught by the{' '}
          <b>router's per-route boundary</b> (<code>ErrorFallback</code>). Navbar survives because
          it is rendered above <code>&lt;Outlet /&gt;</code> in <code>RootComponent</code>.
        </li>
        <li>
          <b>Section 3</b> — the floating button in <code>main.tsx</code> sits <i>outside</i>{' '}
          <code>&lt;RouterProvider /&gt;</code>, so its throw bypasses both router boundaries and
          reaches the top-level <code>ErrorBoundary</code>, replacing the entire app with the
          default fallback.
        </li>
        <li>
          <b>Root-route boundary</b> — if anything in <code>RootComponent</code> itself throws
          (Navbar, ThemeProvider, Toaster), it is caught here and rendered as{' '}
          <code>RouteError</code>; the navbar disappears too in that case.
        </li>
      </ul>

      <h3 className="mt-8 text-lg font-semibold">1. Scoped boundary</h3>
      <p className="text-sm text-muted-foreground max-w-2xl">
        The button is wrapped in a local <code>ErrorBoundary</code> with a custom fallback that
        prints <code>error.message</code> and (in dev) the full stack. Only the bordered card is
        replaced; the navbar and the rest of the page stay interactive. Click <b>Reset</b> to clear
        the boundary's error state and remount the subtree.
      </p>
      <div className="mt-3 rounded-md border p-4 max-w-2xl">
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <div role="alert" className="space-y-2">
              <p className="font-medium text-destructive">{error.message}</p>
              {(import.meta.env.DEV || isDevModeEnabled()) && error.stack && (
                <pre className="text-left text-xs bg-muted p-3 rounded-md overflow-auto max-h-48">
                  {error.stack}
                </pre>
              )}
              <button type="button" onClick={reset} className="underline text-sm">
                Reset
              </button>
            </div>
          )}
        >
          <TriggerErrorButton message="Scoped boundary demo error." />
        </ErrorBoundary>
      </div>

      <h3 className="mt-8 text-lg font-semibold">2. Unscoped — caught by the router</h3>
      <p className="text-sm text-muted-foreground max-w-2xl">
        This button is <b>not</b> wrapped in a scoped boundary. TanStack Router wraps every route in
        its own error boundary, so the error is caught by the router's{' '}
        <code>defaultErrorComponent</code> (<code>ErrorFallback</code> in{' '}
        <code>src/lib/routeHelpers.tsx</code>) before it can reach the top-level boundary in{' '}
        <code>main.tsx</code>. The navbar stays alive because it is rendered above{' '}
        <code>&lt;Outlet /&gt;</code> in <code>RootComponent</code> and the router only replaces the{' '}
        <code>Outlet</code> subtree. Click <b>Try again</b> in the router fallback to recover.
      </p>
      <div className="mt-3">
        <TriggerErrorButton
          label="Trigger unscoped error"
          message="Unscoped error — caught by router's defaultErrorComponent."
        />
      </div>

      <h3 className="mt-8 text-lg font-semibold">3. Top-level boundary (outside the router)</h3>
      <p className="text-sm text-muted-foreground max-w-2xl">
        Enable the <b>Dev</b> toggle in the navbar, then look for the floating red{' '}
        <b>“Trigger root error”</b> button in the bottom-right corner of the screen (it is hidden in
        production builds unless Dev mode is on). It is rendered in <code>src/main.tsx</code> as a
        sibling of <code>&lt;App /&gt;</code>, so it sits <i>outside</i>{' '}
        <code>&lt;RouterProvider /&gt;</code>. That means neither the per-route nor the root-route
        boundary can see its throw — the only ancestor boundary is the top-level{' '}
        <code>ErrorBoundary</code> in <code>main.tsx</code>.
      </p>
      <p className="text-sm text-muted-foreground max-w-2xl mt-2">
        Clicking it replaces the <b>entire</b> app (navbar included) with the default fallback
        defined in <code>src/components/ErrorBoundary/index.tsx</code>. Click <b>Try again</b>
        there to remount the whole tree, or refresh the page.
      </p>
      <p className="text-sm text-muted-foreground max-w-2xl mt-2">
        Why isn't the button rendered on this page? Anything you put inside a route component
        already lives inside both router boundaries, so a throw there can never reach the top-level
        one. Demonstrating it requires placing the trigger above <code>RouterProvider</code>.
      </p>
    </PageLayout>
  );
};

export default ErrorBoundaryPage;
