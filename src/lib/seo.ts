import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  keywords?: string[];
}

/**
 * Constructs production-grade metadata for any page in NovaServe
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = siteConfig.ogImage,
  noIndex = false,
  type = "website",
  publishedTime,
  authors = [siteConfig.creator.name],
  keywords = siteConfig.keywords,
}: MetadataOptions = {}): Metadata {
  // Normalize path to ensure leading slash if not empty
  const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const canonicalUrl = `${siteConfig.url}${formattedPath}`;

  const pageTitle = title
    ? title.includes("NovaServe")
      ? title
      : `${title} | ${siteConfig.name}`
    : siteConfig.title;

  return {
    title: pageTitle,
    description,
    keywords,
    authors: authors.map((name) => ({
      name,
      url: name === siteConfig.creator.name ? siteConfig.creator.url : undefined,
    })),
    creator: siteConfig.creator.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} – Cloud Infrastructure for Developers`,
        },
      ],
      type,
      ...(publishedTime ? { publishedTime } : {}),
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
      creator: siteConfig.creator.twitter,
      site: "@novaserve",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
