"use client";

import { ArrowRight, Layers, ShieldAlert, Cpu, Sparkles, Check, X, ShieldCheck, Zap, Lock, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function WhatIsNovaServe() {
  return (
    <section className="py-24 bg-white relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-[1550px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>PARADIGM SHIFT IN IaC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            What makes NovaServe fundamentally different?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            Legacy IaC tools deploy disconnected cloud resources. NovaServe compiles entire application architectures into deterministic cloud plans.
          </p>
        </div>

        {/* 21st.dev style Side-by-side Bento Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legacy IaC Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-slate-50/90 border border-gray-200/90 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-red-100/80 border border-red-200 text-red-700">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Traditional IaC</h3>
                    <span className="text-xs text-gray-500 font-mono">Terraform / HCL / Manual CDK</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-mono font-bold">
                  FRAGMENTED
                </span>
              </div>

              {/* Technical Code Diff preview */}
              <div className="p-4 rounded-2xl bg-gray-900 text-white font-mono text-xs space-y-1.5 shadow-inner">
                <div className="text-gray-500 text-[10px] uppercase font-bold"># Disconnected Infrastructure Definition</div>
                <div className="text-red-400 font-semibold">- resource &quot;aws_iam_role_policy&quot; &quot;manual_drift&quot; &#123;</div>
                <div className="text-red-300 font-normal pl-4"># Risk: Wildcard permissions &quot;*&quot;</div>
                <div className="text-red-400 font-semibold">&#125;</div>
              </div>

              <ul className="space-y-3.5 text-sm font-sans text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <span className="font-medium">Decoupled application logic from cloud infrastructure definitions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <span className="font-medium">Manual IAM policy writing & accidental credential leak risks</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <span className="font-medium">State drift & lock-in to single hyperscaler API formats</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <span className="font-medium">Slow 15+ minute CI/CD plan & apply pipeline cycles</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs font-mono text-gray-500">
              <span>Status: Developer Overhead High</span>
              <span className="text-red-600 font-bold">Prone to Drift</span>
            </div>
          </motion.div>

          {/* NovaServe Modern Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white border-2 border-[#FFB020] shadow-xl space-y-6 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 shadow-xs">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">NovaServe Compiler</h3>
                    <span className="text-xs text-amber-900 font-mono font-extrabold">Unified TypeScript AST</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFB020] text-black text-xs font-mono font-black shadow-xs">
                  MODERN PLATFORM
                </span>
              </div>

              {/* Technical Code Output preview */}
              <div className="p-4 rounded-2xl bg-[#0B0A10] text-white font-mono text-xs space-y-1.5 shadow-inner border border-gray-800">
                <div className="text-amber-400 text-[10px] uppercase font-bold"># Pure TypeScript Application AST</div>
                <div className="text-emerald-400 font-semibold">+ const db = new Postgres(&quot;main&quot;); // IAM auto-synthesized</div>
                <div className="text-amber-300 font-normal pl-4">✓ Nova IR 1.0.0 Target Plan (0.38s)</div>
              </div>

              <ul className="space-y-3.5 text-sm font-sans text-gray-900">
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <span className="font-bold">Application code & infrastructure declared in single TypeScript file</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <span className="font-bold">Automated Zero-Trust IAM policy inference during compilation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <span className="font-bold">Multi-cloud targeting (AWS, Cloudflare, Docker, GCP, Azure)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <span className="font-bold">Sub-second incremental compilation with instant local sandbox</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-gray-600 relative z-10">
              <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Deterministic Execution</span>
              </span>
              <span className="text-amber-800 font-black">Zero-Drift Verified</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
