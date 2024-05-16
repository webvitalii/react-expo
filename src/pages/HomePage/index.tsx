import PageLayout from "@/components/PageLayout";

const HomePage = () => {
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-4">Libraries used</h1>
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
