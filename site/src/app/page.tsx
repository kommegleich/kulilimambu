import { Header } from "@/components/Header";
import { WorkGrid } from "@/components/WorkGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="work" className="work-section">
        <WorkGrid />
      </main>
      <Footer />
    </>
  );
}
