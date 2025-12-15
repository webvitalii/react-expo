import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';

const HomePage = () => {
  return (
    <PageLayout>
      <PageTitle>Libraries used</PageTitle>
      <ul className="list-disc pl-4">
        <li>React / TypeScript / Vite</li>
        <li>
          <a href="https://tailwindcss.com/" target="_blank">
            Tailwind
          </a>
        </li>
        <li>
          <a href="https://ui.shadcn.com/" target="_blank">
            Shadcn/ui
          </a>
        </li>
        <li>
          <a href="https://tanstack.com/" target="_blank">
            Tanstack: Router, Query, Table, Form
          </a>
        </li>
        <li>
          <a href="https://www.embla-carousel.com/get-started/react/" target="_blank">
            Embla Carousel
          </a>
        </li>
      </ul>

      <p>
        <a href="https://github.com/webvitalii/react-expo" target="_blank">
          Source code on GitHub
        </a>
      </p>
    </PageLayout>
  );
};

export default HomePage;
