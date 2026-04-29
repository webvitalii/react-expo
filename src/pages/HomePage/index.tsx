import PageLayout from '@/components/PageLayout';

const HomePage = () => {
  return (
    <PageLayout title="Libraries used">
      <ul className="list-disc pl-4">
        <li>
          <a className="text-blue-500 hover:underline" href="https://react.dev/" target="_blank">
            React / TypeScript
          </a>
        </li>
        <li>
          <a className="text-blue-500 hover:underline" href="https://vitejs.dev/" target="_blank">
            Vite
          </a>
        </li>
        <li>
          <a
            className="text-blue-500 hover:underline"
            href="https://tailwindcss.com/"
            target="_blank"
          >
            Tailwind
          </a>
        </li>
        <li>
          <a
            className="text-blue-500 hover:underline"
            href="https://ui.shadcn.com/"
            target="_blank"
          >
            Shadcn/ui
          </a>{' '}
          +{' '}
          <a className="text-blue-500 hover:underline" href="https://base-ui.com/" target="_blank">
            Base UI
          </a>
        </li>
        <li>
          <a className="text-blue-500 hover:underline" href="https://tanstack.com/" target="_blank">
            Tanstack: Router, Query, Table, Form, Store
          </a>
        </li>
        <li>
          <a
            className="text-blue-500 hover:underline"
            href="https://www.embla-carousel.com/get-started/react/"
            target="_blank"
          >
            Embla Carousel
          </a>
        </li>
        <li>
          <a
            className="text-blue-500 hover:underline"
            href="https://sonner.emilkowal.dev/"
            target="_blank"
          >
            Sonner
          </a>
        </li>
        <li>
          <a
            className="text-blue-500 hover:underline"
            href="https://lucide.dev/guide/react/"
            target="_blank"
          >
            Lucide Icons
          </a>
        </li>
      </ul>

      <h3 className="mt-4 text-lg font-semibold">Development tools</h3>

      <ul className="list-disc pl-4">
        <li>
          <a className="text-blue-500 hover:underline" href="https://oxc.rs/" target="_blank">
            Oxlint + Oxfmt
          </a>
        </li>
      </ul>
      <p className="mt-4">
        <a
          className="text-blue-500 hover:underline"
          href="https://github.com/webvitalii/react-expo"
          target="_blank"
        >
          Source code on GitHub
        </a>
      </p>
    </PageLayout>
  );
};

export default HomePage;
