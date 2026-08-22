import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Sign In",
  description: "Sign in to your NovaServe account.",
  path: "/signin",
  noIndex: true,
});

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
