import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CommandReference } from "@/components/docs/CommandReference";

const slug = "cli/init";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function CLIInitPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <CommandReference
          name="nova init"
          description="The nova init command initializes a new NovaServe TypeScript project from pre-configured application templates."
          syntax="nova init <project-name> [options]"
          options={[
            { flag: "<project-name>", description: "Name of the project directory to create (required)" },
            { flag: "--template <name>", description: "Project template to scaffold", defaultValue: "serverless-api" },
            { flag: "--path <dir>", description: "Target directory path", defaultValue: "./<project-name>" },
          ]}
          examples={[
            { title: "Basic Serverless API Project", command: "nova init my-api\ncd my-api" },
            { title: "Next.js Edge Boilerplate", command: "nova init my-edge-app --template nextjs-edge" },
            { title: "Queue Worker Project", command: "nova init my-worker --template queue-worker" },
            { title: "Minimal Project", command: "nova init my-app --template minimal" },
          ]}
          related={[
            { name: "nova dev", slug: "cli/dev" },
            { name: "nova deploy", slug: "cli/deploy" },
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
