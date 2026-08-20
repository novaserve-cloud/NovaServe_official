"use client";

import { useState } from "react";
import { Cpu, FileCode, Layers, Server, Zap, CheckCircle2, DollarSign, ShieldCheck, ArrowRight, Play, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DiamondIcon, AwsIcon, CloudflareIcon } from "./Icons";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";

const pipelineStages = [
  {
    step: "01",
    title: "TypeScript App & SDK",
    desc: "Declare routes, storage buckets, queues, and databases in pure TypeScript.",
    icon: <FileCode className="w-6 h-6 text-blue-500" />,
    badge: "Verified AST",
    metric: "0.00s Spec",
    code: `import { NovaApp, Lambda, Postgres } from "@novaserve/core";

const app = new NovaApp({ name: "checkout-service" });
const db = new Postgres("orders-db");
const api = new Lambda("api-handler", { memory: 512 });`,
  },
  {
    step: "02",
    title: "Nova Compiler",
    desc: "Parses source code AST statically in sub-second speed without runtime reflection.",
    icon: <Cpu className="w-6 h-6 text-amber-500" />,
    badge: "0.04s Parse",
    metric: "0.04s Esbuild AST",
    code: `// Stage 02: Static AST Traversal (No Reflection)
const ast = await compiler.parse("src/index.ts");
const declaredResources = ast.findTypeDeclarations("NovaApp");`,
  },
  {
    step: "03",
    title: "DAG Dependency Graph",
    desc: "Builds resource relationships, detects cycles, and synthesizes least-privilege IAM.",
    icon: <Layers className="w-6 h-6 text-indigo-500" />,
    badge: "Zero Cycles",
    metric: "Kahn's Topological DAG",
    code: `// Stage 03: Kahn's DAG Topo-Sort
const dag = new DependencyGraph(ast.nodes);
dag.detectCycles(); // 0 Cycles detected
dag.synthesizeIamRoles(); // Least-privilege generated`,
  },
  {
    step: "04",
    title: "Nova IR 1.0.0",
    desc: "Emits a provider-neutral Intermediate Representation JSON spec with SHA-256 state locks.",
    icon: <DiamondIcon size={24} />,
    badge: "SHA-256 Locked",
    metric: "Deterministic IR Spec",
    code: `{
  "specVersion": "1.0.0",
  "sha256": "8f9b2c4e1a709...",
  "nodes": ["api-handler", "orders-db", "sessions-kv"]
}`,
  },
  {
    step: "05",
    title: "Planner & Cost Engine",
    desc: "Calculates precise diffs (Create/Update/Delete) and monthly line-item cost projections.",
    icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
    badge: "Cost Verified",
    metric: "$42.80 / mo Projected",
    code: `// Stage 05: AST Cost Verification & Diff Calculation
Plan: +3 to add, ~0 to change, -0 to destroy
Estimated Monthly Run Cost: $42.80 (0% drift)`,
  },
  {
    step: "06",
    title: "Provider Cloud Adapter",
    desc: "Executes journaled deployments to target cloud infrastructure (AWS or Local Emulator).",
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    badge: "Deployed (0.38s)",
    metric: "0.38s Atomic Apply",
    code: `// Stage 06: Target Multi-Cloud Emission
await awsAdapter.apply(ir);
await cloudflareAdapter.syncKv(ir);
// ✓ Deployment successful (0.38s)`,
  },
];

