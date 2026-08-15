import type { Metadata } from "next";
import { DocSidebar, MobileDocNav } from "@/components/docs/DocSidebar";
import { DocSearchModal } from "@/components/docs/SearchModal";

export const metadata: Metadata = {
  title: {
    template: "%s — NovaServe Docs",
    default: "NovaServe Documentation — Serverless Application Framework",
  },
  description:
    "Complete documentation for NovaServe — the TypeScript-native serverless framework. CLI reference, guides, architecture, and API documentation.",
  openGraph: {
    title: "NovaServe Documentation",
    description:
      "Build, deploy, and scale serverless applications with NovaServe. Complete CLI reference, guides, and API documentation.",
    type: "website",
    url: "https://www.novaserve.cloud/docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0B] text-gray-900 dark:text-gray-100 pt-24 pb-24">
      {/* Docs Sub-Header Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 py-3 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          <MobileDocNav />

          {/* Right Controls */}
          <div className="flex items-center gap-3 ml-auto">
            <DocSearchModal />
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar | Content | TOC */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Sidebar */}
          <DocSidebar />

          {/* Content + Right TOC are rendered by child pages */}
          {children}
        </div>
      </div>
    </div>
  );
}
