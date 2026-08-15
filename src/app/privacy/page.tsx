import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NovaServe",
  description: "Privacy Policy for NovaServe.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4 pb-8 border-b border-gray-200">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-600 font-medium">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </header>

        <div className="prose prose-gray max-w-none text-gray-800 space-y-6">
          <p>
            At NovaServe, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our open-source framework and upcoming cloud services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h2>
          <p>
            We use the information we collect or receive to communicate with you, to provide and maintain our services, to improve our platform, and for other business purposes as described in this policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Open Source CLI Telemetry</h2>
          <p>
            The open-source NovaServe CLI may collect anonymous, aggregated usage metrics to help us improve the framework. You can opt out of this telemetry at any time by running <code>nova telemetry disable</code> or setting the <code>NOVA_TELEMETRY_DISABLED=1</code> environment variable.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at privacy@novaserve.cloud.
          </p>
        </div>
      </div>
    </div>
  );
}
