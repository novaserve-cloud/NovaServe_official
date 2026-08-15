/**
 * NovaServe Documentation — Navigation & Content Data Layer
 *
 * Central source of truth for:
 * - Sidebar navigation structure
 * - Page metadata (title, description, slug, section)
 * - Previous/Next page computation
 * - Search index generation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface DocPage {
  slug: string;           // URL path segment after /docs/
  title: string;          // H1 page title
  shortTitle: string;     // Sidebar label
  description: string;    // SEO meta description
  section: string;        // Sidebar group header
  order: number;          // Sort order within section
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export interface SearchResult {
  title: string;
  shortTitle: string;
  slug: string;
  section: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  All Documentation Pages                                            */
/* ------------------------------------------------------------------ */

export const DOC_PAGES: DocPage[] = [
  // ── Getting Started ──────────────────────────────────────────────
  {
    slug: "getting-started",
    title: "Introduction to NovaServe",
    shortTitle: "Introduction",
    description: "Learn what NovaServe is, how it works, and why it exists. A TypeScript-native serverless framework with compiler-driven infrastructure.",
    section: "Getting Started",
    order: 0,
  },
  {
    slug: "installation",
    title: "Installing NovaServe",
    shortTitle: "Installation",
    description: "Install the NovaServe CLI and npm package using npm, pnpm, yarn, or bun. System requirements and verification steps.",
    section: "Getting Started",
    order: 1,
  },
  {
    slug: "quickstart",
    title: "Quick Start — Deploy in 5 Minutes",
    shortTitle: "Quick Start",
    description: "Scaffold, develop, and deploy your first NovaServe serverless application in under 5 minutes.",
    section: "Getting Started",
    order: 2,
  },
  {
    slug: "project-structure",
    title: "Project Structure",
    shortTitle: "Project Structure",
    description: "Understand the file organization of a NovaServe project including App.ts, nova.config.ts, and route handlers.",
    section: "Getting Started",
    order: 3,
  },

  // ── Core Concepts ────────────────────────────────────────────────
  {
    slug: "concepts/compiler",
    title: "Compiler Pipeline",
    shortTitle: "Compiler Pipeline",
    description: "How NovaServe's 4-stage compiler transforms TypeScript AST into deterministic cloud deployments via Nova IR.",
    section: "Core Concepts",
    order: 0,
  },
  {
    slug: "concepts/nova-ir",
    title: "Nova Intermediate Representation (Nova IR)",
    shortTitle: "Nova IR",
    description: "The provider-neutral intermediate representation schema, state hashing mechanism, and JSON specification.",
    section: "Core Concepts",
    order: 1,
  },
  {
    slug: "concepts/providers",
    title: "Multi-Cloud Providers",
    shortTitle: "Providers",
    description: "NovaServe's provider abstraction layer mapping primitives to AWS, Cloudflare, Docker, and GCP resources.",
    section: "Core Concepts",
    order: 2,
  },
  {
    slug: "concepts/state",
    title: "State Locking & Drift Detection",
    shortTitle: "State & Drift",
    description: "SHA-256 state locking, deployment integrity verification, and drift remediation with nova drift.",
    section: "Core Concepts",
    order: 3,
  },

  // ── CLI Reference ────────────────────────────────────────────────
  {
    slug: "cli",
    title: "CLI Reference",
    shortTitle: "Overview",
    description: "Complete reference for the NovaServe CLI binary — all commands, global flags, and environment variables.",
    section: "CLI Reference",
    order: 0,
  },
  {
    slug: "cli/init",
    title: "nova init — Scaffold a Project",
    shortTitle: "nova init",
    description: "Initialize a new NovaServe TypeScript project from pre-configured templates.",
    section: "CLI Reference",
    order: 1,
  },
  {
    slug: "cli/dev",
    title: "nova dev — Local Development",
    shortTitle: "nova dev",
    description: "Start the sub-200ms local emulator sandbox with hot reloading for NovaServe projects.",
    section: "CLI Reference",
    order: 2,
  },
  {
    slug: "cli/compile",
    title: "nova compile — AST Compilation",
    shortTitle: "nova compile",
    description: "Perform static AST parsing, validate resource bindings, synthesize IAM policies, and serialize Nova IR.",
    section: "CLI Reference",
    order: 3,
  },
  {
    slug: "cli/plan",
    title: "nova plan — Preview Changes",
    shortTitle: "nova plan",
    description: "Preview deterministic infrastructure additions, updates, or deletions before deployment.",
    section: "CLI Reference",
    order: 4,
  },
  {
    slug: "cli/deploy",
    title: "nova deploy — Deploy to Cloud",
    shortTitle: "nova deploy",
    description: "Compile TypeScript AST, verify execution plan, provision cloud resources, and lock state.",
    section: "CLI Reference",
    order: 5,
  },
  {
    slug: "cli/drift",
    title: "nova drift — Detect & Fix Drift",
    shortTitle: "nova drift",
    description: "Audit live cloud resources against state lock hash and remediate manual console modifications.",
    section: "CLI Reference",
    order: 6,
  },

  // ── Reference ────────────────────────────────────────────────────
  {
    slug: "reference/configuration",
    title: "Configuration Reference (nova.config.ts)",
    shortTitle: "Configuration",
    description: "Complete reference for all nova.config.ts options including compiler, AWS, Cloudflare, and state settings.",
    section: "Reference",
    order: 0,
  },
  {
    slug: "reference/api",
    title: "Resource API Reference",
    shortTitle: "API Reference",
    description: "Authoritative API reference for defineApp(), api, storage(), and queue() primitives from the novaserve package.",
    section: "Reference",
    order: 1,
  },
  {
    slug: "reference/errors",
    title: "Error Code Reference",
    shortTitle: "Error Codes",
    description: "Catalog of NovaServe compiler error codes with causes, fixes, and code examples.",
    section: "Reference",
    order: 2,
  },
  {
    slug: "reference/environment-variables",
    title: "Environment Variables",
    shortTitle: "Environment Variables",
    description: "All environment variables used by the NovaServe CLI and runtime including NOVA_ENV and NOVA_TARGET.",
    section: "Reference",
    order: 3,
  },

  // ── Guides ───────────────────────────────────────────────────────
  {
    slug: "guides/serverless-api",
    title: "Build a Serverless REST API",
    shortTitle: "Serverless API",
    description: "Step-by-step guide to building a production-ready serverless REST API with storage and queues.",
    section: "Guides",
    order: 0,
  },
  {
    slug: "guides/configuration",
    title: "Configuration & Environment Setup",
    shortTitle: "Configuration Guide",
    description: "Configure NovaServe build targets, cloud regions, environment variables, and provider-specific settings.",
    section: "Guides",
    order: 1,
  },

  // ── Architecture ─────────────────────────────────────────────────
  {
    slug: "architecture/overview",
    title: "System Architecture Overview",
    shortTitle: "Architecture",
    description: "Deep technical documentation of NovaServe's system architecture, execution primitives, and integration model.",
    section: "Architecture",
    order: 0,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Group pages into ordered sections for sidebar rendering */
export function getDocSections(): DocSection[] {
  const sectionOrder = [
    "Getting Started",
    "Core Concepts",
    "CLI Reference",
    "Reference",
    "Guides",
    "Architecture",
  ];

  const grouped = new Map<string, DocPage[]>();
  for (const page of DOC_PAGES) {
    const list = grouped.get(page.section) || [];
    list.push(page);
    grouped.set(page.section, list);
  }

  return sectionOrder
    .filter((s) => grouped.has(s))
    .map((title) => ({
      title,
      pages: grouped.get(title)!.sort((a, b) => a.order - b.order),
    }));
}

/** Flat ordered list of all pages for prev/next computation */
export function getFlatDocPages(): DocPage[] {
  return getDocSections().flatMap((s) => s.pages);
}

/** Get the previous page relative to `slug` */
export function getPrevPage(slug: string): DocPage | null {
  const flat = getFlatDocPages();
  const idx = flat.findIndex((p) => p.slug === slug);
  return idx > 0 ? flat[idx - 1] : null;
}

/** Get the next page relative to `slug` */
export function getNextPage(slug: string): DocPage | null {
  const flat = getFlatDocPages();
  const idx = flat.findIndex((p) => p.slug === slug);
  return idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
}

/** Find a page by slug */
export function getDocPage(slug: string): DocPage | undefined {
  return DOC_PAGES.find((p) => p.slug === slug);
}

/** Generate search index from all pages */
export function getSearchIndex(): SearchResult[] {
  return DOC_PAGES.map((p) => ({
    title: p.title,
    shortTitle: p.shortTitle,
    slug: p.slug,
    section: p.section,
    description: p.description,
  }));
}
