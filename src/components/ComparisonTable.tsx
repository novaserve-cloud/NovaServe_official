"use client";

import { Check, X, ShieldCheck, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";

const matrix = [
  { feature: "Primary Architecture", nova: "Compiler-Driven (Nova IR)", sls: "CloudFormation Wrappers", sam: "CloudFormation Macros", sst: "AWS CDK Construct Graph", terraform: "General HCL Graph", pulumi: "General Imperative Engine" },
  { feature: "Application-Defined Primitives", nova: "Pure TypeScript AST", sls: "YAML / JSON configs", sam: "YAML templates", sst: "TypeScript (CDK)", terraform: "HCL Syntax", pulumi: "TypeScript / Python" },
  { feature: "Automated Least-Privilege IAM", nova: "Static AST Synthesis", sls: "Manual Policy Writing", sam: "Manual Policy Writing", sst: "Manual CDK grants", terraform: "Manual IAM writing", pulumi: "Manual IAM writing" },
  { feature: "Sub-200ms Local Sandbox (`nova dev`)", nova: "Built-in Hono Emulator", sls: "Plugin-dependent", sam: "Docker SAM local (slow)", sst: "Live Lambda proxy", terraform: "None", pulumi: "None" },
  { feature: "Integrated AST Cost Engine (`nova cost`)", nova: "Built-in Line Item", sls: "None", sam: "None", sst: "None", terraform: "External Infracost", pulumi: "None" },
  { feature: "Multi-Cloud Target Portability", nova: "Universal (AWS, Cloudflare, Docker)", sls: "Single provider focus", sam: "AWS Only", sst: "AWS + Cloudflare", terraform: "Separate modules", pulumi: "Separate packages" },
  { feature: "State Drift Guarantee", nova: "Cryptographic SHA-256 Lock", sls: "CloudFormation State", sam: "CloudFormation State", sst: "CloudFormation State", terraform: "Remote State File", pulumi: "Pulumi Cloud State" },
];

export function ComparisonTable() {
  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFB020]" />
            <span>FAIR ARCHITECTURAL COMPARISON</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
            NovaServe vs Alternative Tools
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-semibold leading-relaxed">
            NovaServe combines the developer ergonomics of serverless frameworks with the cryptographic safety of a compiler-driven infrastructure engine.
          </p>
        </div>

        {/* 21st.dev style Comparison Table with Highlight */}
        <div className="overflow-x-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-4 sm:p-6">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-900 font-black">
                <th className="py-4 px-3 text-xs uppercase tracking-wider">Capability / Architecture</th>
                <th className="py-4 px-4 text-xs uppercase tracking-wider text-black bg-amber-100 rounded-t-2xl font-black border-x border-t border-amber-300">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-900" />
                    <span>NovaServe</span>
                  </div>
                </th>
                <th className="py-4 px-3 text-xs uppercase tracking-wider text-gray-600">Serverless Fw</th>
                <th className="py-4 px-3 text-xs uppercase tracking-wider text-gray-600">AWS SAM</th>
                <th className="py-4 px-3 text-xs uppercase tracking-wider text-gray-600">SST</th>
                <th className="py-4 px-3 text-xs uppercase tracking-wider text-gray-600">Terraform</th>
                <th className="py-4 px-3 text-xs uppercase tracking-wider text-gray-600">Pulumi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-3 font-bold text-gray-900">{row.feature}</td>
                  <td className="py-4 px-4 bg-amber-50/90 font-black text-amber-950 border-x border-amber-200">
                    <span className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 stroke-[3]" />
                      <span>{row.nova}</span>
                    </span>
                  </td>
                  <td className="py-4 px-3 text-gray-600 font-medium">{row.sls}</td>
                  <td className="py-4 px-3 text-gray-600 font-medium">{row.sam}</td>
                  <td className="py-4 px-3 text-gray-600 font-medium">{row.sst}</td>
                  <td className="py-4 px-3 text-gray-600 font-medium">{row.terraform}</td>
                  <td className="py-4 px-3 text-gray-600 font-medium">{row.pulumi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
