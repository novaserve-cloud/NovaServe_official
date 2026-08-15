import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CommandReference } from "@/components/docs/CommandReference";

const slug = "cli/plan";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function CLIPlanPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <CommandReference
          name="nova plan"
          description="Preview deterministic infrastructure additions, updates, or deletions by comparing compiled Nova IR against your current deployment state lock."
          syntax="nova plan [options]"
          options={[
            { flag: "--target <provider>", description: "Target cloud driver (aws, cloudflare, docker)" },
            { flag: "--env <namespace>", description: "Environment namespace", defaultValue: "production" },
            { flag: "--out <file>", description: "Save execution plan to file" },
          ]}
          examples={[
            {
              title: "Preview AWS Deployment Plan",
              command: "nova plan --target aws",
              output: `[NovaServe Plan] Target: AWS us-east-1 (Environment: production)

Resource Actions:
  + [CREATE] S3 Bucket: user-receipts-prod
  + [CREATE] SQS Queue: notification-queue-prod
  + [CREATE] Lambda Handler: POST /checkout
  ~ [UPDATE] API Gateway v2 CORS Configuration
  - [NO ACTION] IAM Role: ExecutionRole (Unchanged)

Plan Summary: 3 to create, 1 to update, 0 to destroy.
State Hash: a9f8e7d...`,
            },
          ]}
          related={[
            { name: "nova compile", slug: "cli/compile" },
            { name: "nova deploy", slug: "cli/deploy" },
            { name: "nova drift", slug: "cli/drift" },
          ]}
        />
      </DocPageLayout>
      <DocToc items={[
        { id: "syntax", label: "Syntax" },
        { id: "options", label: "Options" },
        { id: "examples", label: "Examples" },
        { id: "related", label: "Related Commands" },
      ]} />
    </>
  );
}
