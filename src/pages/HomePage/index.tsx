import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";

const HomePage = () => {
  return (
    <PageLayout>
      <PageTitle>Libraries used</PageTitle>
      <ul className="list-disc pl-4">
        <li>React / TypeScript / Vite</li>
        <li>Tailwind CSS</li>
        <li>Radix UI</li>
        <li>Shadcn/ui</li>
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
