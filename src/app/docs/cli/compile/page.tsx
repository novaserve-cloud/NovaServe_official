import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CommandReference } from "@/components/docs/CommandReference";

const slug = "cli/compile";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function CLICompilePage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <CommandReference
          name="nova compile"
          description="Perform static AST parsing on your TypeScript source code, validate resource bindings, synthesize IAM policies, and serialize Nova Intermediate Representation (Nova IR)."
          syntax="nova compile [options]"
          options={[
            { flag: "--target <provider>", description: "Cloud target driver (aws, cloudflare, docker)" },
            { flag: "--out <file>", description: "Output path for serialized Nova IR JSON", defaultValue: ".nova/ir.json" },
            { flag: "--strict", description: "Fail compilation if unused declared resources are detected" },
          ]}
          examples={[
            { title: "Standard Compilation", command: "nova compile --target aws" },
            { title: "Export Nova IR to File", command: "nova compile --target aws --out ./build/nova-ir.json" },
            { title: "Strict Mode", command: "nova compile --target aws --strict" },
          ]}
          exitCodes={[
            { code: 0, meaning: "Successful compilation; Nova IR generated cleanly" },
            { code: 1, meaning: "AST parsing error or invalid TypeScript syntax in App.ts" },
            { code: 2, meaning: "Resource reference validation failure (e.g. undeclared storage primitive)" },
          ]}
          related={[
            { name: "nova plan", slug: "cli/plan" },
            { name: "nova deploy", slug: "cli/deploy" },
          ]}
        />
      </DocPageLayout>
      <DocToc items={[
        { id: "syntax", label: "Syntax" },
        { id: "options", label: "Options" },
        { id: "examples", label: "Examples" },
        { id: "exit-codes", label: "Exit Codes" },
        { id: "related", label: "Related Commands" },
      ]} />
    </>
  );
}
