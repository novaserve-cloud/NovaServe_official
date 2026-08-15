"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, FileText, Terminal, BookOpen, Cpu, X } from "lucide-react";
import { getSearchIndex } from "@/lib/docs";
import type { SearchResult } from "@/lib/docs";

/* ------------------------------------------------------------------ */
/*  Section icon mapper                                                */
/* ------------------------------------------------------------------ */

function SectionIcon({ section }: { section: string }) {
  switch (section) {
    case "CLI Reference":
      return <Terminal className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
    case "Core Concepts":
      return <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
    case "Architecture":
      return <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />;
    case "Getting Started":
      return <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
    default:
      return <FileText className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DocSearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const index = getSearchIndex();

  // Filter results
  const results: SearchResult[] = query.trim()
    ? index.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase()) ||
          r.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
          r.section.toLowerCase().includes(query.toLowerCase()) ||
          r.slug.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIdx(0);
    }
  }, [open]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIdx(0);
  }, [results.length]);

  const navigate = useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(`/docs/${slug}`);
    },
    [router]
  );

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIdx]) {
      navigate(results[selectedIdx].slug);
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-[#FFB020] shadow-sm transition-all cursor-pointer"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search docs…</span>
        <kbd className="hidden sm:inline bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-1.5 py-0.5 rounded text-[10px] text-gray-600 dark:text-gray-400 font-mono font-bold">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input */}
            <div className="relative border-b border-gray-200 dark:border-gray-700">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-12 py-4 bg-transparent text-sm text-gray-900 dark:text-gray-100 font-mono font-semibold focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-mono font-bold text-gray-500 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {query.trim() && results.length === 0 && (
                <div className="text-center py-10 text-sm text-gray-500 dark:text-gray-400 font-mono">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}

              {!query.trim() && (
                <div className="text-center py-10 text-sm text-gray-400 dark:text-gray-500 font-mono">
                  Type to search across all documentation pages
                </div>
              )}

              {results.map((result, i) => (
                <button
                  key={result.slug}
                  onClick={() => navigate(result.slug)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                    i === selectedIdx
                      ? "bg-amber-50 dark:bg-amber-950/40 border border-[#FFB020]"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                  }`}
                >
                  <div className="mt-0.5">
                    <SectionIcon section={result.section} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                        {result.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded shrink-0">
                        {result.section}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                  {i === selectedIdx && (
                    <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-[11px] font-mono text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
              </div>
              <span>ESC Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
