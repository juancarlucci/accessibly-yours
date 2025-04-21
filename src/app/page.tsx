//* src/app/page.tsx
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import UrlScanner from "../components/UrlScanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <UrlScanner />
    </>
  );
}
