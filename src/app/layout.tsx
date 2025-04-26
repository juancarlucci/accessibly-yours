import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibly Yours - Web Accessibility Scanner",
  description:
    "Check your website for accessibility issues and get recommendations for improvements.",
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <footer className="text-center text-sm text-white py-10">
          Built by Juan Carlos Collins •{" "}
          <span className="inline-block mt-1 sm:mt-0 sm:ml-1">
            🚀 100% Lighthouse: Performance, Accessibility, SEO, Best Practices
          </span>
        </footer>
      </body>
    </html>
  );
}
