"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="themed-bg fixed bottom-0 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm py-2 px-4 text-center shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p>
          © {new Date().getFullYear()} Accessibly Yours by Juan Carlos Collins
        </p>
        <div className="flex gap-4">
          <Link href="/" prefetch className="hover:text-purple-600">
            Home
          </Link>
          <Link href="/demo" prefetch className="hover:text-purple-600">
            Demo
          </Link>
          <Link href="/about" prefetch className="hover:text-purple-600">
            About
          </Link>
          <a
            href="https://github.com/juancarlucci/accessibly-yours"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
