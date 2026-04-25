import { formatINR } from "@/lib/calculations";

interface SIPRow {
  year: number;
  invested: number;
  returns: number;
  corpus: number;
}

interface SWPRow {
  year: number;
  withdrawn: number;
  totalWithdrawn: number;
  corpus: number;
}

export function SIPTable({ data }: { data: SIPRow[] }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="max-h-64 overflow-y-auto overflow-x-auto">
        <table className="w-full border-collapse font-sans text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Year</th>
              <th className="text-right text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Invested</th>
              <th className="text-right text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Returns</th>
              <th className="text-right text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Corpus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => (
              <tr key={row.year} className="bg-white hover:bg-slate-50 transition-colors">
                <td className="text-slate-600 font-semibold px-4 py-2.5">Year {row.year}</td>
                <td className="text-right text-slate-900 font-mono px-4 py-2.5">{formatINR(row.invested)}</td>
                <td className="text-right text-emerald-600 font-mono font-bold px-4 py-2.5">+{formatINR(row.returns)}</td>
                <td className="text-right text-[#0d2338] font-mono font-bold px-4 py-2.5">{formatINR(row.corpus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SWPTable({ data }: { data: SWPRow[] }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="max-h-64 overflow-y-auto overflow-x-auto">
        <table className="w-full border-collapse font-sans text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Year</th>
              <th className="text-right text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Withdrawn/yr</th>
              <th className="text-right text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Total</th>
              <th className="text-right text-slate-500 font-bold tracking-wider uppercase text-[10px] px-4 py-3">Corpus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => (
              <tr key={row.year} className="bg-white hover:bg-slate-50 transition-colors">
                <td className="text-slate-600 font-semibold px-4 py-2.5">Year {row.year}</td>
                <td className="text-right text-slate-900 font-mono px-4 py-2.5">{formatINR(row.withdrawn)}</td>
                <td className="text-right text-emerald-600 font-mono font-bold px-4 py-2.5">{formatINR(row.totalWithdrawn)}</td>
                <td className={`text-right font-mono font-bold px-4 py-2.5 ${row.corpus > 0 ? "text-[#00aeef]" : "text-slate-400"}`}>
                  {formatINR(row.corpus)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
