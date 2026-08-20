"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Check, FileCode, Play, Terminal, Layers, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AwsIcon,
  AzureIcon,
  CloudflareIcon,
  DockerIcon,
  KubernetesIcon,
  PythonIcon,
  GoIcon,
  JavaIcon,
  TypescriptIcon,
  DiamondIcon,
} from "@/components/Icons";
import { compilerService, CodeLanguageStrategy } from "@/services/compiler.service";

export function HeroPipeline() {
  const languages = compilerService.getLanguages();
  const [selectedLang, setSelectedLang] = useState<CodeLanguageStrategy>(languages[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileSuccess, setCompileSuccess] = useState(false);

  // Auto-cycle languages every 5 seconds unless user interacted
  useEffect(() => {
    if (dropdownOpen || isCompiling) return;
    const interval = setInterval(() => {
      setSelectedLang((prev) => {
        const nextIdx = (languages.findIndex((l) => l.id === prev.id) + 1) % languages.length;
        return languages[nextIdx];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [dropdownOpen, isCompiling, languages]);

  const handleSimulateCompile = () => {
    setIsCompiling(true);
    setCompileSuccess(false);
    setTimeout(() => {
      setIsCompiling(false);
      setCompileSuccess(true);
      setTimeout(() => setCompileSuccess(false), 3000);
    }, 800);
  };

  const renderIcon = (langId: string) => {
    switch (langId) {
      case "ts":
        return <TypescriptIcon size={16} />;
      case "python":
        return <PythonIcon size={16} />;
      case "go":
        return <GoIcon size={16} />;
      case "java":
        return <JavaIcon size={16} />;
      case "csharp":
        return <FileCode className="w-4 h-4 text-emerald-400" />;
      default:
        return <FileCode className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto py-4 select-none">
      {/* Background ambient circuit glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-[#FFB020]/15 to-indigo-500/15 rounded-3xl blur-xl opacity-70 pointer-events-none" />

      {/* Main 21st.dev style Code Editor Box */}
      <div className="relative z-10 rounded-2xl bg-[#0C0B12] border border-[#26223B] p-5 shadow-2xl text-white font-mono overflow-visible backdrop-blur-xl">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#231F38]">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-gray-800" />
            <span className="text-xs font-mono font-bold text-gray-300 flex items-center space-x-1.5">
              <span>{selectedLang.filename}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Compile Action */}
            <button
              onClick={handleSimulateCompile}
              disabled={isCompiling}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs ${
                compileSuccess
                  ? "bg-emerald-500 text-black"
                  : isCompiling
                  ? "bg-amber-400 text-black animate-pulse"
                  : "bg-gray-800 hover:bg-[#FFB020] text-gray-200 hover:text-black border border-gray-700 hover:border-[#FFB020]"
              }`}
            >
              {compileSuccess ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Compiled (0.38s)</span>
                </>
              ) : isCompiling ? (
                <>
                  <Activity className="w-3 h-3 animate-spin" />
                  <span>Parsing AST...</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Test Compile</span>
                </>
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#1B182B] border border-[#2D2847] hover:border-[#FFB020] text-xs text-gray-200 font-semibold transition-all cursor-pointer"
              >
                <span>{renderIcon(selectedLang.id)}</span>
                <span className="hidden sm:inline">{selectedLang.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#171426] border border-[#2E2849] shadow-2xl p-1 space-y-1 z-50"
                  >
                    {languages.map((lang) => {
                      const isSel = lang.id === selectedLang.id;
                      return (
                        <button
                          key={lang.id}
                          onClick={() => {
                            setSelectedLang(lang);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                            isSel
                              ? "bg-[#FFB020] text-black font-bold"
                              : "text-gray-300 hover:bg-[#25203D] hover:text-white"
                          }`}
                        >
                          <span className="flex items-center space-x-2">
                            <span>{renderIcon(lang.id)}</span>
                            <span>{lang.name}</span>
                          </span>
                          {isSel && <Check className="w-3.5 h-3.5 text-black" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="mt-3.5 text-xs leading-relaxed overflow-x-auto min-h-[175px] pb-12">
          <AnimatePresence mode="wait">
            <motion.pre
              key={selectedLang.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-gray-200 font-mono"
            >
              <code>
                {selectedLang.id === "csharp" ? (
                  <>
                    <span className="text-purple-400">result</span>.<span className="text-blue-300">Names</span>.<span className="text-indigo-300">Select</span>((az, i) =&gt;{"\n"}
                    {"    "}<span className="text-purple-400">new</span> <span className="text-amber-300">Subnet</span>(<span className="text-emerald-300">$"subnet-&#123;i&#125;"</span>, <span className="text-purple-400">new</span>(){"\n"}
                    {"    "}&#123;{"\n"}
                    {"        "}<span className="text-indigo-300">VpcId</span> = vpc.VpcId,{"\n"}
                    {"        "}<span className="text-indigo-300">CidrBlock</span> = <span className="text-emerald-300">$"10.0.&#123;i&#125;.0/24"</span>,{"\n"}
                    {"        "}<span className="text-indigo-300">AvailabilityZone</span> = az,{"\n"}
                    {"    "}&#123;){"\n"}
                    ).<span className="text-indigo-300">ToList</span>();
                  </>
                ) : (
                  selectedLang.code
                )}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Interactive Visualizer HUD Cards (Cloud & DevOps Architecture) */}
      <div className="relative -mt-10 z-20 grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
        {/* Floating Card 1: AWS & Azure Hyperscale Target */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white text-gray-900 p-5 rounded-2xl shadow-xl border border-gray-200/90 space-y-3 font-mono transform transition-all backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AwsIcon size={20} />
              <AzureIcon size={18} />
              <span className="text-[11px] font-mono font-bold text-gray-600">ap-south-1 & Azure</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-bold">
              ● Multi-Cloud
            </span>
          </div>

          <div>
            <div className="text-sm font-black text-gray-900">AWS Lambda + Azure Apps</div>
            <div className="text-xs text-gray-500 font-semibold mt-0.5">
              Deterministic AST &bull; Zero-Drift Lock
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-[11px] font-mono border-t border-gray-100">
            <span className="text-gray-500">Zero-Trust IAM</span>
            <span className="text-amber-800 font-bold">Static Least-Privilege</span>
          </div>
        </motion.div>

        {/* Floating Card 2: Edge & Containers Target */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white text-gray-900 p-5 rounded-2xl shadow-xl border border-gray-200/90 space-y-3 font-mono transform transition-all backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CloudflareIcon size={18} />
              <DockerIcon size={18} />
              <KubernetesIcon size={18} />
              <span className="text-[11px] font-mono font-bold text-gray-600">Edge & K8s</span>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
              320 PoPs
            </span>
          </div>

          <div>
            <div className="text-sm font-black text-gray-900">
              Cloudflare KV & Kubernetes
            </div>
            <div className="text-xs text-gray-500 font-semibold mt-0.5">
              OCI Containers &bull; 4ms Cold Start
            </div>
          </div>

          {/* Micro Visual Progress */}
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-600 font-bold">
              <span>Nova IR AST Synced</span>
              <span className="text-emerald-600 font-bold">SHA-256 Verified</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-[#FFB020] rounded-full w-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
