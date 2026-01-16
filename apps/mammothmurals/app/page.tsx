import Header from "@/components/header";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-primary">
      <Header className="sticky top-8 z-50 left-0 right-0" />
      <HeroSection className="pt-28" />
    </main>
  );
}
