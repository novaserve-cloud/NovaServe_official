import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { constructMetadata } from "@/lib/seo";

const slug = "reference/api";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function APIReferencePage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <h2 id="define-app">defineApp(options)</h2>
        <p>Initializes the NovaServe application container.</p>
        <CodeBlock code={`function defineApp(options: AppOptions): AppDefinition;`} language="typescript" filename="Signature" />
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Parameter</th><th className="p-3">Type</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">name</td><td className="p-3 font-mono text-xs">string</td><td className="p-3">Unique application identifier for cloud resource naming</td></tr>
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">region</td><td className="p-3 font-mono text-xs">string (optional)</td><td className="p-3">Default cloud region (e.g., us-east-1)</td></tr>
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">version</td><td className="p-3 font-mono text-xs">string (optional)</td><td className="p-3">Semantic version tag for deployment artifacts</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock filename="Example" language="typescript" code={`import { defineApp } from "novaserve";
export const app = defineApp({ name: "billing-service", region: "us-east-1" });`} />

        <hr />

        <h2 id="api-routes">api.get() / api.post() / api.put() / api.delete()</h2>
        <p>Registers HTTP endpoints with automatic IAM scoping.</p>
        <CodeBlock code={`api.get(path: string, handler: (req: Request) => Promise<any>): RouteRef;
api.post(path: string, handler: (req: Request) => Promise<any>): RouteRef;
api.put(path: string, handler: (req: Request) => Promise<any>): RouteRef;
api.delete(path: string, handler: (req: Request) => Promise<any>): RouteRef;`} language="typescript" filename="Signatures" />
        <CodeBlock filename="Example" language="typescript" code={`import { api } from "novaserve";

export const getItems = api.get("/items/:id", async (req) => {
  return { id: "123", name: "Cloud Server" };
});

export const createItem = api.post("/items", async (req) => {
  const body = await req.json();
  return { id: "new_123", ...body };
});`} />

        <hr />

        <h2 id="storage">storage(name, options)</h2>
        <p>Declares an object storage bucket (Amazon S3 / Cloudflare R2).</p>
        <CodeBlock code="function storage(name: string, options?: StorageOptions): StorageBucket;" language="typescript" filename="Signature" />
        <h3>Instance Methods</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Method</th><th className="p-3">Inferred IAM</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">put(key, data)</td><td className="p-3 font-mono text-xs">s3:PutObject</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">get(key)</td><td className="p-3 font-mono text-xs">s3:GetObject</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">delete(key)</td><td className="p-3 font-mono text-xs">s3:DeleteObject</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock filename="Example" language="typescript" code={`import { storage } from "novaserve";
export const avatars = storage("user-avatars", { public: true });
await avatars.put("avatar.png", imageBuffer);`} />

        <hr />

        <h2 id="queue">queue(name, options)</h2>
        <p>Declares a message queue (Amazon SQS / Cloudflare Queues).</p>
        <CodeBlock code="function queue(name: string, options?: QueueOptions): MessageQueue;" language="typescript" filename="Signature" />
        <h3>Instance Methods</h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Method</th><th className="p-3">Inferred IAM</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">push(message)</td><td className="p-3 font-mono text-xs">sqs:SendMessage</td></tr>
              <tr><td className="p-3 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">process(handler)</td><td className="p-3 font-mono text-xs">sqs:ReceiveMessage, sqs:DeleteMessage</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock filename="Example" language="typescript" code={`import { queue } from "novaserve";
export const emailQueue = queue("send-emails");
await emailQueue.push({ to: "dev@example.com", subject: "Welcome!" });`} />
      </DocPageLayout>
      <DocToc items={[
        { id: "define-app", label: "defineApp()" },
        { id: "api-routes", label: "api.get() / post() / ..." },
        { id: "storage", label: "storage()" },
        { id: "queue", label: "queue()" },
      ]} />
    </>
  );
}
