"use client";

import { useState, useMemo } from "react";
import { calcSIP, formatINR } from "@/lib/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { SliderField } from "@/components/ui/SliderField";
import { StatPill } from "@/components/ui/StatPill";
import { SIPChart } from "@/components/ui/Charts";
import { SIPTable } from "@/components/ui/YearTable";

export function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [lumpsum, setLumpsum] = useState(0);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(20);
  const [stepUp, setStepUp] = useState(0);
  const [inflation, setInflation] = useState(6);

  const [sliderMaxes, setSliderMaxes] = useState({ amount: 200000, lumpsum: 1000000, rate: 30, years: 50 });

  function updateMax(field: keyof typeof sliderMaxes, value: number) {
    if (value > sliderMaxes[field]) {
      setSliderMaxes((prev) => ({ ...prev, [field]: value * 2 }));
    }
  }

  const result = useMemo(
    () => calcSIP({ 
      monthlyAmount, 
      annualRate, 
      years, 
      annualStepUp: stepUp, 
      initialLumpsum: lumpsum,
      inflationRate: inflation
    }),
    [monthlyAmount, lumpsum, annualRate, years, stepUp, inflation]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
      {/* Inputs */}
      <Card sticky className="p-8">
        <CardTitle>SIP Parameters</CardTitle>
        <SliderField
          label="Initial Investment (Lump Sum)"
          value={lumpsum}
          displayValue={"₹" + lumpsum.toLocaleString("en-IN")}
          max={sliderMaxes.lumpsum}
          step={5000}
          onChange={(v) => { updateMax("lumpsum", v); setLumpsum(v); }}
        />
        <SliderField
          label="Monthly Investment"
          value={monthlyAmount}
          displayValue={"₹" + monthlyAmount.toLocaleString("en-IN")}
          max={sliderMaxes.amount}
          step={500}
          onChange={(v) => { updateMax("amount", v); setMonthlyAmount(v); }}
        />
        <SliderField
          label="Expected Annual Return"
          value={annualRate}
          displayValue={annualRate.toFixed(1) + "%"}
          max={sliderMaxes.rate}
          step={0.5}
          onChange={(v) => { updateMax("rate", v); setAnnualRate(v); }}
        />
        <SliderField
          label="Investment Duration"
          value={years}
          displayValue={years + " yrs"}
          min={1}
          max={sliderMaxes.years}
          step={1}
          onChange={(v) => { updateMax("years", v); setYears(v); }}
        />
        
        <div className="border-t border-slate-100 my-8" />
        
        <SliderField
          label="Annual Step-Up (%)"
          value={stepUp}
          displayValue={stepUp + "%"}
          max={100}
          step={1}
          onChange={setStepUp}
        />
        
        <SliderField
          label="Expected Inflation (%)"
          value={inflation}
          displayValue={inflation + "%"}
          max={20}
          step={0.5}
          onChange={setInflation}
        />
      </Card>

      {/* Results */}
      <Card className="p-10">
        <CardTitle>Investment Summary</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <StatPill label="Total Invested" value={formatINR(result.totalInvested)} variant="gold" />
          <StatPill label="Estimated Returns" value={formatINR(result.totalReturns)} variant="green" />
          
          <StatPill
            label="Maturity Corpus (Nominal)"
            value={formatINR(result.maturityCorpus)}
            sub="Final amount in future currency value"
            variant="gold"
            fullWidth
            valueSize="lg"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:col-span-2">
            <StatPill 
              label="Inflation Adjusted (Real Value)" 
              value={formatINR(result.maturityCorpusInflationAdjusted)} 
              sub="Purchasing power in today's terms" 
              variant="blue"
            />
            <StatPill 
              label="Post-Tax Estimation" 
              value={formatINR(result.postTaxCorpus)} 
              sub="Estimated after 12.5% LTCG tax" 
              variant="gold"
            />
          </div>

          <StatPill label="Wealth Multiple" value={result.wealthMultiple.toFixed(2) + "x"} sub="Return on investment multiple" />
          <StatPill label="Real Growth Rate" value={(annualRate - inflation).toFixed(1) + "%"} sub="Return above inflation" />
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 font-mono">Wealth Growth Visualization</p>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 text-[10px] font-bold font-mono text-[#0d2338] uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d2338]" /> Total Corpus
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold font-mono text-[#00aeef] uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00aeef]" /> Invested Capital
              </span>
            </div>
          </div>
          <SIPChart data={result.yearlyData} />
        </div>

        <SIPTable data={result.yearlyData} />
      </Card>
    </div>
  );
}
