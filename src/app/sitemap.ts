import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novaserve.cloud";

  // Main site routes
  const siteRoutes = [
    "",
    "/docs",
    "/contact",
    "/signin",
    "/pricing",
    "/architecture",
    "/providers",
    "/blog",
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
  ];

  // Documentation routes
  const docRoutes = [
    "/docs/getting-started",
    "/docs/installation",
    "/docs/quickstart",
    "/docs/project-structure",
    "/docs/concepts/compiler",
    "/docs/concepts/nova-ir",
    "/docs/concepts/providers",
    "/docs/concepts/state",
    "/docs/cli",
    "/docs/cli/init",
    "/docs/cli/dev",
    "/docs/cli/compile",
    "/docs/cli/plan",
    "/docs/cli/deploy",
    "/docs/cli/drift",
    "/docs/reference/configuration",
    "/docs/reference/api",
    "/docs/reference/errors",
    "/docs/reference/environment-variables",
    "/docs/guides/serverless-api",
    "/docs/guides/configuration",
    "/docs/architecture/overview",
  ];

  const siteEntries = siteRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : route === "/docs" ? 0.9 : 0.8,
  }));

  const docEntries = docRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...siteEntries, ...docEntries];
}
