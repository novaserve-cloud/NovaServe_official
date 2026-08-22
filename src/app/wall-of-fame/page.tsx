import { WallOfFame } from "@/components/WallOfFame";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Open Source Wall of Fame",
  description:
    "Honoring open source contributors, maintainers, and cloud architects building NovaServe. Explore our Wall of Fame, claim issues, and get recognized.",
  path: "/wall-of-fame",
});

export default function WallOfFamePage() {
  return <WallOfFame />;
}
