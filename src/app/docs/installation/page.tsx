import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";

const slug = "installation";
const page = getDocPage(slug)!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function InstallationPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <Callout type="tip" title="Global CLI Recommended">
          <p>Install NovaServe globally to use the <code>nova</code> command anywhere on your machine.</p>
        </Callout>

        <h2 id="requirements">System Requirements</h2>
        <ul>
          <li><strong>Node.js</strong> version 18.0.0 or higher (Node 20+ recommended)</li>
          <li><strong>TypeScript</strong> 5.0+ installed in your project</li>
          <li><strong>Git</strong> for version control and state checksum tracking</li>
          <li><strong>Operating System</strong>: macOS, Linux, or Windows</li>
        </ul>

        <h2 id="install">Install via Package Manager</h2>

        <h3 id="npm">npm</h3>
        <CodeBlock code="npm install -g novaserve" language="bash" filename="Terminal" />

        <h3 id="pnpm">pnpm</h3>
        <CodeBlock code="pnpm add -g novaserve" language="bash" filename="Terminal" />

        <h3 id="yarn">yarn</h3>
        <CodeBlock code="yarn global add novaserve" language="bash" filename="Terminal" />

        <h3 id="bun">bun</h3>
        <CodeBlock code="bun add -g novaserve" language="bash" filename="Terminal" />

        <h2 id="verify">Verify Installation</h2>
        <p>After installing, verify the CLI is available:</p>
        <CodeBlock
          code={`nova --version
# novaserve v2.1.6`}
          language="bash"
          filename="Terminal"
        />

        <h2 id="project-install">Project-Level Installation</h2>
        <p>
          You can also install NovaServe as a project dependency instead of globally:
        </p>
        <CodeBlock code="npm install novaserve" language="bash" filename="Terminal" />
        <p>
          Then use <code>npx nova</code> to run commands within the project context.
        </p>

        <Callout type="note" title="TypeScript Configuration">
          <p>
            NovaServe requires TypeScript 5.0+. Your project <code>tsconfig.json</code> should
            target at least <code>ES2020</code> with <code>moduleResolution: &quot;node&quot;</code> or
            <code>&quot;bundler&quot;</code>.
          </p>
        </Callout>

        <h2 id="next-steps">Next Steps</h2>
        <p>
          Now that NovaServe is installed, proceed to the{" "}
          <a href="/docs/quickstart">Quick Start Guide</a> to create and deploy
          your first serverless application.
        </p>
      </DocPageLayout>

      <DocToc
        items={[
          { id: "requirements", label: "System Requirements" },
          { id: "install", label: "Install via Package Manager" },
          { id: "verify", label: "Verify Installation" },
          { id: "project-install", label: "Project-Level Install" },
          { id: "next-steps", label: "Next Steps" },
        ]}
      />
    </>
  );
}
