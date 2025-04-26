export const dynamic = "force-dynamic"; //* Next.js thinks /api/check-lighthouse is
//* static and tries to prerender it at build time — which obviously fails.
//* API routes are static by default. This line forces it to be dynamic.
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const site = searchParams.get("url") || "https://accessibly-yours.vercel.app";
  const apiKey = process.env.PSI_API_KEY;
  console.log("[DEBUG] PSI_API_KEY value:", process.env.PSI_API_KEY);

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      site
    )}&category=PERFORMANCE&category=ACCESSIBILITY&category=SEO&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const json = await response.json();

    const scores = {
      performance: json.lighthouseResult.categories.performance.score * 100,
      accessibility: json.lighthouseResult.categories.accessibility.score * 100,
      seo: json.lighthouseResult.categories.seo.score * 100,
    };

    return new Response(JSON.stringify(scores), { status: 200 });
  } catch (error) {
    console.error("Error fetching Lighthouse scores:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch scores" }), {
      status: 500,
    });
  }
}
