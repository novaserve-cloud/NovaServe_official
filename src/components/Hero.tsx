"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Copy, Check, Terminal, Sparkles, ShieldCheck, Zap, Github } from "lucide-react";
import { motion } from "framer-motion";
import { HeroPipeline } from "./HeroPipeline";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const cliCommand = "npx novaserve@latest init";

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[90vh] pt-36 pb-20 flex items-center justify-center overflow-hidden bg-white selection:bg-[#FFB020]/40 selection:text-black">
      {/* Ambient background glow & grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#FFB020]/15 via-amber-400/10 to-transparent blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

      <div className="max-w-[1550px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Prop with Motion */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Shimmering Pill Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link 
                href="/docs" 
                className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/50 hover:border-[#FFB020] transition-all cursor-pointer group shadow-xs backdrop-blur-md"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB020] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB020]"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-black text-amber-900 tracking-wider uppercase">
                  v2.1.10 Released:
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-semibold text-gray-700 tracking-wider">
                  Compiler Engine & Local Emulator
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>

            {/* Main Hero Tagline & Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.06]">
                <span className="text-[#FFB020] block drop-shadow-xs">Build Serverless.</span>
                <span className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Compile to the Cloud.
                </span>
              </h1>
              <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-mono text-amber-800 bg-amber-100/60 px-3 py-1 rounded-lg font-extrabold uppercase tracking-wide border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB020]" />
                <span>The TypeScript-Native Serverless Framework</span>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl font-medium leading-relaxed pt-1">
                Build, develop, plan, and deploy fullstack serverless applications with TypeScript—powered by a compiler-driven infrastructure engine with sub-second AST analysis and zero-drift state guarantees.
              </p>
            </div>

            {/* Interactive CTAs & CLI quick copy */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/docs"
                    prefetch={true}
                    className="px-6 py-3.5 rounded-xl bg-[#FFB020] hover:bg-[#FFC44D] text-black font-bold text-base shadow-lg hover:shadow-[#FFB020]/25 transition-all flex items-center space-x-2 group cursor-pointer border border-amber-300/60"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a
                    href="https://github.com/novaserve-cloud/novaserve"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold text-base transition-all cursor-pointer shadow-md flex items-center space-x-2 border border-gray-800"
                  >
                    <Github className="w-4 h-4 text-white" />
                    <span>Star on GitHub</span>
                    <span className="ml-1.5 px-2 py-0.5 rounded-md bg-gray-800 text-xs text-amber-300 font-mono font-bold">
                      v2.1.10
                    </span>
                  </a>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/signin"
                    prefetch={true}
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold text-base transition-all cursor-pointer shadow-xs hover:border-gray-400 flex items-center space-x-1.5"
                  >
                    <span>Sign In</span>
                  </Link>
                </motion.div>
              </div>

              {/* Interactive Copy CLI Pill */}
              <div className="pt-2">
                <div 
                  onClick={handleCopy}
                  className="inline-flex items-center space-x-3 px-4 py-2 rounded-xl bg-gray-950 text-white font-mono text-xs border border-gray-800 hover:border-[#FFB020] transition-all cursor-pointer shadow-md group"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#FFB020]" />
                  <span className="text-gray-400 font-bold">$</span>
                  <span className="text-gray-200 font-semibold">{cliCommand}</span>
                  <div className="pl-2 border-l border-gray-800 flex items-center space-x-1.5 text-gray-400 group-hover:text-amber-400">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
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
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono font-bold text-gray-600 border-t border-gray-100">
              <span className="flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FFB020]" />
                <span className="text-gray-900">0.38s</span> Incremental AST Compile
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-gray-900">100%</span> Zero-Drift Verified
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-900">Multi-Cloud</span> (AWS, Cloudflare, Docker)
              </span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Code Visualizer & Pipeline Simulator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <HeroPipeline />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
