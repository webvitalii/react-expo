import { createFileRoute, Outlet } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';

export const Route = createFileRoute('/$lang/forms')({
  component: FormsLayout,
});

function FormsLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
