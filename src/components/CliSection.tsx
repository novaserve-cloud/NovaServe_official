"use client";

import { Terminal, Copy, Check, Play, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CliCommand {
  id: string;
  name: string;
  command: string;
  desc: string;
  output: string;
}

const commands: CliCommand[] = [
  {
    id: "init",
    name: "nova init",
    command: "npx novaserve init my-cloud-app",
    desc: "Bootstraps a TypeScript serverless application with sample routes & database.",
    output: `✦ Creating NovaServe application: my-cloud-app
✓ Downloaded TypeScript template (@novaserve/starter-fullstack)
✓ Installed dependencies (hono, @novaserve/core)
✓ Generated nova.config.ts and tsconfig.json
✨ Project ready! Run "nova dev" to launch the local cloud emulator.`
  },
  {
    id: "dev",
    name: "nova dev",
    command: "nova dev",
    desc: "Starts the sub-200ms local serverless emulator with live hot-reloading.",
    output: `[nova-emulator] Starting local multi-cloud sandbox...
[nova-emulator] Compiling AST in 0.04s...
[nova-emulator] Emulating AWS RDS PostgreSQL on localhost:5432
[nova-emulator] Emulating Cloudflare KV in-memory (0ms latency)
[nova-emulator] Server listening at http://localhost:3000
✓ Ready for requests in 0.18s (Zero cloud charges)`
  },
  {
    id: "plan",
    name: "nova plan",
    command: "nova plan",
    desc: "Analyzes AST and calculates deterministic state diffs without modifying cloud infrastructure.",
    output: `[nova-plan] Evaluating TypeScript AST and dependency graph (DAG)...
[nova-plan] Generating Nova IR specification 1.0.0...
~ Resource: aws:lambda:Function (api) -> MODIFY [memory: 512MB -> 1024MB]
+ Resource: cloudflare:workers:KV (user-sessions) -> CREATE [Global 320 PoPs]
Plan: 1 to add, 1 to change, 0 to destroy.
✓ Zero-drift verified. State Hash: 8f9b2c4e1a (Execution time: 0.38s)`
  },
  {
    id: "cost",
    name: "nova cost",
    command: "nova cost",
    desc: "Outputs line-item cost projections calculated directly from your AST definitions.",
    output: `[nova-cost] Calculating monthly expenditure based on Nova IR 1.0.0...
----------------------------------------------------------------------
Resource                         Tier / Spec                Monthly Est
----------------------------------------------------------------------
aws:rds:AuroraCluster            2 ACU Serverless v2        $28.80
cloudflare:workers:KV            Standard (Unlimited reads) $ 5.00
aws:lambda:checkout-api          1024MB (5M invocations/mo) $ 9.00
----------------------------------------------------------------------
Total Projected Monthly Cost:                               $42.80 / mo`
  },
];

export function CliSection() {
  const [activeCommand, setActiveCommand] = useState<CliCommand>(commands[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCommand.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <Terminal className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>DEVELOPER TOOLING & CLI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            One CLI to rule your entire cloud stack
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            Install the NovaServe CLI to bootstrap, emulate locally, inspect deterministic plans, and deploy multi-cloud infrastructure in seconds.
          </p>
        </div>

        {/* 21st.dev style Interactive Terminal */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0C0B12] border border-[#26223B] shadow-2xl p-6 overflow-hidden text-white font-mono space-y-4">
          {/* Top Bar with Command Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#231F38] gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pl-2">
                {commands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => setActiveCommand(cmd)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCommand.id === cmd.id
                        ? "bg-[#FFB020] text-black shadow-xs"
                        : "text-gray-400 hover:text-white hover:bg-[#1B182B]"
                    }`}
                  >
                    {cmd.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1B182B] border border-[#2D2847] hover:border-[#FFB020] text-xs text-gray-200 font-bold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              <span>{copied ? "Copied Command" : "Copy"}</span>
            </button>
          </div>

          {/* Description of command */}
          <div className="text-xs text-gray-400 font-sans font-medium">
            {activeCommand.desc}
          </div>

          {/* Terminal Command Input Area */}
          <div className="p-3 rounded-xl bg-[#161324] border border-[#2B2544] text-amber-300 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <span className="text-gray-500">$</span>
              <span>{activeCommand.command}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">CLI Command</span>
          </div>

          {/* Simulated Terminal Output */}
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeCommand.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-[#08070D] border border-[#1F1B30] text-gray-200 text-xs overflow-x-auto leading-relaxed shadow-inner"
            >
              <code>{activeCommand.output}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
