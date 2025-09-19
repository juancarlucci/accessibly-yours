// app/layout.tsx
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import TopNav from "@/components/TopNav";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Accessibly Yours - Web Accessibility Scanner",
  description:
    "Check your website for accessibility issues and get recommendations for improvements.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Check your website for accessibility issues and get recommendations for improvements." />
      </head>
      <body className="flex flex-col min-h-screen">
        <TopNav />
        <Suspense fallback={<div className="min-h-screen" />}>
        <main className="flex-grow">{children}</main>
        <Footer />
        </Suspense>
      </body>
    </html>
  );
}
