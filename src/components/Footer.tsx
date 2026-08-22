"use client";

import Link from "next/link";
import { Github, Twitter, Disc as Discord, Sparkles, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { DiamondIcon } from "./Icons";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RevealText } from "@/components/ui/reveal-text";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#07060A] border-t border-gray-200 dark:border-[#1F1B30] pt-16 pb-12 relative overflow-hidden text-gray-900 dark:text-gray-100 selection:bg-[#FFB020]/40 selection:text-black">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#FFB020]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-gray-200 dark:border-[#1F1B30]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" prefetch={true} className="inline-flex items-center space-x-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-[#FFB020] p-1 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center text-black">
                <DiamondIcon size={20} />
              </div>
              <RevealText
                text="NovaServe"
                textColor="text-black dark:text-white"
                overlayColor="text-[#FFB020]"
                fontSize="text-2xl"
                letterDelay={0.04}
                overlayDelay={0.03}
              />
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold leading-relaxed max-w-sm font-sans">
              The modern open-source TypeScript compiler framework for building, developing, planning, and deploying cloud applications with zero-drift state guarantees.
            </p>

            <div className="pt-2 space-y-4">
              <Link href="/docs" prefetch={true} className="inline-block">
                <InteractiveHoverButton text="Start Building Free" className="px-5 py-2 text-xs font-black" />
              </Link>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href="https://github.com/novaserve-cloud/novaserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-[#12101F] border border-gray-200 dark:border-[#26213F] text-xs font-mono font-bold text-gray-900 dark:text-gray-200 hover:border-[#FFB020] hover:text-amber-600 transition-colors cursor-pointer shadow-xs"
                >
                  <Github className="w-4 h-4 text-gray-900 dark:text-white" />
                  <span>novaserve-cloud</span>
                </a>
                <a
                  href="https://twitter.com/novaserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-gray-50 dark:bg-[#12101F] border border-gray-200 dark:border-[#26213F] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:border-[#FFB020] transition-colors cursor-pointer"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.gg/novaserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-gray-50 dark:bg-[#12101F] border border-gray-200 dark:border-[#26213F] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:border-[#FFB020] transition-colors cursor-pointer"
                  aria-label="Discord"
                >
                  <Discord className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono font-black tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020]" />
              <span>Product</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 font-semibold font-sans">
              <li><Link href="/docs" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Documentation</Link></li>
              <li><Link href="/architecture" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Compiler Engine</Link></li>
              <li><Link href="/#playground" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Interactive Playground</Link></li>
              <li><Link href="/pricing" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Pricing &amp; Cost Engine</Link></li>
              <li><Link href="/examples" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Starter Stacks</Link></li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono font-black tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Ecosystem</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 font-semibold font-sans">
              <li><Link href="/providers" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">AWS Provider</Link></li>
              <li><Link href="/providers" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Cloudflare Edge</Link></li>
              <li><Link href="/providers" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Docker OCI Engine</Link></li>
              <li><Link href="/comparison" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">NovaServe vs Pulumi</Link></li>
              <li><Link href="/comparison" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">NovaServe vs Terraform</Link></li>
            </ul>
          </div>

          {/* Column 3: Company & Community */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono font-black tracking-wider text-gray-900 dark:text-white flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Company &amp; Community</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 font-semibold font-sans">
              <li><Link href="/wall-of-fame" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer font-bold text-amber-800 dark:text-amber-300 block">🏆 Wall of Fame</Link></li>
              <li><Link href="/contribute" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Open Source Contribute</Link></li>
              <li><Link href="/blog" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Engineering Blog</Link></li>
              <li><Link href="/roadmap" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Product Roadmap</Link></li>
              <li><Link href="/changelog" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Changelog</Link></li>
              <li><Link href="/security" prefetch={true} className="hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer block">Security &amp; IAM Audit</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & operational status */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 dark:text-gray-400 font-semibold font-sans">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} NovaServe Open Source. Apache 2.0 License.</span>
            <span>•</span>
            <Link href="/privacy" prefetch={true} className="hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" prefetch={true} className="hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer">Terms of Service</Link>
            <span>•</span>
            <span>
              Built by{" "}
              <a
                href="https://md-shadab-azam-ansari.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-gray-200 hover:text-amber-600 dark:hover:text-[#FFB020] transition-colors underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-[#FFB020]"
              >
                Md Shadab Azam Ansari
              </a>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] font-bold">All Systems Operational (99.999%)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

