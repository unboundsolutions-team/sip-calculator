"use client";

import { useState } from "react";
import { SIPCalculator } from "@/components/calculators/SIPCalculator";
import { SWPCalculator } from "@/components/calculators/SWPCalculator";
import { PlanCalculator } from "@/components/calculators/PlanCalculator";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "sip", label: "SIP Calculator", sub: "Accumulate wealth" },
  { id: "swp", label: "SWP Calculator", sub: "Withdraw systematically" },
  { id: "plan", label: "Combined Plan", sub: "Full lifecycle" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function CalculatorPage() {
  const [active, setActive] = useState<TabId>("sip");

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 pb-32 bg-white min-h-screen">
      {/* Page header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#0d2338] mb-4 border border-slate-200 rounded-full px-4 py-1.5 bg-slate-50 shadow-sm">
          UnboundWealth Planning Suite
        </div>
        <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tight text-[#0d2338] mb-4">
          SIP & <span className="text-[#00aeef]">SWP</span> Calculator
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
          UnboundWealth gives you a guided way to model wealth accumulation, retirement income, and the full lifecycle between them.
        </p>
      </div>

      {/* Tabs - Modern Corporate Style */}
      <div className="flex justify-center mb-16">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-full p-2 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "px-8 py-3 rounded-full text-sm font-bold transition-all",
                active === tab.id
                  ? "bg-[#0d2338] text-white shadow-lg shadow-[#0d2338]/20 ring-4 ring-white"
                  : "text-slate-500 hover:text-[#0d2338] hover:bg-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab sub-label */}
      <div className="text-center mb-12">
        <span className="text-[10px] font-bold font-mono text-slate-400 tracking-[0.3em] uppercase border-b-2 border-[#00aeef]/20 pb-2 px-6">
          {TABS.find((t) => t.id === active)?.sub}
        </span>
      </div>

      {/* Panel */}
      <div className="transition-all duration-300 ease-in-out" key={active}>
        {active === "sip" && <SIPCalculator />}
        {active === "swp" && <SWPCalculator />}
        {active === "plan" && <PlanCalculator />}
      </div>
    </div>
  );
}
