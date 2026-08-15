import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
} from "lucide-react";
import type { DocPage as DocPageMeta } from "@/lib/docs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TocItem {
  id: string;
  label: string;
  level?: number;
}

interface DocPageProps {
  meta: DocPageMeta;
  toc?: TocItem[];
  prev: DocPageMeta | null;
  next: DocPageMeta | null;
  children: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DocPageLayout({ meta, toc, prev, next, children }: DocPageProps) {
  // Build breadcrumb segments from slug
  const slugParts = meta.slug.split("/");
  const breadcrumbs = [
    { label: "Docs", href: "/docs" },
    ...slugParts.slice(0, -1).map((part, i) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: `/docs/${slugParts.slice(0, i + 1).join("/")}`,
    })),
    { label: meta.shortTitle, href: null },
  ];

  return (
    <div className="lg:col-span-6 min-w-0">
      <article className="space-y-8">
        {/* ── Breadcrumbs ─────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-mono font-semibold text-gray-500 dark:text-gray-400"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-500" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100 font-bold truncate">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* ── Header ──────────────────────────────────────────── */}
        <header className="space-y-3 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 font-bold">
              {meta.section}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
            {meta.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl">
            {meta.description}
          </p>
        </header>

        {/* ── Content ─────────────────────────────────────────── */}
        <div className="doc-content space-y-6 text-[15px] text-gray-800 dark:text-gray-200 leading-relaxed">
          {children}
        </div>

        {/* ── Previous / Next ─────────────────────────────────── */}
        <nav className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-stretch justify-between gap-4">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#FFB020] hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all group"
            >
              <div className="text-[11px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Previous
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                {prev.shortTitle}
              </div>
            </Link>
          ) : (
            <div className="flex-1 min-w-[200px]" />
          )}

          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white transition-all group text-right"
            >
              <div className="text-[11px] font-mono font-bold text-gray-400 uppercase mb-1 flex items-center justify-end gap-1">
                Next <ArrowRight className="w-3 h-3" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {next.shortTitle}
              </div>
            </Link>
          ) : (
            <div className="flex-1 min-w-[200px]" />
          )}
        </nav>

        {/* ── Footer meta ─────────────────────────────────────── */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
          <a
            href={`https://github.com/MustakimShaikh01/Nova-Serve-offical/edit/main/src/app/docs/${meta.slug}/page.tsx`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1.5 font-semibold transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Edit this page on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table of Contents (Right Sidebar)                                  */
/* ------------------------------------------------------------------ */

export function DocToc({ items }: { items: TocItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm sticky top-32 space-y-3">
        <div className="text-[11px] font-mono uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
          On this page
        </div>
        <nav className="space-y-0.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-xs font-mono font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/40 p-1.5 rounded-md transition-all truncate ${
                (item.level ?? 2) > 2 ? "pl-4" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
