"use client";

import UrlScanner from "./UrlScanner";
import Link from "next/link";
import { RefObject } from "react";

interface ScannYoursProps {
  inputRef?: RefObject<HTMLInputElement | null>;
}

function ScannYours({ inputRef }: ScannYoursProps) {
  return (
    <section className="min-h-[100vh] bg-white text-gray-800 py-20 px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        See Accessibility Through Your Eyes
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-2">
        Small choices, like color contrast, shape experiences for millions—over
        8% of men face color vision challenges daily.
      </p>
      <p className="text-lg max-w-2xl mx-auto mb-10">
        Scan your site to uncover opportunities you’ll want to explore.
      </p>

      <div className="max-w-xl mx-auto mb-16">
        <UrlScanner inputRef={inputRef} />
      </div>

      <p className="text-base font-medium text-gray-500 mt-16 mb-4">
        Just curious?
      </p>
      <Link href="/demo">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg font-medium">
          Try the Demo Now
        </button>
      </Link>
      <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
        Our demo lets you explore a sample scan and see the impact of
        accessibility fixes.
      </p>
    </section>
  );
}

export default ScannYours;
