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
      <body>{children}</body>
    </html>
  );
}
