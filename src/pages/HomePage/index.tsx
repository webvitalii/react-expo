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
    </PageLayout>
  );
};

export default HomePage;
