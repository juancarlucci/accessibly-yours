//* src/app/page.tsx
"use client";

import HeroSection from "@/components/HeroSection";
import HeroAccessibilityScene from "@/components/HeroAccessibilityScene";
import UrlScanner from "@/components/UrlScanner";
import IssueCard, { Issue } from "@/components/IssueCard";

export default function HomePage(): React.JSX.Element {
  // * Example issue for preview
  const exampleIssue: Issue = {
    id: "demo-contrast-001",
    code: "WCAG2AA.1.4.3.G18",
    message: "Text does not meet minimum contrast ratio requirements.",
    selector: ".low-contrast-banner",
    helpUrl:
      "https://dequeuniversity.com/rules/axe/4.8/color-contrast?application=axeAPI",
    description:
      "Ensure all text has a contrast ratio of at least 4.5:1 against its background.",
    impact: "moderate",
  };

  return (
    <>
      {/* Hero Intro */}
      <section className="min-h-screen">
        <HeroSection />
      </section>

      {/* Scroll-Activated Clarity */}
      <section className="min-h-screen">
        <HeroAccessibilityScene />
      </section>

      {/* Interaction Zone */}
      <section className="min-h-[90vh] bg-white text-gray-800 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Experience Accessibility in Action
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Color contrast issues impact millions. Try scanning your own site to
          reveal insights you might have missed.
        </p>

        {/* Preview example issue card */}
        <div className="max-w-xl mx-auto mb-12">
          <IssueCard issue={exampleIssue} />
        </div>

        <div className="mt-12">
          <UrlScanner />
        </div>
      </section>
    </>
  );
}
