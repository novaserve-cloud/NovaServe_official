import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";

const slug = "concepts/state";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function StatePage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          NovaServe uses cryptographic state locking to ensure deployment integrity and detect
          out-of-band infrastructure modifications. Every deployment produces a SHA-256 hash of
          the compiled Nova IR, stored in <code>.nova/state.json</code>.
        </p>

        <h2 id="state-file">The State File</h2>
        <CodeBlock
          filename=".nova/state.json"
          language="json"
          code={`{
  "version": "1.0.0",
  "appName": "my-nova-app",
  "target": "aws",
  "environment": "production",
  "stateHash": "a9f8e7d6c5b4a3928176...",
  "lastDeployedAt": "2026-08-15T10:00:00.000Z",
  "resources": {
    "storage:user-uploads": { "status": "deployed" },
    "queue:task-processing": { "status": "deployed" },
    "api:post-tasks": { "status": "deployed" }
  }
}`}
        />

        <h2 id="drift-detection">Drift Detection</h2>
        <p>
          When someone modifies a cloud resource outside of NovaServe (e.g., via the AWS Console),
          the live resource state diverges from the state lock. Run <code>nova drift</code> to
          detect these discrepancies:
        </p>
        <CodeBlock code="nova drift --target aws" language="bash" filename="Terminal" />
        <p>
          To automatically restore cloud resources to match your code&apos;s state:
        </p>
        <CodeBlock code="nova drift --target aws --fix" language="bash" filename="Terminal" />

        <h2 id="state-backend">State Backend Options</h2>
        <p>Configure the state backend in <code>nova.config.ts</code>:</p>
        <ul>
          <li><code>local</code> (default) — state stored in <code>.nova/state.json</code></li>
          <li><code>s3</code> — state stored in an S3 bucket for team collaboration</li>
        </ul>
        <CodeBlock
          filename="nova.config.ts"
          language="typescript"
          code={`export default defineConfig({
  state: {
    backend: "s3",
    lockTable: "novaserve-locks",
  },
});`}
        />

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/cli/drift">nova drift Command</a></li>
          <li><a href="/docs/concepts/nova-ir">Nova IR Specification</a></li>
          <li><a href="/docs/reference/errors">Error Code: ERR_DRIFT_CHECKSUM_MISMATCH</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "state-file", label: "The State File" },
        { id: "drift-detection", label: "Drift Detection" },
        { id: "state-backend", label: "State Backend Options" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
