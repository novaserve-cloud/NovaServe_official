import { ProviderSupport } from "@/components/ProviderSupport";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Cloud Providers Support — AWS, Cloudflare, Docker",
  description:
    "Deploy NovaServe workloads natively across AWS, Cloudflare Workers & KV, Docker containers, and hybrid cloud environments.",
  path: "/providers",
});

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <ProviderSupport />
    </div>
  );
}
