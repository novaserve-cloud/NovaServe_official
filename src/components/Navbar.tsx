"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Github,
  ChevronDown,
  Menu,
  X,
  Cpu,
  Boxes,
  ShieldCheck,
  BarChart3,
  Sparkles,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DiamondIcon } from "@/components/Icons";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RevealText } from "@/components/ui/reveal-text";
import { ImageText } from "@/components/ui/image-text";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Docs", href: "/docs" },
    { name: "Registry", href: "/providers" },
    { name: "Wall of Fame", href: "/wall-of-fame" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "Changelog", href: "/changelog" },
  ];

  const productMenuItems = [
    { title: "Core Compiler Engine", desc: "TypeScript AST to multi-cloud plans", href: "/architecture", icon: <Cpu className="w-5 h-5 text-amber-500" /> },
    { title: "Provider Matrix", desc: "Native AWS, Cloudflare, Docker & GCP specs", href: "/providers", icon: <Boxes className="w-5 h-5 text-emerald-600" /> },
    { title: "Performance Benchmarks", desc: "0.38s compile time & 4ms edge cold starts", href: "/comparison", icon: <BarChart3 className="w-5 h-5 text-[#FFB020]" /> },
    { title: "Enterprise Security", desc: "Zero-trust IAM generation & CSP audit", href: "/security", icon: <ShieldCheck className="w-5 h-5 text-indigo-600" /> },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Announcement Banner Bar */}
      {bannerVisible && (
        <div className="bg-[#0D0B18] text-white text-xs font-mono py-2 px-4 flex items-center justify-between border-b border-[#231F3B]">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-center w-full">
            <span className="text-[#FFB020] animate-pulse">✦</span>
            <span className="font-medium text-gray-200">
              Latest release (v2.1.10): Core Package Updates, Sub-second AST Compiler & Bug Fixes.
            </span>
            <Link
              href="/changelog"
              prefetch={true}
              className="bg-[#241F40] hover:bg-[#342D5C] text-amber-300 hover:text-white px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors inline-flex items-center space-x-1 ml-2 border border-[#383060]"
            >
              <span>See release</span>
            </Link>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="text-gray-400 hover:text-white p-1 text-xs font-bold cursor-pointer"
            aria-label="Close Announcement"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Navigation (Navbar) */}
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-md py-3"
            : "bg-white dark:bg-[#0A0A0B] border-b border-gray-100 dark:border-gray-800 py-3.5"
        }`}
      >
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo & Main Nav */}
            <div className="flex items-center space-x-8">
              <Link href="/" prefetch={true} className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-[#FFB020] p-0.5 shadow-md group-hover:scale-105 transition-all duration-300 flex items-center justify-center text-black">
                  <DiamondIcon size={20} />
                </div>
                <RevealText
                  text="NovaServe"
                  textColor="text-black"
                  overlayColor="text-[#FFB020]"
                  fontSize="text-xl"
                  letterDelay={0.04}
                  overlayDelay={0.03}
                />
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1 font-sans text-sm font-semibold text-gray-700 dark:text-gray-300">
                {/* Product Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setProductMenuOpen(true)}
                  onMouseLeave={() => setProductMenuOpen(false)}
                >
                  <button className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:text-amber-700 hover:bg-amber-50/60 transition-all cursor-pointer">
                    <span>Product</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productMenuOpen ? "rotate-180 text-amber-600" : "text-gray-500"}`} />
                  </button>

                  <AnimatePresence>
                    {productMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-[520px] mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-3 z-50"
                      >
                        {productMenuItems.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            prefetch={true}
                            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-amber-50/70 transition-colors group cursor-pointer"
                          >
                            <div className="p-2 rounded-lg bg-gray-100 border border-gray-200 group-hover:border-amber-300 transition-colors">
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-500 leading-relaxed mt-0.5 font-normal">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={true}
                      className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? "text-amber-900 bg-amber-100/70 font-bold"
                          : "hover:text-amber-700 hover:bg-gray-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Side Controls */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* GitHub Star Pill */}
              <a
                href="https://github.com/novaserve-cloud/novaserve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-mono text-gray-800 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4 text-gray-900" />
                <span className="font-bold text-gray-900">v2.1.10</span>
              </a>

              {/* Quick Search Keyboard trigger hint */}
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
                className="hidden md:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-[#151224] border border-gray-200 dark:border-[#282245] text-xs text-gray-500 hover:border-[#FFB020] hover:text-black dark:hover:text-white transition-colors cursor-pointer shadow-xs"
                aria-label="Open Command Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-[#FFB020]" />
                <span className="font-mono text-[11px] font-bold">Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-black border border-gray-200 dark:border-gray-700 text-[10px] font-mono font-semibold">⌘K</kbd>
              </button>

              {/* Sign In Link */}
              <Link
                href="/signin"
                prefetch={true}
                className="px-3 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </Link>

              {/* Get Started Free CTA with Interactive Hover Effect */}
              <Link href="/docs" prefetch={true}>
                <InteractiveHoverButton text="Get Started Free" className="px-5 py-2 text-xs font-black" />
              </Link>
            </div>

            {/* Mobile Search & Menu Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
                className="p-2 rounded-xl bg-gray-100 dark:bg-[#151224] border border-gray-300 dark:border-[#282245] text-gray-900 dark:text-white cursor-pointer"
                aria-label="Open Search"
              >
                <Search className="w-4 h-4 text-[#FFB020]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-[#151224] border border-gray-300 dark:border-[#282245] text-gray-900 dark:text-white cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            {/* Mobile Search Bar inside Drawer */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-command-palette"));
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#151224] border border-gray-200 dark:border-[#282245] text-xs text-gray-500 font-mono"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-[#FFB020]" />
                <span className="font-bold text-gray-800 dark:text-gray-200">Search documentation &amp; pages...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-black border border-gray-300 text-[10px]">⌘K</kbd>
            </button>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-2">
              <a
                href="https://github.com/novaserve-cloud/novaserve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs text-gray-700 font-bold"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <div className="flex items-center space-x-2">
                <Link
                  href="/signin"
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/docs"
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <InteractiveHoverButton text="Get Started Free" className="px-4 py-1.5 text-xs font-black" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
