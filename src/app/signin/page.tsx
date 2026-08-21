"use client";

import { AuthUI } from "@/components/ui/auth-ui";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0B] pt-14">
      <AuthUI
        signInContent={{
          image: {
            src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&auto=format&fit=crop&q=80",
            alt: "NovaServe Multi-Cloud Architecture",
          },
          quote: {
            text: "Compile pure TypeScript into zero-drift, least-privilege cloud infrastructure in sub-second speed.",
            author: "NovaServe Cloud Architecture",
          },
        }}
        signUpContent={{
          image: {
            src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80",
            alt: "NovaServe Modern Compiler Engine",
          },
          quote: {
            text: "Join engineers building with deterministic AST compilation and instant local emulation.",
            author: "NovaServe Core Engine",
          },
        }}
      />
    </div>
  );
}

