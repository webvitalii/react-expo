import PageLayout from '@/components/PageLayout';
import ExternalLink from '@/components/ExternalLink';

const HomePage = () => {
  return (
    <PageLayout title="Libraries used">
      <ul className="list-disc pl-4">
        <li>
          <ExternalLink href="https://react.dev/">React / TypeScript</ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://vitejs.dev/">Vite</ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://tailwindcss.com/">Tailwind</ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://ui.shadcn.com/">Shadcn/ui</ExternalLink>+{' '}
          <ExternalLink href="https://base-ui.com/">Base UI</ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://ui.shadcn.com/">Shadcn/ui</ExternalLink> +{' '}
          <ExternalLink href="https://base-ui.com/">Base UI</ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://tanstack.com/">
            Tanstack: Router, Query, Table, Form, Store
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.embla-carousel.com/">Embla Carousel</ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://sonner.emilkowal.ski/">Sonner</ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://lucide.dev/">Lucide Icons</ExternalLink>
        </li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Development tools</h3>

      <ul className="list-disc pl-4">
        <li>
          <ExternalLink href="https://oxc.rs/">Oxlint + Oxfmt</ExternalLink>
        </li>
      </ul>
      <p className="mt-4">
        <ExternalLink href="https://github.com/webvitalii/react-expo">
          Source code on GitHub
        </ExternalLink>
      </p>
    </PageLayout>
  );
};

export default HomePage;
