"use client";

import { useState, useRef, type RefObject } from "react";
import { useRouter } from "next/navigation";

interface UrlScannerProps {
  inputRef?: RefObject<HTMLInputElement | null>;
}

export default function UrlScanner({
  inputRef,
}: UrlScannerProps): React.JSX.Element {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const localRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Scan triggered for URL:", url);
    if (url) {
      const encodedUrl = encodeURIComponent(url);
      router.push(`/results?site=${encodedUrl}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-lg mx-auto mt-12 p-6 rounded-xl shadow-md"
    >
      <label
        htmlFor="url"
        className="block text-xl text-white font-normal my-4"
      >
        Enter a website URL to scan
      </label>
      <input
        id="url"
        type="url"
        required
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        ref={inputRef ?? localRef} // * Use external ref if provided
        className="w-full p-3 rounded-lg text-black border border-gray-300 mb-4"
      />
      <button
        type="submit"
        className="bg-white text-black py-2 px-6 rounded-lg transition font-semibold hover:bg-purple-700 hover:text-white"
      >
        🚀 Scan Now
      </button>
    </form>
  );
}
