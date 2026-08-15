import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

const slug = "quickstart";
const page = getDocPage(slug)!;

export const metadata: Metadata = { title: page.title, description: page.description };

export default function QuickStartPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <Callout type="tip" title="Time to First Deployment: ~5 minutes">
          <p>This guide takes you from zero to a working deployed serverless API in under 5 minutes.</p>
        </Callout>

        <h2 id="step-1">1. Install NovaServe</h2>
        <CodeBlock code="npm install -g novaserve" language="bash" filename="Terminal" />

        <h2 id="step-2">2. Scaffold a New Project</h2>
        <CodeBlock code={`nova init my-first-app
cd my-first-app && npm install`} language="bash" filename="Terminal" />

        <p>This creates a new project with the following structure:</p>
        <CodeBlock code={`my-first-app/
├── App.ts              # Application & resource definitions
├── nova.config.ts      # Compiler & deployment configuration
├── package.json
└── tsconfig.json`} language="text" filename="Project Structure" />

        <h2 id="step-3">3. Write Your First Function</h2>
        <p>Open <code>App.ts</code> and define an HTTP endpoint:</p>
        <CodeBlock
          filename="App.ts"
          language="typescript"
          code={`import { defineApp, api } from "novaserve";

export const app = defineApp({ name: "my-first-app" });

export const hello = api.get("/api/hello", async () => {
  return {
    message: "Hello from NovaServe!",
    timestamp: Date.now(),
  };
});`}
          showLineNumbers
        />

        <h2 id="step-4">4. Run the Local Emulator</h2>
        <p>Start the sub-200ms local development sandbox:</p>
        <CodeBlock code="nova dev" language="bash" filename="Terminal" />

        <h2 id="step-5">5. Test Your Endpoint</h2>
        <p>In a new terminal, send a request to your local API:</p>
        <CodeBlock code='curl http://localhost:3000/api/hello' language="bash" filename="Terminal" />

        <p>Expected response:</p>
        <CodeBlock
          code={`{
  "message": "Hello from NovaServe!",
  "timestamp": 1723764000000
}`}
          language="json"
          filename="Response"
        />

        <h2 id="step-6">6. Deploy to AWS</h2>
        <p>When you&apos;re ready, deploy to production:</p>
        <CodeBlock code="nova deploy --target aws" language="bash" filename="Terminal" />

        <Callout type="note" title="AWS Credentials Required">
          <p>
            Deploying to AWS requires configured credentials. Set <code>AWS_ACCESS_KEY_ID</code> and
            <code> AWS_SECRET_ACCESS_KEY</code> environment variables, or configure the AWS CLI with <code>aws configure</code>.
          </p>
        </Callout>

        <p>
          NovaServe automatically parses your TypeScript AST, synthesizes least-privilege IAM
          policies, generates the execution plan, and provisions your Lambda functions,
          API Gateway, and any declared resources.
        </p>

        <h2 id="next-steps">What&apos;s Next?</h2>
        <ul>
          <li><a href="/docs/project-structure">Project Structure</a> — understand file organization</li>
          <li><a href="/docs/concepts/compiler">Compiler Pipeline</a> — how AST transformation works</li>
          <li><a href="/docs/guides/serverless-api">Build a REST API</a> — full guide with storage and queues</li>
          <li><a href="/docs/cli">CLI Reference</a> — all available commands</li>
        </ul>
      </DocPageLayout>

      <DocToc
        items={[
          { id: "step-1", label: "1. Install NovaServe" },
          { id: "step-2", label: "2. Scaffold a Project" },
          { id: "step-3", label: "3. Write Your First Function" },
          { id: "step-4", label: "4. Run Local Emulator" },
          { id: "step-5", label: "5. Test Endpoint" },
          { id: "step-6", label: "6. Deploy to AWS" },
          { id: "next-steps", label: "What's Next?" },
        ]}
      />
    </>
  );
}
