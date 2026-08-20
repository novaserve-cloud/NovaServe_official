"use client";

import { Cpu, ShieldCheck, Zap, Layers, Boxes, Globe, CheckCircle2, Terminal, ArrowRight, Lock, Activity } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Zero-Drift State Execution",
    desc: "NovaServe calculates exact state diffs before applying changes, cryptographically guaranteeing zero accidental cloud drift with SHA-256 state locks.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    badge: "100% Deterministic",
    tag: "Security & Safety",
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Sub-Second AST Compilation",
    desc: "Built with native high-speed AST analyzers, NovaServe parses source trees and synthesizes cloud execution manifests in under 400ms.",
    icon: <Zap className="w-6 h-6 text-[#FFB020]" />,
    badge: "0.38s Compile",
    tag: "Performance",
    span: "col-span-1",
  },
  {
    title: "Automated IAM Synthesis",
    desc: "Eliminate misconfigurations. NovaServe analyzes code references and automatically generates the exact minimal IAM permissions required.",
    icon: <Lock className="w-6 h-6 text-indigo-600" />,
    badge: "Zero-Trust Default",
    tag: "Identity & Access",
    span: "col-span-1",
  },
  {
    title: "Multi-Cloud Target IR 1.0.0",
    desc: "A single TypeScript application compiles natively to AWS Lambda & RDS, Cloudflare Workers & KV, Docker containers, and Google Cloud Run.",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    badge: "Universal IR Spec",
    tag: "Interoperability",
    span: "col-span-1 md:col-span-2",
  },
];

export function CoreFeatures() {
  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-[1550px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <Boxes className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            Engineered for Modern Cloud Architecture
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            Everything you need to build, test, and scale cloud applications without DevOps complexity or YAML sprawl.
          </p>
        </div>

        {/* 21st.dev style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`p-8 rounded-3xl bg-gray-50/70 hover:bg-white border border-gray-200 hover:border-[#FFB020] shadow-xs hover:shadow-xl transition-all space-y-5 group relative overflow-hidden flex flex-col justify-between ${f.span}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white border border-gray-200 group-hover:border-amber-300 transition-colors shadow-xs">
                    {f.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-mono font-bold text-gray-700 group-hover:border-amber-300 transition-colors">
                    {f.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    {f.tag}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-black transition-colors">
                    {f.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/70 flex items-center justify-between text-xs font-mono text-gray-500">
                <span className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Ready</span>
                </span>
                <span className="text-gray-400 group-hover:text-amber-800 font-bold flex items-center space-x-1 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
