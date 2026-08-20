"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AwsIcon,
  CloudflareIcon,
  DockerIcon,
  GcpIcon,
  AzureIcon,
  VercelIcon,
  StripeIcon,
  SupabaseIcon,
  LinearIcon,
  TypescriptIcon,
} from "./Icons";

const realLogos = [
  { name: "Amazon Web Services", category: "Cloud Target", icon: AwsIcon },
  { name: "Cloudflare Workers", category: "Edge Target", icon: CloudflareIcon },
  { name: "Docker Containers", category: "OCI Runtime", icon: DockerIcon },
  { name: "Google Cloud Platform", category: "Cloud Target", icon: GcpIcon },
  { name: "Microsoft Azure", category: "Cloud Target", icon: AzureIcon },
  { name: "Vercel Frontend", category: "Fullstack", icon: VercelIcon },
  { name: "Stripe Webhooks", category: "Payments", icon: StripeIcon },
  { name: "Supabase DB", category: "Postgres", icon: SupabaseIcon },
  { name: "Linear Workflows", category: "Productivity", icon: LinearIcon },
  { name: "TypeScript 5.x", category: "AST Engine", icon: TypescriptIcon },
];

export function TrustedBy() {
  const marqueeLogos = [...realLogos, ...realLogos, ...realLogos];

  return (
    <section className="py-14 bg-white border-y border-gray-100 relative z-10 overflow-hidden text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[10px] font-mono font-bold text-gray-600 uppercase tracking-wider mb-2">
          <span>Interoperable Cloud Ecosystem</span>
        </div>
        <p className="text-xs font-mono font-black tracking-widest text-gray-700 uppercase">
          COMPATIBLE WITH INDUSTRY-STANDARD CLOUD INFRASTRUCTURE & TOOLS
        </p>
      </div>

      {/* Infinite Logo Marquee with 21st.dev style cards */}
      <div className="relative w-full overflow-hidden flex py-2">
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center space-x-6 sm:space-x-8">
          {marqueeLogos.map((brand, idx) => {
            const IconComponent = brand.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-3 text-gray-800 hover:text-black transition-all transform hover:scale-105 cursor-pointer shrink-0 py-2.5 px-4 bg-gray-50/80 hover:bg-white border border-gray-200 hover:border-[#FFB020] rounded-2xl shadow-xs hover:shadow-md group"
              >
                <div className="p-1 rounded-lg bg-white border border-gray-100 group-hover:border-amber-200 transition-colors shadow-xs">
                  <IconComponent size={20} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-gray-900 group-hover:text-black">{brand.name}</div>
                  <div className="text-[10px] font-mono text-gray-400 font-medium">{brand.category}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
