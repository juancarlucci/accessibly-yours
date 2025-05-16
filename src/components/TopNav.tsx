"use client";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

export default function TopNav() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="nav-fixed">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <Image
            src="/logo.webp"
            alt="Accessibly Yours logo"
            width={24}
            height={24}
          />
          <span>Accessibly Yours</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}