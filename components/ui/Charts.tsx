"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatINRShort, formatINR } from "@/lib/calculations";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono shadow-xl ring-1 ring-slate-900/5">
      <p className="text-slate-500 font-bold mb-2 border-b border-slate-50 pb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-bold flex justify-between gap-4">
          <span>{entry.name}:</span>
          <span>{formatINR(entry.value)}</span>
        </p>
      ))}
    </div>
  );
}

interface SIPChartProps {
  data: Array<{ year: number; invested: number; returns: number; corpus: number }>;
}

export function SIPChart({ data }: SIPChartProps) {
  const chartData = data.map((d) => ({ name: `Yr ${d.year}`, Invested: d.invested, Corpus: d.corpus }));
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d2338" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#0d2338" stopOpacity={0.01} />
          </linearGradient>
          <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00aeef" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#00aeef" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
        <YAxis tickFormatter={formatINRShort} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} width={60} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="Invested" stroke="#00aeef" strokeWidth={2} strokeDasharray="5 5" fill="url(#investedGrad)" dot={false} />
        <Area type="monotone" dataKey="Corpus" stroke="#0d2338" strokeWidth={3} fill="url(#corpusGrad)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface SWPChartProps {
  data: Array<{ year: number; corpus: number; totalWithdrawn: number }>;
}

export function SWPChart({ data }: SWPChartProps) {
  const chartData = data.map((d) => ({ name: `Yr ${d.year}`, "Remaining Corpus": d.corpus, "Total Withdrawn": d.totalWithdrawn }));
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="corpusGradSwp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00aeef" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#00aeef" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
        <YAxis tickFormatter={formatINRShort} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} width={60} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="Total Withdrawn" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fill="none" dot={false} />
        <Area type="monotone" dataKey="Remaining Corpus" stroke="#00aeef" strokeWidth={3} fill="url(#corpusGradSwp)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface PlanChartProps {
  sipData: Array<{ year: number; corpus: number }>;
  swpData: Array<{ year: number; corpus: number }>;
  sipYears: number;
}

export function PlanChart({ sipData, swpData, sipYears }: PlanChartProps) {
  const lastSipPoint = sipData[sipData.length - 1];
  
  const sipPoints = sipData.slice(0, -1).map((d) => ({ 
    name: `Yr ${d.year}`, 
    "SIP Corpus": d.corpus, 
    "SWP Corpus": null 
  }));

  const bridgePoint = {
    name: `Yr ${sipYears}`,
    "SIP Corpus": lastSipPoint?.corpus || 0,
    "SWP Corpus": lastSipPoint?.corpus || 0,
  };

  const swpPoints = swpData.map((d) => ({ 
    name: `Yr ${sipYears + d.year}`, 
    "SIP Corpus": null, 
    "SWP Corpus": d.corpus 
  }));

  const chartData = [...sipPoints, bridgePoint, ...swpPoints];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="sipGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d2338" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#0d2338" stopOpacity={0.01} />
          </linearGradient>
          <linearGradient id="swpGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00aeef" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#00aeef" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
        <YAxis tickFormatter={formatINRShort} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} width={64} />
        <Tooltip content={<CustomTooltip />} />
        <Area connectNulls={false} type="monotone" dataKey="SIP Corpus" stroke="#0d2338" strokeWidth={3} fill="url(#sipGrad)" dot={false} />
        <Area connectNulls={false} type="monotone" dataKey="SWP Corpus" stroke="#00aeef" strokeWidth={3} fill="url(#swpGrad)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
