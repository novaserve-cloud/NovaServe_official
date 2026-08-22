import Link from "next/link";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { constructMetadata } from "@/lib/seo";

const slug = "getting-started";
const page = getDocPage(slug)!;

export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function GettingStartedPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <Callout type="note" title="Open Source & Free for Individuals">
          <p>
            NovaServe is 100% open source under the Apache-2.0 license. Free forever for
            independent builders, developers, and open-source projects.
          </p>
        </Callout>

        <p>
          <strong>NovaServe</strong> is a TypeScript-native serverless framework that treats cloud
          infrastructure as a compilation target. You declare resources — API endpoints, storage
          buckets, message queues — directly in TypeScript, and the NovaServe compiler transforms
          your code into deterministic cloud deployments.
        </p>

        <h2 id="the-problem">The Problem NovaServe Solves</h2>
        <p>
          Traditional cloud development forces a split between application code (TypeScript) and
          infrastructure configuration (YAML, HCL, JSON). This creates:
        </p>
        <ul>
          <li><strong>Context switching</strong> — duplicating resource names across code and config files</li>
          <li><strong>Over-privileged IAM</strong> — developers resort to wildcard permissions (<code>s3:*</code>) instead of precise scoping</li>
          <li><strong>Runtime-only errors</strong> — mismatched environment variables only surface at deploy time</li>
          <li><strong>State drift</strong> — manual cloud console changes bypass version control</li>
        </ul>

        <h2 id="how-novaserve-works">How NovaServe Works</h2>
        <p>
          NovaServe eliminates the infrastructure/application split:
        </p>
        <ul>
          <li><strong>Application-defined infrastructure</strong> — cloud resources are declared in TypeScript using type-safe primitives</li>
          <li><strong>Compiler-driven static analysis</strong> — the AST parser understands which functions touch which resources</li>
          <li><strong>Automated IAM synthesis</strong> — exact permissions (<code>s3:PutObject</code>) are inferred from code, not manually written</li>
          <li><strong>Multi-cloud IR</strong> — a provider-neutral intermediate representation enables targeting AWS, Cloudflare, or Docker from one codebase</li>
          <li><strong>SHA-256 state locking</strong> — deployments are cryptographically locked; drift is detected and remediated</li>
        </ul>

        <CodeBlock
          filename="App.ts"
          language="typescript"
          code={`import { defineApp, api, storage, queue } from "novaserve";

export const app = defineApp({ name: "my-app", region: "us-east-1" });

// Declare cloud resources in TypeScript
export const uploads = storage("user-uploads");
export const taskQueue = queue("task-processing");

// HTTP endpoint with automatic IAM scoping
export const createTask = api.post("/tasks", async (req) => {
  const task = await req.json();
  await uploads.put(\`task-\${task.id}.json\`, JSON.stringify(task));
  await taskQueue.push(task);
  return { status: "created", taskId: task.id };
});`}
        />

        <h2 id="feature-comparison">Feature Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">NovaServe</th>
                <th className="p-3">Terraform</th>
                <th className="p-3">Pulumi / CDK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-semibold">Language</td><td className="p-3">Native TypeScript</td><td className="p-3">HCL</td><td className="p-3">TypeScript / Python / Go</td></tr>
              <tr><td className="p-3 font-semibold">Model</td><td className="p-3">Application-defined compiler</td><td className="p-3">Infrastructure-only</td><td className="p-3">Infrastructure-only imperative</td></tr>
              <tr><td className="p-3 font-semibold">IAM Generation</td><td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Automated AST inference</td><td className="p-3">Manual JSON/HCL</td><td className="p-3">Manual construct bindings</td></tr>
              <tr><td className="p-3 font-semibold">Local Emulation</td><td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Built-in (nova dev)</td><td className="p-3">Third-party</td><td className="p-3">Limited</td></tr>
              <tr><td className="p-3 font-semibold">Multi-Cloud IR</td><td className="p-3 text-emerald-700 dark:text-emerald-400 font-bold">Yes (Nova IR)</td><td className="p-3">Provider-specific</td><td className="p-3">Provider-specific</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="next-steps">Next Steps</h2>
        <ul>
          <li>
            <Link href="/docs/installation" className="text-amber-700 dark:text-amber-400 font-semibold">
              Install NovaServe →
            </Link>{" "}
            — set up the CLI on your machine
          </li>
          <li>
            <Link href="/docs/quickstart" className="text-amber-700 dark:text-amber-400 font-semibold">
              Quick Start Guide →
            </Link>{" "}
            — deploy your first app in 5 minutes
          </li>
          <li>
            <Link href="/docs/concepts/compiler" className="text-amber-700 dark:text-amber-400 font-semibold">
              Compiler Pipeline →
            </Link>{" "}
            — understand how AST transformation works
          </li>
        </ul>
      </DocPageLayout>

      <DocToc
        items={[
          { id: "the-problem", label: "The Problem" },
          { id: "how-novaserve-works", label: "How NovaServe Works" },
          { id: "feature-comparison", label: "Feature Comparison" },
          { id: "next-steps", label: "Next Steps" },
        ]}
      />
    </>
  );
}
