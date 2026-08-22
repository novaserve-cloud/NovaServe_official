import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { constructMetadata } from "@/lib/seo";

const slug = "concepts/nova-ir";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function NovaIRPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>
          Nova IR (Intermediate Representation) is a standardized, declarative JSON schema emitted
          by the NovaServe compiler after AST analysis and graph construction. It acts as an
          architectural boundary between your application code and cloud-specific provider drivers.
        </p>

        <h2 id="schema">Schema Structure</h2>
        <p>A valid Nova IR payload contains four top-level objects:</p>
        <CodeBlock
          filename="Nova IR Schema"
          language="json"
          showLineNumbers
          code={`{
  "$schema": "https://novaserve.cloud/schemas/v1/ir.json",
  "version": "1.0.0",
  "meta": {
    "appName": "ecommerce-backend",
    "compilerVersion": "2.1.10",
    "timestamp": "2026-08-15T21:16:00.000Z",
    "stateHash": "e3b0c44298fc1c149afbf4c8996fb924..."
  },
  "resources": [
    {
      "id": "storage:user-uploads",
      "type": "novaserve/storage",
      "name": "user-uploads",
      "properties": { "public": false, "encryption": "AES256" },
      "dependencies": []
    },
    {
      "id": "api:post-tasks",
      "type": "novaserve/api",
      "properties": { "method": "POST", "path": "/tasks" },
      "dependencies": ["storage:user-uploads"]
    }
  ],
  "iam": {
    "roles": [
      {
        "name": "post-tasks-role",
        "boundTo": "api:post-tasks",
        "permissions": [
          { "action": "s3:PutObject", "resource": "arn:aws:s3:::user-uploads/*" }
        ]
      }
    ]
  }
}`}
        />

        <h2 id="state-hashing">State Hashing Mechanism</h2>
        <p>Nova IR calculates a deterministic SHA-256 state lock hash:</p>
        <ol>
          <li>Sort all resources deterministically by <code>resource.id</code></li>
          <li>Serialize properties into canonical JSON with key sorting</li>
          <li>Compute SHA-256 checksum of the serialized payload</li>
        </ol>
        <p>
          This hash is saved to <code>.nova/state.json</code> and used by{" "}
          <a href="/docs/cli/drift"><code>nova drift</code></a> to verify deployment integrity.
        </p>

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/concepts/compiler">Compiler Pipeline</a></li>
          <li><a href="/docs/concepts/state">State Locking &amp; Drift</a></li>
          <li><a href="/docs/cli/compile">nova compile Command</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "schema", label: "Schema Structure" },
        { id: "state-hashing", label: "State Hashing" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
