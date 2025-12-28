import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors />
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
    </>
  ),
});
