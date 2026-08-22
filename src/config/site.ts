/**
 * NovaServe — Centralized Site & SEO Configuration
 *
 * Single source of truth for branding, metadata, canonical URLs,
 * creator attribution, and social links.
 */

export const siteConfig = {
  name: "NovaServe",
  title: "NovaServe – Modern Cloud Infrastructure Platform",
  description:
    "NovaServe is a modern cloud infrastructure platform for deploying, managing, and scaling applications across cloud providers with a developer-first experience.",
  url: "https://novaserve.cloud",
  ogImage: "https://novaserve.cloud/opengraph-image",
  creator: {
    name: "Md Shadab Azam Ansari",
    url: "https://md-shadab-azam-ansari.vercel.app/",
    twitter: "@shadab_azam",
  },
  links: {
    github: "https://github.com/novaserve-cloud/novaserve",
    npm: "https://www.npmjs.com/package/novaserve",
    twitter: "https://twitter.com/novaserve",
    discord: "https://discord.gg/novaserve",
    creator: "https://md-shadab-azam-ansari.vercel.app/",
  },
  keywords: [
    "NovaServe",
    "Cloud Infrastructure",
    "Cloud Deployment",
    "Developer Platform",
    "DevOps",
    "AWS",
    "Azure",
    "Cloud Computing",
    "Application Deployment",
    "Infrastructure Management",
    "Cloud Automation",
    "Developer Tools",
    "TypeScript Serverless Framework",
    "Serverless Framework",
    "Nova IR",
    "Compiler-Driven Infrastructure",
    "Multi-Cloud Platform",
  ],
};

export type SiteConfig = typeof siteConfig;
