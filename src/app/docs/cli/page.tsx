import Link from "next/link";
import { getDocPage, getPrevPage, getNextPage } from "@/lib/docs";
import { DocPageLayout, DocToc } from "@/components/docs/DocPage";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { constructMetadata } from "@/lib/seo";

const slug = "cli";
const page = getDocPage(slug)!;
export const metadata = constructMetadata({
  title: page.title,
  description: page.description,
  path: `/docs/${slug}`,
});

export default function CLIOverviewPage() {
  const commands = [
    { name: "nova init", desc: "Scaffold a new NovaServe project", slug: "cli/init" },
    { name: "nova dev", desc: "Start sub-200ms local emulator", slug: "cli/dev" },
    { name: "nova compile", desc: "Static AST verification & Nova IR export", slug: "cli/compile" },
    { name: "nova plan", desc: "Preview deterministic infrastructure changes", slug: "cli/plan" },
    { name: "nova deploy", desc: "Execute deployment & state lock update", slug: "cli/deploy" },
    { name: "nova drift", desc: "Audit & remediate cloud console drift", slug: "cli/drift" },
  ];

  return (
    <>
      <DocPageLayout meta={page} prev={getPrevPage(slug)} next={getNextPage(slug)} toc={[]}>
        <h2 id="syntax">Global Syntax</h2>
        <CodeBlock code={`nova <command> [options]
# or
novaserve <command> [options]`} language="bash" filename="Terminal" />

        <h2 id="commands">Command Reference</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Command</th><th className="p-3">Purpose</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              {commands.map((cmd) => (
                <tr key={cmd.slug} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <td className="p-3">
                    <Link href={`/docs/${cmd.slug}`} className="font-mono font-bold text-amber-700 dark:text-amber-400 text-xs hover:underline">
                      {cmd.name}
                    </Link>
                  </td>
                  <td className="p-3">{cmd.desc}</td>
                </tr>
              ))}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="p-3 font-mono font-bold text-gray-500 dark:text-gray-400 text-xs">nova destroy</td>
                <td className="p-3">Destroy all managed cloud resources</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="p-3 font-mono font-bold text-gray-500 dark:text-gray-400 text-xs">nova doctor</td>
                <td className="p-3">Verify system environment readiness</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="global-flags">Global Flags</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Flag</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">--help, -h</td><td className="p-3">Display command syntax and options</td></tr>
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">--version, -v</td><td className="p-3">Output current CLI version</td></tr>
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">--json</td><td className="p-3">Format output as machine-readable JSON</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="env-vars">Environment Variables</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300">
              <tr><th className="p-3">Variable</th><th className="p-3">Description</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">NOVA_ENV</td><td className="p-3">Default deployment environment namespace (e.g. staging, production)</td></tr>
              <tr><td className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">NOVA_TARGET</td><td className="p-3">Default cloud provider target (aws, cloudflare, docker)</td></tr>
            </tbody>
          </table>
        </div>
      </DocPageLayout>
      <DocToc items={[
        { id: "syntax", label: "Global Syntax" },
        { id: "commands", label: "Command Reference" },
        { id: "global-flags", label: "Global Flags" },
        { id: "env-vars", label: "Environment Variables" },
      ]} />
    </>
  );
}
