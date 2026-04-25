"use client";

import React, { useState, useMemo, useCallback, useDeferredValue } from "react";
import { calcPlan, formatINR, formatINRShort } from "@/lib/calculations";
import { Card, CardTitle } from "@/components/ui/Card";
import { SliderField } from "@/components/ui/SliderField";
import { StatPill } from "@/components/ui/StatPill";
import { PlanChart } from "@/components/ui/Charts";
import { SIPTable, SWPTable } from "@/components/ui/YearTable";

const RATIO_PRESETS = [
  { label: "10%", value: 0.1 },
  { label: "15%", value: 0.15 },
  { label: "20%", value: 0.2 },
  { label: "30%", value: 0.3 },
  { label: "50%", value: 0.5 },
  { label: "Equal", value: 1 },
];

export function PlanCalculator() {
  // SIP params
  const [sipAmount, setSipAmount] = useState(15_000);
  const [sipLumpsum, setSipLumpsum] = useState(0);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(25);
  const [sipStepUp, setSipStepUp] = useState(5);

  // SWP params
  const [swpAmount, setSwpAmount] = useState(100_000);
  const [swpRate, setSwpRate] = useState(8);
  const [swpStepUp, setSwpStepUp] = useState(3);
  
  // Global Inflation
  const [inflation, setInflation] = useState(6);

  // Linked slider state
  const [linkEnabled, setLinkEnabled] = useState(true);
  const [ratio, setRatio] = useState(0.2);

  // Dynamic slider maxes
  const [maxes, setMaxes] = useState({
    sipAmount: 200_000,
    sipLumpsum: 1_000_000,
    sipRate: 30,
    sipYears: 50,
    swpAmount: 1_000_000,
    swpRate: 30,
    linkSlider: 1_000_000,
  });

  function updateMax(field: keyof typeof maxes, value: number) {
    if (value > maxes[field]) {
      setMaxes((p) => ({ ...p, [field]: value * 2 }));
    }
  }

  const handleSwpChange = useCallback(
    (v: number) => {
      setSwpAmount(v);
      if (v > maxes.swpAmount) updateMax("swpAmount", v);
      if (v > maxes.linkSlider) updateMax("linkSlider", v);

      if (linkEnabled) {
        const raw = Math.round((v * ratio) / 500) * 500;
        const newSip = Math.max(raw, raw > 0 ? 500 : 0);
        setSipAmount(newSip);
        if (newSip > maxes.sipAmount) updateMax("sipAmount", newSip);
      }
    },
    [linkEnabled, ratio, maxes.swpAmount, maxes.linkSlider, maxes.sipAmount]
  );

  const handleLinkSlider = handleSwpChange;

  const handleSipChange = useCallback(
    (v: number) => {
      setSipAmount(v);
      if (v > maxes.sipAmount) updateMax("sipAmount", v);
      if (linkEnabled && v > 0) {
        const newRatio = v / swpAmount;
        if (isFinite(newRatio)) setRatio(newRatio);
      }
    },
    [linkEnabled, swpAmount, maxes.sipAmount]
  );

  const applyRatio = (r: number) => {
    setRatio(r);
    const raw = Math.round((swpAmount * r) / 500) * 500;
    const newSip = Math.max(raw, raw > 0 ? 500 : 0);
    setSipAmount(newSip);
    if (newSip > maxes.sipAmount) updateMax("sipAmount", newSip);
  };

  const dSipAmt = useDeferredValue(sipAmount);
  const dSipLump = useDeferredValue(sipLumpsum);
  const dSipRate = useDeferredValue(sipRate);
  const dSipYrs = useDeferredValue(sipYears);
  const dSipStep = useDeferredValue(sipStepUp);
  const dSwpAmt = useDeferredValue(swpAmount);
  const dSwpRate = useDeferredValue(swpRate);
  const dSwpStep = useDeferredValue(swpStepUp);
  const dInf = useDeferredValue(inflation);

  const result = useMemo(
    () =>
      calcPlan(
        { 
          monthlyAmount: dSipAmt, 
          annualRate: dSipRate, 
          years: dSipYrs, 
          annualStepUp: dSipStep, 
          initialLumpsum: dSipLump,
          inflationRate: dInf
        },
        { 
          monthlyWithdrawal: dSwpAmt, 
          annualRate: dSwpRate, 
          annualStepUp: dSwpStep,
          inflationRate: dInf
        }
      ),
    [dSipAmt, dSipLump, dSipRate, dSipYrs, dSipStep, dSwpAmt, dSwpRate, dSwpStep, dInf]
  );

  const isSustainable = result.swpResult.corpusLasts === null;
  const ratioPct = Math.round(ratio * 100);
  const linkTrackPct = Math.min(100, (swpAmount / maxes.linkSlider) * 100);

  return (
    <div className="space-y-8">
      {/* ── LINKED SLIDER CARD ────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
          <div>
            <h3 className="font-sans text-2xl font-black text-[#0d2338] mb-2">
              Lifecycle Planning
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Plan your accumulation and withdrawal phases in one go.
            </p>
          </div>

          <button
            onClick={() => setLinkEnabled((p) => !p)}
            className="flex items-center gap-3 group bg-slate-50 border border-slate-200 rounded-full px-4 py-2"
          >
            <span className="text-[10px] font-bold font-mono text-slate-500 tracking-wider uppercase">
              Auto-Scale {linkEnabled ? "ON" : "OFF"}
            </span>
            <div
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ background: linkEnabled ? "#0d2338" : "#e2e8f0" }}
            >
              <div
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all shadow-sm"
                style={{ left: linkEnabled ? "27px" : "3px" }}
              />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-6 transition-all hover:bg-sky-50">
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block mb-2">Target Monthly Withdrawal</span>
            <span className="font-mono text-4xl font-black text-[#00aeef]">
              {formatINR(swpAmount)}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all hover:bg-slate-100">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Required Monthly SIP</span>
            <span className="font-mono text-4xl font-black text-[#0d2338]">
              {formatINR(sipAmount)}
            </span>
          </div>
        </div>

        <div className="relative h-12 flex items-center mb-2 px-1">
          <div className="absolute inset-x-0 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-150"
              style={{
                width: linkTrackPct + "%",
                background: "linear-gradient(90deg, #0d2338, #00aeef)",
              }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={maxes.linkSlider}
            step={1000}
            value={Math.min(swpAmount, maxes.linkSlider)}
            onChange={(e) => handleLinkSlider(parseFloat(e.target.value))}
            className="sky-thumb relative z-10 w-full"
            style={{ background: "transparent", height: "8px" }}
          />
        </div>
        <div className="flex justify-between font-mono text-[11px] font-bold text-slate-400 mb-8 px-1">
          <span>₹0</span>
          <span>{formatINRShort(maxes.linkSlider)}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <span className="text-sm font-bold text-[#0d2338]">SIP : SWP Ratio</span>
              <div className="flex flex-wrap gap-2">
                {RATIO_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => applyRatio(p.value)}
                    className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all"
                    style={{
                      borderColor: ratio === p.value ? "#0d2338" : "#e2e8f0",
                      background: ratio === p.value ? "#0d2338" : "white",
                      color: ratio === p.value ? "white" : "#64748b",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-white border border-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0d2338] transition-[width] duration-500"
                  style={{ width: Math.min(100, ratioPct) + "%" }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#0d2338]">
                {ratioPct}%
              </span>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-center">
             <SliderField
                label="Expected Inflation Rate (%)"
                value={inflation}
                displayValue={inflation + "%"}
                max={15}
                step={0.5}
                onChange={setInflation}
                compact
              />
          </div>
        </div>
      </div>

      {/* ── TWO INPUT CARDS ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-slate-900/20">
              1
            </div>
            <h3 className="font-sans text-xl font-black text-[#0d2338]">
              Accumulation
            </h3>
          </div>
          <SliderField
            label="Initial Investment (Lumpsum)"
            value={sipLumpsum}
            displayValue={"₹" + sipLumpsum.toLocaleString("en-IN")}
            max={maxes.sipLumpsum}
            step={5000}
            onChange={(v) => { updateMax("sipLumpsum", v); setSipLumpsum(v); }}
          />
          <SliderField
            label="Monthly SIP Amount"
            value={sipAmount}
            displayValue={"₹" + sipAmount.toLocaleString("en-IN")}
            max={maxes.sipAmount}
            step={500}
            onChange={handleSipChange}
          />
          <SliderField
            label="SIP Returns Rate"
            value={sipRate}
            displayValue={sipRate.toFixed(1) + "%"}
            max={maxes.sipRate}
            step={0.5}
            onChange={(v) => { updateMax("sipRate", v); setSipRate(v); }}
          />
          <SliderField
            label="Investment Years"
            value={sipYears}
            displayValue={sipYears + " yrs"}
            min={1}
            max={maxes.sipYears}
            step={1}
            onChange={(v) => { updateMax("sipYears", v); setSipYears(v); }}
          />
          <SliderField
            label="Annual Step-Up (%)"
            value={sipStepUp}
            displayValue={sipStepUp + "%"}
            max={100}
            step={1}
            onChange={setSipStepUp}
          />
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#00aeef] flex items-center justify-center text-white text-lg font-black shadow-lg shadow-sky-400/20">
              2
            </div>
            <h3 className="font-sans text-xl font-black text-[#0d2338]">
              Withdrawal
            </h3>
          </div>
          <SliderField
            label="Target Monthly Income"
            value={swpAmount}
            displayValue={"₹" + swpAmount.toLocaleString("en-IN")}
            max={maxes.swpAmount}
            step={1000}
            onChange={handleSwpChange}
            thumbColor="sky"
          />
          <SliderField
            label="SWP Returns Rate"
            value={swpRate}
            displayValue={swpRate.toFixed(1) + "%"}
            max={maxes.swpRate}
            step={0.5}
            onChange={(v) => { updateMax("swpRate", v); setSwpRate(v); }}
          />
          <SliderField
            label="Annual Step-Up (%)"
            value={swpStepUp}
            displayValue={swpStepUp + "%"}
            max={100}
            step={1}
            onChange={setSwpStepUp}
          />
        </Card>
      </div>

      {/* ── VERDICT CARD ────────────────────────────────────────────── */}
      <div
        className="rounded-[2.5rem] border-2 p-10 lg:p-12 transition-all shadow-xl"
        style={{
          background: isSustainable ? "rgba(16,185,129,0.03)" : "rgba(13,35,56,0.02)",
          borderColor: isSustainable ? "rgba(16,185,129,0.15)" : "rgba(13,35,56,0.1)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 font-mono text-[10px] font-black px-4 py-1.5 rounded-full border-2 mb-6 uppercase tracking-widest shadow-sm"
              style={{
                background: "white",
                borderColor: isSustainable ? "#10b981" : "#0d2338",
                color: isSustainable ? "#10b981" : "#0d2338",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: isSustainable ? "#10b981" : "#0d2338" }}
              />
              {isSustainable ? "Sustainable Plan" : "Shortfall Detected"}
            </span>
            <h3 className="font-sans text-3xl md:text-4xl font-black text-[#0d2338] mb-4">
              {isSustainable
                ? "Your retirement plan is fully sustainable!"
                : `Plan shortfall in ${result.swpResult.corpusLasts} years.`}
            </h3>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              {isSustainable
                ? `Excellent. Your corpus of ${formatINR(result.builtCorpus)} is enough to support your lifestyle.`
                : "Your withdrawal rate exceeds growth. Consider increasing your SIP or reducing the monthly withdrawal."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatPill label="Final SIP Corpus" value={formatINR(result.builtCorpus)} variant="gold" />
          <StatPill label="Starting Income" value={formatINR(swpAmount) + "/mo"} variant="default" />
          <StatPill
            label="Sustainability"
            value={isSustainable ? "Forever" : result.swpResult.corpusLasts + " yrs"}
            variant={isSustainable ? "green" : "sky"}
          />
          <StatPill label="Real Value (today's terms)" value={formatINR(result.swpResult.remainingCorpusInflationAdjusted)} variant="blue" />
        </div>
      </div>

      <Card className="p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 font-mono">
            Lifecycle Visualization
          </p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2.5 text-[10px] font-bold font-mono text-[#0d2338] uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-[#0d2338]" /> Accumulation
            </span>
            <span className="flex items-center gap-2.5 text-[10px] font-bold font-mono text-[#00aeef] uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-[#00aeef]" /> Withdrawal
            </span>
          </div>
        </div>
        <PlanChart
          sipData={result.sipYearlyData}
          swpData={result.swpResult.yearlyData}
          sipYears={sipYears}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <CardTitle>SIP Schedule</CardTitle>
          <SIPTable data={result.sipYearlyData} />
        </Card>
        <Card className="p-8">
          <CardTitle>SWP Schedule</CardTitle>
          <SWPTable data={result.swpResult.yearlyData} />
        </Card>
      </div>
    </div>
  );
}
