import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { DOC_PAGES } from "@/lib/docs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Main public site routes (explicitly excluding /signin, auth, or private pages)
  const siteRoutes = [
    "",
    "/docs",
    "/architecture",
    "/providers",
    "/pricing",
    "/comparison",
    "/about",
    "/changelog",
    "/community",
    "/wall-of-fame",
    "/contribute",
    "/roadmap",
    "/security",
    "/careers",
    "/examples",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    "/visual-sitemap",
  ];

  const siteEntries: MetadataRoute.Sitemap = siteRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/docs" ? 0.9 : 0.8,
  }));

  // Dynamic documentation routes from single source of truth
  const docEntries: MetadataRoute.Sitemap = DOC_PAGES.map((doc) => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...siteEntries, ...docEntries];
}
