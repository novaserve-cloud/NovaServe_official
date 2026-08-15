import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CommandReference } from "@/components/docs/CommandReference";
import { Callout } from "@/components/docs/Callout";

const slug = "cli/deploy";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function CLIDeployPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <Callout type="important" title="AWS Credentials Required">
          <p>Deploying to AWS requires configured credentials via environment variables or AWS CLI configuration.</p>
        </Callout>

        <CommandReference
          name="nova deploy"
          description="Compiles your TypeScript AST, verifies the execution plan, provisions cloud resources via the target provider API, and updates the SHA-256 state lock."
          syntax="nova deploy [options]"
          options={[
            { flag: "--target <provider>", description: "Target cloud driver (aws, cloudflare, docker)" },
            { flag: "--env <namespace>", description: "Environment namespace", defaultValue: "production" },
            { flag: "--yes, -y", description: "Skip interactive confirmation (for CI/CD)" },
          ]}
          examples={[
            { title: "Interactive Deployment to AWS", command: "nova deploy --target aws" },
            { title: "Automated CI/CD Deployment", command: "nova deploy --target aws --env staging --yes" },
            { title: "Deploy to Cloudflare Edge", command: "nova deploy --target cloudflare" },
          ]}
          envVars={[
            { name: "NOVA_TARGET", description: "Default cloud provider target" },
            { name: "NOVA_ENV", description: "Default environment namespace" },
            { name: "AWS_ACCESS_KEY_ID", description: "AWS credential for deployment" },
            { name: "AWS_SECRET_ACCESS_KEY", description: "AWS credential for deployment" },
          ]}
          related={[
            { name: "nova plan", slug: "cli/plan" },
            { name: "nova compile", slug: "cli/compile" },
            { name: "nova drift", slug: "cli/drift" },
          ]}
        />
      </DocPageLayout>
      <DocToc items={[
        { id: "syntax", label: "Syntax" },
        { id: "options", label: "Options" },
        { id: "examples", label: "Examples" },
        { id: "env-vars", label: "Environment Variables" },
        { id: "related", label: "Related Commands" },
      ]} />
    </>
  );
}
