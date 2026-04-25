import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Accumulation Phase (SIP)",
    desc: "Start by entering your monthly SIP amount. Our calculator uses monthly compounding (Annuity-due) to model how your wealth grows over time, accounting for annual step-ups in your contributions.",
    color: "#0d2338",
  },
  {
    num: "02",
    title: "Maturity & Corpus",
    desc: "At the end of your investment horizon, you'll see your total maturity corpus. This becomes the seed money for your retirement or systematic withdrawal phase.",
    color: "#00aeef",
  },
  {
    num: "03",
    title: "Withdrawal Phase (SWP)",
    desc: "Switch to the SWP calculator to see how long that corpus will last. Each month, the corpus first earns its return for that month, then the withdrawal is deducted.",
    color: "#0d2338",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="font-sans text-5xl md:text-6xl font-black text-[#0d2338] mb-8">
          How it <span className="text-[#00aeef]">works</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          UnboundWealth is built on rigorous financial mathematics and current Indian data protection standards.
          Here is how we help you model your financial future.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 bg-slate-50 border-y border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((s) => (
            <div key={s.num} className="relative group">
              <div className="text-6xl font-black text-slate-200 mb-6 group-hover:text-[#00aeef]/20 transition-colors">
                {s.num}
              </div>
              <h3 className="text-2xl font-bold text-[#0d2338] mb-4">{s.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-black text-[#0d2338] mb-10 text-center">Our Mathematical Foundation</h2>

        <div className="space-y-12 text-slate-600 font-medium leading-relaxed">
          <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <h3 className="text-xl font-bold text-[#0d2338] mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#0d2338] rounded-full" />
              SIP: The Power of Compounding
            </h3>
            <p className="mb-6">
              Unlike basic calculators that use simple interest, UnboundWealth uses <strong>monthly compounding</strong>.
              Our formula assumes investments are made at the beginning of each month (Annuity-due), matching common mutual fund behavior.
            </p>
            <div className="bg-slate-50 font-mono text-sm p-4 rounded-xl border border-slate-100 text-[#0d2338]">
              FV = P x [((1 + r)^n - 1) / r] x (1 + r)
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <h3 className="text-xl font-bold text-[#0d2338] mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#00aeef] rounded-full" />
              SWP: Conservative Modeling
            </h3>
            <p className="mb-6">
              Each month, the corpus first earns its return for that month, then the withdrawal is deducted. This grow-first model better reflects ongoing portfolio behavior during withdrawals.
            </p>
            <div className="bg-slate-50 font-mono text-sm p-4 rounded-xl border border-slate-100 text-[#00aeef]">
              New Corpus = Current Corpus x (1 + Monthly Rate) - Withdrawal
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-black text-[#0d2338] mb-8">Ready to model your future?</h2>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-3 bg-[#0d2338] text-white font-bold px-12 py-5 rounded-full transition-all hover:bg-[#0d2338]/90 hover:shadow-xl hover:scale-105 text-lg"
        >
          Start Calculating
          <span aria-hidden="true">-&gt;</span>
        </Link>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-100 text-center flex flex-col gap-3">
        <p className="text-sm text-slate-400 font-medium">© 2026 UnboundWealth.</p>
        <div className="flex justify-center gap-4 text-xs font-bold text-slate-500">
          <Link href="/privacy" className="hover:text-[#00aeef] transition-colors">Privacy Policy & DPDP Compliance</Link>
        </div>
      </footer>
    </div>
  );
}
