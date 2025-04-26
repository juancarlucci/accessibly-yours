import UrlScanner from "./UrlScanner";
import Link from "next/link";
import { RefObject } from "react";

function ScannYours({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      {/* Interaction Zone */}
      <section className="min-h-screen bg-white text-gray-800 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 readable-width">
          See Accessibility Through Your Eyes
        </h2>
        <div className="prose prose-lg mx-auto">
          <p className="text-lg mb-2 readable-width">
            Small choices, like color contrast, shape experiences for
            millions—over 8% of men face color vision challenges daily.
          </p>
        </div>
        <p className="text-lg readable-width mx-auto mb-10">
          Scan your site to uncover opportunities you’ll want to explore.
        </p>

        <div className="max-w-xl mx-auto mb-16">
          <UrlScanner inputRef={inputRef} />
        </div>

        <p className="text-base font-medium text-gray-500 mb-4">
          Just curious?
        </p>
        <Link href="/demo">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg font-medium">
            Try the Demo Now
          </button>
        </Link>
        <p className="text-sm text-gray-600 mt-4 readable-width mx-auto">
          Our demo lets you explore a sample scan and see the impact of
          accessibility fixes.
        </p>
      </section>
    </>
  );
}

export default ScannYours;
