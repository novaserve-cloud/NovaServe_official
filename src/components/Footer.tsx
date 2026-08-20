import Link from "next/link";
import { Github, Twitter, Disc as Discord, Sparkles, Activity } from "lucide-react";
import { DiamondIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0A0A0B] border-t border-gray-200 dark:border-gray-800 pt-16 pb-12 relative overflow-hidden text-gray-900 dark:text-gray-100 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-200 dark:border-gray-800">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" prefetch={true} className="flex items-center space-x-3 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-[#FFB020] p-0.5 shadow-md">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-black">
                  <DiamondIcon size={18} />
                </div>
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-gray-100 tracking-tight">NovaServe</span>
            </Link>
            <p className="text-sm text-gray-600 font-semibold leading-relaxed max-w-sm">
              The modern open-source TypeScript compiler framework for building, developing, planning, and deploying cloud applications.
            </p>
            <div className="pt-2 space-y-3">
              <h3 className="text-sm font-bold text-gray-900 leading-tight">
                Open source under Apache 2.0. Free for developers.
              </h3>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://github.com/novaserve-cloud/novaserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-gray-900 hover:border-[#FFB020] hover:bg-[#FFB020] transition-colors cursor-pointer shadow-xs"
                >
                  <Github className="w-4 h-4 text-gray-900" />
                  <span>novaserve-cloud/novaserve</span>
                </a>
                <a
                  href="https://twitter.com/novaserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:text-black hover:border-[#FFB020] hover:bg-[#FFB020] transition-colors cursor-pointer"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.gg/novaserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:text-black hover:border-[#FFB020] hover:bg-[#FFB020] transition-colors cursor-pointer"
                  aria-label="Discord"
                >
                  <Discord className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-gray-900">Product</h4>
            <ul className="space-y-2.5 text-sm text-gray-600 font-semibold">
              <li><Link href="/docs" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Documentation</Link></li>
              <li><Link href="/architecture" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Compiler Engine</Link></li>
              <li><Link href="/#playground" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Interactive Playground</Link></li>
              <li><Link href="/pricing" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Pricing & Cost Engine</Link></li>
              <li><Link href="/examples" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Starter Stacks</Link></li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-gray-900">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm text-gray-600 font-semibold">
              <li><Link href="/providers" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">AWS Provider</Link></li>
              <li><Link href="/providers" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Cloudflare Edge</Link></li>
              <li><Link href="/providers" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Docker OCI Engine</Link></li>
              <li><Link href="/comparison" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">NovaServe vs Pulumi</Link></li>
              <li><Link href="/comparison" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">NovaServe vs Terraform</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources & Company */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-gray-900">Company & Community</h4>
            <ul className="space-y-2.5 text-sm text-gray-600 font-semibold">
              <li><Link href="/wall-of-fame" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer font-bold text-amber-900">🏆 Wall of Fame</Link></li>
              <li><Link href="/contribute" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Open Source Contribute</Link></li>
              <li><Link href="/blog" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Engineering Blog</Link></li>
              <li><Link href="/roadmap" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Product Roadmap</Link></li>
              <li><Link href="/changelog" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Changelog</Link></li>
              <li><Link href="/security" prefetch={true} className="hover:text-amber-700 transition-colors cursor-pointer">Security & IAM Audit</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & operational status */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 dark:text-gray-400 font-semibold">
          <div className="flex items-center space-x-3">
            <span>© {new Date().getFullYear()} NovaServe Open Source. Apache 2.0 License.</span>
            <span>•</span>
            <Link href="/privacy" prefetch={true} className="hover:text-amber-700 cursor-pointer">Privacy</Link>
            <span>•</span>
            <Link href="/terms" prefetch={true} className="hover:text-amber-700 cursor-pointer">Terms</Link>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-900 font-mono text-[11px] font-bold">All Systems Operational (99.999%)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
