import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CommandReference } from "@/components/docs/CommandReference";
import { constructMetadata } from "@/lib/seo";

const slug = "cli/drift";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function CLIDriftPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <CommandReference
          name="nova drift"
          description="Audit live cloud resources against your SHA-256 state lock hash and optionally remediate manual cloud console modifications to restore infrastructure to the code-defined state."
          syntax="nova drift [options]"
          options={[
            { flag: "--fix", description: "Automatically remediate drift by overwriting live cloud resources" },
            { flag: "--target <provider>", description: "Target cloud driver (aws, cloudflare, docker)" },
            { flag: "--env <namespace>", description: "Environment namespace" },
          ]}
          examples={[
            { title: "Audit for Drift", command: "nova drift --target aws" },
            { title: "Auto-Fix Drift", command: "nova drift --target aws --fix" },
          ]}
          related={[
            { name: "nova deploy", slug: "cli/deploy" },
            { name: "nova plan", slug: "cli/plan" },
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
