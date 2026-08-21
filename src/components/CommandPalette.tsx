"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Terminal,
  FileText,
  Boxes,
  Cpu,
  Zap,
  BarChart3,
  DollarSign,
  ShieldCheck,
  Github,
  BookOpen,
  Map,
  X,
  ArrowRight,
  Sparkles,
  Trophy,
  Activity,
  Layers,
} from "lucide-react";
import { getSearchIndex } from "@/lib/docs";

interface CommandItem {
  id: string;
  title: string;
  category: "Pages" | "Documentation" | "CLI Commands" | "Ecosystem" | "Community";
  href?: string;
  action?: () => void;
  icon: React.ReactNode;
  shortcut?: string;
  description?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Open / close keyboard shortcuts and custom event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    window.addEventListener("open-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
      window.removeEventListener("open-search", handleCustomOpen);
    };
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    }
  }, [open]);

  // Combine static routes, CLI commands, and all Docs search items
  const allItems: CommandItem[] = useMemo(() => {
    const baseItems: CommandItem[] = [
      { id: "home", title: "Home / Platform Overview", category: "Pages", href: "/", icon: <Zap className="w-4 h-4 text-[#FFB020]" />, description: "TypeScript-Native Serverless Framework" },
      { id: "docs-hub", title: "Documentation Hub", category: "Documentation", href: "/docs", icon: <BookOpen className="w-4 h-4 text-emerald-400" />, description: "Guides, CLI reference, and API specs" },
      { id: "architecture", title: "System Architecture & Compiler Engine", category: "Pages", href: "/architecture", icon: <Cpu className="w-4 h-4 text-blue-400" />, description: "AST parser, IR 1.0.0, and state engine" },
      { id: "pricing", title: "Pricing Tiers & Cost Estimator", category: "Pages", href: "/pricing", icon: <DollarSign className="w-4 h-4 text-[#FFB020]" />, description: "Zero-markup cloud pricing plans" },
      { id: "examples", title: "Starter Stacks & Templates", category: "Pages", href: "/examples", icon: <Boxes className="w-4 h-4 text-purple-400" />, description: "Fullstack Next.js, FastAPI, Vector API stacks" },
      { id: "providers", title: "Multi-Cloud Provider Matrix", category: "Ecosystem", href: "/providers", icon: <Layers className="w-4 h-4 text-emerald-400" />, description: "Native AWS, Cloudflare, and Docker adapters" },
      { id: "comparison", title: "NovaServe vs Terraform & Pulumi", category: "Ecosystem", href: "/comparison", icon: <BarChart3 className="w-4 h-4 text-cyan-400" />, description: "Performance benchmarks & compilation diffs" },
      { id: "wall-of-fame", title: "🏆 Wall of Fame & Contributors", category: "Community", href: "/wall-of-fame", icon: <Trophy className="w-4 h-4 text-[#FFB020]" />, description: "Meet core maintainers and claim good first issues" },
      { id: "blog", title: "Engineering Blog", category: "Community", href: "/blog", icon: <FileText className="w-4 h-4 text-indigo-400" />, description: "Deep dives on compiler design & cloud architecture" },
      { id: "roadmap", title: "Interactive Product Roadmap", category: "Community", href: "/roadmap", icon: <Map className="w-4 h-4 text-amber-400" />, description: "Upcoming features and releases" },
      { id: "changelog", title: "Changelog & Release Notes (v2.1.10)", category: "Community", href: "/changelog", icon: <Sparkles className="w-4 h-4 text-emerald-400" />, description: "Recent updates and improvements" },
      { id: "security", title: "Enterprise Security & IAM Audit", category: "Pages", href: "/security", icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, description: "Zero-trust IAM generation & CSP audit" },
      { id: "signin", title: "Sign In / Developer Account", category: "Pages", href: "/signin", icon: <Zap className="w-4 h-4 text-[#FFB020]" />, description: "Access your cloud dashboard" },

      // CLI Commands
      { id: "cmd-init", title: "npx novaserve@latest init", category: "CLI Commands", icon: <Terminal className="w-4 h-4 text-[#FFB020]" />, shortcut: "CLI", description: "Bootstrap a new fullstack TypeScript cloud project", action: () => { navigator.clipboard.writeText("npx novaserve@latest init"); router.push("/docs/cli/init"); } },
      { id: "cmd-dev", title: "nova dev --local", category: "CLI Commands", icon: <Terminal className="w-4 h-4 text-emerald-400" />, shortcut: "CLI", description: "Start the local zero-config serverless emulator", action: () => { navigator.clipboard.writeText("nova dev --local"); router.push("/docs/cli/dev"); } },
      { id: "cmd-plan", title: "nova plan --diff", category: "CLI Commands", icon: <Terminal className="w-4 h-4 text-cyan-400" />, shortcut: "CLI", description: "Calculate deterministic IR state changes and monthly cost", action: () => { navigator.clipboard.writeText("nova plan --diff"); router.push("/docs/cli/plan"); } },
      { id: "cmd-deploy", title: "nova deploy --stage prod", category: "CLI Commands", icon: <Terminal className="w-4 h-4 text-purple-400" />, shortcut: "CLI", description: "Atomic journaled multi-cloud deployment", action: () => { navigator.clipboard.writeText("nova deploy --stage prod"); router.push("/docs/cli/deploy"); } },
    ];

    // Append all individual Doc search results
    try {
      const docIndex = getSearchIndex();
      const docItems: CommandItem[] = docIndex.map((doc) => ({
        id: `doc-${doc.slug}`,
        title: `${doc.title} (${doc.section})`,
        category: "Documentation",
        href: `/docs/${doc.slug}`,
        icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
        description: doc.description,
      }));
      return [...baseItems, ...docItems];
    } catch {
      return baseItems;
    }
  }, [router]);

  // Filter items by query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 12);
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }, [allItems, query]);

  const handleSelect = (item: CommandItem) => {
    setOpen(false);
    setQuery("");
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      item.action();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-[#0D0B14] border border-[#25203D] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-[#FFB020] rounded-full shadow-[0_0_20px_#FFB020]" />

        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[#25203D] bg-[#120F1D]">
          <Search className="w-5 h-5 text-[#FFB020] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, docs, guides, or CLI commands..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-base font-semibold"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 text-gray-400 hover:text-white mr-2 text-xs font-bold cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-xl bg-[#1B182B] hover:bg-[#25203D] text-gray-400 hover:text-white transition-colors cursor-pointer border border-[#2E2849]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Filter Categories */}
        <div className="px-5 py-2.5 bg-[#0A0910] border-b border-[#1F1B30] flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-gray-500 font-bold">Filters:</span>
          {["All", "Pages", "Documentation", "CLI Commands", "Ecosystem"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setQuery(cat === "All" ? "" : cat);
                inputRef.current?.focus();
              }}
              className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                (cat === "All" && !query) || query.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#FFB020] text-black font-bold border-[#FFB020]"
                  : "bg-[#141122] text-gray-300 border-[#26213F] hover:border-gray-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[#181427]">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <p className="text-sm font-bold text-gray-300">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-gray-500">Try searching for &quot;quickstart&quot;, &quot;compiler&quot;, &quot;aws&quot;, or &quot;cli&quot;.</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all group cursor-pointer ${
                    isSelected
                      ? "bg-[#1D1933] border border-[#FFB020]/40 shadow-md"
                      : "hover:bg-[#141124] border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                    <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#FFB020]/20 border-[#FFB020]/60 text-[#FFB020]"
                        : "bg-[#141122] border-[#26213F] text-gray-300"
                    }`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-bold truncate transition-colors ${
                        isSelected ? "text-[#FFB020]" : "text-white"
                      }`}>
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-400 truncate mt-0.5 font-medium font-sans">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#120F1E] border border-[#231E38] text-gray-400">
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FFB020]/20 border border-[#FFB020]/40 text-[#FFB020] font-bold">
                        {item.shortcut}
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 transition-all ${
                      isSelected ? "opacity-100 translate-x-0.5 text-[#FFB020]" : "opacity-0"
                    }`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-[#08070D] border-t border-[#1F1B30] flex items-center justify-between text-xs text-gray-400 font-mono">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161324] border border-[#2B2544] text-[10px] text-gray-300">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161324] border border-[#2B2544] text-[10px] text-gray-300">↵</kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#161324] border border-[#2B2544] text-[10px] text-gray-300">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
          <div className="text-[#FFB020] font-bold text-[11px] hidden sm:inline">
            NovaServe Global Search
          </div>
        </div>
      </div>
    </div>
  );
}
