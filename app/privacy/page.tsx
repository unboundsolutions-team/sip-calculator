import React from "react";

export const metadata = {
  title: "Privacy Policy | UnboundWealth",
  description: "Privacy Policy and data protection information compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act, India).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-[#0d2338] mb-8">
          Privacy <span className="text-[#00aeef]">Policy</span>
        </h1>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm text-slate-700 leading-relaxed space-y-8">
          <section>
            <p className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-2">Effective Date: March 19, 2026</p>
            <p>
              Welcome to UnboundWealth (the &quot;Platform&quot;). We respect your privacy and are committed to protecting your personal data.
              This Privacy Policy explains how we handle data when you use our calculators and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0d2338] mb-4">1. Compliance with Indian DPDP Act, 2023</h2>
            <p>
              Our data processing practices are aligned with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> of India.
              We operate on the principle of <em>data minimization</em> and <em>purpose limitation</em>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0d2338] mb-4">2. Zero Data Collection Policy (Local Processing)</h2>
            <p className="mb-4">
              <strong>We do not collect, store, or transmit your financial data.</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All SIP, SWP, and planning calculations are performed locally on your device.</li>
              <li>Your inputs never leave your browser and are not sent to external servers.</li>
              <li>We do not require accounts, identity verification, or financial document uploads.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0d2338] mb-4">3. Personal Data Processed</h2>
            <p>
              Because this application is a client-side tool, we process effectively zero sensitive personal data through the core calculator workflow.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0d2338] mb-4">4. Your Rights as a Digital Data Principal</h2>
            <p className="mb-4">
              Under the DPDP Act, users have rights to access, correct, and erase personal data. Since UnboundWealth does not retain user financial inputs, those rights are inherently supported by the zero-storage architecture.
            </p>
            <p>If you want to clear calculator inputs, refresh the page or clear local browser data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0d2338] mb-4">5. Disclaimer</h2>
            <p>
              The calculators on this platform are for informational and educational purposes only. They do not constitute financial advice.
            </p>
          </section>

          <section className="border-t border-slate-200 pt-8 mt-8">
            <h2 className="text-xl font-bold text-[#0d2338] mb-4">Contact Data Fiduciary</h2>
            <p>
              If you have any questions regarding this Privacy Policy or our compliance practices, please contact:
            </p>
            <p className="mt-2 font-mono text-[#00aeef] font-bold">privacy@unboundwealth.local</p>
          </section>
        </div>
      </div>
    </div>
  );
}
