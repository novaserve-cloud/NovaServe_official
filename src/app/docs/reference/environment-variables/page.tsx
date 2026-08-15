import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";

const slug = "reference/environment-variables";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function EnvVarsPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>NovaServe uses the following environment variables for CLI operations and deployment.</p>

        <h2 id="cli-vars">CLI Environment Variables</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Variable</th><th className="p-3">Description</th><th className="p-3">Default</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">NOVA_ENV</td><td className="p-3">Default deployment environment namespace</td><td className="p-3 font-mono text-xs">production</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">NOVA_TARGET</td><td className="p-3">Default cloud provider target</td><td className="p-3 font-mono text-xs">aws</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="aws-vars">AWS Deployment Variables</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Variable</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">AWS_ACCESS_KEY_ID</td><td className="p-3">AWS IAM access key for deployment</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">AWS_SECRET_ACCESS_KEY</td><td className="p-3">AWS IAM secret key for deployment</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">AWS_REGION</td><td className="p-3">AWS region override (also configurable in nova.config.ts)</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="cloudflare-vars">Cloudflare Variables</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Variable</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">CLOUDFLARE_ACCOUNT_ID</td><td className="p-3">Cloudflare account identifier</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">CLOUDFLARE_API_TOKEN</td><td className="p-3">Cloudflare API token for deployment</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/reference/configuration">Configuration Reference</a></li>
          <li><a href="/docs/cli/deploy">nova deploy</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "cli-vars", label: "CLI Variables" },
        { id: "aws-vars", label: "AWS Variables" },
        { id: "cloudflare-vars", label: "Cloudflare Variables" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
