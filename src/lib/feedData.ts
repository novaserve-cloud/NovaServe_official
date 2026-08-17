export interface NovaFeedItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  description: string;
  category: string;
  badgeText?: string;
}

export const novaFeedData: NovaFeedItem[] = [
  {
    id: "nova-v2-1-6-release",
    title: "NovaServe v2.1.10 Released: Full Production Architecture & NPM Core Package",
    link: "/changelog",
    pubDate: "Sat, 15 Aug 2026 12:00:00 GMT",
    creator: "Mustakim Shaikh & Md Shadab Azam Ansari",
    description: "Official release of novaserve@2.1.10 to NPM registry with deterministic SHA-256 state verification, automated least-privilege IAM policy generation, and local Hono emulator support.",
    category: "RELEASE ANNOUNCEMENT",
    badgeText: "v2.1.10",
  },
  {
    id: "compiling-infrastructure-ast-vs-hcl",
    title: "Why Compiling Infrastructure from TypeScript AST Outperforms HCL & Raw YAML",
    link: "/blog",
    pubDate: "Fri, 14 Aug 2026 09:30:00 GMT",
    creator: "Md Shadab Azam Ansari, Lead Compiler Architect",
    description: "An in-depth analysis of static AST analysis versus imperative cloud API scripting. Discover how NovaServe extracts least-privilege IAM policies, detects missing env bindings at build time, and eliminates runtime provisioning surprises.",
    category: "COMPILER ARCHITECTURE",
    badgeText: "DEEP DIVE",
  },
  {
    id: "multi-cloud-sharding-aws-cloudflare-gcp",
    title: "Zero-Latency Multi-Cloud Sharding: Combining AWS Lambdas with Cloudflare Edge KV",
    link: "/blog",
    pubDate: "Mon, 10 Aug 2026 14:15:00 GMT",
    creator: "Mustakim Shaikh, Co-Maintainer & Open Source Core Contributor",
    description: "How NovaServe routes latency-sensitive read operations to 320+ Cloudflare Edge PoPs while keeping heavy compute workloads running on AWS Arm64 Graviton instances.",
    category: "MULTI-CLOUD ENGINE",
    badgeText: "ARCHITECTURE",
  },
  {
    id: "automated-iam-least-privilege-generation",
    title: "Automated Least-Privilege IAM: Eliminating Wildcard Permissions Forever",
    link: "/blog",
    pubDate: "Sun, 02 Aug 2026 11:00:00 GMT",
    creator: "Md Shadab Azam Ansari, Lead Compiler Architect",
    description: "One of the most common causes of cloud security breaches is wildcard IAM policies ('s3:*', 'dynamodb:*'). NovaServe analyzes TypeScript API method invocations and generates granular IAM policy JSON with exact ARN scoping.",
    category: "SECURITY & COMPLIANCE",
    badgeText: "SECURITY",
  },
  {
    id: "sub-second-local-emulation-hono-dev-sandbox",
    title: "Sub-Second Local Emulation: Developing Cloud Apps at the Speed of Light",
    link: "/blog",
    pubDate: "Fri, 24 Jul 2026 16:45:00 GMT",
    creator: "Mustakim Shaikh, Co-Maintainer & Open Source Core Contributor",
    description: "Why waiting 10 minutes for cloud deployment pipelines kills developer velocity, and how `nova dev` emulates AWS SQS, S3, and API Gateway locally in under 200ms.",
    category: "DEVELOPER EXPERIENCE",
    badgeText: "TOOLING",
  },
];
