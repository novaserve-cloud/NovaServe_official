"use client";

import { BarChart3, Zap, ShieldCheck, Clock, Gauge } from "lucide-react";
import { motion } from "framer-motion";

export function BenchmarksSection() {
  const comparisons = [
    { tool: "NovaServe (Compiler Engine)", time: "0.38s", width: "10%", highlight: true },
    { tool: "SST v3 (Ion Engine)", time: "1.80s", width: "35%", highlight: false },
    { tool: "Pulumi Automation API", time: "3.90s", width: "65%", highlight: false },
    { tool: "Terraform + AWS Provider", time: "5.40s", width: "95%", highlight: false },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <BarChart3 className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>PERFORMANCE BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            Unrivaled Compile & Deploy Speeds
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            NovaServe compiles AST dependencies and executes deployment plans up to 10x faster than legacy runtime engines.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-3xl bg-gray-50/80 hover:bg-white border border-gray-200 hover:border-[#FFB020] shadow-xs hover:shadow-xl transition-all space-y-3"
          >
            <div className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">INCREMENTAL COMPILE TIME</div>
            <div className="text-5xl font-black text-gray-900 tracking-tight">0.38s</div>
            <div className="text-xs text-emerald-700 font-bold flex items-center space-x-1.5 pt-1">
              <Zap className="w-3.5 h-3.5 text-[#FFB020] fill-current" />
              <span>10x faster than Terraform / CDK</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-3xl bg-gray-50/80 hover:bg-white border border-gray-200 hover:border-[#FFB020] shadow-xs hover:shadow-xl transition-all space-y-3"
          >
            <div className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">EDGE COLD START LATENCY</div>
            <div className="text-5xl font-black text-gray-900 tracking-tight">4ms</div>
            <div className="text-xs text-blue-700 font-bold flex items-center space-x-1.5 pt-1">
              <Gauge className="w-3.5 h-3.5 text-blue-600" />
              <span>Zero-V8 isolate warmup penalty</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-8 rounded-3xl bg-gray-50/80 hover:bg-white border border-gray-200 hover:border-[#FFB020] shadow-xs hover:shadow-xl transition-all space-y-3"
          >
            <div className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">ZERO-DRIFT GUARANTEE</div>
            <div className="text-5xl font-black text-gray-900 tracking-tight">100%</div>
            <div className="text-xs text-amber-800 font-bold flex items-center space-x-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Deterministic AST SHA-256 state hashing</span>
            </div>
          </motion.div>
        </div>

        {/* Comparative Speed Bar Chart Visualizer */}
        <div className="p-8 rounded-3xl bg-[#0C0B12] text-white border border-[#26223B] shadow-2xl space-y-6 font-mono">
          <div className="flex items-center justify-between border-b border-[#231F38] pb-4">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              Incremental Plan Compilation Speed (Lower is Faster)
            </span>
            <span className="text-[11px] text-gray-400 font-normal">Sample: 50 Cloud Resources AST</span>
          </div>

          <div className="space-y-4 pt-1">
            {comparisons.map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className={c.highlight ? "text-[#FFB020]" : "text-gray-300"}>{c.tool}</span>
                  <span className={c.highlight ? "text-emerald-400 font-black" : "text-gray-400"}>{c.time}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#181528] overflow-hidden p-0.5 border border-[#27223F]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: c.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      c.highlight
                        ? "bg-gradient-to-r from-amber-400 to-[#FFB020]"
                        : "bg-gray-600"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
