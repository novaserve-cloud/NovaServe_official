"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Heart, Package, Github, X, Menu } from "lucide-react";
import { getDocSections } from "@/lib/docs";
import type { DocSection } from "@/lib/docs";

/* ------------------------------------------------------------------ */
/*  Desktop Sidebar                                                    */
/* ------------------------------------------------------------------ */

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const sections: DocSection[] = getDocSections();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isActive = (slug: string) => pathname === `/docs/${slug}`;

  return (
    <div className="space-y-5 font-mono text-sm">
      {sections.map((section) => {
        const isCollapsed = collapsed[section.title];
        const hasActive = section.pages.some((p) => isActive(p.slug));

        return (
          <div key={section.title} className="space-y-1">
            {/* Section Header */}
            <button
              onClick={() => toggle(section.title)}
              className="flex items-center justify-between w-full px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              <span>{section.title}</span>
              <ChevronRight
                className={`w-3 h-3 transition-transform duration-200 ${
                  isCollapsed ? "" : "rotate-90"
                }`}
              />
            </button>

            {/* Section Pages */}
            {!isCollapsed && (
              <div className="space-y-0.5">
                {section.pages.map((page) => {
                  const active = isActive(page.slug);
                  return (
                    <Link
                      key={page.slug}
                      href={`/docs/${page.slug}`}
                      onClick={onNavigate}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono transition-all truncate ${
                        active
                          ? "bg-[#FFB020] text-black font-extrabold shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200/70 dark:hover:bg-gray-700/50 font-semibold"
                      }`}
                    >
                      {page.shortTitle}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Open Source Badge */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1.5">
          <div className="text-xs font-black text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Open source &amp; free.</span>
          </div>
          <p className="text-[11px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            Apache-2.0 license. Free for individual developers.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 text-xs font-mono font-semibold">
          <a
            href="https://www.npmjs.com/package/novaserve"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
          >
            <Package className="w-3.5 h-3.5 text-amber-700 dark:text-amber-500 shrink-0" />
            <span>npm: novaserve</span>
          </a>
          <a
            href="https://github.com/MustakimShaikh01/Nova-Serve-offical"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-gray-900 dark:text-gray-300 shrink-0" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop Sidebar Wrapper                                            */
/* ------------------------------------------------------------------ */

export function DocSidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="bg-gray-50/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto">
        <SidebarContent />
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Sidebar Drawer                                              */
/* ------------------------------------------------------------------ */

export function MobileDocNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-mono font-bold text-gray-800 dark:text-gray-200 cursor-pointer"
        aria-label="Open documentation menu"
      >
        <Menu className="w-4 h-4" />
        <span>Menu</span>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-5 overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100">
                Documentation
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
