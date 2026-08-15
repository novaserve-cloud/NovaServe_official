import type { Metadata } from "next";
import Link from "next/link";
import { DiamondIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Visual Sitemap | NovaServe",
  description: "A comprehensive overview of all pages and documentation available on the NovaServe platform.",
};

const sitemapSections = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Documentation", href: "/docs" },
      { label: "Compiler Architecture", href: "/architecture" },
      { label: "Pricing & Estimator", href: "/pricing" },
      { label: "Starter Templates", href: "/examples" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "AWS Provider", href: "/providers" },
      { label: "Cloudflare Edge", href: "/providers" },
      { label: "GCP & Azure Specs", href: "/providers" },
      { label: "NovaServe vs Pulumi", href: "/comparison" },
      { label: "NovaServe vs Terraform", href: "/comparison" },
    ],
  },
  {
    title: "Company & Community",
    links: [
      { label: "🏆 Wall of Fame", href: "/wall-of-fame" },
      { label: "Open Source Contribute", href: "/contribute" },
      { label: "Engineering Blog", href: "/blog" },
      { label: "Product Roadmap", href: "/roadmap" },
      { label: "Changelog", href: "/changelog" },
      { label: "Community", href: "/community" },
      { label: "Security & SOC2", href: "/security" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Documentation Hub",
    links: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Quick Start", href: "/docs/quickstart" },
      { label: "Project Structure", href: "/docs/project-structure" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { label: "Compiler Pipeline", href: "/docs/concepts/compiler" },
      { label: "Nova IR Specification", href: "/docs/concepts/nova-ir" },
      { label: "Providers Matrix", href: "/docs/concepts/providers" },
      { label: "State & Drift", href: "/docs/concepts/state" },
    ],
  },
  {
    title: "CLI Reference",
    links: [
      { label: "Overview", href: "/docs/cli" },
      { label: "nova init", href: "/docs/cli/init" },
      { label: "nova dev", href: "/docs/cli/dev" },
      { label: "nova compile", href: "/docs/cli/compile" },
      { label: "nova plan", href: "/docs/cli/plan" },
      { label: "nova deploy", href: "/docs/cli/deploy" },
      { label: "nova drift", href: "/docs/cli/drift" },
    ],
  },
  {
    title: "API & Configuration",
    links: [
      { label: "Configuration (nova.config.ts)", href: "/docs/reference/configuration" },
      { label: "Resource API Reference", href: "/docs/reference/api" },
      { label: "Error Codes", href: "/docs/reference/errors" },
      { label: "Environment Variables", href: "/docs/reference/environment-variables" },
      { label: "Serverless API Guide", href: "/docs/guides/serverless-api" },
      { label: "Configuration Guide", href: "/docs/guides/configuration" },
      { label: "Architecture Deep Dive", href: "/docs/architecture/overview" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-4 pb-8 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FFB020] p-1 flex items-center justify-center text-black font-bold shadow-md">
              <DiamondIcon size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">NovaServe</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">Visual Sitemap</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl">
            A comprehensive overview of all pages, resources, and documentation available on the NovaServe platform.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {sitemapSections.map((section, idx) => (
            <div key={idx} className="space-y-5">
              <h2 className="text-sm uppercase font-mono font-bold tracking-wider text-gray-900 border-b border-gray-200 pb-2">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-semibold text-gray-600 hover:text-[#FFB020] transition-colors flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#FFB020] mr-2.5 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
