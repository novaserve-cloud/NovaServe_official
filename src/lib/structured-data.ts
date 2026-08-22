import { siteConfig } from "@/config/site";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    description:
      "NovaServe is a modern cloud infrastructure and deployment platform designed for developers and teams.",
    founder: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
      sameAs: [siteConfig.creator.url],
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.npm,
      siteConfig.links.twitter,
      siteConfig.links.discord,
      siteConfig.creator.url,
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    creator: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/#softwareapplication`,
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    softwareVersion: "2.1.10",
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    url: siteConfig.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
    creator: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
    downloadUrl: siteConfig.links.npm,
    codeRepository: siteConfig.links.github,
    description:
      "NovaServe is a modern cloud infrastructure and developer platform for deploying, managing, and scaling applications across cloud providers with a developer-first experience.",
  };
}

export function getRootStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getWebSiteSchema(),
      getSoftwareApplicationSchema(),
    ],
  };
}
