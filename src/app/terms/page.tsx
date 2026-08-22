import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms of service and software licensing agreements for NovaServe.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4 pb-8 border-b border-gray-200">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Terms of Service</h1>
          <p className="text-gray-600 font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </header>

        <div className="prose prose-gray max-w-none text-gray-800 space-y-6">
          <p>
            These Terms of Service constitute a legally binding agreement made between you and NovaServe concerning your access to and use of the NovaServe website and our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Open Source License</h2>
          <p>
            The NovaServe framework is open-source software licensed under the Apache License, Version 2.0. Your use of the open-source software is governed by the terms of that license.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Hosted Services Preview</h2>
          <p>
            Access to our hosted cloud console (Beta/Preview) is provided "as is" and "as available". We reserve the right to modify, suspend, or discontinue the preview services at any time without notice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. User Responsibilities</h2>
          <p>
            You are responsible for safeguarding the password and API keys that you use to access the service and for any activities or actions under your account. You agree not to disclose your password or keys to any third party.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes.
          </p>
        </div>
      </div>
    </div>
  );
}
