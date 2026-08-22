import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { constructMetadata } from "@/lib/seo";

const slug = "architecture/overview";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function ArchitectureOverviewPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          This document presents the deep system architecture of NovaServe, its execution
          primitives, state isolation mechanisms, and hyper-scaler integration model.
        </p>

        <h2 id="principles">Architectural Principles</h2>
        <ol>
          <li><strong>Application-Defined Infrastructure</strong> — declarations reside inside application code for compiler-driven optimization</li>
          <li><strong>Deterministic State Compilation</strong> — identical ASTs produce identical Nova IR and SHA-256 hashes</li>
          <li><strong>Zero-Trust Privilege Boundary</strong> — IAM policies generated algorithmically from code analysis</li>
          <li><strong>Cloud Abstraction</strong> — Nova IR decouples high-level primitives from provider APIs</li>
        </ol>

        <h2 id="system-layers">System Layers</h2>
        <h3>Client Layer</h3>
        <ul>
          <li><code>novaserve</code> CLI binary — user-facing terminal interface</li>
          <li><code>nova.config.ts</code> — project-level compiler and deployment configuration</li>
          <li><code>App.ts</code> — application source with resource declarations</li>
        </ul>

        <h3>Compiler Core</h3>
        <ul>
          <li><strong>TypeScript AST Parser</strong> — extracts resource declarations from source code</li>
          <li><strong>Dependency Graph Engine</strong> — builds DAG of resource relationships</li>
          <li><strong>IAM Synthesizer</strong> — infers exact permissions from method invocations</li>
          <li><strong>Nova IR Generator</strong> — produces provider-neutral intermediate representation</li>
        </ul>

        <h3>State &amp; Lock Layer</h3>
        <ul>
          <li><code>.nova/state.json</code> — SHA-256 deployment state lock</li>
          <li><strong>Checksum Engine</strong> — deterministic hashing for drift detection</li>
        </ul>

        <h3>Target Emitter Layer</h3>
        <ul>
          <li><strong>AWS Driver</strong> — Cloud Control API, CloudFormation/CDK plans</li>
          <li><strong>Cloudflare Driver</strong> — Workers API, V8 isolate bundles</li>
          <li><strong>Docker Driver</strong> — OCI multi-stage build context</li>
        </ul>

        <h2 id="data-flow">Data Flow</h2>
        <CodeBlock
          filename="Architecture Flow"
          language="text"
          code={`Developer writes App.ts
       │
       ▼
  NovaServe CLI (nova deploy)
       │
       ▼
  TypeScript AST Parser (0.04s)
       │
       ▼
  Dependency Graph + IAM Synthesis
       │
       ▼
  Nova IR Generation + SHA-256 Hash
       │
       ├── AWS Provider Driver ──→ Lambda + S3 + SQS + API Gateway
       │
       ├── Cloudflare Driver ──→ Workers + KV + R2
       │
       └── Docker Driver ──→ OCI Multi-Stage Image
       │
       ▼
  State Lock Update (.nova/state.json)`}
        />

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/concepts/compiler">Compiler Pipeline</a></li>
          <li><a href="/docs/concepts/nova-ir">Nova IR Specification</a></li>
          <li><a href="/docs/concepts/providers">Providers</a></li>
          <li><a href="/docs/concepts/state">State &amp; Drift</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "principles", label: "Architectural Principles" },
        { id: "system-layers", label: "System Layers" },
        { id: "data-flow", label: "Data Flow" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
