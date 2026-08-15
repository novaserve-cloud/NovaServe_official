import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";

const slug = "reference/configuration";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function ConfigurationReferencePage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          The <code>nova.config.ts</code> file lives at the root of your project and controls
          how NovaServe compiles and deploys your codebase.
        </p>

        <h2 id="example">Full Configuration Example</h2>
        <CodeBlock
          filename="nova.config.ts"
          language="typescript"
          showLineNumbers
          code={`import { defineConfig } from "novaserve/config";

export default defineConfig({
  // Application identity
  name: "my-cloud-app",
  target: "aws",
  region: "us-east-1",

  // Compiler options
  compiler: {
    strictAstValidation: true,
    optimizeMemoryMB: 512,
  },

  // AWS-specific configuration
  aws: {
    region: "us-east-1",
    architecture: "arm64",
    runtime: "nodejs20.x",
    memorySize: 512,
    timeout: 10,
    s3: {
      forcePathStyle: false,
      sseAlgorithm: "AES256",
    },
  },

  // Cloudflare configuration
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    compatibilityDate: "2026-08-01",
  },

  // State management
  state: {
    backend: "local",
    lockTable: "novaserve-locks",
  },
});`}
        />

        <h2 id="properties">Configuration Properties</h2>

        <h3 id="top-level">Top-Level Properties</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Property</th><th className="p-3">Type</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">name</td><td className="p-3 font-mono text-xs">string</td><td className="p-3">Unique application identifier</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">target</td><td className="p-3 font-mono text-xs">&quot;aws&quot; | &quot;cloudflare&quot; | &quot;docker&quot;</td><td className="p-3">Default cloud target provider</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">region</td><td className="p-3 font-mono text-xs">string</td><td className="p-3">Primary cloud region (e.g., us-east-1)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 id="compiler">Compiler Options</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Property</th><th className="p-3">Type</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">compiler.strictAstValidation</td><td className="p-3 font-mono text-xs">boolean</td><td className="p-3">Fail build if undeclared primitives exist</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">compiler.optimizeMemoryMB</td><td className="p-3 font-mono text-xs">number</td><td className="p-3">Memory optimization target in MB</td></tr>
            </tbody>
          </table>
        </div>

        <h3 id="aws-config">AWS Configuration</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Property</th><th className="p-3">Type</th><th className="p-3">Default</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">aws.region</td><td className="p-3 font-mono text-xs">string</td><td className="p-3 text-xs">us-east-1</td><td className="p-3">AWS region for deployment</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">aws.architecture</td><td className="p-3 font-mono text-xs">&quot;arm64&quot; | &quot;x86_64&quot;</td><td className="p-3 text-xs">arm64</td><td className="p-3">Lambda CPU architecture</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">aws.runtime</td><td className="p-3 font-mono text-xs">string</td><td className="p-3 text-xs">nodejs20.x</td><td className="p-3">Lambda runtime version</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">aws.memorySize</td><td className="p-3 font-mono text-xs">number</td><td className="p-3 text-xs">512</td><td className="p-3">Lambda memory in MB</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">aws.timeout</td><td className="p-3 font-mono text-xs">number</td><td className="p-3 text-xs">10</td><td className="p-3">Lambda timeout in seconds</td></tr>
            </tbody>
          </table>
        </div>

        <h3 id="state-config">State Configuration</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Property</th><th className="p-3">Type</th><th className="p-3">Default</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">state.backend</td><td className="p-3 font-mono text-xs">&quot;local&quot; | &quot;s3&quot;</td><td className="p-3 text-xs">local</td><td className="p-3">State storage backend</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">state.lockTable</td><td className="p-3 font-mono text-xs">string</td><td className="p-3 text-xs">—</td><td className="p-3">DynamoDB lock table name for team collaboration</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/reference/environment-variables">Environment Variables</a></li>
          <li><a href="/docs/guides/configuration">Configuration Guide</a></li>
          <li><a href="/docs/concepts/providers">Provider Reference</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "example", label: "Full Example" },
        { id: "top-level", label: "Top-Level Properties" },
        { id: "compiler", label: "Compiler Options" },
        { id: "aws-config", label: "AWS Configuration" },
        { id: "state-config", label: "State Configuration" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
