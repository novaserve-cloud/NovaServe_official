import { WallOfFame } from "@/components/WallOfFame";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contribute to Open Source",
  description:
    "Join our open source community. Browse good first issues, submit pull requests, and contribute to the NovaServe multi-cloud compiler ecosystem.",
  path: "/contribute",
});

export default function ContributePage() {
  return <WallOfFame />;
}
