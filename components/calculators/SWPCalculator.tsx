"use client";

import { useState, useMemo } from "react";
import { calcSWP, formatINR } from "@/lib/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { SliderField } from "@/components/ui/SliderField";
import { StatPill } from "@/components/ui/StatPill";
import { SWPChart } from "@/components/ui/Charts";
import { SWPTable } from "@/components/ui/YearTable";

export function SWPCalculator() {
  const [corpus, setCorpus] = useState(5_000_000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30_000);
  const [annualRate, setAnnualRate] = useState(10);
  const [stepUp, setStepUp] = useState(0);

  const [sliderMaxes, setSliderMaxes] = useState({ corpus: 50_000_000, withdrawal: 500_000, rate: 100 });

  function updateMax(field: keyof typeof sliderMaxes, value: number) {
    if (value > sliderMaxes[field]) {
      setSliderMaxes((prev) => ({ ...prev, [field]: value * 2 }));
    }
  }

  const result = useMemo(
    () => calcSWP({ corpus, monthlyWithdrawal, annualRate, annualStepUp: stepUp }),
    [corpus, monthlyWithdrawal, annualRate, stepUp]
  );

  const isSustainable = result.corpusLasts === null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
      {/* Inputs */}
      <Card sticky className="p-8">
        <CardTitle>SWP Parameters</CardTitle>
        <SliderField
          label="Initial Capital"
          value={corpus}
          displayValue={formatINR(corpus)}
          max={sliderMaxes.corpus}
          step={100_000}
          onChange={(v) => { updateMax("corpus", v); setCorpus(v); }}
        />
        <SliderField
          label="Monthly Payout"
          value={monthlyWithdrawal}
          displayValue={"₹" + monthlyWithdrawal.toLocaleString("en-IN")}
          max={sliderMaxes.withdrawal}
          step={1_000}
          onChange={(v) => { updateMax("withdrawal", v); setMonthlyWithdrawal(v); }}
          thumbColor="sky"
        />
        <SliderField
          label="Expected Return Rate"
          value={annualRate}
          displayValue={annualRate.toFixed(1) + "%"}
          max={sliderMaxes.rate}
          step={0.5}
          onChange={(v) => { updateMax("rate", v); setAnnualRate(v); }}
        />
        <div className="border-t border-slate-100 my-8" />
        <SliderField
          label="Annual Withdrawal Step-Up"
          value={stepUp}
          displayValue={stepUp + "%"}
          max={100}
          step={1}
          onChange={setStepUp}
        />
      </Card>

      {/* Results */}
      <Card className="p-10">
        <CardTitle>Withdrawal Analysis</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <StatPill label="Starting Principal" value={formatINR(corpus)} variant="gold" />
          <StatPill label="Monthly Cash Flow" value={formatINR(monthlyWithdrawal)} />
          <StatPill label="Total Cumulative Payout" value={formatINR(result.totalWithdrawn)} variant="green" />
          <StatPill
            label="Plan Sustainability"
            value={isSustainable ? "Sustainable" : result.corpusLasts + (result.corpusLasts === 1 ? " yr" : " yrs")}
            sub={isSustainable ? "Corpus outlasts withdrawal phase" : "Projected depletion period"}
            variant={isSustainable ? "green" : "sky"}
          />
          <StatPill
            label={isSustainable ? "Residual Wealth" : "Remaining Value"}
            value={isSustainable ? formatINR(result.remainingCorpus) : "₹0"}
            sub={isSustainable ? "Terminal value after horizon" : "Exhausted in Year " + result.corpusLasts}
            variant={isSustainable ? "green" : "sky"}
            fullWidth
          />
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 font-mono">Corpus Drawdown Analysis</p>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 text-[10px] font-bold font-mono text-[#00aeef] uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00aeef]" /> Remaining Principal
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Cumulative Withdrawal
              </span>
            </div>
          </div>
          <SWPChart data={result.yearlyData} />
        </div>

        <SWPTable data={result.yearlyData} />
      </Card>
    </div>
  );
}
