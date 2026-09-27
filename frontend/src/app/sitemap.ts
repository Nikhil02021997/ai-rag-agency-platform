import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://creativenetworks.in";
  const routes = [
    "",
    "/about",
    "/services",
    "/services/digital-marketing",
    "/services/google-meta-ads",
    "/services/website-creation-maintenance",
    "/services/seo",
    "/services/influencer-marketing",
    "/services/ai-rag",
    "/services/web-dev",
    "/services/data-analytics",
    "/case-studies",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}