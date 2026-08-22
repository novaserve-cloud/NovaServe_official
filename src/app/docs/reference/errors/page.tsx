import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { constructMetadata } from "@/lib/seo";

const slug = "reference/errors";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function ErrorsPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>This document catalogs NovaServe compiler error codes, their causes, and solutions.</p>

        <h2 id="err-1001">ERR_AST_DYNAMIC_NAME (Code 1001)</h2>
        <p><strong>Meaning:</strong> A cloud resource primitive was declared using a dynamic runtime expression.</p>
        <p><strong>Cause:</strong> NovaServe static analysis requires resource names to be string literals. Dynamic names cannot be resolved at compile time.</p>
        <p><strong>Fix:</strong> Replace dynamic expressions with literal strings:</p>
        <CodeBlock language="typescript" filename="Fix" code={`// ❌ Bad — dynamic name
export const bucket = storage("bucket-" + Math.random());

// ✓ Good — literal string
export const bucket = storage("user-bucket-prod");`} />

        <hr />

        <h2 id="err-1002">ERR_UNBOUND_RESOURCE (Code 1002)</h2>
        <p><strong>Meaning:</strong> A route handler references a resource that is not exported at top-level scope.</p>
        <p><strong>Cause:</strong> The compiler cannot infer dependency graph edges if constructs are scoped locally inside function blocks.</p>
        <p><strong>Fix:</strong> Export the resource construct at module top level:</p>
        <CodeBlock language="typescript" filename="Fix" code={`// ❌ Bad — not exported
const myQueue = queue("task-queue");

// ✓ Good — exported at module level
export const myQueue = queue("task-queue");`} />

        <hr />

        <h2 id="err-2001">ERR_DRIFT_CHECKSUM_MISMATCH (Code 2001)</h2>
        <p><strong>Meaning:</strong> Live cloud infrastructure hash does not match the state lock checksum in <code>.nova/state.json</code>.</p>
        <p><strong>Cause:</strong> A resource was modified outside of NovaServe (e.g., via AWS Console or external CLI tool).</p>
        <p><strong>Fix:</strong> Run drift remediation:</p>
        <CodeBlock language="bash" filename="Terminal" code="nova drift --fix" />
        <p><strong>Verification:</strong> After running the fix, verify with:</p>
        <CodeBlock language="bash" filename="Terminal" code="nova drift --target aws" />

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/cli/compile">nova compile</a> — where compilation errors surface</li>
          <li><a href="/docs/cli/drift">nova drift</a> — for drift-related errors</li>
          <li><a href="/docs/concepts/compiler">Compiler Pipeline</a> — understanding AST validation</li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "err-1001", label: "ERR_AST_DYNAMIC_NAME" },
        { id: "err-1002", label: "ERR_UNBOUND_RESOURCE" },
        { id: "err-2001", label: "ERR_DRIFT_CHECKSUM_MISMATCH" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
