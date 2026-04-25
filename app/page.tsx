import Link from "next/link";

const journey = [
  {
    step: "01",
    title: "Start with a monthly habit",
    body: "Model SIP growth with annual step-up and a long horizon so the accumulation phase feels concrete, not abstract.",
  },
  {
    step: "02",
    title: "Shift into income mode",
    body: "Test SWP withdrawals against the same corpus and see how different withdrawal patterns affect longevity.",
  },
  {
    step: "03",
    title: "Pressure-test the full plan",
    body: "Use the combined planner to connect investing years to retirement years in one continuous story.",
  },
];

const highlights = [
  {
    title: "Single flow, not separate tools",
    body: "SIP, SWP, and lifecycle planning sit together so users can move from growth to retirement without losing context.",
  },
  {
    title: "Built for realistic ranges",
    body: "Inputs scale for both modest and very large portfolios without hard caps getting in the way of planning.",
  },
  {
    title: "Fast enough to explore",
    body: "The experience is designed for quick scenario testing so changes in contribution or withdrawal feel immediate.",
  },
];

const metrics = [
  { label: "Modes", value: "3" },
  { label: "Planning style", value: "Scenario-first" },
  { label: "Entry point", value: "Guided" },
  { label: "Access", value: "Free" },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#dff5ff_0%,#fff9ef_38%,#ffffff_72%)]">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <section className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center px-6 py-20">
        <div className="grid w-full gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#0d2338]/10 bg-white/80 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#0d2338] shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#00aeef]" />
              Retirement planning, staged clearly
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-[#0d2338] md:text-7xl">
              A creative front door
              <span className="block text-[#00aeef]">before the calculator.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-slate-600 md:text-xl">
              UnboundWealth now feels more like a guided financial product: visitors land on a story-first homepage,
              understand what each planner does, and then step into the calculator when they are ready.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-3 rounded-full bg-[#0d2338] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#0d2338]/15 transition-transform hover:-translate-y-0.5 hover:bg-[#132d45]"
              >
                Enter the calculator
                <span aria-hidden="true">-&gt;</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full border border-[#0d2338]/10 bg-white/75 px-8 py-4 text-sm font-bold text-[#0d2338] backdrop-blur transition-colors hover:bg-white"
              >
                See how the logic works
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_70px_-45px_rgba(13,35,56,0.45)] backdrop-blur"
                >
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#00aeef]">Feature</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0d2338]">{item.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="hero-card float-gentle rounded-[2rem] border border-white/80 bg-[#0d2338] p-6 text-white shadow-[0_40px_100px_-45px_rgba(13,35,56,0.85)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">Planner preview</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">From wealth building to withdrawal</h2>
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  Live flow
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {journey.map((item, index) => (
                  <div
                    key={item.step}
                    className={`rounded-[1.6rem] border px-5 py-5 ${
                      index === 1
                        ? "border-[#00aeef]/30 bg-[#00aeef]/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-white/10 px-3 py-2 font-mono text-xs font-bold tracking-[0.2em] text-white/75">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-2xl font-black">{metric.value}</p>
                    <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.8rem] border border-[#0d2338]/10 bg-white/75 p-5 shadow-lg shadow-slate-200/40 backdrop-blur">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">Why this helps</p>
                <p className="mt-3 text-lg font-bold leading-8 text-[#0d2338]">
                  People understand the promise before they see the controls.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-[#00aeef]/20 bg-[#ebfbff] p-5 shadow-lg shadow-sky-100/60">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-sky-500">Direct access</p>
                <p className="mt-3 text-lg font-bold leading-8 text-[#0d2338]">
                  Power users still jump straight to <span className="font-mono">/calculator</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="text-3xl font-black tracking-tight text-[#0d2338]">{metric.value}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#00aeef]">Homepage structure</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#0d2338] md:text-5xl">
            A more cinematic entry before the working tools.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {journey.map((item) => (
            <article
              key={item.step}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-52px_rgba(13,35,56,0.45)] transition-transform hover:-translate-y-1"
            >
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-400">{item.step}</p>
              <h3 className="mt-4 text-2xl font-black tracking-tight text-[#0d2338]">{item.title}</h3>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2.5rem] bg-[#081725] px-8 py-12 text-center text-white shadow-[0_40px_100px_-45px_rgba(8,23,37,0.95)] md:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">Next step</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            Let the homepage set the mood, then move users into the actual planning engine.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-slate-300">
            The calculator route stays direct and fast. The homepage becomes the creative product layer in front of it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-3 rounded-full bg-[#00aeef] px-8 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-sky-500"
            >
              Launch calculator
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white/90 transition-colors hover:bg-white/10"
            >
              Privacy and compliance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
