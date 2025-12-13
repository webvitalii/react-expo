import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/$lang/forms/')({
  component: FormsIndexRedirect,
});

function FormsIndexRedirect() {
  const { lang } = Route.useParams();
  return <Navigate to="/$lang/forms/tanstack-form" params={{ lang }} />;
}
