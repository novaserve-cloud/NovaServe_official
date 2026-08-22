import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Engineering & Support",
  description:
    "Get in touch with the NovaServe core team for enterprise support, compiler architecture inquiries, partnerships, or security disclosures.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
