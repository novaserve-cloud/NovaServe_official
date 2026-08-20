"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Copy, Check, Sparkles, Github } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  const [copied, setCopied] = useState(false);
  const command = "npm install -g @novaserve/cli && nova init";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-amber-400/20 via-[#FFB020]/15 to-orange-500/10 blur-3xl rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-10 sm:p-14 rounded-3xl bg-[#0C0B12] text-white border border-[#26223B] shadow-2xl text-center space-y-8 relative overflow-hidden font-mono"
        >
          {/* Top highlight pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1B182B] border border-[#2E2849] text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>START YOUR APPLICATION COMPILER</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight font-sans">
              Ready to compile your cloud application?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-sans font-medium leading-relaxed">
              Start building for free with the NovaServe open-source CLI or launch an enterprise multi-cloud team cluster in minutes.
            </p>
          </div>

          {/* CLI quick install block */}
          <div className="max-w-md mx-auto">
            <div 
              onClick={handleCopy}
              className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#161324] border border-[#2B2544] hover:border-[#FFB020] text-xs text-gray-200 transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <Terminal className="w-4 h-4 text-[#FFB020] shrink-0" />
                <span className="text-gray-400 font-bold">$</span>
                <span className="truncate text-amber-200 font-semibold">{command}</span>
              </div>
              <div className="pl-2 flex items-center space-x-1 text-gray-400 group-hover:text-amber-400 shrink-0">
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px] font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/docs"
                className="px-8 py-4 rounded-2xl bg-[#FFB020] hover:bg-[#FFC44D] text-black font-black text-sm shadow-xl hover:shadow-[#FFB020]/30 transition-all flex items-center space-x-2 cursor-pointer border border-amber-300/60"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="https://github.com/novaserve-cloud/novaserve"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl bg-[#1B182B] hover:bg-[#25203D] border border-[#2E2849] hover:border-gray-500 text-white font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
