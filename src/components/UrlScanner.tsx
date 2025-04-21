"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const router = useRouter();

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
      className="bg-white max-w-lg mx-auto mt-12 p-6 rounded-xl shadow-md"
    >
      <label htmlFor="url" className="block text-lg font-medium mb-2">
        Enter a website URL to scan
      </label>
      <input
        id="url"
        type="url"
        required
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 mb-4"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-purple-700"
      >
        🚀 Scan Now
      </button>
    </form>
  );
}
