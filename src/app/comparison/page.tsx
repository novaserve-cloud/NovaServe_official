import { ComparisonTable } from "@/components/ComparisonTable";
import { BenchmarksSection } from "@/components/BenchmarksSection";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Framework Comparison & Benchmarks",
  description:
    "Compare NovaServe with Terraform, Pulumi, Serverless Framework, and AWS CDK. See benchmarks on compilation speed and drift prevention.",
  path: "/comparison",
});

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-white pt-16 space-y-12">
      <ComparisonTable />
      <BenchmarksSection />
    </div>
  );
}
