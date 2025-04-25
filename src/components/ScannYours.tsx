import UrlScanner from "./UrlScanner";
import Link from "next/link";
import { RefObject } from "react";

function ScannYours({
  inputRef,
}: {
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      {/* Interaction Zone */}
      <section className="min-h-[100vh] bg-white text-gray-800 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          See Accessibility Through Your Eyes
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Small choices, like color contrast, shape experiences for
          millions—over 8% of men face color vision challenges daily.{" "}
        </p>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Scan your site to uncover opportunities you’ll want to explore.
        </p>
        <div className="mt-12">
          <UrlScanner inputRef={inputRef} />
        </div>
        {/* Button to Demo Page */}
        <div className="mt-16">
          <Link href="/demo">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg font-medium">
              Try the Demo Now
            </button>
          </Link>
          <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
            Curious about what issues might be hiding in your site? Our demo
            lets you explore a sample scan and see the impact of accessibility
            fixes.
          </p>
        </div>
      </section>
    </>
  );
}

export default ScannYours;
