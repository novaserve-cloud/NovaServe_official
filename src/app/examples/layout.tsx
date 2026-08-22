import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Starter Templates & Examples",
  description:
    "Explore ready-to-deploy starter templates for NovaServe: Next.js edge apps, streaming AI RAG pipelines, GCP Cloud Run microservices, and multi-region auth.",
  path: "/examples",
});

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
