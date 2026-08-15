import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";

const slug = "project-structure";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function ProjectStructurePage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          NovaServe projects follow a clean layout where application code and infrastructure
          definitions coexist in the same TypeScript codebase.
        </p>

        <h2 id="directory-layout">Standard Directory Layout</h2>
        <CodeBlock
          code={`my-nova-app/
├── App.ts                 # Main application & resource definitions
├── nova.config.ts         # Compiler & deployment configuration
├── src/
│   ├── routes/            # Route handlers & controller logic
│   ├── services/          # Business logic & external API clients
│   └── models/            # TypeScript interfaces & database schemas
├── .nova/
│   └── state.json         # SHA-256 deployment state lock (auto-generated)
├── package.json
└── tsconfig.json`}
          language="text"
          filename="Project Structure"
        />

        <h2 id="app-ts">The App.ts Entrypoint</h2>
        <p>
          <code>App.ts</code> is the primary entrypoint where you declare your application and
          all cloud resources. The NovaServe compiler starts AST parsing from this file.
        </p>
        <CodeBlock
          filename="App.ts"
          language="typescript"
          code={`import { defineApp, api, storage, queue } from "novaserve";

export const app = defineApp({
  name: "my-nova-app",
  region: "us-east-1",
});

export const uploads = storage("user-uploads");
export const taskQueue = queue("background-tasks");

export const createTask = api.post("/tasks", async (req) => {
  const task = await req.json();
  await uploads.put(\`task-\${task.id}.json\`, JSON.stringify(task));
  await taskQueue.push(task);
  return { status: "created" };
});`}
        />

        <h2 id="nova-config">The nova.config.ts File</h2>
        <p>
          <code>nova.config.ts</code> controls how NovaServe compiles and deploys your codebase.
          It configures the target cloud provider, region, compiler options, and state backend.
        </p>
        <CodeBlock
          filename="nova.config.ts"
          language="typescript"
          code={`import { defineConfig } from "novaserve/config";

export default defineConfig({
  project: "my-nova-app",
  target: "aws",
  aws: {
    region: "us-east-1",
    architecture: "arm64",
    memorySize: 512,
  },
});`}
        />

        <h2 id="state-directory">The .nova/ Directory</h2>
        <p>
          After your first deployment, NovaServe creates a <code>.nova/</code> directory containing:
        </p>
        <ul>
          <li><strong>state.json</strong> — SHA-256 state lock with deployment checksums</li>
          <li><strong>ir.json</strong> — compiled Nova IR output (when using <code>nova compile --out</code>)</li>
        </ul>
        <p>
          The state file should be committed to version control so that <code>nova drift</code>
          can detect out-of-band changes.
        </p>

        <h2 id="next-steps">Next Steps</h2>
        <ul>
          <li><a href="/docs/reference/configuration">Configuration Reference</a> — all <code>nova.config.ts</code> options</li>
          <li><a href="/docs/concepts/compiler">Compiler Pipeline</a> — how AST parsing transforms your code</li>
        </ul>
      </DocPageLayout>

      <DocToc items={[
        { id: "directory-layout", label: "Directory Layout" },
        { id: "app-ts", label: "App.ts Entrypoint" },
        { id: "nova-config", label: "nova.config.ts" },
        { id: "state-directory", label: ".nova/ Directory" },
        { id: "next-steps", label: "Next Steps" },
      ]} />
    </>
  );
}
