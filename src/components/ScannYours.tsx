"use client";

import UrlScanner from "./UrlScanner";
import Link from "next/link";
import { RefObject } from "react";

interface ScannYoursProps {
  inputRef?: RefObject<HTMLInputElement | null>;
}

function ScannYours({ inputRef }: ScannYoursProps) {
  return (
    <section className="pt-32 px-6 text-center">
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

      <p className="text-base font-medium mt-16 mb-4">Just curious?</p>
      <Link href="/demo">
        <button className="btn btn-primary text-lg font-medium">
          Try the Demo Now
        </button>
      </Link>
      <p className="text-md mt-4 max-w-2xl mx-auto">
        Our demo lets you explore a sample scan and see the impact of
        accessibility fixes.
      </p>

      <p className="text-md mt-8 max-w-2xl mx-auto">
        Want to learn how this app was built?
        <Link
          href="/about"
          className="text-purple-700 hover:text-purple-400 font-medium underline hover:text-purple-900"
        >
          Read the story behind Accessibly Yours.
        </Link>
      </p>
    </section>
  );
}

export default ScannYours;
