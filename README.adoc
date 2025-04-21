= Accessibly Yours
:author: Juan Carlos Collins
:revdate: 2025-04-21
:toc: macro
:toclevels: 2

Accessibly Yours is a React + Next.js frontend project that audits accessibility (a11y) for public websites using real-time scans via a remote audit server. This app showcases frontend engineering best practices while addressing a meaningful and growing concern in web development: inclusive, accessible design.

== Motivation

This app was created to:

- Demonstrate technical proficiency in React, Next.js, and performance-focused frontend architecture.
- Create a live, usable tool that helps developers identify accessibility issues.
- Build a portfolio-worthy project that uses real-world data and a full deployment pipeline.

== Architecture Overview

The frontend (`accessibly-yours`) is deployed on Vercel and communicates with a backend API (`audit-api-fly`) hosted on Fly.io.

Why this split?

- Vercel is optimized for modern frontend frameworks like Next.js and handles static generation + SSR beautifully.
- Fly.io allows us to run a full Node.js server with Puppeteer (a headless browser), which is not possible on Vercel serverless functions due to Chromium limitations.

== Key Features

- 🔍 URL input triggers a real-time audit of a site
- 🧪 Uses `pa11y` under the hood for accessibility testing
- 💬 Displays audit result count and links to improve accessibility
- 🧠 Clean, responsive UI built with Tailwind CSS and React

== Technology Stack

- Frontend: React, Next.js App Router, TypeScript, Tailwind CSS
- Testing: Jest, React Testing Library
- Deployment: Vercel (frontend), Fly.io (backend)
- Audit Engine: `pa11y`, headless Chromium

== Setup & Development

1. Clone the repo
2. Run `npm install`
3. Start local dev server: `npm run dev`
4. Environment should point to: `https://audit-api-fly-01.fly.dev`

== Deployment

- Pushed to `main` branch → auto-deployed by Vercel
- Live app: https://accessibly-yours.vercel.app

== Gotchas / Notes

- GitHub Pages was tested but dropped due to limitations with Next.js dynamic routes and styles.
- Tailwind styles require the app to be fully built and deployed via SSR platform like Vercel for proper hydration.
- All audits are proxied through Fly.io due to CORS and headless browser execution.

== Future Plans

- Add audit result visualization (charts, scorecards)
- Include suggestions and quick fixes
- Save history via localStorage or Supabase
- Make it installable as a PWA

== Related Project

See the paired backend server at: https://github.com/juancarlucci/audit-api-fly