export function CompilerPipelineSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const carouselSlides: CoverflowSlide[] = pipelineStages.map((stg, index) => ({
    title: stg.title,
    stageNumber: `STAGE ${stg.step}`,
    desc: stg.desc,
    badge: stg.badge,
    meta: [
      { label: "Compiler Stage", value: `0${index + 1} of 06` },
      { label: "Execution Metric", value: stg.metric },
      { label: "State Verification", value: stg.badge },
    ],
    customNode: (
      <div className="h-full w-full bg-[#0C0B12] text-white p-5 sm:p-6 flex flex-col justify-between font-mono border border-[#26223B] rounded-3xl shadow-2xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB020]/10 blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-md bg-[#1B182B] text-amber-300 border border-[#2F294C] text-[11px] font-bold">
            STAGE {stg.step}
          </span>
          <div className="p-2 rounded-xl bg-[#171426] border border-[#2E284B] shadow-sm">
            {stg.icon}
          </div>
        </div>

        <div className="space-y-1.5 z-10">
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-sans">
            {stg.title}
          </h3>
          <p className="text-xs text-gray-400 font-sans font-medium line-clamp-2 leading-relaxed">
            {stg.desc}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#07060A] border border-[#1E1A30] text-[11px] text-gray-300 overflow-hidden font-mono z-10">
          <div className="text-gray-500 text-[9px] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Pass Output</span>
            <span className="text-amber-400 font-bold">{stg.badge}</span>
          </div>
          <div className="truncate text-emerald-400 font-bold">{stg.metric}</div>
        </div>
      </div>
    ),
  }));

  const current = pipelineStages[activeStep];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0B] border-t border-gray-200 dark:border-gray-800 relative z-10 text-gray-900 dark:text-gray-100 selection:bg-[#FFB020]/40 selection:text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-mono text-amber-900 dark:text-amber-300 font-extrabold">
            <Cpu className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>COMPILER-DRIVEN ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            From TypeScript AST to Cloud Deployment
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-semibold leading-relaxed">
            NovaServe treats infrastructure as a compilation target. Understand how source code transforms into deterministic cloud execution plans.
          </p>
        </div>

        {/* 3D Coverflow Carousel Showcase */}
        <div className="relative py-2">
          <CoverflowCarousel
            slides={carouselSlides}
            cardWidth="clamp(260px, 32vw, 380px)"
            rotate={36}
            depth={0.5}
            perspective={2.8}
            gap={0.06}
            showNavigation
            showPagination
            showCaption
            onSelectSlide={(idx) => setActiveStep(idx)}
          />
        </div>

        {/* Active Stage Inspector Terminal Preview */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0C0B12] text-white border border-[#26223B] space-y-4 font-mono text-xs shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#231F38] pb-4">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 rounded-md bg-[#FFB020] text-black font-black text-xs">
                STAGE {current.step}
              </span>
              <span className="text-base font-bold text-gray-100">
                {current.title} — Compiler Execution Pass
              </span>
            </div>
            <span className="text-emerald-400 font-bold flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full text-[11px]">
              <Check className="w-3.5 h-3.5" />
              <span>Pass Status: {current.badge}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 rounded-2xl bg-[#141220] border border-[#27233D] space-y-1.5">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Execution Metric</div>
                <div className="text-amber-300 font-bold text-sm">{current.metric}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#141220] border border-[#27233D] space-y-1.5">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Transformation Purpose</div>
                <div className="text-gray-300 font-sans text-xs leading-relaxed font-medium">{current.desc}</div>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl bg-[#07060A] border border-[#1E1A30] p-4 font-mono text-gray-300 text-xs overflow-x-auto leading-relaxed">
              <div className="text-gray-500 text-[10px] uppercase font-bold border-b border-gray-800 pb-2 mb-2 flex items-center justify-between">
                <span>Pass Code Representation</span>
                <span className="text-blue-400 font-normal">Deterministic Output</span>
              </div>
              <pre className="text-gray-200">
                <code>{current.code}</code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Global Pipeline Flow Breadcrumb */}
        <div className="mt-8 p-4 rounded-2xl bg-gray-50 dark:bg-[#12101F] border border-gray-200 dark:border-[#26213F] text-gray-800 dark:text-gray-300 font-mono text-xs text-center shadow-xs overflow-x-auto whitespace-nowrap">
          <span className="text-gray-500 font-bold mr-2">PIPELINE FLOW:</span>
          <span className="text-amber-800 dark:text-amber-400 font-extrabold">
            Stage 01 (TypeScript) &rarr; Stage 02 (AST Parse) &rarr; Stage 03 (Kahn's DAG) &rarr; Stage 04 (Nova IR) &rarr; Stage 05 (Cost Engine) &rarr; Stage 06 (Cloud Adapter)
          </span>
        </div>
      </div>
    </section>
  );
}
