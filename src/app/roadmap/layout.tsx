import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Product Roadmap & Community Votes",
  description:
    "Vote on upcoming features, cloud providers (GCP, Azure), compiler optimizations, and framework tooling for NovaServe.",
  path: "/roadmap",
});

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
