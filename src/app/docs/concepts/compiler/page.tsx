import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { constructMetadata } from "@/lib/seo";

const slug = "concepts/compiler";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function CompilerPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          NovaServe treats cloud infrastructure as a compilation target rather than a set of
          imperatively invoked API scripts. The compiler transforms your TypeScript source code
          into deterministic cloud deployments through a 4-stage pipeline.
        </p>

        <h2 id="stage-1">Stage 1: AST Parser &amp; Static Analysis</h2>
        <ul>
          <li><strong>Input</strong>: TypeScript application source file (<code>App.ts</code>)</li>
          <li><strong>Mechanism</strong>: The parser scans the Abstract Syntax Tree using TypeScript compiler APIs, extracting all static invocations of NovaServe primitives (<code>defineApp</code>, <code>api</code>, <code>storage</code>, <code>queue</code>)</li>
          <li><strong>Output</strong>: Unlinked AST nodes representing application handlers and resource declarations</li>
          <li><strong>Performance</strong>: ~0.04 seconds for typical projects</li>
        </ul>

        <h2 id="stage-2">Stage 2: Dependency Graph Engine &amp; IAM Inference</h2>
        <ul>
          <li><strong>Input</strong>: Parsed AST nodes</li>
          <li><strong>Mechanism</strong>:
            <ol>
              <li>Constructs a Directed Acyclic Graph (DAG) of resource dependencies</li>
              <li>Analyzes handler function bodies for method invocations (e.g., <code>uploads.put()</code>)</li>
              <li>Synthesizes least-privilege IAM policies, mapping method calls to exact provider API actions without wildcards (<code>s3:PutObject</code>)</li>
            </ol>
          </li>
          <li><strong>Output</strong>: Resource DAG + synthesized IAM policy JSON</li>
        </ul>

        <h2 id="stage-3">Stage 3: Nova IR Generation</h2>
        <ul>
          <li><strong>Input</strong>: Validated resource DAG &amp; IAM specs</li>
          <li><strong>Mechanism</strong>: Serializes the graph into Nova Intermediate Representation (Nova IR) — a normalized, provider-neutral JSON format. Calculates a SHA-256 cryptographic checksum of the entire graph state.</li>
          <li><strong>Output</strong>: Nova IR JSON payload + SHA-256 state lock file (<code>.nova/state.json</code>)</li>
        </ul>

        <h2 id="stage-4">Stage 4: Target Cloud Emitter</h2>
        <ul>
          <li><strong>Input</strong>: Nova IR payload + target provider selection</li>
          <li><strong>Mechanism</strong>: Translates provider-neutral IR declarations into target-specific manifests (AWS Cloud Control API, Cloudflare API, or Docker build context)</li>
          <li><strong>Output</strong>: Deterministically provisioned cloud resources + updated state lock</li>
        </ul>

        <h2 id="example">Compilation Example</h2>
        <p>Given this application code:</p>
        <CodeBlock
          filename="App.ts"
          language="typescript"
          code={`import { defineApp, api, storage } from "novaserve";

export const app = defineApp({ name: "my-app" });
export const uploads = storage("user-uploads");

export const upload = api.post("/upload", async (req) => {
  const data = await req.arrayBuffer();
  await uploads.put("file.bin", data);
  return { status: "uploaded" };
});`}
        />

        <p>The compiler infers this IAM policy automatically:</p>
        <CodeBlock
          filename="Synthesized IAM Policy"
          language="json"
          code={`{
  "Effect": "Allow",
  "Action": ["s3:PutObject"],
  "Resource": "arn:aws:s3:::user-uploads/*"
}`}
        />

        <h2 id="why-compiler">Why a Compiler Approach Matters</h2>
        <ol>
          <li><strong>Eliminates duplicate config</strong> — resources are declared alongside handlers</li>
          <li><strong>Zero-trust security by default</strong> — compiler-driven IAM ensures exact permissions</li>
          <li><strong>Multi-cloud portability</strong> — Nova IR decouples logic from vendor APIs</li>
        </ol>

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/concepts/nova-ir">Nova IR Specification</a></li>
          <li><a href="/docs/cli/compile">nova compile Command</a></li>
          <li><a href="/docs/architecture/overview">Architecture Overview</a></li>
        </ul>
      </DocPageLayout>

      <DocToc items={[
        { id: "stage-1", label: "Stage 1: AST Parser" },
        { id: "stage-2", label: "Stage 2: Dependency Graph" },
        { id: "stage-3", label: "Stage 3: Nova IR Generation" },
        { id: "stage-4", label: "Stage 4: Cloud Emitter" },
        { id: "example", label: "Compilation Example" },
        { id: "why-compiler", label: "Why Compiler Approach" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
