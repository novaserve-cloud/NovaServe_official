"use client";

import { useState } from "react";
import { LayoutDashboard, Server, ShieldCheck, Activity, DollarSign, Database, GitBranch, Terminal, RefreshCw, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DiamondIcon } from "./Icons";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<string>("deployments");

  const tabs = [
    { id: "deployments", label: "Deployments", icon: <Server className="w-4 h-4" /> },
    { id: "resources", label: "Resources (DAG)", icon: <Database className="w-4 h-4" /> },
    { id: "logs", label: "Realtime Logs", icon: <Terminal className="w-4 h-4" /> },
    { id: "costs", label: "Cost Engine", icon: <DollarSign className="w-4 h-4" /> },
    { id: "security", label: "Zero-Trust IAM", icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <section className="bg-white dark:bg-[#0A0A0B] border-t border-gray-200 dark:border-gray-800 relative z-10 text-gray-900 dark:text-gray-100 selection:bg-[#FFB020]/40 selection:text-black overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4 mb-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-mono text-amber-900 dark:text-amber-300 font-extrabold">
              <LayoutDashboard className="w-3.5 h-3.5 text-[#FFB020]" />
              <span>ENTERPRISE MANAGEMENT CONSOLE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white font-sans">
              Realtime Multi-Cloud <br />
              <span className="text-[#FFB020] inline-block mt-1">Infrastructure Control Center</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold leading-relaxed max-w-2xl mx-auto font-sans">
              Monitor, inspect, and optimize all deployed multi-cloud resources, DAG dependencies, and compiler state diffs from a single developer pane.
            </p>
          </div>
        }
      >
        {/* 21st.dev style Console Preview Window */}
        <div className="h-full w-full bg-[#0C0B12] text-white p-4 sm:p-6 overflow-hidden font-mono flex flex-col justify-between">
          {/* Tab Selection */}
          <div className="flex items-center space-x-2 border-b border-[#231F38] pb-4 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === t.id
                    ? "bg-[#FFB020] text-black shadow-md"
                    : "text-gray-400 hover:bg-[#1B182B] hover:text-white"
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Console Area with Animated States */}
          <div className="mt-4 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#231F38] pb-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ENVIRONMENT: PRODUCTION (ACTIVE)</span>
                </span>
                <span className="text-gray-500 font-mono text-[11px]">Region: ap-south-1 &amp; Global Edge</span>
              </div>
              <span className="text-gray-400 font-bold">AVG COLD START: 4ms</span>
            </div>

            {/* Metric KPI Chips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-[#141220] border border-[#27233D] space-y-1 shadow-sm">
                <div className="text-[10px] text-gray-400 uppercase font-bold">ACTIVE EDGE REGIONS</div>
                <div className="text-xl sm:text-2xl font-black text-white">320 Edge PoPs</div>
                <div className="text-[10px] text-blue-400 font-bold">Cloudflare Workers + AWS</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141220] border border-[#27233D] space-y-1 shadow-sm">
                <div className="text-[10px] text-gray-400 uppercase font-bold">PROJECTED CLOUD EXPENDITURE</div>
                <div className="text-xl sm:text-2xl font-black text-amber-300">$42.80 <span className="text-xs font-normal text-gray-400">/ mo</span></div>
                <div className="text-[10px] text-emerald-400 font-bold">100% Zero unexpected charges</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#141220] border border-[#27233D] space-y-1 shadow-sm">
                <div className="text-[10px] text-gray-400 uppercase font-bold">ZERO-TRUST IAM AUDIT</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">100% COMPLIANT</div>
                <div className="text-[10px] text-gray-400 font-bold">Static Least-Privilege Pass</div>
              </div>
            </div>

            {/* Dynamic Interactive Tab Content Preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-3 p-4 rounded-2xl bg-[#08070D] border border-[#1F1B30] text-gray-300 space-y-2 font-mono text-xs"
              >
                {activeTab === "deployments" && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-gray-500 text-[10px] border-b border-gray-800 pb-1">
                      <span>DEPLOYMENT ID</span>
                      <span>STATUS</span>
                      <span>DURATION</span>
                      <span>TARGET</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-amber-300">dep_9f81a7b (commit: a1b2c3d)</span>
                      <span className="text-emerald-400 font-bold">✓ Ready (Active)</span>
                      <span>0.38s</span>
                      <span className="text-blue-400">AWS + Cloudflare</span>
                    </div>
                    <div className="flex justify-between items-center py-1 text-gray-500">
                      <span>dep_8e70a6a (commit: f4e3d2c)</span>
                      <span>Superseded</span>
                      <span>0.41s</span>
                      <span>AWS ap-south-1</span>
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="space-y-1 text-gray-300">
                    <div className="text-amber-400 font-bold">DAG Resource Dependencies:</div>
                    <div>├── aws:rds:AuroraCluster (primary-db) [Ready]</div>
                    <div>├── cloudflare:workers:KV (sessions-kv) [320 PoPs]</div>
                    <div>└── aws:lambda:Function (checkout-api) [512MB] &rarr; connected to primary-db &amp; sessions-kv</div>
                  </div>
                )}

                {activeTab === "logs" && (
                  <div className="space-y-1 text-gray-300">
                    <div><span className="text-gray-500">[12:42:18]</span> <span className="text-blue-400">[INFO]</span> Incoming request GET /api/v1/checkout (200 OK - 4ms)</div>
                    <div><span className="text-gray-500">[12:42:19]</span> <span className="text-emerald-400">[INFO]</span> Cloudflare KV session cache hit (0.8ms)</div>
                    <div><span className="text-gray-500">[12:42:20]</span> <span className="text-blue-400">[INFO]</span> Aurora PostgreSQL transaction committed</div>
                  </div>
                )}

                {activeTab === "costs" && (
                  <div className="space-y-1 text-gray-300">
                    <div>Aurora PostgreSQL v2 (2 ACU): $28.80 / mo</div>
                    <div>Cloudflare KV (Unlimited reads): $5.00 / mo</div>
                    <div>AWS Lambda execution (5M requests): $9.00 / mo</div>
                    <div className="text-amber-400 font-bold pt-1">Total: $42.80 / mo</div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-1 text-gray-300">
                    <div className="text-emerald-400 font-bold">Zero-Trust IAM Policy Synthesizer:</div>
                    <div>✓ No wildcard permissions (*) generated</div>
                    <div>✓ Least-privilege Amazon RDS data access role bound to Lambda ARN</div>
                    <div>✓ Encrypted environment secrets with KMS envelope</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

