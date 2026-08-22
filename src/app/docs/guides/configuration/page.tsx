import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { constructMetadata } from "@/lib/seo";

const slug = "guides/configuration";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function ConfigurationGuidePage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <p>This guide covers setting up multi-environment configurations, provider-specific settings, and environment variable management.</p>

        <h2 id="multi-target">Configuring Multiple Targets</h2>
        <p>A single <code>nova.config.ts</code> can target multiple cloud providers:</p>
        <CodeBlock filename="nova.config.ts" language="typescript" code={`import { defineConfig } from "novaserve/config";

export default defineConfig({
  project: "my-app",
  target: "aws", // Default target

  aws: {
    region: "us-east-1",
    architecture: "arm64",
    memorySize: 512,
  },

  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
    compatibilityDate: "2026-08-01",
  },
});`} />
        <p>Override the target at deploy time:</p>
        <CodeBlock code="nova deploy --target cloudflare" language="bash" filename="Terminal" />

        <h2 id="environments">Environment Management</h2>
        <p>Use the <code>--env</code> flag to deploy to different namespaces:</p>
        <CodeBlock code={`nova deploy --target aws --env staging
nova deploy --target aws --env production`} language="bash" filename="Terminal" />

        <Callout type="tip" title="Environment Variables">
          <p>Set <code>NOVA_ENV</code> to avoid passing <code>--env</code> on every command.</p>
        </Callout>

        <h2 id="state-backend">Remote State Backend</h2>
        <p>For team collaboration, configure an S3 state backend:</p>
        <CodeBlock filename="nova.config.ts" language="typescript" code={`export default defineConfig({
  state: {
    backend: "s3",
    lockTable: "novaserve-locks",
  },
});`} />

        <h2 id="related">Related</h2>
        <ul>
          <li><a href="/docs/reference/configuration">Configuration Reference</a></li>
          <li><a href="/docs/reference/environment-variables">Environment Variables</a></li>
        </ul>
      </DocPageLayout>
      <DocToc items={[
        { id: "multi-target", label: "Multiple Targets" },
        { id: "environments", label: "Environment Management" },
        { id: "state-backend", label: "Remote State Backend" },
        { id: "related", label: "Related" },
      ]} />
    </>
  );
}
