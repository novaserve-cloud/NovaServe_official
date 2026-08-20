"use client";

import { useState } from "react";
import { Cpu, FileCode, Layers, Server, Zap, CheckCircle2, DollarSign, ShieldCheck, ArrowRight, Play, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DiamondIcon } from "./Icons";

const pipelineSteps = [
  {
    step: "01",
    title: "TypeScript App & SDK",
    desc: "Declare routes, storage buckets, queues, and databases in pure TypeScript.",
    icon: <FileCode className="w-5 h-5 text-blue-600" />,
    detail: "Parses import { NovaApp, Lambda, Postgres } from '@novaserve/core'",
    status: "Verified AST",
  },
  {
    step: "02",
    title: "Nova Compiler",
    desc: "Parses source code AST statically in sub-second speed without runtime reflection.",
    icon: <Cpu className="w-5 h-5 text-amber-500" />,
    detail: "AST Evaluation in 0.04s via native esbuild analyzer",
    status: "0.04s Parse",
  },
  {
    step: "03",
    title: "DAG Dependency Graph",
    desc: "Builds resource relationships, detects cycles, and synthesizes least-privilege IAM.",
    icon: <Layers className="w-5 h-5 text-indigo-600" />,
    detail: "Topological Sort -> Kahn's Algorithm (0 Cycles Detected)",
    status: "Zero Cycles",
  },
  {
    step: "04",
    title: "Nova IR 1.0.0",
    desc: "Emits a provider-neutral Intermediate Representation JSON spec with SHA-256 state locks.",
    icon: <DiamondIcon size={20} />,
    detail: "Canonical JSON Blueprint with cryptographic SHA-256 lock",
    status: "SHA-256 Locked",
  },
  {
    step: "05",
    title: "Planner & Cost Engine",
    desc: "Calculates precise diffs (Create/Update/Delete) and monthly line-item cost projections.",
    icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
    detail: "Line-Item Estimation: $42.80/mo (No unexpected cloud bills)",
    status: "Cost Verified",
  },
  {
    step: "06",
    title: "Provider Cloud Adapter",
    desc: "Executes journaled deployments to target cloud infrastructure (AWS or Local Emulator).",
    icon: <Zap className="w-5 h-5 text-purple-600" />,
    detail: "Atomic multi-cloud apply to AWS Lambda, RDS, and Cloudflare",
    status: "Deployed (0.38s)",
  },
];

export function CompilerPipelineSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <Cpu className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>COMPILER-DRIVEN ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            From TypeScript AST to Cloud Deployment
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            NovaServe treats infrastructure as a compilation target. Understand how source code transforms into deterministic cloud execution plans.
          </p>
        </div>

        {/* Horizontal Interactive Step Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {pipelineSteps.map((s, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <motion.div
                key={idx}
                onClick={() => setActiveStep(idx)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden ${
                  isCurrent
                    ? "bg-white border-[#FFB020] shadow-xl ring-2 ring-[#FFB020]/30"
                    : "bg-gray-50/70 border-gray-200 hover:bg-white hover:border-gray-300 shadow-xs"
                }`}
              >
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFB020]" />
                )}

                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-md ${
                    isCurrent ? "bg-[#FFB020] text-black" : "bg-gray-200 text-gray-700"
                  }`}>
                    STAGE {s.step}
                  </span>
                  <div className="p-2 rounded-xl bg-white border border-gray-200 shadow-xs">
                    {s.icon}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-gray-900">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed line-clamp-3">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200/70 flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center space-x-1 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{s.status}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Active Stage Inspector Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#0C0B12] text-white border border-gray-800 space-y-4 font-mono text-xs shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-md bg-[#FFB020] text-black font-black text-xs">
                  STAGE {pipelineSteps[activeStep].step}
                </span>
                <span className="text-base font-bold text-gray-100">
                  {pipelineSteps[activeStep].title}
                </span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full text-[11px]">
                <Check className="w-3.5 h-3.5" />
                <span>Compiler Status: Deterministic PASS</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#141220] border border-[#27233D] space-y-1.5">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Execution Pass Detail</div>
                <div className="text-amber-300 font-semibold text-sm">{pipelineSteps[activeStep].detail}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#141220] border border-[#27233D] space-y-1.5">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Architectural Output</div>
                <div className="text-gray-200 font-semibold text-xs leading-relaxed">{pipelineSteps[activeStep].desc}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Global Pipeline Flow Breadcrumb */}
        <div className="mt-8 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800 font-mono text-xs text-center shadow-xs overflow-x-auto whitespace-nowrap">
          <span className="text-gray-500 font-bold mr-2">PIPELINE FLOW:</span>
          <span className="text-amber-700 font-extrabold">
            TypeScript App → AST Parsing → Kahn's DAG → Nova IR 1.0.0 → Planner & Cost → Cloud Adapter
          </span>
        </div>
      </div>
    </section>
  );
}
