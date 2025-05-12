export default function AboutPage() {
  return (
    <main className="themed-bg">
      <div className="max-w-3xl mx-auto text-lg leading-relaxed pt-24 px-6">
        <h1 className="text-4xl font-bold text-purple-800 mb-6">
          About Accessibly Yours
        </h1>
        <p className="mb-4">
          <strong>Accessibly Yours</strong> is a modern web app that helps
          developers discover accessibility issues on any public website using
          real-time audits.
        </p>
        <p className="mb-4">
          Built with React, Next.js App Router, Tailwind CSS, and
          Puppeteer/pa11y, it uses headless Chromium to simulate user
          interactions and generate WCAG 2.1 insights.
        </p>
        <p className="mb-4">
          Every feature was crafted to reflect performance, clarity, and
          thoughtful UX—from semantic HTML and keyboard navigation support, to
          client-side caching and animated results.
        </p>
        <p className="mb-4">
          Created as both a passion project and a professional showcase, it
          reflects a commitment to frontend quality and inclusive design.
        </p>
        <p>
          ✨ Built by <strong>Juan Carlos Collins</strong> – Frontend Engineer
        </p>
      </div>
    </main>
  );
}
