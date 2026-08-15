import type { Metadata } from "next";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CommandReference } from "@/components/docs/CommandReference";

const slug = "cli/dev";
const page = getDocPage(slug)!;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function CLIDevPage() {
  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <CommandReference
          name="nova dev"
          description="Start the sub-200ms local emulator sandbox with hot reloading. The local environment mocks S3 storage, SQS queues, and HTTP routes using an in-memory Hono server."
          syntax="nova dev [options]"
          options={[
            { flag: "--port <number>", description: "Local server port", defaultValue: "3000" },
            { flag: "--env <namespace>", description: "Environment namespace to load", defaultValue: "development" },
          ]}
          examples={[
            { title: "Start Local Development Server", command: "nova dev" },
            { title: "Custom Port", command: "nova dev --port 8080" },
            { title: "Load Staging Environment Variables", command: "nova dev --env staging" },
          ]}
          envVars={[
            { name: "NOVA_ENV", description: "Default environment namespace" },
          ]}
          related={[
            { name: "nova init", slug: "cli/init" },
            { name: "nova deploy", slug: "cli/deploy" },
            { name: "nova compile", slug: "cli/compile" },
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
