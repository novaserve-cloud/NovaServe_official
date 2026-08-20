"use client";

import { Github, Users, MessageSquare, BookOpen, GitPullRequest, ArrowRight, ExternalLink, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CommunitySection() {
  const communityCards = [
    {
      title: "GitHub Repository",
      action: "Explore Code",
      desc: "Browse the TypeScript compiler source, submit issues, and inspect roadmap milestones.",
      icon: <Github className="w-6 h-6 text-gray-900" />,
      href: "https://github.com/novaserve-cloud/novaserve",
      isExternal: true,
    },
    {
      title: "Discord Community",
      action: "Join Server",
      desc: "Connect directly with core maintainers and platform engineers in our developer Discord.",
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
      href: "https://discord.gg/novaserve",
      isExternal: true,
    },
    {
      title: "RFCs & Architecture Discussions",
      action: "View RFCs",
      desc: "Review open design proposals for Nova IR 1.0.0 and multi-cloud provider adapters.",
      icon: <Code2 className="w-6 h-6 text-amber-600" />,
      href: "/architecture",
      isExternal: false,
    },
    {
      title: "Contribute to NovaServe",
      action: "Contributor Guide",
      desc: "Learn how to build provider plugins, write custom compiler passes, and improve docs.",
      icon: <GitPullRequest className="w-6 h-6 text-emerald-600" />,
      href: "/contribute",
      isExternal: false,
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-200 relative z-10 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-extrabold">
          <Users className="w-3.5 h-3.5 text-[#FFB020]" />
          <span>OPEN SOURCE COMMUNITY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
          Built in the Open for Cloud Engineers
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-semibold leading-relaxed">
          NovaServe is open source under Apache 2.0. Collaborate, contribute, and shape the future of compiler-driven cloud infrastructure.
        </p>

        {/* 4 Community Hub Cards with Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-4 text-left">
          {communityCards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-gray-50/70 hover:bg-white border border-gray-200 hover:border-[#FFB020] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-xs w-fit">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 tracking-tight">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-sans mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200/60">
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-gray-900 hover:text-amber-700 transition-colors"
                  >
                    <span>{item.action}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-gray-900 hover:text-amber-700 transition-colors"
                  >
                    <span>{item.action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
