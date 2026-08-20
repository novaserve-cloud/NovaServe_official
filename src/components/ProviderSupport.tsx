"use client";

import { useState } from "react";
import { Boxes, CheckCircle2, ShieldCheck, AlertCircle, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CLOUD_PROVIDERS } from "@/config/providers";
import { CloudProviderConfig } from "@/types/provider.types";
import { ProviderBadge } from "@/components/providers/ProviderBadge";
import Link from "next/link";

export function ProviderSupport() {
  const [selectedProvider, setSelectedProvider] = useState<CloudProviderConfig>(CLOUD_PROVIDERS[0]);

  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <Boxes className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>CLOUD & DEVOPS PROVIDER MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            Multi-Cloud & DevOps Architecture
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            NovaServe compiles TypeScript applications simultaneously to AWS, Azure, Cloudflare, Kubernetes, and Docker targets with zero-drift state guarantees.
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Provider Selector Cards (Left 7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLOUD_PROVIDERS.map((p) => {
              const isSelected = p.id === selectedProvider.id;
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setSelectedProvider(p)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-white border-[#FFB020] text-black shadow-xl ring-2 ring-[#FFB020]/30"
                      : "bg-gray-50/70 border-gray-200 hover:bg-white hover:border-gray-300 shadow-xs"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFB020]" />
                  )}

                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md border text-[10px] font-mono font-black flex items-center space-x-1.5 ${p.badgeBg}`}>
                      <span>{p.badge}</span>
                    </span>
                    <span className="flex h-2 w-2 relative">
                      {p.status === "Production-Ready" ? (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                      ) : (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      )}
                    </span>
                  </div>

                  <div>
                    <ProviderBadge providerId={p.id} size="md" variant="compact" />
                    <span className="text-xs font-mono text-gray-500 font-bold mt-1 block">
                      {p.category}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-gray-700">{p.status}</span>
                    <span className="text-amber-800 font-extrabold text-[11px]">{p.resources.length} Resources</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Provider Detail Inspector Card (Right 5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0C0B12] text-white border border-[#26223B] shadow-2xl p-6 space-y-6 flex flex-col justify-between font-mono">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#231F38]">
                <div className="flex items-center space-x-3">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                      PROVIDER SPECIFICATION
                    </span>
                    <h3 className="text-xl font-black text-white mt-0.5">
                      {selectedProvider.name}
                    </h3>
                  </div>
                </div>

                {selectedProvider.defaultRegion && (
                  <span className="px-2.5 py-1 rounded-md bg-[#1B182B] text-amber-300 border border-[#2D2847] text-[10px] font-bold">
                    {selectedProvider.defaultRegion}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-300 font-sans font-medium leading-relaxed">
                {selectedProvider.desc}
              </p>

              <div className="space-y-2.5 pt-2">
                <span className="text-xs text-amber-400 font-black block">
                  SYNTHESIZED CLOUD RESOURCES ({selectedProvider.resources.length})
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {selectedProvider.resources.map((res, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2.5 rounded-xl bg-[#141220] border border-[#27233D] text-xs text-gray-200 font-bold flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{res}</span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold px-2 py-0.5 rounded bg-black/40">
                        {selectedProvider.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#231F38] flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero-Drift Verified</span>
              </span>
              <Link
                href={selectedProvider.docUrl || "/docs"}
                className="text-amber-300 hover:text-white font-bold flex items-center space-x-1"
              >
                <span>Read docs</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
