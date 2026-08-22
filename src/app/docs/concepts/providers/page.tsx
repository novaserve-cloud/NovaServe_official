import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { Callout } from "@/components/docs/Callout";
import { constructMetadata } from "@/lib/seo";

const slug = "concepts/providers";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function ProvidersPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          NovaServe decouples your application logic from cloud vendor APIs using a target driver
          model. When you use primitives like <code>api</code>, <code>storage</code>, and{" "}
          <code>queue</code>, the compiler maps them to provider-specific resources via Nova IR.
        </p>

        <h2 id="resource-mapping">Resource Mapping Across Providers</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3">Primitive</th>
                <th className="p-3">AWS</th>
                <th className="p-3">Cloudflare</th>
                <th className="p-3">Docker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200 text-xs">
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400">api.get/post</td><td className="p-3">API Gateway v2 + Lambda</td><td className="p-3">Workers Fetch Handler</td><td className="p-3">Express / Fastify Container</td></tr>
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400">storage()</td><td className="p-3">Amazon S3 Bucket</td><td className="p-3">Cloudflare R2 Bucket</td><td className="p-3">Local Volume Mount</td></tr>
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400">queue()</td><td className="p-3">Amazon SQS Queue</td><td className="p-3">Cloudflare Queues</td><td className="p-3">Redis / RabbitMQ Container</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="stability">Provider Stability Levels</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold">PRODUCTION-READY</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Fully implemented, tested, recommended for production</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold">EXPERIMENTAL</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">Early implementation, active development, breaking changes possible</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-xs font-mono font-bold">PLANNED</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">On roadmap, not yet implemented</span>
          </div>
        </div>

        <h2 id="status-matrix">Provider Status Matrix</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Provider</th><th className="p-3">Status</th><th className="p-3">Resources</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <td className="p-3 font-bold">Local Emulator</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold">PRODUCTION-READY</span></td>
                <td className="p-3 text-xs">Hono HTTP, Local S3 Mock, SQS Mock, SQLite</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">AWS</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold">PRODUCTION-READY</span></td>
                <td className="p-3 text-xs">Lambda, S3, SQS, API Gateway v2, IAM</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Cloudflare Edge</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold">EXPERIMENTAL</span></td>
                <td className="p-3 text-xs">Workers, KV, R2, Queues</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Docker</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold">EXPERIMENTAL</span></td>
                <td className="p-3 text-xs">OCI Multi-Stage Builds, Docker Compose</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">GCP</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-mono font-bold">PLANNED</span></td>
                <td className="p-3 text-xs">Cloud Run, Pub/Sub, Cloud Storage</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Azure</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-mono font-bold">PLANNED</span></td>
                <td className="p-3 text-xs">Container Apps, Blob Storage, Event Grid</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="experimental">
          <p>Cloudflare and Docker providers are under active development. APIs may change between releases.</p>
        </Callout>

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/concepts/compiler">Compiler Pipeline</a></li>
          <li><a href="/docs/cli/deploy">nova deploy Command</a></li>
          <li><a href="/docs/reference/configuration">Configuration Reference</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "resource-mapping", label: "Resource Mapping" },
        { id: "stability", label: "Stability Levels" },
        { id: "status-matrix", label: "Status Matrix" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
