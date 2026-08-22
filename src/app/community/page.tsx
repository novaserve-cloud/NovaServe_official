import { CommunitySection } from "@/components/CommunitySection";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Developer Community & Ecosystem",
  description:
    "Join the global NovaServe open source developer community. Connect on Discord, contribute on GitHub, and discuss cloud architecture.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20 text-gray-900 selection:bg-[#FFB020]/40 selection:text-black">
      <CommunitySection />
    </div>
  );
}
