"use client";

import { useState } from "react";
import { Terminal, Play, Copy, Check, Cpu, Layers, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DiamondIcon } from "./Icons";

export function InteractivePlayground() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "plan" | "ast" | "iam">("code");
  const [isRunning, setIsRunning] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const sampleCode = `import { NovaApp, Lambda, EdgeKV, Postgres } from "@novaserve/core";

const app = new NovaApp({ name: "payments-service", region: "multi-cloud" });

// 1. Declarative cloud primitives
const db  = new Postgres("primary-db", { engine: "aurora-postgresql", minCapacity: 2 });
const kv  = new EdgeKV("sessions-kv", { replication: "global" });
const api = new Lambda("checkout-api", {
  memory: 512,
  timeout: 10,
  environment: { 
    DB_URL: db.connectionString, 
    KV_NAME: kv.name 
  },
});

// 2. Automatic dependency resolution & zero-trust IAM policy generation
export default app.deploy({ db, kv, api });`;

  const samplePlan = `+ Resource: aws:rds:AuroraCluster (primary-db) -> CREATE [ap-south-1]
+ Resource: cloudflare:workers:KV (sessions-kv) -> CREATE [320 Edge PoPs]
+ Resource: aws:lambda:Function (checkout-api) -> CREATE [memory: 512MB, timeout: 10s]
~ IAM Policy: Auto-generated Zero-Trust policy attached to checkout-api:
  - Allow: rds-db:connect on arn:aws:rds-db:ap-south-1:*:dbuser/main
  - Allow: cloudflare:kv:get,put on sessions-kv

Plan: 3 to add, 0 to change, 0 to destroy.
Estimated Cost: $42.80 / month
Execution Time: 0.38s (Zero-drift verified, SHA-256: 8f9b2c4e1a)`;

  const sampleAst = `{
  "kind": "NovaApplicationSpec",
  "version": "v1.0.0",
  "name": "payments-service",
  "target": "multi-cloud",
  "nodes": [
    { "id": "primary-db", "type": "Database", "provider": "aws:rds", "capacity": "aurora" },
    { "id": "sessions-kv", "type": "EdgeKV", "provider": "cloudflare:workers-kv" },
    { "id": "checkout-api", "type": "ServerlessFunction", "provider": "aws:lambda", "memory": 512 }
  ],
  "dagEdges": [
    { "from": "checkout-api", "to": "primary-db", "relation": "db_connection" },
    { "from": "checkout-api", "to": "sessions-kv", "relation": "kv_access" }
  ]
}`;

  const sampleIam = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "NovaSynthesizedLeastPrivilegeRDS",
      "Effect": "Allow",
      "Action": ["rds-db:connect"],
      "Resource": "arn:aws:rds-db:ap-south-1:*:dbuser/main"
    },
    {
      "Sid": "NovaSynthesizedCloudflareKV",
      "Effect": "Allow",
      "Action": ["cloudflare:kv:get", "cloudflare:kv:put"],
      "Resource": "urn:cloudflare:workers:kv:sessions-kv"
    }
  ]
}`;

  const copyCode = () => {
    const textToCopy = 
      activeTab === "code" ? sampleCode : 
      activeTab === "plan" ? samplePlan : 
      activeTab === "ast" ? sampleAst : sampleIam;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCompiler = () => {
    setIsRunning(true);
    setSimulationLog("Evaluating TypeScript AST...");
    setTimeout(() => {
      setSimulationLog("Resolving DAG dependency order (0 cycles)...");
      setTimeout(() => {
        setSimulationLog("Synthesizing least-privilege IAM policies & generating Nova IR 1.0.0...");
        setTimeout(() => {
          setIsRunning(false);
          setActiveTab("plan");
          setSimulationLog("✓ Compilation finished in 0.38s (3 resources planned)");
          setTimeout(() => setSimulationLog(null), 4000);
        }, 600);
      }, 500);
    }, 400);
  };

  return (
    <section id="playground" className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <Terminal className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>LIVE INTERACTIVE PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            Write Code. Inspect Plan. Deploy.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            Experience how NovaServe compiles your application code into deterministic multi-cloud plan manifests.
          </p>
        </div>

        {/* 21st.dev style Playground Terminal Window */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#0C0B12] border border-[#26223B] shadow-2xl p-6 overflow-hidden text-white font-mono">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#231F38] gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              
              <div className="flex flex-wrap items-center gap-1.5 pl-2">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "code"
                      ? "bg-[#FFB020] text-black shadow-xs"
                      : "text-gray-400 hover:text-white hover:bg-[#1B182B]"
                  }`}
                >
                  App.ts
                </button>
                <button
                  onClick={() => setActiveTab("plan")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "plan"
                      ? "bg-[#FFB020] text-black shadow-xs"
                      : "text-gray-400 hover:text-white hover:bg-[#1B182B]"
                  }`}
                >
                  Compiled Plan
                </button>
                <button
                  onClick={() => setActiveTab("ast")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "ast"
                      ? "bg-[#FFB020] text-black shadow-xs"
                      : "text-gray-400 hover:text-white hover:bg-[#1B182B]"
                  }`}
                >
                  Nova IR AST
                </button>
                <button
                  onClick={() => setActiveTab("iam")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "iam"
                      ? "bg-[#FFB020] text-black shadow-xs"
                      : "text-gray-400 hover:text-white hover:bg-[#1B182B]"
                  }`}
                >
                  IAM Synthesized
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleRunCompiler}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-[#FFB020] text-black text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Nova Compiler</span>
                  </>
                )}
              </button>

              <button
                onClick={copyCode}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1B182B] border border-[#2D2847] hover:border-[#FFB020] text-xs text-gray-200 font-bold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Real-time simulation status bar */}
          {simulationLog && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#171426] border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse text-[#FFB020]" />
              <span>{simulationLog}</span>
            </motion.div>
          )}

          {/* Editor Content Area */}
          <div className="mt-4">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl bg-[#08070D] border border-[#1F1B30] text-gray-200 text-xs overflow-x-auto min-h-[260px] leading-relaxed shadow-inner"
              >
                <code>
                  {activeTab === "code" && sampleCode}
                  {activeTab === "plan" && samplePlan}
                  {activeTab === "ast" && sampleAst}
                  {activeTab === "iam" && sampleIam}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>

          {/* Bottom telemetry indicators */}
          <div className="mt-4 pt-3 border-t border-[#231F38] flex flex-wrap items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Compiler Status: Deterministic PASS</span>
              </span>
              <span className="text-gray-600">|</span>
              <span>Memory Isolation: V8 Sandbox</span>
            </div>
            <div className="text-amber-400 font-bold">
              Nova IR Specification 1.0.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
