import Link from "next/link";
import {
  BookOpen,
  Terminal,
  Cpu,
  FileText,
  Compass,
  Layers,
  ArrowRight,
  Zap,
  Package,
  Github,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Documentation — Serverless Application Framework",
  description:
    "Complete documentation for NovaServe — the TypeScript-native serverless framework. Get started, CLI reference, guides, architecture, and API documentation.",
  path: "/docs",
});

/* ------------------------------------------------------------------ */
/*  Quick Link Card                                                    */
/* ------------------------------------------------------------------ */

function QuickCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:border-[#FFB020] hover:shadow-lg dark:hover:shadow-amber-900/10 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group-hover:border-amber-300 dark:group-hover:border-amber-600 transition-colors shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
            {title}
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DocsLandingPage() {
  return (
    <div className="lg:col-span-9 space-y-10">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 font-bold">
            v2.1.10
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 font-bold">
            OPEN SOURCE
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
          NovaServe Documentation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
          Learn how to build, deploy, and scale serverless applications with
          NovaServe — the TypeScript-native framework with compiler-driven
          infrastructure.
        </p>

        {/* Install Command */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="px-4 py-2.5 rounded-xl bg-[#0D1117] border border-gray-800 text-sm font-mono font-bold text-gray-200 flex items-center gap-3">
            <span className="text-gray-500">$</span>
            <span className="text-[#FFB020]">npm install -g novaserve</span>
          </div>
          <Link
            href="/docs/quickstart"
            className="px-4 py-2.5 rounded-xl bg-[#FFB020] hover:bg-[#FFC44D] text-black font-bold text-sm transition-all flex items-center gap-2 shadow-md"
          >
            <Zap className="w-4 h-4" />
            Quick Start
          </Link>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickCard
          icon={<BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          title="Getting Started"
          description="Install NovaServe, create your first project, and deploy a serverless function in 5 minutes."
          href="/docs/getting-started"
        />
        <QuickCard
          icon={<Terminal className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
          title="CLI Reference"
          description="Complete reference for nova init, nova dev, nova deploy, and all CLI commands."
          href="/docs/cli"
        />
        <QuickCard
          icon={<Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          title="Core Concepts"
          description="Understand the compiler pipeline, Nova IR, providers, and state management."
          href="/docs/concepts/compiler"
        />
        <QuickCard
          icon={<FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          title="Configuration Reference"
          description="All nova.config.ts options for compiler, AWS, Cloudflare, and state backend settings."
          href="/docs/reference/configuration"
        />
        <QuickCard
          icon={<Compass className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
          title="Guides"
          description="Step-by-step guides for building serverless APIs, configuring environments, and deploying."
          href="/docs/guides/serverless-api"
        />
        <QuickCard
          icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          title="Architecture"
          description="Deep technical documentation of system architecture, AST parsing, and provider drivers."
          href="/docs/architecture/overview"
        />
      </div>

      {/* Resource API Overview Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Resource Primitives
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          NovaServe provides type-safe primitives for declaring cloud infrastructure directly in your TypeScript code.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-mono uppercase text-xs font-bold">
              <tr>
                <th className="p-3">Primitive</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">AWS Target</th>
                <th className="p-3 hidden sm:table-cell">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
                  defineApp()
                </td>
                <td className="p-3">Initialize application container</td>
                <td className="p-3 text-xs text-gray-500 dark:text-gray-400">—</td>
                <td className="p-3 hidden sm:table-cell">
                  <Link href="/docs/reference/api" className="text-amber-700 dark:text-amber-400 underline text-xs">
                    API Ref →
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
                  api.get() / api.post()
                </td>
                <td className="p-3">HTTP route handlers</td>
                <td className="p-3 text-xs text-gray-500 dark:text-gray-400">API Gateway + Lambda</td>
                <td className="p-3 hidden sm:table-cell">
                  <Link href="/docs/reference/api" className="text-amber-700 dark:text-amber-400 underline text-xs">
                    API Ref →
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
                  storage()
                </td>
                <td className="p-3">Object storage buckets</td>
                <td className="p-3 text-xs text-gray-500 dark:text-gray-400">Amazon S3</td>
                <td className="p-3 hidden sm:table-cell">
                  <Link href="/docs/reference/api" className="text-amber-700 dark:text-amber-400 underline text-xs">
                    API Ref →
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
                  queue()
                </td>
                <td className="p-3">Message queues</td>
                <td className="p-3 text-xs text-gray-500 dark:text-gray-400">Amazon SQS</td>
                <td className="p-3 hidden sm:table-cell">
                  <Link href="/docs/reference/api" className="text-amber-700 dark:text-amber-400 underline text-xs">
                    API Ref →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Open Source Links */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <a
          href="https://www.npmjs.com/package/novaserve"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono font-bold text-gray-700 dark:text-gray-300 hover:border-[#FFB020] transition-all"
        >
          <Package className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          npm: novaserve@2.1.10
        </a>
        <a
          href="https://github.com/MustakimShaikh01/Nova-Serve-offical"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono font-bold text-gray-700 dark:text-gray-300 hover:border-[#FFB020] transition-all"
        >
          <Github className="w-4 h-4" />
          View on GitHub
        </a>
      </div>
    </div>
  );
}
