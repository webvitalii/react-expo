import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <section className="container mx-auto">
      <Navbar />
      {children}
    </section>
  );
};

export default PageLayout;
